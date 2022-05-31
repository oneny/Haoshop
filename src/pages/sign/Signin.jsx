import { useState, callback, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { signin } from '../../slice/authSlice';
import useInput from '../../utils/useInput';

function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");
  const token = localStorage.getItem("token");

  const login = useCallback((e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    dispatch(signin(user));
  }, [email, password]);

  const onClickNavigate = useCallback((page) => () => {
    navigate(page)
  }, [])

  if (token) {
    navigate(-1);
  }

  return (
    <div className="signinForm-container">
      <div className="signinForm-wrapper">
        <form onSubmit={login}>
          <input type="email" placeholder='Email' onChange={onChangeEmail} />
          <input type="password" placeholder='Password' onChange={onChangePassword} />
          <button type="submit">로그인</button>
        </form>
      </div>
      <div className="navigate-wrapper">
        <button onClick={onClickNavigate("/signup")}>회원가입</button>
        <button onClick={onClickNavigate("/signup")}>비밀번호 찾기</button>
      </div>
    </div>
  )
}

export default Signin;