//libs 
import { Routes, Route, useLocation, } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// css
import './style/main.css';
import './style/reset.css';

// pages
import Main from './pages/Main';
import CompareAll from './pages/CompareAll';
import CompareOne from './pages/CompareOne';
import Apple from './pages/Apple';
import Samsung from './pages/Samsung';
import DonationPlease from './pages/DonationPlease';
import WhosDev from './pages/WhosDev';
import SagongSa from './pages/SagongSa';
import Sign from './pages/Sign'
import SignIn from './pages/SignIn';

// components
import Header from './components/Header';
import Footer from './components/Footer';
import GlobalPop from './components/GlobalPop';

//module
import { jwtValidator } from './utils/isLogin'
import { removeCookieJWT } from './utils/cookie'

//store 
import { updateUserInfoTrue, updateUserInfoFalse, openPop } from './store';

const App = () => {
  const location = useLocation(); //현재 location
  const dispatch = useDispatch(); //store.js

  useEffect(()=>{
    if(location.pathname === '/signin' || location.pathname === '/sign'){ // auth관련 페이지들은 jwt토큰영향을 받지 않음.
    }
    else{
      jwtValidator().then(result =>{
          dispatch(updateUserInfoTrue(result)) //store의 user update (jwt토큰 기반)
      })
      .catch(e => { //에러 시 userInfo, jwt 삭제 
        if(e.etc !== 'No token'){ //토큰이 없으면 경고 창 없음. 조작된 토큰/만료 토큰은 경고를 띄워줌.
          dispatch(openPop(e.message))
        }        
        dispatch(updateUserInfoFalse()) //store의 user 삭제
        removeCookieJWT(); //jwt 삭제
      })
    }
  },[location.pathname, dispatch]) //location 이동 시마다 호출(signIn/signUp 제외)

  return (
    <div className="wrapper">
    <GlobalPop></GlobalPop>
    <Header></Header>
		<Routes> 
			<Route path="/" element={<Main/>} />
      <Route path="/compareall" element={ <CompareAll/> } />
      <Route path="/compareone" element={ <CompareOne/> } />
      <Route path="/apple" element={ <Apple/> } />
      <Route path="/samsung" element={ <Samsung/> } />
      <Route path="/donation" element={ <DonationPlease/> } />
      <Route path="/whosdev" element={ <WhosDev/> } />
      <Route path="/signin" element={ <SignIn/> } />
      <Route path="/sign" element={ <Sign/> } />
      <Route path="*" element={ <SagongSa/> } />
    </Routes>
    <Footer></Footer>
    </div>
  );
}

export default App;
