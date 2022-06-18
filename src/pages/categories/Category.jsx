import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import "./category.scss";
import { getProductsByCategories } from "../../slice/productSlice";
import Sidebar from "../../components/sidebar/Sidebar";
import { createLinearCategory, categoryToggle } from "../../slice/categorySlice";
import Pagination from '../../components/pagination/Pagination';
import ProductList from "../../components/product/ProductList";

function Category() {
  const dispatch = useDispatch();
  const params = useParams();
  const { products, total, perPage, _currentPage, _brands, _sort, brandData } =
    useSelector((store) => store.product);
  const { categories, categoryOpen } = useSelector((store) => store.category);
  const [currentPage, setCurrentPage] = useState(_currentPage);
  const [sort, setSort] = useState(_sort);
  const [brands, setBrands] = useState(_brands);
  const haveFilter = true;
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
  }, [params, brands, perPage, currentPage]);

  const categoryToggleHandler = () => {
    dispatch(categoryToggle()); // 카테고리 토글
  };

  return (
    <>
      <main className="category-container">
        <Sidebar
          brandData={brandData}
          brands={brands}
          setBrands={setBrands}
          setCurrentPage={setCurrentPage}
          categoryOpen={categoryOpen}
          categoryToggleHandler={categoryToggleHandler}
        />
        <ProductList
          haveFilter={haveFilter}
          setSort={setSort}
          products={products}
          categoryToggleHandler={categoryToggleHandler}
        />
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
