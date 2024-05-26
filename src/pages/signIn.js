import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../utils/auth';

const SignIn = () => {
  const [memberId, setMemberId] = useState('');
  const [password, setPassword] = useState('');
  const { authInfo, handleLogin } = useAuth();


  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/member/signIn', {
        memberId: memberId,
        password: password,
      });

      // 로그인 처리를 auth.js로 이동
      handleLogin(response);
    } catch (error) {
      // 로그인 실패 시 처리
      console.error('로그인 실패:', error.response.data ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSignIn}>
        <label>Username:</label>
        <input type="text" value={memberId} onChange={(e) => setMemberId(e.target.value)} />

        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type="submit">Login</button>
      </form>

      {/* 토큰 및 사용자 정보가 존재하면 환영 메시지 표시 */}
      {authInfo && authInfo.user && (
        <div>
          <p>{`로그인한 ${authInfo.user.username} 환영합니다!`}</p>
          <p>{`이메일: ${authInfo.user.email}`}</p>
          {/* 여기에 토큰을 활용한 다른 정보를 표시할 수 있습니다. */}
        </div>
      )}
    </div>
  );
};

export default SignIn;
