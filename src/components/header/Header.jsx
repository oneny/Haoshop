import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import './header.scss';
import Navbar from "../navbar/Navbar";

function Header() {
  const navigate = useNavigate();

  const onClickNavigate = useCallback(() => {
    navigate("/");
  }, [])

  return (
    <div className="header-container">
      <div className="logo-wrapper" onClick={onClickNavigate}>
        <h1>HOW ABOUT OOTD</h1>
      </div>
      <Navbar />
    </div>
  );
}

export default Header;
