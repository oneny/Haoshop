import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import "./brand.scss";
import ProductList from "../../components/product/ProductList";
import { getBrand } from "../../slice/brandSlice";
import { getProductsByBrand } from "../../slice/productSlice";
import publicURL from "../../utils/publicURL";
import Pagination from "../../components/pagination/Pagination";

function Brand() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { brand } = useSelector((store) => store.brand);
  const { products, total, perPage, _currentPage, _sort } = useSelector(
    (store) => store.product
  );
  const [sort, setSort] = useState(_sort);
  const [currentPage, setCurrentPage] = useState(_currentPage);

  useEffect(() => {
    dispatch(getBrand(params.name));
  }, [params]);

  useEffect(() => {
    const payload = {
      brand: params.name,
      perPage,
      currentPage,
      sort,
    };
    dispatch(getProductsByBrand(payload));
  }, [params, perPage, currentPage, sort]);

  console.log({ brand, products });

  return (
    <>
      <div className="brands-container">
        <div className="brands-wrapper">
          {brand?.banners && (
            <div className="img-wrapper">
              <div className="brands-img">
                <img src={publicURL(brand?.banners[0].img)} alt="" />
              </div>
            </div>
          )}
          <div className="brands-info">
            <h3>{brand?.name}</h3>
            <p>{brand?.description}</p>
            <p className="navi">컬렉션 보러가기</p>
          </div>

          <ProductList setSort={setSort} products={products} />
        </div>
      </div>
      <Pagination
        total={total}
        perPage={perPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </>
  );
}

export default Brand;
