import {Route} from "react-router-dom";
import Modify from "./components/Modify";
import MyPageList from "./components/MyPageList";
import passwordModify from "./components/PasswordModify";
import Remove from "./components/Remove";



function MyPage({match}){

    return(
        <>
            <Route exact path={match.path} component={MyPageList}></Route>
            <Route path={`${match.path}/remove`} component={Remove}></Route>
            <Route path={`${match.path}/modify`} component={Modify}></Route>
            <Route path={`${match.path}/passwordModify`} component={passwordModify}></Route>
        </>
    );
}

export default MyPage;