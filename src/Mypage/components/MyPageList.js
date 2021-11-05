import { Link } from "react-router-dom";
import styles from "../../css/MypageList.module.css";
import { FcPicture, FcBusinessContact, FcExport } from "react-icons/fc";
import { AiFillLock } from "react-icons/ai";

function MyPageList({ match }) {
  return (
    <>
      <div className={styles.MyPage_List}>
        <table width="900px" height="700px">
          <tr>
            <td>
              <Link to={`${match.url}/profile`}>
                <div name="profile">
                  <li>
                    <FcPicture style={{ width: 100, height: 100 }} />
                  </li>
                  <li style={{ fontSize: 30 }}>국비위키 프로필</li>
                  <li>
                    고객님의 프로필을
                    <br /> 수정하실수 있습니다.
                  </li>
                </div>
              </Link>
            </td>

            <td>
              <Link to={`${match.url}/modify`}>
                <div name="modify">
                  <li>
                    <FcBusinessContact style={{ width: 100, height: 100 }} />
                  </li>
                  <li style={{ fontSize: 30 }}>개인정보 변경</li>
                  <li>
                    고객님의 개인정보를 <br />
                    수정하실 수 있습니다
                  </li>
                </div>
              </Link>
            </td>
          </tr>

          <tr>
            <td>
              <Link to={`${match.url}/remove`}>
                <div name="remove">
                  <li>
                    <FcExport style={{ width: 100, height: 100 }} />
                  </li>
                  <li style={{ fontSize: 30 }}>회원 탈퇴</li>
                  <li>
                    사용하지 않는 국비위키ID를 <br />
                    탈퇴 할 수 있습니다.
                  </li>
                </div>
              </Link>
            </td>
            <td>
              <Link to={`${match.url}/passwordModify`}>
                <div name="passwordModify">
                  <li>
                    <AiFillLock style={{ width: 100, height: 100 }} />
                  </li>
                  <li style={{ fontSize: 30 }}>비밀번호 변경</li>
                  <li>
                    추가적인 비밀번호 변경으로 <br /> ID를 안전하게 관리할{" "}
                    <br />수 있습니다.
                  </li>
                </div>
              </Link>
            </td>
          </tr>
        </table>
      </div>
    </>
  );
}

export default MyPageList;