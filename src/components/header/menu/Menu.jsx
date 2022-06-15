import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./menu.scss";
import { clearFeatures } from "../../../slice/productSlice";
import { signout } from "../../../slice/authSlice";

function Menu({ menuOpen, setMenuOpen }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = localStorage.getItem("user");

  const onClickNavigate = (cate) => () => {
    if (cate === "/categories/all" || "/brands")
      dispatch(clearFeatures());
      setMenuOpen(!menuOpen);
    navigate(cate);
  };

  const onClickLogout = () => {
    dispatch(signout());
    setMenuOpen(!menuOpen);
  };

  return (
  <div className={`menu-container ${menuOpen ? "menuOpen" : "" }`}>
    <div className="menu-items">
      <div className="menu-item" onClick={onClickNavigate("/categories/all")}>
        CATEGORY
      </div>
      <div className="menu-item" onClick={onClickNavigate("/brands")}>
        BRANDS
      </div>
      <div className="menu-item" onClick={onClickNavigate("/brands")}>
        LOOKBOOK
      </div>
    </div>
    <div className="menu-items">
      {user ? (
        <div className="menu-item" onClick={onClickLogout}>
          SIGNOUT
        </div>  
      ) : (
        <>
          <div className="menu-item" onClick={onClickNavigate("/signin")}>
            SIGNIN
          </div>
          <div className="menu-item" onClick={onClickNavigate("/signup")}>
            SIGNUP
          </div>
        </>
      )}
      <div className="menu-item" onClick={onClickNavigate("/cart")}>
        CART
      </div>
      <div className="menu-item" onClick={onClickNavigate("/contact")}>
        CONTACT
      </div>
    </div>
  </div>
  );
}

export default Menu;
