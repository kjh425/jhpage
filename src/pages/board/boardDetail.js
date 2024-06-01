import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../utils/auth';

const BoardDetail = () => {
  const [board, setBoard] = useState({});
  const { boardId } = useParams();
  const { authInfo } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // authInfo가 null일 때는 아무 것도 하지 않음
    if (authInfo === null) {
      return;
    }

    // 로그인 상태 확인 후 로그인되지 않았으면 로그인 페이지로 이동
    if (!authInfo.token) {
      alert('로그인 후 이용하세요.');
      navigate('/signIn');
      return;
    }

    // 서버에서 데이터 가져오기
    axios.get(`http://localhost:8080/board/boardDetail?boardId=${boardId}`, {
      headers: {
        Authorization: `Bearer ${authInfo.token}`
      }
    })
      .then(response => {
        console.log(response.data);
        // 데이터를 state에 설정
        setBoard(response.data);
      })
      .catch(error => {
        console.error('Error fetching board detail:', error);
        if (error.response && error.response.status === 403) {
          alert('접근 권한이 없습니다. 로그인 후 이용하세요.');
          navigate('/signIn');
        }
      });
  }, [boardId, authInfo, navigate]);

  if (authInfo === null) {
    // authInfo가 설정될 때까지 로딩 상태를 표시하거나 null을 반환
    return null;
  }

  // board 객체의 내용을 출력
  return (
    <div>
      <h1>Detail</h1>
      <p>Title: {board.title}</p>
      <p>Content: {board.content}</p>
      {/* 기타 board 객체의 필드들을 출력 */}
    </div>
  );
};

export default BoardDetail;
