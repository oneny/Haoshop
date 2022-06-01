import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import Filter4Icon from "@mui/icons-material/Filter4";
import Filter3Icon from "@mui/icons-material/Filter3";
import Filter2Icon from "@mui/icons-material/Filter2";
import Filter1Icon from "@mui/icons-material/Filter1";

import "./category.scss";
import { getProductsByCategories } from "../../slice/productSlice";
import Sidebar from "../../components/sidebar/Sidebar";
import {
  createLinearCategory,
  categoryToggle,
} from "../../slice/categorySlice";
import Product from "../../components/product/Product";
import Pagination from '../../components/pagination/Pagination';

function Category() {
  const dispatch = useDispatch();
  const params = useParams();
  const { products, total, perPage, _currentPage, _sort, _brands, brandData } =
    useSelector((store) => store.product);
  const { categories, categoryOpen } = useSelector((store) => store.category);
  const [currentPage, setCurrentPage] = useState(_currentPage);
  const [sort, setSort] = useState(_sort);
  const [brands, setBrands] = useState(_brands);
  const [selectedGrid, setSelectedGrid] = useState(false);
  const currentCategory = [];
  let cids = [];

  // path="/:slug/:cid"
  if (params.cid === "all") {
    cids = [];
  } else {
    function findCategory(categories) {
      if (currentCategory.length > 0) return; // 현재 카테고리 찾으면 종료(* 재귀호출 끝나는 시점)
      for (let cate of categories) {
        if (cate._id === params.cid) {
          currentCategory.push(cate);
          return;
        }
        if (cate.children.length > 0) findCategory(cate.children);
      }
    }
    findCategory(categories);
    // 현재 카테고리부터 자식 카테고리까지 펴준 후 _id만 요소로 가지는 배열 반환
    cids = createLinearCategory(currentCategory).map((cate) => cate._id);
  }

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
  }, [params, brands, perPage, currentPage, sort]);

  const onChangeSort = (e) => {
    setSort(e.target.value);
  }

  const categoryToggleHandler = () => {
    dispatch(categoryToggle()); // 카테고리 토글
  };

  const setSelectedGridTrue = () => {
    if (selectedGrid) setSelectedGrid((prev) => !prev);
  };

  const setSelectedGridFalse = () => {
    if (!selectedGrid) setSelectedGrid((prev) => !prev);
  };

  return (
    <>
      <main className="categories-container">
        <Sidebar
          brandData={brandData}
          brands={brands}
          setBrands={setBrands}
          setCurrentPage={setCurrentPage}
          categoryOpen={categoryOpen}
          categoryToggleHandler={categoryToggleHandler}
        />
        <section className="products-container">
          <div className="filter-wrapper">
            <div className="filter-items">
              <div className="filter-item" onClick={categoryToggleHandler}>
                <FormatAlignLeftIcon className="filter-icon" />
                <span>FILTER</span>
              </div>
              <div className="filter-sort">
                <select onChange={onChangeSort}>
                  <option defaultValue hidden>
                    SORT
                  </option>
                  <option value={"timestamps"}>신상품</option>
                  <option value={"ascending"}>낮은가격</option>
                  <option value={"descending"}>높은가격</option>
                </select>
              </div>
            </div>
            <div className="filter-items">
              <div className="filter-grid" onClick={setSelectedGridFalse}>
                <Filter1Icon className="filter-icon" />
              </div>
              <div className="filter-grid" onClick={setSelectedGridTrue}>
                <Filter2Icon className="filter-icon" />
              </div>
              <div className="filter-grid" onClick={setSelectedGridFalse}>
                <Filter2Icon className="filter-icon" />
              </div>
              <div className="filter-grid" onClick={setSelectedGridTrue}>
                <Filter3Icon className="filter-icon" />
              </div>
              <div className="filter-grid" onClick={setSelectedGridFalse}>
                <Filter3Icon className="filter-icon" />
              </div>
              <div className="filter-grid" onClick={setSelectedGridTrue}>
                <Filter4Icon className="filter-icon" />
              </div>
            </div>
          </div>
          <div className={`products-wrapper ${selectedGrid ? "selected" : ""}`}>
            {products?.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </section>
      </main>
      <Pagination
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}

export default Category;
