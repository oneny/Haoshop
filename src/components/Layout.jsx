import { useEffect } from "react"; 
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import Header from './header/Header';
import { getCategories } from '../slice/categorySlice';
import { addCartItems } from "../slice/cartSlice";

function Layout() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const { cartItems } = useSelector((store) => store.cart);

  useEffect(() => {
    dispatch(getCategories()); // 카테고리 데이터 가져와서 state에 저장
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(addCartItems(cartItems)); // 로그인 상태인 경우 cart 상품 가져오기
      // dispatch(getCartItems(user._id));
    }
  }, []);

  return (
    <div className="layout">
      <header>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout;