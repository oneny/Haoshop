import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

import "./newArrival.scss";
import { getProductsByCategories } from "../../../slice/productSlice";
import ProductList from "../../../components/product/ProductList";

function NewArraval() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, total, perPage, _currentPage, _brands, _sort, brandData } =
    useSelector((store) => store.product);
  const [currentPage, setCurrentPage] = useState(_currentPage);
  const [sort, setSort] = useState(_sort);
  const [brands, setBrands] = useState(_brands);
  const cids = [];

  useEffect(() => {
    const payload = {
      // 상품 목록을 요청할 데이터
      cids,
      brands, // 사용자가 선택한 브랜드
      perPage, // 한 페이지당 상품 개수
      currentPage, // 현재 페이지
      sort, // 상품 정렬
    };
    dispatch(getProductsByCategories(payload));
  }, [brands, perPage, currentPage]);

  return (
    <div className="newArrival">
      <div className="newArrival-wrapper">
      <div className="newArrival-wrapper-top">
        <div className="title">
          <FiberManualRecordIcon className="icon" />
          <h3>New Arrival</h3>
        </div>
        <div className="viewMore" onClick={() => navigate("category/all")}>
          <h4>View More</h4>
        </div>
      </div>
      <ProductList setSort={setSort} products={products} />
      </div>
    </div>
  );
}

export default NewArraval;
