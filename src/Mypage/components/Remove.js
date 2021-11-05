import { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router";

function Remove({match}){
    const [password, setPassword] = useState();
    const [removeCheck, setRemoveCheck] = useState(false);

    function onChange(e){
        setPassword(e.target.value);
    }

    function onCheck(){
        let user = JSON.parse(window.sessionStorage.getItem("user"));
        if(user.userPassword === password){
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
        }else{
            alert("비밀번호가 다릅니다.")
        }
    }


    return(
        <>
            {
                removeCheck ? 
                <>
                <Redirect to="/"></Redirect>
                </>
                :
                <>
                본인확인<br/>
                <label>비밀번호 입력</label>
                <input type="text" onChange={onChange}/>
                <button onClick={onCheck}>탈퇴</button>
                </>
            }
        </>
    );
}

export default Remove