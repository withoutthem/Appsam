import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { openPop } from '../store'
import deleteIcon from '../assets/images/icons/delete_24.png'
import editIcon from '../assets/images/icons/edit_24.png'
import like_no from '../assets/images/icons/like_no.png'
import profileIMG  from '../assets/images/profile_img.jpeg' ;

// 서버데이터 반영 이후 지울 것
//api 목록
// <GET>
// /api/chatmain/popular : 초기요청, 인기순 4개
// /api/chatmain/recent : 최신순 4개
// /api/chatmain/popular/1 : 두번째요청, 첫 인기순 4개 이후 4개, 맨뒤 /:id 증가할수록 뒤에 요청 가능, 자료 없을 시 {stat:false, message:'더이상 없습니다' 반환}
// /api/chatmain/recent/1 : 두번째요청, 첫 최신순 4개 이후 4개 ... 나머지 동일

// 수정 <PUT>
// api/chatmain/update/:ticket , {text:'내용', id:redux에 있는 id} -> 응답 : 수정 성공 시 db 내용 바꿈, {stat:true, message:'수정 성공'} -> global SnackBar에 메시지 띄우기
// 삭제 <Delete>
// api/chatmain/delete/:ticket , {id:redux에 있는 id} -> 응답 : 삭제 성공 시 db 글 삭제, {stat:true, message:'삭제 성공'} -> global SnackBar에 메시지 띄우기
// 좋아요 <PATCH>
// api/chatmain/like/:ticket , {id:redux에 있는 id} -> 응답 : 좋아요 성공 시 db 글 좋아요 내역 +1 {stat:true, message: '좋아요 성공'} -> global SnackBar에 메시지 띄우기

//chat껍데기 component
const MainChats = ({allData})=>{
    const dispatch = useDispatch();

    //example Data Schema
    const [chatData, setChatData] = useState(
        [{
            ticket:'11', // 문서 고유값
            id:'admin11', //작성자 아이디
            profile_img:'', //이미지 url
            aors : 'Apple', //Apple / Samsung / None 중 하나
            text:'', //글내용
            like : 4, // 좋아요 수,
            likes : false, // 내가 이 글에 좋아요 했는 지 보내줌
            time : '' //작성일, 시간
        }]
    );

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
                    <Chat chatData = {chatData[0]}></Chat>
                    <Chat chatData = {chatData[0]}></Chat>
                    <Chat chatData = {chatData[0]}></Chat>
                    <Chat chatData = {chatData[0]}></Chat>
                </ul>
                <form className="chatInputForm">
                    <input type="text" />
                    <button onClick={(e)=>{e.preventDefault(); dispatch(openPop('진짜 보낼거임?'))}}>보내기</button>
                </form>
            </div>
        </div>
    )
}

//개별 chat 
const Chat = ({chatData})=>{
    return(
        <li className="chat">
            <div className="chatDate">2023-02-10 15:24</div>
            <div className="chat_left">
                <div className="profileWrap">
                    <img className="profileImg" src={profileIMG} alt="바인딩 해야함" />
                    <p className="profileID">{chatData.id}</p>
                    <div className={`profileAors ${chatData.aors}`}>{chatData.aors}</div>
                </div>
                <div className="txtWrap">
                    <p className="txt">
                        Lorem ipsum dolor sit aas asdfasdfasdf asf asdf asd fdas
                    </p>
                </div>
            </div>
            <div className="chat_right">
                <button><img src={editIcon} alt="" /></button>
                <button><img src={deleteIcon} alt="" /></button>
                <button><img src={like_no} alt="" /><span>{chatData.like}</span></button>
            </div>
        </li>
    )
}

export default MainChats;