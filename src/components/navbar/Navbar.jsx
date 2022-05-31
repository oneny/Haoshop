import React, { useCallback, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';

import "./navbar.scss";
import { clearFeatures } from "../../slice/productSlice";
import { signout } from "../../slice/authSlice";
import Search from "./search/Search";
import Menu from "./menu/Menu";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = localStorage.getItem("user");
  const { cartItems } = useSelector((store) => store.cart);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const onClickNavigate = useCallback((cate) => () => {
    if (cate === "/categories/all" || "/brands")
      dispatch(clearFeatures());
    navigate(cate);
  }, []);

  const onClickLogout = useCallback(() => {
    dispatch(signout());
  }, []);

  const onClickMenuOpen = useCallback(() => {
    setMenuOpen(!menuOpen);
  }, [menuOpen])

  const onClickSearchOpen = useCallback(() => {
    setSearchOpen(!searchOpen);
  }, [searchOpen]);

  return (
    <>
      
    </>
  )
}

export default Navbar;