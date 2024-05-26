// auth.js
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const [authInfo, setAuthInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
      setAuthInfo({
        token : storedToken,
        user : JSON.parse(storedUser),
      });
    }
  }, []); // 처음 마운트 시에만 실행

  const handleLogin = (response) => {
    // response가 존재하고, data 프로퍼티도 존재하는지 확인
    if (response && response.data) {
      const {token, user} = response.data;
      setAuthInfo({token, user});
      localStorage.setItem('user',JSON.stringify(user));
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      alert('로그인 되었습니다.');
      navigate('/');
      window.location.reload();
    } else {
      alert('로그인에 실패하였습니다.')
    }
  };

  const handleLogout = () => {
    setAuthInfo(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
  };

  return { authInfo, handleLogin, handleLogout };
};
