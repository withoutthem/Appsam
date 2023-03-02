import axios from 'axios';
import './App.css';
import Header from './components/Header';

function App() {
  const testAPI = ()=>{
    axios.post('api/auth/signup',{userID:'테스트아이디이다', name:'빅터', userPassword:'0네개국룰'})
    .then((res)=>{
      console.log(res.data);
    })
    .catch((e)=>{
      console.log(e)
    })
  }


  return (
    <div className="main"> 
    <Header></Header>
      Hello World !
      <button onClick={testAPI}>
    where is my button
      </button>
    </div>
  );
}

export default App;
