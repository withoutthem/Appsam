// import axios from 'axios';
import './style/main.css';
import Header from './components/Header';
import Footer from './components/Footer'
import { Routes, Route, Link } from 'react-router-dom';

function App() {
  // const testAPI = ()=>{
  //   axios.post('api/auth/signup',{userID:'테스트아이디이다', name:'빅터', userPassword:'0네개국룰'})
  //   .then((res)=>{
  //     console.log(res.data);
  //   })
  //   .catch((e)=>{
  //     console.log(e)
  //   })
  // }


  return (
    <div className="wrapper"> 
    <Header></Header>
		<Routes> 
			<Route path="/" element={ <div>메인페이지에</div> } />
      <Route path="/detail" element={ <div>상세페이지</div> } />
      <Route path="/about" element={ <div>어바웃페이지</div> } />
      <Route path="*" element={ <div>404</div> } />
    </Routes>
    <Footer></Footer>
    </div>
  );
}

export default App;
