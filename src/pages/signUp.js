import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import '../styles/signUp.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faKey, faTicket, faSignature, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const csrfToken = document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*=\s*([^;]*).*$)|^.*$/, "$1");
  const [memberId, setMemberId] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [name, setName] = useState('');
  const [nick, setNick] = useState('');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [inputCode, setInputCode] = useState('');
  const [compareCodeResult, setCompareCodeResult] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (memberId && password && password2 && name && nick && email && inputCode && compareCodeResult === '인증번호가 일치합니다.') {
        try {
            const formData = {
                memberId,
                password,
                name,
                nick,
                email,
            };
  
            const response = await axios.post('http://localhost:8080/member/signUp.do', formData, {
              withCredentials: true,
              headers: {
                'X-CSRF-TOKEN': csrfToken
              }
            });
            console.log('서버 응답:', response.data);
            
            // 서버 응답이 성공적인지 확인
            if (response.status === 200) {
                alert(response.data);
                navigate('/');
            }
        } catch (error) {
            console.error('서버 오류:', error);
        }
    } else {
        console.log('폼 제출 조건을 충족하지 못했습니다.');
    }
  };
  


const compareCode = () => {
  const trimmedInputCode = inputCode.trim();
  
  // verificationCode가 문자열이 아닌 경우에 대한 처리
  const trimmedVerificationCode = typeof verificationCode === 'string'
  ? verificationCode.trim()
      : verificationCode.toString().trim();

      console.log('inputCode:', trimmedInputCode);
    console.log('verificationCode:', trimmedVerificationCode);

    if (trimmedInputCode === trimmedVerificationCode) {
      console.log('인증번호 일치!');
      // 코드 일치에 대한 동작 수행
      setCompareCodeResult('인증번호가 일치합니다.');
    } else {
      console.log('인증번호 불일치');
      // 코드 불일치에 대한 동작 수행
      setCompareCodeResult('인증번호가 일치하지않습니다.');
    }
  };
  const handleSendEmail = async () => {
    try {
      // await 키워드를 사용하여 sendEmail 함수의 비동기 작업이 완료될 때까지 기다립니다.
      const response = await sendEmail(email);
      console.log('아니여긴 된다니까?');
      console.log(response);
  
      // 서버에서 받은 응답이 성공적인지 확인
      if (response && response.status === 200 && response.data) {
        console.log(response.data);
        // 서버에서 받은 인증 코드를 state에 저장
        setVerificationCode(response.data);
      } else {
        console.error('서버 응답에 오류가 있습니다.');
      }
    } catch (error) {
      console.error('에러 발생2:', error);
    }
  };
  
  
  const sendEmail = async (email) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/member/sendCode.do',
        null,
        {
          params: { email },
          withCredentials: true,
          headers: {
            'X-CSRF-TOKEN': csrfToken
          }
        }
      );
      console.log('받아오냐', typeof(response));
      console.log(response.data);
      setVerificationCode(response.data);
    } catch (error) {
      console.error('에러 발생1:', error);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // 비밀번호가 변경될 때마다 비밀번호 일치 여부를 확인
    if (e.target.value !== password2) {
      setPasswordMatchError('비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordMatchError('');
    }
  };

  const handlePassword2Change = (e) => {
    setPassword2(e.target.value);
    // 비밀번호 확인이 변경될 때마다 비밀번호 일치 여부를 확인
    if (password !== e.target.value) {
      setPasswordMatchError('비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordMatchError('');
    }
  };

  return (
    <div className="container">
      <div className='inner'>
        <div className='content'>
          <form onSubmit={handleSubmit}>
            <div className='form-content'>
              <div className='form-list'>
                <h1>회원가입</h1>
                <div className='form-id'>
                  <div className='id-icon'><FontAwesomeIcon icon={faUser} /></div>
                  <div className='id'>
                    <input type='text' placeholder='아이디' className='input-id'
                      value={memberId}
                      onChange={(e) => { setMemberId(e.target.value) }}></input>
                  </div>
                </div>
                <div className='form-pw'>
                  <div className='pw-icon'><FontAwesomeIcon icon={faLock} /></div>
                  <div className='pw'>
                    <input type='password' placeholder='비밀번호' className='input-pw'
                      value={password}
                      onChange={handlePasswordChange}></input>
                  </div>
                </div>
                <div className='form-pw2'>
                  <div className='pw-icon'><FontAwesomeIcon icon={faKey} /></div>
                  <div className='pw'>
                    <input type='password' placeholder='비밀번호 확인' className='input-pw2'
                      value={password2}
                      onChange={handlePassword2Change}></input>
                  </div>
                </div>
              </div>
              {passwordMatchError && <p style={{ color: 'red' }}>{passwordMatchError}</p>}

              <div className='form-list2'>
                <div className='form-name'>
                  <div className='name-icon'><FontAwesomeIcon icon={faSignature} /></div>
                  <div className='id'>
                    <input type='text' placeholder='이름' className='input-name'
                      value={name}
                      onChange={(e) => { setName(e.target.value) }}></input>
                  </div>
                </div>
                <div className='form-nick'>
                  <div className='nick-icon'><FontAwesomeIcon icon={faTicket} /></div>
                  <div className='nick'>
                    <input type='text' placeholder='닉네임' className='input-nick'
                      value={nick}
                      onChange={(e) => { setNick(e.target.value) }}></input>
                  </div>
                </div>
                <div className='form-email'>
                  <div className='email-icon'><FontAwesomeIcon icon={faEnvelope} /></div>
                  <div className='email'>
                    <input type='email' placeholder='이메일@naver.com' className='input-email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}></input>
                    <Button variant="outline-secondary" style={{ marginTop: "-4px" }} onClick={handleSendEmail}>인증번호전송</Button>{' '}
                  </div>
                </div>
                <div className='form-code'>
                  <div className='code'>
                    <input type='text' placeholder='인증코드를 입력하세요' className='input-code'
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}></input>
                    <div className='code-icon'><Button variant="outline-secondary" onClick={compareCode}>인증번호확인</Button>{' '}</div>
                  </div>
                </div>
              </div>
              <h2>{compareCodeResult}</h2>
            </div>
            <Button variant="success" className='frm-btn' type='submit'>가입</Button>{' '}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
