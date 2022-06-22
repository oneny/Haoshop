import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import "./product.scss";
import toKRW from "../../utils/toKRW";
import publicURL from "../../utils/publicURL";

function Product({ product }) {
  const navigate = useNavigate();

  return (
    <NavLink to={`/products/${product._id}`}>
      <div className="products-items">
        <img src={publicURL(product.productImgs[0].fileName)} alt="" />
        <p>
          <b>{product.brand}</b>
        </p>
        <p>
          {product.name} {product.color && `(${product.color})`}
        </p>
        <p>
          <span className={`${product.discountPrice}` > 0 ? "hasDiscount" : ""}>
            ₩{toKRW(product.price)}
          </span>
          {product.discountPrice && (
            <span className="discount">
              ₩{toKRW(product?.discountPrice)}
            </span>
          )}
        </p>
      </div>
    </NavLink>
  );
}

export default Product;
