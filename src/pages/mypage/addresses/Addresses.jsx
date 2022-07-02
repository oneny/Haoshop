import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddressForm from "../../../components/addressForm/AddressForm";
import AddressList from "../../../components/addressForm/AddressList";
import "./addresses.scss";

function Addresses() {
  const { addresses } = useSelector((store) => store.user);
  const [selectedAddress, setSelectedAddress] = useState("");

  return (
    <div className="addresses">
      <div className="addresses-title">
        <h2>배송지 관리</h2>
      </div>

      <AddressList 
        addresses={addresses}
        selectedAddress={selectedAddress}
        setSelectedAddress={setSelectedAddress}
        className={"addresses-content"}
      />
    </div>
  );
}

export default Addresses;
