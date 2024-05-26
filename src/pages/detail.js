import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BoardDetail = () => {
  const [board, setBoard] = useState({});
  const { boardId } = useParams();

  useEffect(() => {
    // boardId가 정상적으로 받아와졌는지 확인
    console.log('Received boardId:', boardId);

    // 서버에서 데이터 가져오기
    axios.get(`http://localhost:8080/board/boardDetail?boardId=${boardId}`)
      .then(response => {
        console.log(response.data);
        // 데이터를 state에 설정
        setBoard(response.data);
      })
      .catch(error => {
        console.error('Error fetching board detail:', error);
      });
  }, [boardId]); // boardId가 변경될 때마다 useEffect가 실행됨

  // board 객체의 내용을 출력
  return (
    <div>
      gd
      <h1>Detail</h1>
      <p>Title: {board.title}</p>
      <p>Content: {board.content}</p>
      {/* 기타 board 객체의 필드들을 출력 */}
    </div>
  );
};

export default BoardDetail;
