import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useAuth } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import '../../styles/common.css';
import '../../styles/board/board.css';

const Board = () => {
  const [boardList, setBoardList] = useState([]);
  const { authInfo } = useAuth();
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
    if (authInfo.token) {
      console.log('글쓰기버튼활성화');
      navigate('/boardCreate');
    } else {
      alert('로그인 후 이용하세요.');
    }
  };

  const redirectToDetail = (boardId) => {
    if(authInfo.token){
      navigate(`/boardDetail/${boardId}`);
    }else{
      alert('회원만 이용이 가능합니다. 가입후 이용해주세요');
    }
  };

  return (
    <div className='common-container'>
      <Button variant="outline-success" onClick={boardCreate} id='board-insert-btn'>
        글쓰기
      </Button>{' '}
      <div className='board-list-div'>
      <Table striped="columns" className="board-tb">
        <thead>
          <tr>
            <th style={{width:'100px'}}>게시글번호</th>
            <th>제목</th>
            <th>작성일</th>
            <th>작성자</th>
          </tr>
        </thead>
        <tbody>
          {boardList.map((board) => (
            <tr key={board.boardId} >
              <td>{board.boardId}</td>
              <td onClick={() => redirectToDetail(board.boardId)}>{board.title} </td>
              <td>{board.regdate}</td>
              <td>{board.writer}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
    </div>
  );
};

export default Board;
