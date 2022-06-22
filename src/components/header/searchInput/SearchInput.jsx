import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

import "./searchInput.scss";
import useInput from "../../../hooks/useInput";

function SearchInput({ setSearchOpen }) {
  const navigate = useNavigate();
  const [keyword, onChangeKeyword] = useInput("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/search");
    }
  };

  return (
    <div className="search">
      <div className="search-wrapper">
        <form className="search-wrapper-form" onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Search from items ..."
            onChange={onChangeKeyword}
          />
        </form>
        <div className="search-wrapper-close">
          <CloseIcon
            className="closeIcon"
            onClick={() => setSearchOpen(false)}
          />
        </div>
      </div>
    </div>
  );
}

export default SearchInput;
