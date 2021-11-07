import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import emailjs from "emailjs-com";

import styles from "./css/JoinTest.module.css";
import { Redirect, Link } from "react-router-dom";
import { FcConferenceCall } from "react-icons/fc";

export default function JoinTest() {
  const [user, setUser] = useState({});
  const [getData, setGetData] = useState([]);
  const [Message, setMessage] = useState({ text: "", color: "" });
  const [emailCheckMessage, setEmailCheckMessage] = useState({
    text: "",
    color: "",
  });
  const [nicknameMessage, setNicknameMessage] = useState({
    text: "",
    color: "",
  });
  const [passwordMessage, setPasswordMessage] = useState({
    text: "",
    color: "",
  });
  const [passwordCheckMessage, setPasswordCheckMessage] = useState({
    text: "",
    color: "",
  });
  const [nameMessage, setNameMessage] = useState({ text: "", color: "" });
  const [joinCheck, setJoinCheck] = useState(false);
  const [emailCheck, setEmailCheck] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(false);
  const [code, setCode] = useState();
  const [mobile, setMobile] = useState();
  const [mobileMessage, setMobileMessage] = useState({text:"", color:""});
  const form = useRef();

  //렌더링 시 기존 유저들의 정보를 가져온다
  useEffect(() => {
    callData();
  }, []);

  //인증코드로 쓸 난수 만들기
  let number = Math.floor(Math.random() * 1000000) + 100000;
  if (number > 1000000) {
    number = number - 100000;
  }

  //이메일 인증을 위한 이메일 전송함수
  const sendEmail = (e) => {
    e.preventDefault();
    console.log(user);
    emailjs
      .sendForm(
        "service_zp5wixb",
        "template_wj0meve",
        form.current,
        "user_CZUyNQVhhips0xLr00lBc"
      )
      .then(
        (result) => {
          alert("인증코드를 전송하였습니다.");
          console.log(result.text);
          setCode(String(number));
        },
        (error) => {
          console.log(error.text);
          alert("전송에 실패했습니다.");
        }
      );
  };

  //유저 정보를 가져와 스테이트에 값을 넣어주는 함수
  function callData() {
    const url = "http://localhost:8081/user";
    axios
      .get(url)
      .then(function (response) {
        console.log("성공");
        console.log(response.data);
        setGetData(response.data);
      })
      .catch(function (error) {
        console.log("실패");
      });
  }

  //post 데이터 전송
  function onSubmit(e) {
    e.preventDefault();
    console.log("onSubmit 실행");
    console.log(user);
    console.log(getData);
    axios
      .post("http://localhost:8081/user", user)
      .then(function (response) {
        console.log("성공");
        setJoinCheck(true);
      })
      .catch(function (error) {
        console.log("실패");
      });
  }

  //입력창에 텍스트 입력시 스테이트 갱신
  function onChange(e) {
    const name = e.target.name;
    if (name === "email") {
      setUser({ ...user, userEmail: e.target.value });
    } else if (name === "emailCheck") {
      if (code === e.target.value) {
        setEmailCheck(true);
      } else {
        setEmailCheck(false);
      }
    } else if (name === "nickname") {
      setUser({ ...user, userNickname: e.target.value });
    } else if (name === "password") {
      setUser({ ...user, userPassword: e.target.value });
    } else if (name === "name") {
      setUser({ ...user, userName: e.target.value });
    } else if (name === "phonNo"){
      setMobile({...user, userMobile: e.target.value});
    }
    console.log(`${e.target.name} : ${e.target.value}`);
  }

  //Message 표시 함수
  function MessageSet(e) {
    let checked = false;
    if (e.target.name === "email") {
      for (var i = 0; i < getData.length; i++) {
        if (user.userEmail === getData[i].userEmail) {
          checked = true;
          break;
        }
      }
      const regExp =
        /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
      if (regExp.test(user.userEmail)) {
        if (checked) {
          setMessage({ text: "이미 가입된 이메일입니다.", color: "red" });
        } else {
          setMessage({ text: "가입가능한 이메일입니다", color: "#3CB371" });
          console.log(user.userEmail);
        }
      } else {
        if (user.userEmail === "") {
          setMessage({ text: "필수 정보입니다..", color: "red" });
        } else {
          setMessage({ text: "잘못된 이메일 형식입니다.", color: "red" });
        }
      }
    } else if (e.target.name === "emailCheck") {
      if (code !== null && code !== undefined) {
        if (emailCheck) {
          setEmailCheckMessage({
            text: "이메일 인증이 완료되었습니다.",
            color: "#3CB371",
          });
        } else {
          if (e.target.value === "") {
            setEmailCheckMessage({
              text: "인증코드를 입력해주세요.",
              color: "red",
            });
          }
          setEmailCheckMessage({
            text: "잘못된 인증코드입니다.",
            color: "red",
          });
        }
      } else {
        setEmailCheckMessage({
          text: "이메일 입력 후 전송버튼을 눌러주세요",
          color: "red",
        });
      }
    } else if (e.target.name === "nickname") {
      for (var i = 0; i < getData.length; i++) {
        if (user.userNickname === getData[i].userNickname) {
          checked = true;
          break;
        }
      }
      if (checked) {
        if (e.target.value.length === "") {
          setNicknameMessage({ text: "필수 정보입니다.", color: "red" });
        } else {
          setNicknameMessage({
            text: "이미 존재하는 닉네임입니다.",
            color: "red",
          });
        }
      } else {
        if (e.target.value === "") {
          setNicknameMessage({ text: "필수 정보입니다.", color: "red" });
        } else {
          if (e.target.value.length > 2) {
            setNicknameMessage({
              text: "사용 가능한 닉네임입니다.",
              color: "#3CB371",
            });
          } else {
            setNicknameMessage({
              text: "닉네임이 너무 짧습니다.",
              color: "red",
            });
          }
        }
      }
    } else if (e.target.name === "password") {
      const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/;
      if (regExp.test(user.userPassword)) {
        setPasswordMessage({
          text: "사용 가능한 비밀번호입니다.",
          color: "#3CB371",
        });
      } else {
        if (user.userPassword === "") {
          setPasswordMessage({ text: "필수 정보입니다.", color: "red" });
        } else {
          setPasswordMessage({
            text: "8 ~ 10자 영문, 숫자 조합을 입력해주세요.",
            color: "red",
          });
        }
      }
    } else if (e.target.name === "passwordCheck") {
      const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/;
      if (
        user.userPassword !== "" &&
        user.userPassword !== null &&
        user.userPassword !== undefined
      ) {
        if (regExp.test(e.target.value)) {
          if (user.userPassword === e.target.value) {
            setPasswordCheckMessage({
              text: "비밀번호 확인이 완료되었습니다.",
              color: "#3CB371",
            });
            setPasswordCheck(true);
          } else {
            setPasswordCheckMessage({
              text: "비밀번호가 일치하지 않습니다.",
              color: "red",
            });
            setPasswordCheck(false);
          }
        } else {
          if (e.target.value === "") {
            setPasswordCheckMessage({
              text: "필수 정보입니다..",
              color: "red",
            });
          } else {
            setPasswordCheckMessage({
              text: "잘못된 비밀번호 형식입니다.",
              color: "red",
            });
          }
        }
      } else {
        setPasswordCheckMessage({
          text: "비밀번호를 먼저 입력해주세요.",
          color: "red",
        });
      }
    } else if (e.target.name === "name") {
      const blank_pattern = /[\s]/g;
      if (e.target.value === "" || blank_pattern.test(e.target.value)) {
        setNameMessage({ text: "필수 정보입니다..", color: "red" });
      } else {
        setNameMessage({ text: "", color: "" });
      }
    }else if(e.target.name === "phonNo"){
      if (e.target.value === "") {
        setMobileMessage({ text: "필수 정보입니다..", color: "red" });
      } else{
        var regExp = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;
        if(regExp.test(e.target.value)){
          setMobileMessage({ text: "", color: "" });
        }else{
          setMobileMessage({ text: "형식에 맞지 않습니다.", color: "red" });
        }
      }
    }
  }

  return (
    <>
      {joinCheck ? (
        <Redirect to="/"></Redirect>
      ) : (
        <div className={styles.joinBox}>
          <div>
            <FcConferenceCall size="200" />
          </div>
          <hr />

          <h2>국비 위키에 오신 것을 환영합니다!</h2>
          <form ref={form} onSubmit={sendEmail} className={styles.Join_form1}>
            <input
              type="text"
              placeholder="이메일 주소"
              name="email"
              onChange={onChange}
              onBlur={MessageSet}
            ></input>
            <input type="submit" value="전송" onClick={sendEmail} />

            <br />
            <span style={{ fontSize: 10 }}>
              이메일 확인 후 인증번호를 입력해주세요
            </span>
            {Message.text !== "" ? (
              <p style={{ fontSize: 5, color: `${Message.color}` }}>
                {Message.text}
              </p>
            ) : (
              <p></p>
            )}
            <input type="hidden" name="code" value={String(number)} />
          </form>

          <form onSubmit={onSubmit} className={styles.Join_form2}>
            <input
              type="text"
              name="emailCheck"
              placeholder="이메일 인증번호"
              onChange={onChange}
              onBlur={MessageSet}
            ></input>
            {emailCheckMessage.text !== "" ? (
              <p style={{ fontSize: 5, color: `${emailCheckMessage.color}` }}>
                {emailCheckMessage.text}
              </p>
            ) : (
              <p></p>
            )}
            <input
              type="text"
              name="nickname"
              placeholder="닉네임"
              onChange={onChange}
              onBlur={MessageSet}
            ></input>
            <br />
            {nicknameMessage.text !== "" ? (
              <p style={{ fontSize: 5, color: `${nicknameMessage.color}` }}>
                {nicknameMessage.text}
              </p>
            ) : (
              <p></p>
            )}
            <input
              type="password"
              name="password"
              placeholder="비밀번호"
              onChange={onChange}
              onBlur={MessageSet}
            ></input>
            <br />
            {passwordMessage.text !== "" ? (
              <p style={{ fontSize: 5, color: `${passwordMessage.color}` }}>
                {passwordMessage.text}
              </p>
            ) : (
              <p></p>
            )}
            <input
              type="password"
              name="passwordCheck"
              placeholder="비밀번호 확인"
              onChange={onChange}
              onBlur={MessageSet}
            ></input>
            <br />
            {passwordCheckMessage.text !== "" ? (
              <p
                style={{ fontSize: 5, color: `${passwordCheckMessage.color}` }}
              >
                {passwordCheckMessage.text}
              </p>
            ) : (
              <p></p>
            )}
            <input
              type="text"
              name="name"
              placeholder="성명"
              onChange={onChange}
              onBlur={MessageSet}
            ></input>
            <br />
            {nameMessage.text !== "" ? (
              <p style={{ fontSize: 5, color: `${nameMessage.color}` }}>
                {nameMessage.text}
              </p>
            ) : (
              <p></p>
            )}
            <input type="text" name="phonNo" placeholder="휴대전화번호" onChange={onChange} onBlur={MessageSet}/>
            {mobileMessage.text !== "" ? <p style={{fontSize:5, color: `${mobileMessage.color}`}}>{mobileMessage.text}</p> : <p></p>}
            <input type="submit" value="회원가입" />
          </form>

          <div className={styles.horizontal}></div>

          <div className={styles.joinlast}>
            이미 회원이세요?
            <span>
              <Link to="login">로그인</Link>
            </span>
          </div>
        </div>
      )}
    </>
  );
}
