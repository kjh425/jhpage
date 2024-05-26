// auth.js

import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [authInfo, setAuthInfo] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setAuthInfo(JSON.parse(storedToken));

      
    }
  }, []); // 처음 마운트 시에만 실행

  const handleLogin = (response) => {
    // response가 존재하고, data 프로퍼티도 존재하는지 확인
    if (response && response.data) {
      setAuthInfo(response.data);
      localStorage.setItem('token', JSON.stringify(response.data));
    } else {
    }
  };

  const handleLogout = () => {
    setAuthInfo(null);
    localStorage.removeItem('token');
  };

  return { authInfo, handleLogin, handleLogout };
};
