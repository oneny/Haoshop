import React, { useEffect } from "react";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import publicURL from "../../../utils/publicURL";
import "./scrollable.scss";

function getShuffle(brands) {
  const shuffleBrands = [];
  for (let i = 0; i < 3; i++) {
    const shuffle = [];
    for (let j = 0; j < 2; j++) {
      shuffle.push(
        brands.splice(Math.floor(Math.random() * brands.length), 1)[0]
      );
    }
    shuffleBrands.push(shuffle);
  }
  return shuffleBrands;
}

function Scrollable() {
  const brands = useSelector((store) => store.brand.brands);
  const candidate = Array(34)
    .fill()
    .map((e, i) => i);
  const shuffleBrands = useMemo(() => getShuffle(candidate), []);

  let images = [...document.querySelectorAll(".scrollable-img")];

  useEffect(() => {
    for (let i = 0; i < images.length; i++) {
      let { top } = images[i].getBoundingClientRect();
      if (i % 2 === 0) images[i].style.transform = `rotate(${top * 0.02}deg)`;
      else images[i].style.transform = `rotate(${top * 0.02 * -1}deg)`;
    }
  }, [images]);

  return (
    <div className="scrollable">
      <div className="stickyText">
        <div className="stickyText-brands">Brands</div>
      </div>

      {shuffleBrands?.map((shuffleBrands, i) => (
        <section key={i}>
          <div className="scrollable-imgWrapper">
            {shuffleBrands?.map((v, i) => (
              <img
                className="scrollable-img"
                src={publicURL(brands[v]?.banners[0]?.img)}
                alt=""
                loading="lazy"
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default Scrollable;
