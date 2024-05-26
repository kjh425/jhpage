import './App.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import 배너 from './img/배너.jpg';
import 배너2 from './img/배너2.jpg'
import 배너3 from './img/배너3.jpg'
//페이지 임포트
import Introduce from './pages/introduce';
import Board from './pages/board';
import Roadmap from './pages/roadmap';
import Madmovie from './pages/madmovie';
import SignIn from './pages/signIn';
import SignUp from './pages/signUp';
import BoardCreate from './pages/boardCreate';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './utils/auth';
import BoardDetail from './pages/detail';

function App() {
  const { authInfo, handleLogin, handleLogout} = useAuth();


  // 스프링하고 연동 테스트
  const [message, setMessage] = useState([]);
  useEffect(() => {


    fetch("/hello")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setMessage(data);
      });
    }, []);

    return (
    <div className='App'>
      <ul>
    {message.map((v, idx) => (
      <li key={`${idx}-${v}`}>{v}</li>
    ))}
    </ul>

    {/* 네브바 */}
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Kimjunhan</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/board">게시판</Nav.Link>
            <NavDropdown title="나의소개" id="basic-nav-dropdown">
              <NavDropdown.Item href="/introduce">소개페이지</NavDropdown.Item>
              <NavDropdown.Item href="/madmovie">장례식장 매드무비</NavDropdown.Item>
              <NavDropdown.Item href="/roadmap">로드맵(나의 성장일기)</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="https://www.notion.so/s-942431e2ef5c4f1fbdc106a401bbfb62">
                김준한의 노션
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <div style={{ display: 'flex', justifyContent: 'space-between',marginRight : '130px' }}>
          {/* 로그인 상태인 경우에는 버튼을 숨김 */}
          {!authInfo && (
            <div style={{marginRight:'8px'}}>
              <Button variant="outline-primary" href="/signIn">로그인</Button>{' '}
            </div>
          )}
          {/* 로그인 상태인 경우에는 버튼을 숨김 */}
          {!authInfo && (
            <div>
              <Button variant="outline-success" href='/signUp'>회원가입</Button>{' '}
            </div>
          )}
          {/* authInfo가 존재하면서 authInfo.user도 존재하는 경우에는 환영 메시지를 출력 */}
          {authInfo && authInfo.user && (
            <div style={{display:'flex'}}>
              <div>{`${authInfo.user.username}님 환영합니다!`}</div>
              {/* 여기에 필요한 추가 정보를 표시할 수 있습니다. */}<Button variant="outline-warning" onClick={handleLogout}>로그아웃</Button>{' '}
            </div>
          )}
        </div>
    </Navbar>

    {/* 네브바 빼고 페이지 나누는 코드 */}
    <Routes>
      <Route path="/" element={
        <Carousel fade interval={10000}>
        <Carousel.Item>
          <Image src={배너}  text="First slide"  style={{width:'1980px',height:'400px'}}/>
          <Carousel.Caption>
            <h3>어서오세요!</h3>
            <p>준한이의 페이지에 오신것을 환영합니다.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image src={배너2} text="Second slide"  style={{width:'1980px',height:'400px'}}/>
          <Carousel.Caption>
            <h3>소개합니다!</h3>
            <p>이곳에선 저의 소개를 볼 수 있고, 다양한 즐길거리 등 여러 기능을 구현해놓았습니다.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image src={배너3} text="Third slide"   style={{width:'1980px',height:'400px'}}/>
          <Carousel.Caption>
            <h3 style={{color:'black'}}>감사합니다!</h3>
            <p style={{color:'black'}}>
              재밌게 즐겨주세요! 관심과 게시판에 댓글남겨주시면 제게 큰 힘이됩니다.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      }
      ></Route>
      <Route path='/board' element={<Board/>}></Route>
      <Route path='/introduce' element={<Introduce/>}></Route>
      <Route path='/madmovie' element={<Madmovie/>}></Route>
      <Route path='/roadmap' element={<Roadmap/>}></Route>
      <Route path='/signIn' element={<SignIn/>}></Route>
      <Route path='/signUp' element={<SignUp/>}></Route>
      <Route path='/boardCreate' element={<BoardCreate/>}></Route>
      <Route path='/boardDetail/:boardId' element={<BoardDetail/>}></Route>
    </Routes>
    </div>
  );
}

export default App;