import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import MypageItem from "../../components/mypage/MypageItem";
import MypageLayout from "../../components/mypage/MypageLayout";
import useInput from "../../hooks/useInput";
import { clearMatchResult, matchPassword } from "../../slice/authSlice";
import { clearError } from "../../slice/authSlice";
import "./checkUser.scss";

function CheckUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { matchResult, error} = useSelector((store) => store.auth);
  const { email, username } = useSelector((store) => store.user.user);
  const [password, onChangePassword] = useInput("");

  const checkPassword = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    dispatch(matchPassword(user));
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearError());
      dispatch(clearMatchResult());
    }
  }, [error]);

  useEffect(() => {
    if (matchResult === "true") {
      navigate("/modify");
      dispatch(clearMatchResult());
    }
  }, [matchResult]);

  return (
    <MypageLayout>
      <MypageItem title={"비밀번호 확인"}>
        <div className="checkUser">
          <div className="checkUser-alert">
            <p>
              {username} 님의 회원정보를 안전하게 보호하기 위해 <br />
              비밀번호를 한번 더 확인해 주세요.
            </p>
          </div>
          <form onSubmit={checkPassword} className="checkUser-form">
            <div className="checkUser-form-input">
              <label htmlFor="password">비밀번호</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                onChange={onChangePassword}
              />
            </div>
            <button className="checkUser-form-btn" type="submit">
              확인
            </button>
          </form>
        </div>
      </MypageItem>
    </MypageLayout>
  );
}

export default CheckUser;
