import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeSnackBar, openSnackBar } from '../store'

import deleteIcon from '../assets/images/icons/delete_24.png'
import editIcon from '../assets/images/icons/edit_24.png'
import like_no from '../assets/images/icons/like_no.png'
import profileIMG  from '../assets/images/profile_img.jpeg' ;


// 서버데이터 반영 이후 지울 것
//api 목록

// <GET> // 서버구현 완료
// :type : 'app' or 'sam' 으로 요청
// /api/chatmain/:type/popular/0 : 초기요청, 인기순 4개
// /api/chatmain/:type/recent/0 : 최신순 4개
// /api/chatmain/:type/popular/1 : 두번째요청, 첫 인기순 4개 이후 4개, 맨뒤 /:id 증가할수록 뒤에 요청 가능, 자료 없을 시 {stat:false, message:'더이상 없습니다' 반환}
// /api/chatmain/:type/recent/1 : 두번째요청, 첫 최신순 4개 이후 4개 ... 나머지 동일

// :type : 'app' or 'sam' 으로 요청
// 글쓰기 <POST> OK 
// api/chatmain/:type/post, {type:'chatApp' or 'chatSam', text:내용, id: redux에 있는 id,} -> 응답: 수정 성공 시 dbPost, {stat:true, message:'댓글 포스팅 성공'} -> global SnackBar에 메시지 띄우기
// 수정 <PUT> OK
// api/chatmain/:type/update/:ticket , {type:'chatApp' or 'chatSam', text:'내용', id:redux에 있는 id} -> 응답 : 수정 성공 시 db 내용 바꿈, {stat:true, message:'수정 성공'} -> global SnackBar에 메시지 띄우기
// 삭제 <Delete> OK
// api/chatmain/:type/delete/:ticket , {type:'chatApp' or 'chatSam', id:redux에 있는 id} -> 응답 : 삭제 성공 시 db 글 삭제, {stat:true, message:'삭제 성공'} -> global SnackBar에 메시지 띄우기
// 좋아요 <PATCH> OK
// api/chatmain/:type/like/:ticket , {type:'chatApp' or 'chatSam', id:redux에 있는 id} -> 응답 : 좋아요 성공 시 db 글 좋아요 내역 +1 {stat:true, message: '좋아요 성공'} -> global SnackBar에 메시지 띄우기

//chat껍데기 component
const MainChats = ({allData})=>{
    const dispatch = useDispatch();
    const storeState = useSelector(state => state.user);

    //example Data Schema
    const [chatData, setChatData] = useState(
        [
        //     {
        //     type: 'chatApp', // or 'chatSam'
        //     ticket:'11', // 문서 고유값
        //     id:'admin11', //작성자 아이디
        //     profile_img:'', //이미지 url
        //     aors : 'Apple', //Apple / Samsung / None 중 하나
        //     text:'', //글내용
        //     like : 4, // 좋아요 수,
        //     likes : false, // 내가 이 글에 좋아요 했는 지 보내줌
        //     time : '' //작성일, 시간
        // }
    ]
    );
    // textarea값 바꾸기 위한 state 
    const [message, setMessage] = useState('');
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    //snackBar 
    const snackBarTime = useRef(null);
    const snackBar = (e, message) => {
        e.preventDefault();
        dispatch(openSnackBar(message));
        if (snackBarTime.current !== null) {
            clearTimeout(snackBarTime.current);
        }
        snackBarTime.current = setTimeout(() => {
            dispatch(closeSnackBar());
            snackBarTime.current = null;
        }, 1500);
    }

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (message.trim()) {
          setChatData(prevChatData => [...prevChatData, message]);
          setMessage('');
        }
      };
      
    const handleTextareaChange = event => {
        setMessage(event.target.value);
    };

    return(
        <div className={`phoneWrap ${allData.type}`}>
            <img className="background" src={allData.background} alt="" />
            <div className="chatsWrap">
                <div className="tabMenu">
                    {/* /api/chatmain/popular */}
                    <button className="active">인기순</button> 
                    {/* /api/chatmain/recent */}
                    <button>최신순</button>
                </div>
                <ul className="chatsList">
                {chatData.map((message,chat) => {
                    return <Chat key={chat} chatData={chat} message={message} currentTime={currentTime} />;
                    })}
                    {/* <Chat chatData = {chatData[0]}></Chat>
                    <Chat chatData = {chatData[0]}></Chat>
                    <Chat chatData = {chatData[0]}></Chat>
                    <Chat chatData = {chatData[0]}></Chat> */}
                </ul>
                {/* form onClick 시 로그인 안되있으면 로그인창으로 이동 */}
                <form className="chatInputForm">
                    <div className="inputWrap">
                        <div className="profileWrap">
                            {
                                storeState.id ? <img className="profileImg" src={profileIMG} alt="바인딩 해야함" /> : null
                            }
                            {
                                storeState.id ? <p className="profileID">{storeState.id}</p> : null
                            }    
                        </div>
                        <textarea maxLength="100" placeholder={storeState.id ? '댓글을 적어보세요' : '로그인을 해야합니다.'} cols="30" rows="10" wrap="soft" value={message} onChange={handleTextareaChange}></textarea>
                        {/* 글쓰기 누르면 스낵바 뜨는 것 처럼 모든 버튼에 스낵바 알림 필요  */}
                        <button className="submitBtn" onClick={handleSendMessage}>글쓰기</button> 
                        <div className="limit">100자 제한 (10/100)</div>
                    </div>
                </form>
            </div>
        </div>
    )
}

//개별 chat 
const Chat = ({chatData,message,currentTime})=>{
    const dispatch = useDispatch();
    
    const snackBarTime = useRef(null);
    const snackBar = (e, message) => {
        e.preventDefault();
        dispatch(openSnackBar(message));
        if (snackBarTime.current !== null) {
            clearTimeout(snackBarTime.current);
        }
        snackBarTime.current = setTimeout(() => {
            dispatch(closeSnackBar());
            snackBarTime.current = null;
        }, 2000);
    }

    return(
        <li className="chat">
            <div className="chatDate">{currentTime.toLocaleString()}</div>
            <div className="chat_left">
                <div className="profileWrap">
                    <img className="profileImg" src={profileIMG} alt="바인딩 해야함" />
                    <p className="profileID">{chatData.id}</p>
                    <div className={`profileAors ${chatData.aors}`}>{chatData.aors}</div>
                </div>
                <div className="txtWrap">
                    <p className="txt">
                       {message}
                    </p>
                </div>
            </div>
            <div className="chat_right">
                <button onClick={(e)=>{snackBar(e, '수정 완료 후 스낵바입니다.')}}><img src={editIcon} alt="" /></button>
                <button onClick={(e)=>{snackBar(e, '삭제 완료 후 스낵바입니다.')}}><img src={deleteIcon} alt="" /></button>
                <button onClick={(e)=>{snackBar(e, '좋아요 후 스낵바입니다.')}}><img src={like_no} alt="" /><span>{chatData.like}</span></button>
            </div>
        </li>
    )
}

export default MainChats;