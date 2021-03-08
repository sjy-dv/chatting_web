import React from 'react';
import './sign.css';
import axios from 'axios';

class Sign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginid: '',
      loginpw: '',
      signid: '',
      signpw: '',
      signpw2: '',
      signemail: '',
      signhp: '',
      idcheck: false,
      checkcode: '',
      authcode: '',
      hpcheck: false,
    };
  }

  TextChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };

  login = async (e) => {
    e.preventDefault();
    await axios
      .post('http://localhost:8081/api/member/signin', {
        id: this.state.loginid,
        password: this.state.loginpw,
      })
      .then((res) => {
        window.sessionStorage.setItem('id', id);
        window.localStorage.setItem('x_auth', res.data);
        window.location.reload();
      })
      .catch((err) => {
        alert('계정정보가 일치하지 않습니다.');
        console.log(err);
      });
  };

  signup = async (e) => {
    e.preventDefault();
    if (this.state.signpw !== this.state.signpw2) {
      alert('비밀번호를 확인해주세요.');
      return false;
    }
    if (this.state.idcheck === false) {
      alert('아이디 중복체크를 해주세요.');
      return false;
    }
    if (!this.state.hpcheck) {
      alert('휴대폰 인증을 해주세요.');
      return false;
    }
    await axios
      .post('http://localhost:8081/api/member/signup', {
        id: this.state.signid,
        password: this.state.signpw,
        email: this.state.signemail,
        hp: this.state.signhp,
      })
      .then((res) => {
        if (res.data.result === true) {
          alert('회원가입에 성공하였습니다.');
          window.location.reload();
        } else {
          alert('회원가입 절차를 다시 확인해주세요.');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  overlap = async (e) => {
    e.preventDefault();
    await axios
      .post('http://localhost:8081/api/member/overlap', {
        id: this.state.signid,
      })
      .then((res) => {
        console.log(res.data.result);
        if (res.data.result === true) {
          alert('사용가능한 아이디입니다.');
          this.setState({
            idcheck: true,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  hp_check = async (e) => {
    e.preventDefault();
    await axios
      .post('http://localhost:8081/api/member/hpcheck', {
        hp: this.state.signhp,
      })
      .then((res) => {
        console.log(res.data);
        console.log(res);
        this.setState({
          authcode: res.data,
        });
      })
      .catch((err) => console.log(err));
  };

  certi = () => {
    console.log(this.state.authcode, this.state.checkcode);
    if (this.state.authcode === Number(this.state.checkcode)) {
      alert('휴대폰 인증이 완료되었습니다.');
      this.setState({
        hpcheck: true,
      });
    } else {
      alert('인증번호가 틀렸습니다.');
      return false;
    }
  };

  render() {
    return (
      <>
        <div className="login-wrap">
          <div className="login-html">
            <input id="tab-1" type="radio" name="tab" className="sign-in" />
            <label htmlFor="tab-1" className="tab">
              Sign In
            </label>
            <input id="tab-2" type="radio" name="tab" className="sign-up" />
            <label htmlFor="tab-2" className="tab">
              Sign Up
            </label>
            <div className="login-form">
              <div className="sign-in-htm">
                <div className="group">
                  <label htmlFor="user" className="label">
                    Username
                  </label>
                  <input
                    id="user"
                    name="loginid"
                    value={this.state.loginid}
                    type="text"
                    className="input"
                    onChange={this.TextChange}
                  />
                </div>
                <div className="group">
                  <label htmlFor="pass" className="label">
                    Password
                  </label>
                  <input
                    id="pass"
                    type="password"
                    name="loginpw"
                    value={this.state.loginpw}
                    className="input"
                    data-type="password"
                    onChange={this.TextChange}
                  />
                </div>
                <div className="group">
                  <input id="check" type="checkbox" className="check" />
                  <label htmlFor="check">
                    <span className="icon"></span> Keep me Signed in
                  </label>
                </div>
                <div className="group">
                  <input
                    type="submit"
                    className="button"
                    onClick={this.login}
                    value="Sign In"
                  />
                </div>
                <div className="hr"></div>
                <div className="foot-lnk">
                  <a href="#forgot">forgot Password?</a>
                </div>
              </div>
              <div className="sign-up-htm">
                <div className="group">
                  <label htmlFor="user" className="label">
                    Username
                  </label>
                  <input
                    id="user"
                    type="text"
                    name="signid"
                    value={this.state.signid}
                    className="input"
                    onChange={this.TextChange}
                    required
                  />
                </div>
                <div className="group">
                  <button className="btn btn-primary" onClick={this.overlap}>
                    아이디 중복체크
                  </button>
                </div>
                <div className="group">
                  <label htmlFor="pass" className="label">
                    Password
                  </label>
                  <input
                    id="pass"
                    type="password"
                    className="input"
                    name="signpw"
                    value={this.state.signpw}
                    data-type="password"
                    onChange={this.TextChange}
                    required
                  />
                </div>
                <div className="group">
                  <label htmlFor="pass" className="label">
                    Repeat Password
                  </label>
                  <input
                    id="pass"
                    type="password"
                    className="input"
                    name="signpw2"
                    value={this.state.signpw2}
                    data-type="password"
                    onChange={this.TextChange}
                    required
                  />
                </div>
                <div className="group">
                  <label htmlFor="pass" className="label">
                    Email Address
                  </label>
                  <input
                    id="pass"
                    type="text"
                    name="signemail"
                    value={this.state.signemail}
                    className="input"
                    onChange={this.TextChange}
                    required
                  />
                </div>
                <div className="group">
                  <label htmlFor="pass" className="label">
                    HP Number
                  </label>
                  <input
                    id="pass"
                    type="text"
                    name="signhp"
                    value={this.state.signhp}
                    className="input"
                    onChange={this.TextChange}
                    required
                  />
                </div>
                <div className="group">
                  <button className="btn btn-primary" onClick={this.hp_check}>
                    휴대폰 인증
                  </button>
                </div>
                <div className="group">
                  <input
                    id="pass"
                    type="text"
                    name="checkcode"
                    value={this.state.checkcode}
                    className="input"
                    onChange={this.TextChange}
                    required
                  />
                </div>
                <div className="group">
                  <button className="btn btn-primary" onClick={this.certi}>
                    인증하기
                  </button>
                </div>
                <div className="group">
                  <input
                    type="submit"
                    className="button"
                    onClick={this.signup}
                    value="Sign Up"
                  />
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
        </div>
      </>
    );
  }
}

export default Sign;
