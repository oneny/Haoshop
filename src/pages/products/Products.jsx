import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { addItem } from "../../slice/cartSlice";
import { getProduct } from "../../slice/productSlice";
import publicURL from "../../utils/publicURL";

function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { product, relatedProducts } = useSelector((store) => store.product);
  const [size, setSize] = useState("");
  const [src, setSrc] = useState(publicURL(product?.productImgs[0]?.fileName));

  console.log("src", src);

  console.log("product", product);

  useEffect(() => {
    dispatch(getProduct(params.id));
  }, [params]);

  const addCart = () => {
    if (!size) return alert("사이즈를 입력하셔야 합니다.");
    dispatch(
      addItem({
        _id: product._id,
        name: product.name,
        img: product.productImgs[0].fileName,
        prict: product.price,
        size,
        qty: 1,
      })
    );
    const navi = window.confirm("장바구니로 이동하시겠습니까?");
    if (navi) navigate("/cart");
  };

  return (
    <>
      <div className="product">
        <div className="product-left">
          <div className="product-left-item">
            <div>
              {product?.productImgs?.map((productImg, i) => (
                <div
                  key={i}
                  onClick={() => setSrc(publicURL(productImg.fileName))}
                >
                  <img
                    src={publicURL(productImg.fileName)}
                    alt=""
                    width="50"
                    heigth="50"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="product-left-item">
            <div className="img-wrapper">
              <img src={src} alt="" width="500" height="500" />
            </div>
          </div>
        </div>
        <div className="product-right">
          <div className="product-right-item">
            <div
              className="brand-button"
              onClick={() => navigate(`/brands/${product.brand.toUpperCase()}`)}
            >
              브랜드 홈 바로가기
            </div>
          </div>
          <div className="product-right-item"></div>
        </div>
      </div>
      <div>
        <p>제품명 {product?.name}</p>
        <p>상세정보 {product?.description}</p>
        <p>가격 {product?.price}</p>
        <p>할인가 {product?.discountPrice}</p>
        <p>색상 {product?.color}</p>

        <div>
          <select onChange={(e) => setSize(e.target.value)}>
            <option defaultValue hidden>
              Size Option
            </option>
            {product?.stock?.map((s) => (
              <option value={s.size} disabled={s.qty === 0} key={s._id}>
                {s.size}{" "}
                {s.qty === 0 ? "(SOLD OUT)" : s.qty === 1 ? "(LAST ONE)" : ""}
              </option>
            ))}
          </select>
        </div>
        <button onClick={addCart}>카트 담기</button>
      </div>
    </>
  );
}

export default Products;
