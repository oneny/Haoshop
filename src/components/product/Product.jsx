import React from "react";
import { useNavigate } from "react-router-dom";

import "./product.scss";
import publicURL from "../../utils/publicURL";

function Product({ product }) {
  const navigate = useNavigate();

  const onClickNavigate = (page) => () => {
    navigate(page);
  };

  return (
    <div
      className="products-items"
      onClick={onClickNavigate(`/products/${product._id}`)}
    >
      <img src={publicURL(product.productImgs[0].fileName)} alt="" />
      <p>
        <b>{product.brand}</b>
      </p>
      <p>
        {product.name} {product.color && `(${product.color})`}
      </p>
      <p>
        <span className={`${product.discountPrice}` > 0 && "hasDiscount"}>
          ₩{product.price}
        </span>
        {product.discountPrice && (
          <span className="discount">
            ₩{product.price - product.discountPrice}
          </span>
        )}
      </p>
    </div>
  );
}

export default Product;
