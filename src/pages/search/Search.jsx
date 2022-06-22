import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import "./search.scss";
import Pagination from "../../components/pagination/Pagination";
import ProductList from "../../components/product/ProductList";
import { getProductsByKeyword } from "../../slice/productSlice";

function Search() {
  const dispatch = useDispatch();
  const params = useParams();
  const keyword = params.keyword;
  const { products, total, perPage, _currentPage, _sort } = useSelector(
    (store) => store.product
  );
  const [sort, setSort] = useState(_sort);
  const [currentPage, setCurrentPage] = useState(_currentPage);

  useEffect(() => {
    const payload = {
      keyword,
      perPage,
      currentPage,
      sort,
    };
    dispatch(getProductsByKeyword(payload));
  }, [params, keyword, perPage, currentPage, sort]);

  return (
    <div className="searchResult">
      <div className="searchResult-wrapper">
        <div className="searchResult-wrapper-info">
          <div className="keyword">{keyword}</div>
          <div className="length">검색결과 {total} 개</div>
        </div>
        <ProductList setSort={setSort} products={products} />
      </div>
      <Pagination
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default Search;
