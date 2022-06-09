import "./checkout.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addOrder, getAddress } from "../../slice/userSlice";
import { selectTotalPrice, selectTotalQty } from "../../slice/cartSlice";
import CartItem from "../../components/cartItem/CartItem";
import AddressList from "../../components/address/AddressList";
import { useNavigate } from "react-router-dom";

const CheckoutStep = (props) => {
  return (
    <div className="checkoutStep">
      <div
        onClick={props.onClick}
        className={`checkoutHeader ${props.active && "active"}`}
      >
        <div className="step-wrapper">
          <span className="stepNumber">{props.stepNumber}</span>
          <span className="stepTitle">{props.title}</span>
        </div>
      </div>
      {props?.body}
    </div>
  );
};

function Checkout() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((store) => store.cart);
  const totalPrice = useSelector(selectTotalPrice);
  const totalQty = useSelector(selectTotalQty);
  const { latestOrder, clearLatestOrder } = useSelector((store) => store.user);
  const user = JSON.parse(localStorage.getItem("user"));

  const [confirmedAddress, setConfirmAddress] = useState("");
  const [isItemConfirmed, setIsItemConfirmed] = useState(false);
  const [paymentType, setPaymentType] = useState("");
  const [ready, setReady] = useState(false);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

  useEffect(() => {
    user && dispatch(getAddress(user._id));
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
        <div className="checkout-wrapper-product">
          <div className="product-title">
            <h3>상품 정보</h3>
          </div>
          {cartItems.map((cartItem) => (
            <CartItem key={cartItem._id} cartItem={cartItem} onlyInfo={true} />
          ))}
        </div>
        <div className="checkout-wrapper-buyer">
          <div className="buyer-title">
            <h3>주문자 정보</h3>
          </div>
            {user && (
              <div className="buyer-info">
                <p>이름 {user.username}</p>
                <p>이메일 {user.email}</p>
                <p>연락처 {user.phoneNumber}</p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default Checkout;
