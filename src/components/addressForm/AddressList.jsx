import React, { useState } from "react";

import AddressForm from "./AddressForm";
import "./addressList.scss";

function AddressList({ className, addresses, setSelectedAddress, selectedAddress }) {
  const [formType, setFormType] = useState("add");
  const [enableInput, setEnableInput] = useState(false);
  const [paymentType, setPaymentType] = useState("");

  return (
    <div className={`shipping-content ${className}`}>
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
            <div key={address._id}>
              <input
                type="radio"
                id={address.name}
                name="destination"
                value={address.name}
                onClick={() => {
                  setSelectedAddress(address);
                  setFormType("update");
                }}
              />{" "}
              <label htmlFor={address.name}>{address.name}</label>
            </div>
          ))}
        </div>
      </div>
      {formType === "add" ? (
        <AddressForm
          enableInput={enableInput}
          setEnableInput={setEnableInput}
        />
      ) : (
        <AddressForm
          selectedAddress={selectedAddress}
          enableInput={enableInput}
          setEnableInput={setEnableInput}
        />
      )}
    </div>
  );
}

export default AddressList;
