import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./collections.scss";
import { getCollections } from "../../slice/collectionSlice";
import publicURL from "../../utils/publicURL";

function Collections() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mainCollections, collections } = useSelector(
    (store) => store.collection
  );

  useEffect(() => {
    dispatch(getCollections());
  }, []);

  return (
    <div className="collections">
      <div className="collections-main">
        {mainCollections?.map((collection) => (
          <div
            className="collections-main-items"
            key={collection._id}
            onClick={() => navigate(`/collections/${collection._id}`)}
          >
            <div className="imgWrapper">
              <img src={publicURL(collection.banners[0].img)} alt="" />
            </div>
            <div className="collectionsName">
              {collection.name.split("\n").map((line, i) => (
                <div key={i}>
                  <b>{line}</b>
                  <br />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="collections-sub">
        {collections?.map((collection) => (
          <div
            className="collections-sub-items"
            key={collection._id}
            onClick={() => navigate(`/collections/${collection._id}`)}
          >
            <div className="imgWrapper">
              <img
                src={publicURL(collection.banners[0].img)}
                alt=""
              />
            </div>
            <div className="collectionsName">
              {collection.name.split("\n").map((line, i) => (
                <p key={i}>
                  <b>{line}</b>
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Collections;
