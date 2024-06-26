import { useState, useCallback } from "react"
import { validation } from '../utils/validation'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { updateUserInfoTrue, openPop } from "../store";
import { useNavigate } from 'react-router-dom';
import { setCookieJWT } from '../utils/cookie';
import IMG_mainGalaxy from '../assets/images/signUpImg.png';



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
        <div className="signWrapBack">
            <div className="signImgWrap">
                <form className="signBox" onSubmit={(e)=>{signUp(e)}}>
                    <p className="mainTitle">Sign Up</p>
                    <div className="idWrap formWrap">
                        <p className="mainInputTex">아이디*</p>
                        <input className="fillInput" type="id" placeholder="Your ID" value={userInfo.id[0]} onChange={(e)=>{setInfo('id', e.target.value)}} />
                        <div className="overlap">
                            {
                                isDuplicatedID ? <div className="available">사용 가능합니다</div> : <button className="overlapCheck" type="button" onClick={()=>{getDuplicate({id : userInfo.id[0]})}}>중복 확인</button>
                            }
                        </div>
                        <div className="possible">
                            {
                                resMessage.id.length>0 ? <div className="resMessage">{resMessage.id}</div> : userInfo.id[1] ? <p className="possibleIcon">가능<span></span></p> : <p className="unpossibleIcon">불가능<span></span></p>
                            }
                            <p className="assistanceTex">5자 이상 15자 이하, 영어와 숫자로 이루어져야 합니다.</p>
                        </div>
                    </div>
                    <div className="psWrap formWrap">
                        <p className="mainInputTex">비밀번호*</p>
                        <input className="fillInput" type="password" placeholder="Password" value={userInfo.ps[0]} onChange={(e)=>{setInfo('ps', e.target.value)}} />
                        <div className="possible">
                            {userInfo.ps[1] ? <p className="possibleIcon">가능<span></span></p> : <p className="unpossibleIcon">불가능<span></span></p>}
                            <p className="assistanceTex">5자 이상 15자 이하, 특수문자가 반드시 1개 이상 포함되어야 합니다.</p>
                        </div>            
                    </div>
                    <div className="emailWrap formWrap">
                        <p className="mainInputTex">이메일*</p>
                        <input className="fillInput" type="email" placeholder="appsam@naver.com" value={userInfo.email[0]} onChange={(e)=>{setInfo('email', e.target.value)}}/>
                        <div className="overlap">
                            {
                                isDuplicatedEmail ? <div className="available">사용 가능합니다.</div> : <button className="overlapCheck" type="button" onClick={()=>{getDuplicate({email : userInfo.email[0]})}}>중복 확인</button>
                            }
                        </div>
                        <div className="possible">
                            {
                                resMessage.email.length>0 ? <div className="resMessage">{resMessage.email}</div> : userInfo.email[1] ? <p className="possibleIcon">가능<span></span></p> : <p className="unpossibleIcon">불가능<span></span></p>
                            }
                            <p className="assistanceTex">이메일 형식이어야 합니다.</p>
                        </div>
                    </div>
                    <div className="nameWrap formWrap">
                        <p className="mainInputTex">이름(닉네임)*</p>
                        <input className="fillInput" type="text" placeholder="Your Name" value={userInfo.name[0]} onChange={(e)=>{setInfo('name', e.target.value)}} />
                        <div className="possible">
                            {userInfo.name[1] ? <p className="possibleIcon">가능<span></span></p> : <p className="unpossibleIcon">불가능<span></span></p>}
                            <p className="assistanceTex">3자 이상, 15자 미만 문자만 가능합니다.</p>
                        </div>
                    </div>
                    <div className="flexBox">
                        <div className="aorsWrap informationWrap">
                            <p>Apple or Samsung</p>
                            <select name="" id="" onChange={(e)=>{setInfo('aors', e.target.value)}}>
                                <option value="None">중립</option>
                                <option value="Apple">Apple</option>
                                <option value="Samsung">Samsung</option>
                            </select>
                        </div>
                        <div className="submitWrap">
                            <label><input className="checkBox" type="checkbox" /><span>회원가입 및 이용약관에 동의하겠습니다</span></label>
                            <label><input className="checkBox" type="checkbox" /><span>마케팅은 발신도 하지 않지만 동의해보겠습니다.</span></label>
                            <p className="view">이용약관 전문 보기</p>
                            <button className="joinBtn" type="submit">회원가입</button>
                            {/* <button className="deactivationBtn" type="submit">비활성화 상태 버튼</button> */}
                        </div>
                    </div>
                </form>
                <div className="imgBox">
                    <img className="signImg" src={IMG_mainGalaxy} />
                    <ul className="signList">
                        <li>회원가입 시 댓글과 별점기능을 이용하실 수 있습니다.</li>
                        <li>가나다라마바사 이것은 디스클레이머 표시입니다.</li>
                        <li>혹시나 내가 뭔말을 하고싶으면 이곳에다가 적을 것입니다. <br></br>길이는 딱히 제한이 있는 것은 아닙니다.</li>
                        <li>법적문제 등을 회피하기 위한 목적도 있습니다. 그렇게 눈에 띄지는 않을겁니다..</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sign;