import axios from 'axios';
import './App.css';

function App() {
  const testAPI = ()=>{
    axios.get('/api/test')
    .then((res)=>{
      console.log(res.data)
    })
    .catch((e)=>{
      console.log(e)
    })
  }

  return (
    <div className="main">
      Hello World !
      <button onClick={testAPI}>
    where is my button
      </button>
    </div>
  );
}

export default App;
