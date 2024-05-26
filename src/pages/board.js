import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useAuth } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const Board = () => {
  const [boardList, setBoardList] = useState([]);
  const { authInfo: storedToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBoardList = async () => {
      try {
        const response = await axios.get('/board');
        setBoardList(response.data);
      } catch (error) {
        console.error('Error fetching board list:', error);
      }
    };

    fetchBoardList();
  }, []);

  const boardCreate = () => {
    if (storedToken) {
      console.log('글쓰기버튼활성화');
      navigate('/boardCreate');
    } else {
      alert('로그인 후 이용하세요.');
    }
  };

  const redirectToDetail = (boardId) => {
    axios.get(`/board/boardDetail?boardId=${boardId}`)
    .then(response => {
    navigate(`/boardDetail?boardId=${boardId}`);
    console.log(response.data);
    console.log('여기서 오류여');
    })
    .catch(error => {
    console.error('Error fetching board detail:', error);
    });
  };

  return (
    <div>
      <Button variant="outline-success" onClick={boardCreate}>
        글쓰기
      </Button>{' '}
      <Table striped="columns" className="board-tb">
        <thead>
          <tr>
            <th>#</th>
            <th>제목</th>
            <th>작성일</th>
            <th>작성자</th>
          </tr>
        </thead>
        <tbody>
          {boardList.map((board) => (
            <tr key={board.boardId} onClick={() => redirectToDetail(board.boardId)}>
              <td>{board.boardId}</td>
              <td>{board.title}</td>
              <td>{board.regdate}</td>
              <td>{board.writer}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Board;
