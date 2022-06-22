import "./checkout.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addOrder, getAddress } from "../../slice/userSlice";
import { selectTotalPrice, selectTotalQty } from "../../slice/cartSlice";
import CartItem from "../../components/cartItem/CartItem";
import { Navigate, useNavigate } from "react-router-dom";
import AddressForm from "../../components/address/AddressForm";
import CheckoutItem from "../../components/checkout/CheckoutItem";

function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((store) => store.cart);
  const { addresses } = useSelector((store) => store.user);
  const addressName = addresses.map((v) => v.name);
  const totalPrice = useSelector(selectTotalPrice);
  const totalQty = useSelector(selectTotalQty);
  const { latestOrder, clearLatestOrder } = useSelector((store) => store.user);
  const user = JSON.parse(sessionStorage.getItem("user"));

  const [confirmedAddress, setConfirmAddress] = useState("");
  const [formType, setFormType] = useState("add");
  const [isItemConfirmed, setIsItemConfirmed] = useState(false);
  const [paymentType, setPaymentType] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [enableInput, setEnableInput] = useState(false);
  const [ready, setReady] = useState(false);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

  const [name, setName] = useState(selectedAddress?.name || "");

  if (!user) {
    navigate("/signin");
  }

  useEffect(() => {
    user && dispatch(getAddress(user._id));
    // dispatch(clearLastestOrder());
  }, []);

  useEffect(() => {
    user && confirmedAddress && isItemConfirmed && paymentType
      ? setReady(true)
      : setReady(false);
  }, [user, confirmedAddress, isItemConfirmed, paymentType]);

  const handleOrderSubmit = () => {
    const items = cartItems.map((item) => ({
      product: item._id,
      purchasedPrice: item.price,
      purchasedQty: item.qty,
    }));
    const order = {
      user: user._id,
      address: confirmedAddress._id,
      totalPrice,
      totalQty,
      items,
      paymentStatus: "pending",
      paymentType,
    };

    console.log(order);
    dispatch(addOrder(order));
    setIsOrderConfirmed(true);
  };

  return (
    <div className="checkout-container">
      <div className="checkout-title">
        <h2>CHECK OUT</h2>
      </div>
      <div className="checkout-wrapper">
        <CheckoutItem title={"상품 정보"}>
          {cartItems.map((cartItem) => (
            <CartItem
              key={cartItem._id + cartItem.size}
              cartItem={cartItem}
              onlyInfo={true}
            />
          ))}
          <div className="product-total">
            <div className="product-total-item">
              <h4>총계</h4>
              <h4>{totalQty}</h4>
            </div>
            <div className="product-total-item">
              <h4>총금액</h4>
              <h4>₩ {totalPrice}</h4>
            </div>
          </div>
        </CheckoutItem>

        <CheckoutItem title={"주문자 정보"}>
          {user && (
            <div className="buyer-info">
              <div className="buyer-info-left">이름</div>{" "}
              <div>{user.username}</div>
              <div className="buyer-info-left">이메일</div>{" "}
              <div>{user.email}</div>
              <div className="buyer-info-left">연락처</div>{" "}
              <div>{user.phoneNumber}</div>
            </div>
          )}
        </CheckoutItem>

        <CheckoutItem title={"배송 정보"}>
          <div className="shipping-content">
            <div className="shipping-item">
              <div className="shipping-item-left">배송지 선택</div>
              <div className="shipping-selection">
                <div>
                  <input
                    type="radio"
                    id="new"
                    name="destination"
                    value="new"
                    onClick={() => {
                      setFormType("add");
                      setEnableInput(false);
                    }}
                    defaultChecked={formType === "add" ? true : false}
                  />{" "}
                  <label htmlFor="new">신규 배송지</label>
                </div>
                {addresses?.map((address) => (
                  <div key={address?._id}>
                    <input
                      type="radio"
                      id={address.name}
                      name="destination"
                      value={address.name}
                      onClick={() => {
                        setSelectedAddress(address);
                        setFormType("update");
                        setName(address.name);
                      }}
                    />{" "}
                    <label htmlFor={address.name}>{address.name}</label>
                  </div>
                ))}
              </div>
            </div>
            {formType === "add" ? (
              <AddressForm
                addresses={addresses}
                enableInput={enableInput}
                setEnableInput={setEnableInput}
              />
            ) : (
              <AddressForm
                addresses={addresses}
                enableInput={enableInput}
                setEnableInput={setEnableInput}
                selectedAddress={selectedAddress}
              />
            )}
          </div>
        </CheckoutItem>

        <CheckoutItem title={"결제 정보"}></CheckoutItem>
      </div>
    </div>
  );
}

export default Checkout;
