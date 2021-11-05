import {Route} from "react-router-dom";
import MyPageList from "./components/MyPageList";
import Remove from "./components/Remove";



function MyPage({match}){

    return(
        <>
            <Route exact path={match.path} component={MyPageList}></Route>
            <Route path={`${match.path}/remove`} component={Remove}></Route>
            <Route path={`${match.path}/modify`}></Route>
            <Route path={`${match.path}/passwordModify`}></Route>
        </>
    );
}

export default MyPage;