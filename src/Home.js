import React, {useEffect, useState } from 'react'
import { Link} from "react-router-dom";
import axios from 'axios';

export default function Home(){

    const [loginCheck,setLoginCheck] = useState();

    const initializeNaverLogin = async () => { 
       var naver_id_login = new window.naver_id_login("GFRk_SJiZVzSpToWr01V", "http://localhost:3000/#/");
       const accessToken = {
               accessToken:`${naver_id_login.oauthParams.access_token}`
       }
       //액세스토큰
       console.log(naver_id_login.oauthParams.access_token);
       const {data} = await axios.post("http://localhost:8081/user/naverLogin",accessToken);
        if(data !== undefined && data !== ""){
            const naverLogin = new window.naver.LoginWithNaverId({
                clientId:"GFRk_SJiZVzSpToWr01V",
                callbackUrl:"http://localhost:3000/#/", 
                isPopup: false, // popup 형식으로 띄울것인지 설정
              });
            naverLogin.init();
            console.log(data);
            if((data.response.email === undefined || data.response.email == null )&&
                (data.response.nickname === undefined || data.response.nickname == null)&&
                (data.response.name === undefined || data.response.name == null) &&
                (data.response.mobile === undefined || data.response.mobile == null)
            ){
                naverLogin.reprompt(); 
            }
            else if(data.response.email === undefined || data.response.email == null){
                naverLogin.reprompt(); 
                alert("이메일은 필수정보입니다.");
                return;   
            }
            else if(data.response.nickname === undefined || data.response.nickname == null){
                naverLogin.reprompt(); 
                alert("별명은 필수 정보입니다.");
                return;
            }
            else if(data.response.name === undefined || data.response.name == null){
                naverLogin.reprompt();
                alert("이름은 필수 정보입니다.");   
                return;
            }else if(data.response.mobile === undefined || data.response.mobile == null){
                naverLogin.reprompt();
                alert("휴대전화번호는 필수 정보입니다.")
            }
            else{
                console.log("성공");
                window.sessionStorage.setItem("user", JSON.stringify(data.response));
                setLoginCheck(true);
            }
        }  
            
    }
    
    useEffect(()=>{
        console.log("useEffect실행");
        if(sessionStorage.getItem("user") !== null){
            setLoginCheck(true);
        }else{
            setLoginCheck(false);
        }
        initializeNaverLogin();
    },[]);

    function logout(e){
        e.preventDefault();
        axios.get(`http://localhost:8081/user/logout`)
        .then(function(response){
            console.log('성공');
        })
        .catch(function(error){
            console.log('실패');
        });
        window.sessionStorage.removeItem("user");
        setLoginCheck(false);
      }

    return(
        <>
        {loginCheck ?
            <>
                <Link to="/myPage">내 정보</Link><br/>
                <a href="#" onClick={logout}>로그아웃</a> 
            </>
            :
            <>
                <Link to="/join">회원가입</Link><br/> 
                <Link to="/login">로그인</Link>
            </>
        }
        </>
    );
}