import axios from "axios";
import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import styles from "../../css/Modify.module.css";

function Modify() {
  const [getData, setGetData] = useState([]);
  const [user] = useState(JSON.parse(sessionStorage.getItem("user")));
  const [userNickname, setUserNickname] = useState(user.userNickname);
  const [mobile, setMobile] = useState(user.mobile);
  const [check, setCheck] = useState(false);

  useEffect(() => {
    callData();
  }, []);

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

  function update(e) {
    let name = e.target.name;

    if (name === "nickname") {
      setUserNickname(e.target.value);
    } else if (name === "mobile") {
      setMobile(e.target.value);
    }
  }

  function onClick(e) {
    let name = e.target.name;
    let overlab = false;

    if (name === "mobileClick") {
      for (let i = 0; i < getData.length; i++) {
        if (getData[i].mobile === mobile) {
          alert("이미 존재하는 번호입니다.");
          overlab = true;
          break;
        }
      }

      if (!overlab) {
        let updateUser = { ...user, mobile: mobile };
        axios
          .put(`http://localhost:8081/user/${user.userEmail}`, updateUser)
          .then((res) => {
            sessionStorage.removeItem("user");
            window.sessionStorage.setItem("user", JSON.stringify(res.data));
            alert("수정성공");
          })
          .catch(() => {
            alert("수정실패");
          });
      }
    } else if (name === "nicknameClick") {
      for (let i = 0; i < getData.length; i++) {
        if (getData[i].userNickname === userNickname) {
          alert("이미 존재하는 닉네임입니다.");
          overlab = true;
          break;
        }
      }

      if (!overlab) {
        let updateUser = { ...user, userNickname: userNickname };
        axios
          .put(`http://localhost:8081/user/${user.userEmail}`, updateUser)
          .then((res) => {
            window.sessionStorage.setItem("user", JSON.stringify(res.data));
            alert("수정성공");
          })
          .catch(() => {
            alert("수정실패");
          });
      }
    }
  }

  function forward() {
    setCheck(true);
  }

  return (
    <>
      {check ? (
        <Redirect to="/myPage"></Redirect>
      ) : (
        <>
          <div className={styles.ModifyChange}>
            <h1> 개인정보 변경</h1>

            <p>고객님의 개인정보를 위해 최선을 다하겠습니다.</p>
            <form>
              <table>
                <tr>
                  <th>&nbsp;&nbsp;국비위키 ID</th>
                  <td>{user.userEmail}</td>
                  <td></td>
                </tr>
                <tr>
                  <th>&nbsp;&nbsp;이름</th>
                  <td>{user.userName}</td>
                  <td></td>
                </tr>
                <tr>
                  <th>&nbsp;&nbsp;닉네임</th>
                  <td>
                    <input
                      type="text"
                      value={userNickname}
                      name="nickname"
                      onChange={update}
                    />
                  </td>
                  <td>
                    <input
                      type="button"
                      name="nicknameClick"
                      value="변경"
                      onClick={onClick}
                    />
                  </td>
                </tr>
                <tr>
                  <th>&nbsp;&nbsp;휴대폰</th>
                  <td>
                    <input
                      type="text"
                      value={mobile}
                      name="mobile"
                      onChange={update}
                    />
                  </td>
                  <td>
                    <input
                      type="button"
                      value="변경"
                      name="mobileClick"
                      onClick={onClick}
                    />
                  </td>
                </tr>
              </table>
              <div className={styles.ModifyChange1}>
                <input type="button" value="수정완료" onClick={forward}/>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}

export default Modify;