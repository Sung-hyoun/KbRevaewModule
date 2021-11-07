import axios from "axios";
import { useState } from "react";
import { Redirect } from "react-router";
import styles from "../../css/PasswordModify.module.css";

function PasswordModify(match) {
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [newPassword, setNewPassword] = useState();
  const [passwordMessage, setPasswordMessage] = useState({
    text: "",
    color: "",
  });
  const [newPasswordMessage, setNewPasswordMessage] = useState({
    text: "",
    color: "",
  });
  const [passwordCheckMessage, setPasswordCheckMessage] = useState({
    text: "",
    color: "",
  });
  const [modifyCheck, setModifyCheck] = useState(false);

  function onChange(e) {
    let name = e.target.name;

    if (name === "password") {
      setPassword(e.target.value);
    } else if (name === "newPassword") {
      setNewPassword(e.target.value);
    }
  }

  function messageSet(e) {
    const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/;
    if (e.target.name === "password") {
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (user.userPassword === password) {
        setPasswordMessage({
          text: "비밀번호 확인이 완료되었습니다.",
          color: "#3CB371",
        });
      } else {
        setPasswordMessage({
          text: "비밀번호가 맞지 않습니다.",
          color: "red",
        });
      }
    } else if (e.target.name === "newPassword") {
      if (regExp.test(e.target.value)) {
        setNewPasswordMessage({
          text: "사용 가능한 비밀번호입니다.",
          color: "#3CB371",
        });
      } else {
        setNewPasswordMessage({
          text: "8 ~ 10자 영문, 숫자 조합을 입력해주세요.",
          color: "red",
        });
      }
    } else if (e.target.name === "passwordCheck") {
      if (regExp.test(e.target.value)) {
        if (e.target.value === newPassword) {
          setPasswordCheckMessage({
            text: "비밀번호가 일치합니다.",
            color: "#3CB371",
          });
        } else {
          setPasswordCheckMessage({
            text: "비밀번호가 일치하지 않습니다.",
            color: "red",
          });
        }
      } else {
        setPasswordCheckMessage({
          text: "잘못된 비밀번호 형식입니다.",
          color: "red",
        });
      }
    }
  }

  function onModify() {
    let user = JSON.parse(sessionStorage.getItem("user"));
    user = { ...user, userPassword: password };
    axios
      .put(`http://localhost:8081/user/${user.userEmail}`, user)
      .then((res) => {
        console.log("수정성공");
        alert("수정성공");
        onClick();
      })
      .catch(() => {
        console.log("수정실패");
        alert("수정실패");
        setModifyCheck(false);
      });
  }

  function onClick() {
    setModifyCheck(true);
  }

  return (
    <>
      {modifyCheck ? (
        <Redirect to="/myPage"></Redirect>
      ) : (
        <>
          <div className={styles.PasswordModify}>
            <h1>비밀번호 변경 </h1>
            <br />
            <p>고객님의 소중한 개인정보보호를 위해서 본인확인을 진행합니다.</p>
            <div>
              <div className={styles.PasswordModify1}>
                현재 비밀번호 입력
                <input
                  type="password"
                  name="password"
                  onChange={onChange}
                  onBlur={messageSet}
                />
                <br />
                {passwordMessage.text !== "" ? (
                  <p style={{ color: passwordMessage.color }}>
                    {passwordMessage.text}
                  </p>
                ) : (
                  <p>
                    <br />
                  </p>
                )}
                새 비밀번호 입력 &nbsp;&nbsp;
                <input
                  type="password"
                  name="newPassword"
                  onChange={onChange}
                  onBlur={messageSet}
                />
                <br />
                {newPasswordMessage.text !== "" ? (
                  <p style={{ color: newPasswordMessage.color }}>
                    {newPasswordMessage.text}
                  </p>
                ) : (
                  <p>
                    <br />
                  </p>
                )}
                새 비밀번호 재확인
                <input
                  type="password"
                  name="passwordCheck"
                  onChange={onChange}
                  onBlur={messageSet}
                />
                <br />
                {passwordCheckMessage.text !== "" ? (
                  <p style={{ color: passwordCheckMessage.color }}>
                    {passwordCheckMessage.text}
                  </p>
                ) : (
                  <p>
                    <br />
                  </p>
                )}
              </div>
              <button onClick={onModify}>확인</button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button onClick={onClick}>취소</button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default PasswordModify;