import { useState, useCallback } from "react"
import { validation } from '../utils/validation'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { updateUserInfoTrue, openPop } from "../store";
import { useNavigate } from 'react-router-dom';
import { setCookieJWT } from '../utils/cookie';

const Sign = () =>{
    //redux setting
    const dispatch = useDispatch();
    // navigate setting 
    const navigate = useNavigate();

    // Component 한정 state 모음 
    const [isDuplicatedID, setIsDuplicatedID] = useState(false)
    const [isDuplicatedEmail, setIsDuplicatedEmail] = useState(false)
    const [resMessage, setResMessage] = useState({
        id : '',
        email : ''
    });
    const [userInfo, setUserInfo] = useState({
        id: ['',false],
        ps: ['',false],
        email:['',false],
        name: ['',false],
        aors: ['None', true]
    })

    // onChange 시 validate 후 state를 업데이트하는 함수
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
        if(type === 'id'){
            setIsDuplicatedID(false);
            let tempMessage = {...resMessage};
            tempMessage.id = '';
            setResMessage(tempMessage);
        }
        if(type === 'email'){
            setIsDuplicatedEmail(false);
            let tempMessage = {...resMessage};
            tempMessage.email = '';
            setResMessage(tempMessage);
        }
    },[userInfo, resMessage])

    //중복확인 버튼
    const getDuplicate = useCallback((value)=>{ 
        const nowKey = Object.keys(value)[0] // 현재 타입
        const nowVal = Object.values(value)[0] // 현재 값
        if(validation(nowKey, nowVal)){
            axios.post('/api/auth/dupchk', value)
            .then((result)=>{
                if(nowKey === 'id'){
                    if(result.data.stat){
                        setIsDuplicatedID(result.data.stat)
                    }
                    else{
                        let tempMessage = {...resMessage};
                        tempMessage[`${nowKey}`] = result.data.message;
                        setResMessage(tempMessage)
                    }
                }
                else{
                    if(result.data.stat){
                        setIsDuplicatedEmail(result.data.stat)
                    }
                    else{
                        let tempMessage = {...resMessage};
                        tempMessage[`${nowKey}`] = result.data.message;
                        setResMessage(tempMessage)
                    }
                }
            })
            .catch((e)=>{console.log(e)})
        }
        else{
            dispatch(openPop('형식을 확인하세요'))
        }
    },[resMessage, dispatch])

    //submit 버튼
    const signUp = (e)=>{ 
        e.preventDefault();
        if(userInfo.id[1] && userInfo.ps[1] && userInfo.email[1] && userInfo.name[1] && userInfo.aors[1] && isDuplicatedID && isDuplicatedEmail){
            //검증 완료 시
            axios.post('/api/auth/signup', userInfo)
            .then(result=>{
                dispatch(updateUserInfoTrue(result.data.userInfo));
                setCookieJWT(result.data.jwt)
                dispatch(openPop(result.data.message)); 
            })
            .then(()=>{
                navigate('/')
            })
            .catch(e => {
                if(e.response.message){
                    dispatch(openPop(e.response.message))
                }
                else{
                    dispatch(openPop(e))
                }
            })
        }
        else if(userInfo.id[1] && userInfo.ps[1] && userInfo.email[1] && userInfo.name[1] && userInfo.aors[1]){
            dispatch(openPop('중복검사를 진행하세요.'))
        }
        else if(isDuplicatedID && isDuplicatedEmail){
            dispatch(openPop('형식에 맞는지 확인해주세요.'))
        }
        else{
            dispatch(openPop('다시 한번 확인해주세요.'))
        }
    }

    return (
        <form className="signWrap" onSubmit={(e)=>{signUp(e)}}>

            <div className="idWrap formWrap">
                <p>id : 5~15자 영문, 특수문자 제외</p>
                <input type="id" value={userInfo.id[0]} onChange={(e)=>{setInfo('id', e.target.value)}} />
                {
                    isDuplicatedID ? <div>사용 가능합니다</div> : <button type="button" onClick={()=>{getDuplicate({id : userInfo.id[0]})}}>중복 확인</button>
                }
                {resMessage.id}
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
                {
                    isDuplicatedEmail ? <div>사용 가능합니다.</div> : <button type="button" onClick={()=>{getDuplicate({email : userInfo.email[0]})}}>중복 확인</button>
                }
                {resMessage.email}
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