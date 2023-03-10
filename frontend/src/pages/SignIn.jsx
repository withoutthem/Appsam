import { useState, useEffect } from "react";
import axios from "axios";
import { setCookieJWT } from "../utils/cookie";
import { useDispatch } from "react-redux";
import { updateUserInfoTrue } from "../store";
import { useNavigate } from 'react-router-dom';

const SignIn = ()=>{
    //리덕스 세팅
    const dispatch = useDispatch();
    //navigate 세팅
    const navigate = useNavigate();

    // temp state 
    const [userInput, setUserInput] = useState({
        id : '',
        ps : ''
    })
    // button disabled state 
    const [buttonState, setButtonState] = useState(true)

    // onChange function state에 업데이트
    const onChange = (type, e)=>{
        let tempInput = {...userInput};
        tempInput[`${type}`] = e;
        setUserInput(tempInput);
    }

    //button State 버튼 상태
    useEffect(()=>{
       if(userInput.id.length === 0 || userInput.ps.length ===0){
         setButtonState(true);
       } 
       else{
        setButtonState(false)
       }
    },[userInput.id, userInput.ps])

    // submit logic 로그인
    const submitBtn = (event, value)=>{
        event.preventDefault();
        if(buttonState){
            alert('알 수 없는 에러입니다.')
        }
        else{
            axios.post('/api/auth/signin', value)
            .then((result)=>{
                //받은 jwt를 쿠키에 저장
                setCookieJWT(result.data.jwt)
                //redux 글로벌에 userInfo 저장
                dispatch(updateUserInfoTrue(result.data.userInfo));
                console.log('로그인 성공');
            })
            .then(()=>{
                //navigateHook으로 이동
                navigate('/');
            })
            .catch(e=>{
                alert(e.response.data.message ? e.response.data.message : e)
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
        </div>
    )
}

export default SignIn;