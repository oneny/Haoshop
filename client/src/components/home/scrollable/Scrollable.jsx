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
  const candidate = Array(brands.length)
    .fill()
    .map((e, i) => i);
  const shuffleBrands = useMemo(() => getShuffle(candidate), []);
  console.log(shuffleBrands);

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
              />
            ))}
          </div>
        </section>
      ))}

      {/* {shuffleBrands?.map((shuffleBrand, i) => (
        <section key={i}>
          {shuffleBrand[0].name}
        </section>
      ))} */}

      {/* {brands && (
        <>
          <section>
            <div className="scrollable-imgWrapper">
              <img
                className="scrollable-img"
                src={publicURL(brands[numbers[0]]?.banners[0]?.img)}
                alt=""
              />

              <img
                className="scrollable-img"
                src={publicURL(brands[numbers[1]]?.banners[0]?.img)}
                alt=""
              />
            </div>
          </section>
          <section>
            <div className="scrollable-imgWrapper">
              <img
                className="scrollable-img"
                src={publicURL(brands[numbers[2]]?.banners[0]?.img)}
                alt=""
              />

              <img
                className="scrollable-img"
                src={publicURL(brands[numbers[3]]?.banners[0]?.img)}
                alt=""
              />
            </div>
          </section>
          <section>
            <div className="scrollable-imgWrapper">
              <img
                className="scrollable-img"
                src={publicURL(brands[numbers[4]]?.banners[0]?.img)}
                alt=""
              />

              <img
                className="scrollable-img"
                src={publicURL(brands[numbers[5]]?.banners[0]?.img)}
                alt=""
              />
            </div>
          </section>
        </>
      )} */}
    </div>
  );
}

export default Scrollable;
