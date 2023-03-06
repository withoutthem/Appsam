import { useState } from "react"
import { validation } from '../util/validation';
import { signUp } from "../apis/signUp";

const Sign = () =>{
    
    //sign Form 저장 state
    const [userInfo, setUserInfo] = useState({
        id: {value:'', valid : false},
        ps: {value:'', valid : false},
        email: {value:'', valid : false},
        name: {value:'', valid : false},
        aors: {value:'None', valid: true}
    })

    const setInfo = (type, nowVal)=>{
        if(type !== 'email' && nowVal.length>15){
            return;
        }
        else{
            const tempUser = {...userInfo}
            tempUser[type]['value'] = nowVal;
            if(validation(type, nowVal)){
                tempUser[type]['valid'] = true
            }
            else{
                tempUser[type]['valid'] = false
            }
            setUserInfo(tempUser);
        }
    }

    return (
        <form className="signWrap" onSubmit={(e)=>{signUp(e, userInfo)}}>
            <div className="idWrap">
                <p>id : 5~15자 영문, 특수문자 제외</p>
                <input type="id" value={userInfo.id.value} onChange={(e)=>{setInfo('id', e.target.value)}} />
                {userInfo.id.valid ? '가능' : '불가능'}
            </div>
            <div className="psWrap">
                <p>ps : 5~15자 아무문자, 특수문자1개이상 필요</p>
                <input type="password" value={userInfo.ps.value} onChange={(e)=>{setInfo('ps', e.target.value)}} />
                {userInfo.ps.valid ? '가능' : '불가능'}
            </div>
            <div className="emailWrap">
                <p>email : 이메일형식</p>
                <input type="email" value={userInfo.email.value} onChange={(e)=>{setInfo('email', e.target.value)}}/>
                {userInfo.email.valid ? '가능' : '불가능'}
            </div>
            <div className="nameWrap">
                <p>name : 3~15자 한글,영문,숫자만 허용</p>
                <input type="text" value={userInfo.name.value} onChange={(e)=>{setInfo('name', e.target.value)}} />
                {userInfo.name.valid ? '가능' : '불가능'}
            </div>
            <div className="aorsWrap">
                <p>Apple or Samsung : 중립, 애플, 삼성 중 하나 선택</p>
                <select name="" id="" onChange={(e)=>{setInfo('aors', e.target.value)}}>
                    <option value="None">중립</option>
                    <option value="Apple">Apple</option>
                    <option value="Samsung">Samsung</option>
                </select>            
            </div>
                <button type="submit">submit</button>
        </form>
    )
}

export default Sign;