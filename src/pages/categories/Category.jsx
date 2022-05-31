import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import FilterListIcon from "@mui/icons-material/FilterList";

import "./category.scss";
import publicURL from "../../utils/publicURL";
import { getProductsByCategories } from "../../slice/productSlice";
import Sidebar from "../../components/sidebar/Sidebar";
import {
  createLinearCategory,
  categoryToggle,
  categoryClose,
} from "../../slice/categorySlice";
import useInput from "../../utils/useInput";

function Category() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { products, total, perPage, _currentPage, _sort, _brands, brandData } =
    useSelector((store) => store.product);
  const { categories, categoryOpen } = useSelector((store) => store.category);
  const [currentPage, setCurrentPage] = useState(_currentPage);
  const [sort, onChangeSort] = useInput(_sort);
  const [brands, setBrands] = useState(_brands);
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
    const payload = { // 상품 목록을 요청할 데이터
      cids,
      brands, // 사용자가 선택한 브랜드
      perPage, // 한 페이지당 상품 개수
      currentPage, // 현재 페이지
      sort, // 상품 정렬
    };
    dispatch(getProductsByCategories(payload));
  }, [params, brands, perPage, currentPage, sort]);

  const onClickNavigate = useCallback(
    (page) => () => {
      navigate(page);
    },
    []
  );

  const categoryToggleHandler = () => {
    dispatch(categoryToggle()); // 카테고리 토글
  };

  return (
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
          <div className="filter-item" onClick={categoryToggleHandler}>
            <FilterListIcon className="filter-icon" />
            <span>FILTER</span>
          </div>
          <div className="sort-item">
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
        <div className="products-wrapper">
          {products?.map((product) => (
            <div
              className="products-items"
              key={product._id}
              onClick={onClickNavigate(`/products/${product._id}`)}
            >
              <img src={publicURL(product.productImgs[0].fileName)} alt="" />
              <p>{product.name}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Category;
