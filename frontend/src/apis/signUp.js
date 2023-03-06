import { useSelector } from "react-redux"
import axios from 'axios';

//Signup API logic 
const signUp = (e, userInfo) =>{
    console.log(e);
    console.log(userInfo)
    e.preventDefault();
    axios.post('/api/auth/signup', userInfo)
    .then(result => console.log(result))
}

export { signUp }