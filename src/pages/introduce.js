import React from 'react'
import '../styles/introduce.css'
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import 증명사진 from '../img/증명사진.jpg';


const introduce = () => {
  return (
    <section className='introduce-sec' style={{margin: '1px auto'}}>
      <div className='introduce-div'>
        <h2>ABOUT ME</h2>
        <div className='profile-inner'>
          <Image src={증명사진} thumbnail style={{width: '200px',left:'300px'}}/>
          <div>
            <ul>
              <li>김준한</li>
              <li>1997.04.25</li>
              <li>경기도 과천시</li>
              <li>k0j4h25@hanmail.net</li>
              <li>강원대학교 (환경공학과) 졸업</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default introduce