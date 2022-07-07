import "./layout.scss";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import Header2 from "./header/Header2";
import { useEffect } from "react";
import { batch, useDispatch } from "react-redux";
import { getBrands } from "../slice/brandSlice";
import { getCategories } from "../slice/categorySlice";
import { getCollections } from "../slice/collectionSlice";
import { getLookbooks } from "../slice/lookbookSlice";
import { getProducts } from "../slice/productSlice";
import useToggle from "../hooks/useToggle.js";

function Layout() {
  const dispatch = useDispatch();

  useEffect(() => {
    batch(() => {
      dispatch(getCategories());
      dispatch(getProducts());
      dispatch(getBrands());
      dispatch(getLookbooks());
      dispatch(getCollections());
    });
  }, []);

  return (
    <div className="layout">
      <Sidebar />
      <main>
        <Header2 />
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
