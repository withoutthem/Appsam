import { useState, useCallback } from "react"
import { validation } from '../util/validation'
import axios from 'axios'

const Sign = () =>{
    //임시 State
    const [userInfo, setUserInfo] = useState({
        id: ['',false],
        ps: ['',false],
        email:['',false],
        name: ['',false],
        aors: ['None', true]
    })

    // onChange에 넣어 validate 후 임시state를 업데이트하는 함수
    const setInfo = useCallback((type, nowVal)=>{ //type과 값을 받아 validation
        if(type !== 'email' && nowVal.length>15){
            return;
        }
        else{
            let tempInfo = {...userInfo}
            let tempInfo_type = [...userInfo[type]] //2depth의 불변성을 지켜주기 위해 얕은복사 두번 함
            tempInfo_type[0] = nowVal;
            if(validation(type, nowVal)){ //validation util함수를 불러와서 사용한다.
                tempInfo_type[1] = true;
            }
            else{
                tempInfo_type[1] = false;
            }
            tempInfo[type] = tempInfo_type;
            setUserInfo(tempInfo);
        }
    },[userInfo])



    const signUp = (e)=>{
        e.preventDefault();
        if(userInfo.id[1] && userInfo.ps[1] && userInfo.email[1] && userInfo.name[1] && userInfo.aors[1]){
            axios.post('/api/auth/signup', userInfo)
            .then((result)=>{console.log(userInfo)})
        }
        else{
            alert('다 채워라')
        }
    }

    return (
        <form className="signWrap" onSubmit={(e)=>{signUp(e)}}>
            <div className="idWrap formWrap">
                <p>id : 5~15자 영문, 특수문자 제외</p>
                <input type="id" value={userInfo.id[0]} onChange={(e)=>{setInfo('id', e.target.value)}} />
                {userInfo.id[1] ? '가능' : '불가능'}
            </div>
            <div className="psWrap formWrap">
                <p>ps : 5~15자 아무문자, 특수문자1개이상 필요</p>
                <input type="password" value={userInfo.ps[0]} onChange={(e)=>{setInfo('ps', e.target.value)}} />
                {userInfo.ps[1] ? '가능' : '불가능'}
            </div>
            <div className="emailWrap formWrap">
                <p>email : 이메일형식</p>
                <input type="email" value={userInfo.email[0]} onChange={(e)=>{setInfo('email', e.target.value)}}/>
                {userInfo.email[1] ? '가능' : '불가능'}
            </div>
            <div className="nameWrap formWrap">
                <p>name : 3~15자 한글,영문,숫자만 허용</p>
                <input type="text" value={userInfo.name[0]} onChange={(e)=>{setInfo('name', e.target.value)}} />
                {userInfo.name[1] ? '가능' : '불가능'}
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