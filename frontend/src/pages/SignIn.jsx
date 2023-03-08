import { useState, useEffect } from "react";
import axios from "axios";
import { getCookie, setCookie } from "../util/cookie";

const SignIn = ()=>{

    //cookie client Test
    const getCookieTest = (name)=>{
        console.log(getCookie(name));
    }

    const setCookieTest = (name, value, option)=>{
        setCookie(name, value, option);
        console.log('됬음 ?')
    }

    // temp state 
    const [userInput, setUserInput] = useState({
        id : '',
        ps : ''
    })
    // button disabled state 
    const [buttonState, setButtonState] = useState(true)

    // onChange function 
    const onChange = (type, e)=>{
        let tempInput = {...userInput};
        tempInput[`${type}`] = e;
        setUserInput(tempInput);
    }

    //button State
    useEffect(()=>{
       if(userInput.id.length === 0 || userInput.ps.length ===0){
         setButtonState(true);
       } 
       else{
        setButtonState(false)
       }
    },[userInput.id, userInput.ps])

    // submit logic 
    const submitBtn = (event, value)=>{
        event.preventDefault();
        if(buttonState){
            alert('알 수 없는 에러입니다.')
        }
        else{
            axios.post('/api/auth/signin', value)
            .then((result)=>{
                console.log(result)
                // 요청할때마다 쿠키를 전송 ?
            })
            .catch(e=>{
                alert(e.response.data.message)
            })
        }

    }

    return(
        <div>
            <form onSubmit={(e)=>{submitBtn(e, userInput)}}>
                ID : <input type="id" value={userInput.id} onChange={ e => onChange('id', e.target.value)} />
                PASSWORD : <input type="password" value={userInput.ps} onChange={ e => onChange('ps', e.target.value) } />
                <button type='submit' disabled={buttonState} >로그인버튼</button>
            </form>

            <button onClick={()=>{setCookieTest('test123','poss?')}}>쿠키생성 테스트버튼</button>
            <button onClick={()=>{getCookieTest('test123')}}>겟쿠키 테스트버튼</button>
        </div>
    )
}

export default SignIn;