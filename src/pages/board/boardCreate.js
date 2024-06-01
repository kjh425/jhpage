import axios from 'axios';
import React, { useState } from 'react'
import { useAuth } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';

const BoardCreate = () => {
    // const csrfToken = document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*=\s*([^;]*).*$)|^.*$/, "$1");
    const navigate = useNavigate();
    const { authInfo } = useAuth();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault(); // 폼 제출 기본 동작 막기

        if(!authInfo || !authInfo.token){
            alert('로그인이 필요합니다.');
            return;
        }
    
        if (title.trim() === '' || content.trim() === '') {
            console.log('제목과 내용을 모두 입력해주세요.');
            return;
        }
    
        const formData = {
            title,
            content
        };
    
        try {
            const response = await axios.post('/board/boardCreate.do', formData, {
                // withCredentials: true,
                headers: {
                    // 'X-CSRF-TOKEN': csrfToken
                    Authorization: `Bearer ${authInfo.token}`,
                },
            });
            alert(response.data);
            navigate('/board');
        } catch (error) {
            console.error('에러 발생:', error);
        }
    }

  return (
    <form onSubmit={handleSubmit}>
        <div className='boardCreate-frm'>
            <label>제목</label>
            <input type='text'
            value={title}
            onChange={(e)=>{setTitle(e.target.value)}}></input>
            <label>내용</label>
            <textarea
            value={content}
            onChange={(e)=>{setContent(e.target.value)}}></textarea>
        </div>
        <button type='submit'>제출</button>
    </form>
  )
}

export default BoardCreate