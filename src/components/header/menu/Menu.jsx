import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import "./menu.scss";
import { updateCartItems } from "../../../slice/cartSlice";
import { signout } from "../../../slice/authSlice";

function Menu({ menuOpen, setMenuOpen }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = sessionStorage.getItem("user");
  const cartItems = useSelector((store) => store.cart.cartItems);

  const closeMenu = (cate) => () => {
    setMenuOpen(false);
  };

  const logout = () => {
    dispatch(updateCartItems(cartItems));
    dispatch(signout());
    navigate("/");
  };

  return (
    <div className={`menu-container ${menuOpen ? "menuOpen" : ""}`}>
      <div className="menu-items">
        <NavLink to="/categories/all">
          <div className="menu-item" onClick={closeMenu}>
            CATEGORY
          </div>
        </NavLink>
        <div className="menu-item" onClick={closeMenu}>
          BRAND
        </div>
        <NavLink to="/lookbooks">
          <div className="menu-item">LOOKBOOK</div>
        </NavLink>
      </div>
      <div className="menu-items">
        {user ? (
          <>
            <div className="menu-item" onClick={logout}>
              SIGNOUT
            </div>
            <NavLink to="/mypage">
              <div className="menu-item">MYPAGE</div>
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/signin" onClick={closeMenu}> 
              <div className="menu-item" onClick={closeMenu}>SIGNIN</div>
            </NavLink>
            <NavLink to="/signup">
              <div className="menu-item">SIGNUP</div>
            </NavLink>
          </>
        )}
        <div className="menu-item" onClick={closeMenu}>
          CART
        </div>
        <div className="menu-item" onClick={closeMenu}>
          CONTACT
        </div>
        <div className="menu-item" onClick={closeMenu}>
          order
        </div>
      </div>
    </div>
  );
}

export default Menu;
