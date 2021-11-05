import {Link} from "react-router-dom";

function MyPageList({match}){
    return(
        <>
            <div name="profile">
                <ul>
                    <li><img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" style={{width:50, height:50}}></img></li>
                    <li><Link to={`${match.url}/profile`}>국비위키 프로필</Link></li>
                    <li>
                        고객님의 프로필을 수정하실수
                                있습니다.
                    </li>
                </ul>
            </div>

            <div name="modify">
                <ul>
                    <li><img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" style={{width:50, height:50}}></img></li>
                    <li><Link to={`${match.url}/modify`}>개인정보 변경</Link></li>
                    <li>고객님의 개인정보를 수정하실 수 있습니다</li>
                </ul>
            </div>

            <div name="remove">
                <ul>
                    <li><img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" style={{width:50, height:50}}></img></li>
                    <li><Link to={`${match.url}/remove`}>회원 탈퇴</Link></li>
                    <li>사용하지 않는 국비위키ID를 
                          탈퇴 할 수 있습니다.</li>
                </ul>
            </div>
            
            <div name="passwordModify">
                <ul>
                    <li><img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" style={{width:50, height:50}}></img></li>
                    <li><Link to={`${match.url}/passwordModify`}>비밀번호 변경</Link></li>
                    <li>추가적인 비밀번호 변경으로
                         ID를 안전하게 관리할 수
                              있습니다.</li>
                </ul>
            </div>
        </>
    );
}

export default MyPageList;