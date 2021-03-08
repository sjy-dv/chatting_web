import React from 'react';
import './bar.css';

class AppBar extends React.Component {
  render() {
    return (
      <>
        <ul className="menu cf">
          <li>
            <a href="">친구 채팅</a>
          </li>
          <li>
            <a href="">친구 찾기</a>
          </li>
          <li>
            <a href="">자유 게시판</a>
          </li>
          <li>
            <a href="">공지 사항</a>
          </li>
        </ul>
      </>
    );
  }
}

export default AppBar;
