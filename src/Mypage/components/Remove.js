import { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import styles from "../../css/Remove.module.css";

function Remove({ match }) {
  const [password, setPassword] = useState();
  const [removeCheck, setRemoveCheck] = useState(false);

  function onChange(e) {
    setPassword(e.target.value);
  }

  function onCheck() {
    let user = JSON.parse(window.sessionStorage.getItem("user"));
    if (user.userPassword === password) {
      console.log(user);
      axios
        .delete(`http://localhost:8081/user/${user.userEmail}`, user)
        .then(function (response) {
          console.log("성공");
          alert("삭제성공");
          window.sessionStorage.removeItem("user");
          setRemoveCheck(true);
        })
        .catch(function (error) {
          console.log(user);
          console.log("실패");
          alert("삭제실패");
        });
    } else {
      alert("비밀번호가 다릅니다.");
    }
  }

  return (
    <>
      {removeCheck ? (
        <>
          <Redirect to="/"></Redirect>
        </>
      ) : (
        <>
          <div className={styles.Remove_list}>
            <h1>본인확인</h1>
            <br />
            <p>고객님의 소중한 개인정보보호를 위해서 본인확인을 진행합니다.</p>
            <div>
              <ul>
                <li style={{ fontSize: 20 }}>비밀번호 입력</li>
                <li>
                  <input type="text" onChange={onChange} />
                </li>
                <li>
                  <button onClick={onCheck}>탈퇴</button>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Remove;