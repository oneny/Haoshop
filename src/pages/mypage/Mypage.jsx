import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "../../components/pagination/Pagination";
import { getOrders } from "../../slice/userSlice";
import publicURL from "../../utils/publicURL";

import "./mypage.scss";
import { getUser } from "../../slice/userSlice";

function Mypage() {
  const dispatch = useDispatch();
  const { user, addresses, total, orders } = useSelector((store) => store.user);
  const perPage = 20;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const payload = { perPage, currentPage };
    dispatch(getOrders(payload));
  }, [perPage, currentPage]);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  console.log(orders, total);
  console.log({ user, addresses });

  return (
    <div className="mypage">
      <div className="mypage-wrapper">
        <div className="mypage-user">
          <div className="mypage-user-top">
            <div className="user-name"></div>
            <div className="user-"></div>
          </div>
          <div className="mypage-user-bottom"></div>
        </div>
        <div className="mypage-orders"></div>
      </div>
    </div>
  );
}

export default Mypage;
