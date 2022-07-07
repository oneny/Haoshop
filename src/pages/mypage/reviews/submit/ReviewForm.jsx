import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import { upsertReview } from "../../../../slice/reviewSlice";
import publicURL from "../../../../utils/publicURL";
import "./reviewForm.scss";

function ReviewForm() {
  const dispatch = useDispatch();
  const location = useLocation();
  const review = location.state;
  const user = JSON.parse(sessionStorage.getItem("user"));

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [topSize, setTopSize] = useState("");
  const [bottomSize, setBottomSize] = useState("");
  const [shoesSize, setShoesSize] = useState("");

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const [reviewImgs, setReviewImgs] = useState([]);

  useEffect(() => {
    setHeight(review.bodyInfo?.height || "");
    setWeight(review.bodyInfo?.weight || "");
    setTopSize(review.bodyInfo?.topSize || "");
    setBottomSize(review.bodyInfo?.bottomSize || "");
    setShoesSize(review.bodyInfo?.shoesSize || "");
    setComment(review.comment || "");
    setRating(review.rating || "");
    setReviewImgs(review.reviewImgs || []);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reviewImgs.length === 0) return alert("이미지를 업로드해주세요.");

    const form = new FormData();
    form.append("_id", review._id);
    form.append("order", review.order);
    form.append("product", review.product);
    form.append("purchasedSize", review.purchasedSize);
    form.append("user", user._id);
    form.append("username", user.username);

    form.append("height", height);
    form.append("weight", weight);
    form.append("topSize", topSize);
    form.append("bottomSize", bottomSize);
    form.append("shoesSize", shoesSize);
    form.append("comment", comment);
    form.append("rating", rating);

    for (let img of reviewImgs) {
      form.append("reviewImgs", img);
    }

    dispatch(upsertReview(form));
  };

  const handleReviewImgs = (fileList) => {
    let files = [];
    for (const key in fileList) {
      if (Object.hasOwnProperty.call(fileList, key)) {
        const value = fileList[key];
        files.push(value);
      }
    }
    setReviewImgs(files);
  };

  return (
    <div className="reviewForm">
      <div className="reviewForm-title">
        <h2>리뷰 작성</h2>
      </div>

      <form onSubmit={handleSubmit} className="reviewForm-form">
        <div className="form-item">
          <label htmlFor="height" className="form-item-left">키</label>
          <input
            placeholder="키 입력"
            required
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
        <div className="form-item">
          <label htmlFor="weight" className="form-item-left">몸무게</label>
          <input
            id="weight"
            placeholder="몸무게"
            required
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div className="form-item">
          <label htmlFor="topSize" className="form-item-left">평소 상의 사이즈</label>
          <input
            id="topSize"
            placeholder="상의 사이즈"
            required
            value={topSize}
            onChange={(e) => setTopSize(e.target.value)}
          />
        </div>
        <div className="form-item">
          <label htmlFor="bottomSize" className="form-item-left">평소 하의 사이즈</label>
          <input
            id="bottomSize"
            placeholder="하의 사이즈"
            required
            value={bottomSize}
            onChange={(e) => setBottomSize(e.target.value)}
          />
        </div>
        <div className="form-item">
          <label htmlFor="shoesSize" className="form-item-left">평소 신발 사이즈</label>
          <input
            id="shoesSize"
            placeholder="신발 사이즈"
            required
            value={shoesSize}
            onChange={(e) => setShoesSize(e.target.value)}
          />
        </div>
        <div className="form-item">
          <label htmlFor="rating" className="form-item-left">평점</label>
          <input
            id="rating"
            placeholder="평점"
            required
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>
        <div className="form-item">
          <label htmlFor="comment" className="form-item-left">상품명</label>
          <textarea
            id="comment"
            placeholder="상품평"
            required
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        {reviewImgs &&
          reviewImgs.map((img, i) => (
            <div key={i}>
              <img
                src={
                  img instanceof File
                    ? URL.createObjectURL(img)
                    : publicURL(img)
                }
                alt=""
                height="50"
              />
            </div>
          ))}

        <label htmlFor="file">
          <span>사진 추가</span>
          <input
            type="file"
            id="file"
            multiple
            accept=".png, .jpeg, .jpg"
            style={{ display: "none" }}
            onChange={(e) => handleReviewImgs(e.target.files)}
          />
        </label>

        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default ReviewForm;
