/** @format */

import { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeSnackBar, openSnackBar } from "../store";
import axios from "axios";
import debounce from "lodash.debounce";
import deleteIcon from "../assets/images/icons/delete_24.png";
import editIcon from "../assets/images/icons/edit_24.png";
import like_no from "../assets/images/icons/like_no.png";
import like_yes from "../assets/images/icons/like_yes.png";
import profileIMG from "../assets/images/profile_img.jpeg";

//chat껍데기 component
const MainChats = ({ allData }) => {
  const dispatch = useDispatch();
  const storeState = useSelector((state) => state.user);

  //example Data Schema
  const [chatData, setChatData] = useState([]);
  //active 상태값 변경
  const [activeIndex, setActiveIndex] = useState(0);
  // textarea값 바꾸기 위한 state
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(0);
  const [load, setLoad] = useState(false);
  const [noData, setNoData] = useState(false);
  const preventRef = useRef(true);
  const obsRef = useRef(null);
  const endRef = useRef(false);
  const [refresh, setRefresh] = useState(false);
  const MAX_LENGTH = 100; // 최대 글자수
  // 수정레이어팝업 state
  const [isEditing, setIsEditing] = useState(false);
  const [chatTicket, setChatTicket] = useState();


  //API API API API API API API API API API API API API API API API API API API API API API API API API API API API API API API 
  //API API API API API API API API API API API API API API API API API API API API API API API API API API API API API API API 

  // 글쓰기를 누르면 post 요청
  const handleSendMessage = async (e) => {
    e.preventDefault(); // 이벤트의 기본 동작을 막음
    const data = { type: "chatApp", text: message, id: storeState.id }; // 전송할 데이터 생성
    const url = "/api/chatmain/app/post"; // 요청을 보낼 URL
    try {
      const result = await axios.post(url, data); // POST 요청 전송, 응답 받기
      const newData = result.data; // 응답 데이터 저장
      setMessage(""); // 입력창 초기화
      setRefresh(!refresh); // 화면 새로고침
      if (activeIndex !== 1) { // 채팅 탭이 활성화되어 있지 않으면
        setActiveIndex(1); // 채팅 탭을 활성화
      } 
      else {
        setRefresh(!refresh); // 채팅 탭이 이미 활성화된 경우, 화면 새로고침
      }
      // chatData 배열에 새로운 데이터를 추가
      setChatData((prev) => Array.isArray(prev) ? [...prev, ...(Array.isArray(newData) ? newData : [newData])] : newData);
    } 
    catch (error) { // 오류 발생 시
      console.error(error);
      alert("메시지를 보내는 동안 오류가 발생했습니다. 잠시 후 다시 시도해주세요."); // 사용자에게 알림
    }
  };

  // 스크롤을 내리면 get 요청
  const getPosts = useCallback(async () => {
    if (preventRef.current) {
      setLoad(false); // 이미 더 이상 데이터를 가져오지 않는 경우 로딩 중인 것을 표시 X
      return; // 종료
    }
    setLoad(true);
    const url = `/api/chatmain/app/recent?start=${page}&count=4`; // 가져올 데이터 범위 지정
    try {
      const result = await axios.get(url);
      if (result.data.end) { // 가져올 데이터가 더 이상 없는 경우, preventRef.current를 true로 설정
        endRef.current = true;
      } 
      else {
        if (result.data.stat) { // 가져온 데이터가 존재하는 경우, 기존 데이터 배열에 새로운 데이터를 추가
          const newData = result.data.data;
          setChatData((prev) => Array.isArray(prev) ? [...prev, ...(Array.isArray(newData) ? newData : [newData])] : newData);
          preventRef.current = true; // 이후의 get 요청 X
          setNoData(false); // 더 이상 데이터가 없는 것이 아님을 나타냄
        } 
        else { // 가져온 데이터가 없는 경우, 더 이상 데이터가 없다는 메시지를 표시
          setNoData(true);
          obsRef.current.textContent = "더 이상 데이터가 없습니다.";
        }
      }
    } 
    catch (error) { // 에러가 발생한 경우 콘솔에 로그를 출력
      console.error(error);
    } 
    finally { // 로딩 중 표시를 해제
      setLoad(false);
    }
    }, [page]);

  // 글 삭제버튼을 누르면 delete 요청
  const handleDelete = async (ticket) => {
    const idx = chatData.findIndex( chat => chat.ticket === ticket );  // 선택한 게시물의 인덱스 찾기
    const data = { type: "chatApp", id: storeState.id }; // 요청 데이터 설정
    const url = `/api/chatmain/app/delete/${ticket}`; // 요청 url 설정 
    try {
      const result = await axios.delete(url, { data: data });  // delete 요청 보내기
      const updatedChatData = [...chatData]; // chatData 배열에서 선택한 게시물 삭제하기
      updatedChatData.splice(idx, 1);
      setChatData(updatedChatData);
    } 
    catch (error) {
      console.error(error);
      alert("삭제할 권한이 없습니다."); // 권한이 없는 경우 알림창 띄우기
    }
  };

  // 좋아요 버튼을 누르면 해당 채팅방에 대한 좋아요를 서버로 보내는 함수
  const handleSendLike = async (ticket) => {
    const idx = chatData.findIndex((chat) => chat.ticket === ticket); // 현재 클릭된 채팅방의 인덱스를 찾음
    const data = { type: "chatApp", id: storeState.id };  // 서버로 보낼 데이터 생성 
    const url = `/api/chatmain/app/like/${ticket}`; // 요청할 API URL
    try {
      const result = await axios.patch(url, { data: data }); // API 요청을 async/await 구문으로 변경
      const newData = result.data;
      const updatedChatData = [...chatData];
    if (newData.stat === false) { // 새로운 좋아요 상태에 따라 채팅방 데이터 갱신
      updatedChatData[idx].like--;
      updatedChatData[idx].isLike = false;
      setChatData(updatedChatData);
    } 
    else {
      updatedChatData[idx].like++;
      updatedChatData[idx].isLike = true;
      setChatData(updatedChatData);
    }
    } 
    catch (error) {
      console.error(error);
    }
  };

  // 글수정버튼을 누르면 put 요청
  const handleEdit = async (text) => {
    console.log(chatTicket)
    try {
      const idx = chatData.findIndex((chat) => chat.ticket === chatTicket); // 수정할 게시물의 인덱스를 찾음
      const data = { type: "chatApp", text: text, id: storeState.id };   // 수정할 데이터와 함께 요청 보냄
      const url = `/api/chatmain/app/update/${chatTicket}`;
      const result = await axios.put(url, data);
      if(!result.data.stat){
        throw new Error(result.data.message)
      }
      const updatedChatData = [...chatData]; // 수정된 데이터를 chatData 배열에 반영
      updatedChatData[idx].text = text;
      setChatData(updatedChatData);
      setIsEditing(false); // 팝업 닫기
      
    } 
    catch (error) {
      console.error(error);
      alert(error)
      setIsEditing(false); // 팝업 닫기
    }
};

  //API API API API API API API API API API API API API API API API API API API API API API API API API API API API API API API 
  //API API API API API API API API API API API API API API API API API API API API API API API API API API API API API API API 

  // Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook
  // Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook

  // 무한스크롤 실행
  useEffect(() => {
    debouncedGetPosts();
  }, [page]);

  useEffect(()=>{ //의존성 페이지 업데이트 분리
    setPage(0)
  },[activeIndex, refresh])

  // 탭이 바꼈을때와 최신순 버튼이 유지될때 로직
  useEffect(() => {
    (async () => { // IIFE
      const url = activeIndex === 0 ? "/api/chatmain/app/popular/0" : `/api/chatmain/app/recent?start=${page}&count=4`;
      try {
        const result = await axios.get(url);
        const newData = result.data.data;
        setChatData(newData);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [activeIndex, refresh]);

  // 탭이 최신순일때만 무한스크롤 리프레쉬
  useEffect(() => {
    if (activeIndex === 0) return;
    const observer = new IntersectionObserver(obsHandler, { threshold: 0.2 });
    if (obsRef.current) observer.observe(obsRef.current);
    return () => {
      observer.disconnect();
    };
  }, [activeIndex]);

  // Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook
  // Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook Hook

  //탭 클릭했을때 state변경
  const handleClick = (i) => {
    setActiveIndex(i);
  };

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
  };

  // 최대 글자수를 초과하면 입력을 막음
  const handleTextareaChange = event => {
    const value = event.target.value;
    if (value.length > MAX_LENGTH) {
      alert('최대 글자수를 초과했습니다.')
      return;
    }
    setMessage(value);
  };

  // IntersectionObserver 핸들러 페이지 4개씩 추가
  const obsHandler = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && !endRef.current && preventRef.current) {
      preventRef.current = false;
      setPage((prev) => prev + 4);
    }
  };

  // 무한스크롤 활성화
  const debouncedGetPosts = useCallback(
    debounce(() => {
      // setLoad(true);
      getPosts();
      console.log(load);
    }, 1500),
    [getPosts]
  );

  return (
    <>
      <div className={`phoneWrap ${allData.type}`}>
        <img className='background' src={allData.background} alt='' />
        <div className='chatsWrap'>
          <div className='tabMenu'>
            {/* /api/chatmain/popular */}
            <button className={activeIndex === 0 ? "active" : ""} onClick={() => handleClick(0)}>
              인기순
            </button>
            {/* /api/chatmain/recent */}
            <button className={activeIndex === 1 ? "active" : ""} onClick={() => handleClick(1)}>
              최신순
            </button>
          </div>
          <ul className='chatsList'>
            {chatData &&
              chatData.map((chat) => {
                return (
                  <Chat
                    key={chat._id}
                    chatData={chat}
                    handleDelete={handleDelete}
                    handleSendLike={handleSendLike}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    setChatTicket={setChatTicket}
                    storeState={storeState}
                  />
                );
              })}
            {activeIndex === 1 ? (
              <li ref={obsRef} className={noData ? "obs no-data" : "obs hide"}>
                {noData ? "데이터가 더 이상 없습니다." : "옵저버"}
              </li>
            ) : (
              ""
            )}
          </ul>
          {load && <div className='spinner'></div>}
          {/* form onClick 시 로그인 안되있으면 로그인창으로 이동 */}
          <form className='chatInputForm' onSubmit={(e)=>{handleSendMessage(e); setTimeout(()=>{snackBar(e,'글 등록이 완료되었습니다.')},1000)}}>
            <div className='inputWrap'>
              <div className='profileWrap'>
                {storeState.id && <img className='profileImg' src={profileIMG} alt='바인딩 해야함' /> }
                {storeState.id && <p className='profileID'>{storeState.id}</p> }
              </div>
              <textarea
                maxLength='100'
                placeholder={storeState.id ? "댓글을 적어보세요" : "로그인을 해야합니다."}
                cols='30'
                rows='10'
                wrap='soft'
                value={message}
                onChange={handleTextareaChange}
              ></textarea>
              {/* 글쓰기 누르면 스낵바 뜨는 것 처럼 모든 버튼에 스낵바 알림 필요  */}
              <button className='submitBtn'>글쓰기</button>
              <div className='limit'>
                {MAX_LENGTH}자 제한 ({message.length}/{MAX_LENGTH})
              </div>
            </div>
          </form>
        </div>
      </div>
      {isEditing && <EditModal chatData={chatData} handleEdit={handleEdit} setIsEditing={setIsEditing} snackBar={snackBar} /> }
    </>
  );
};

//개별 chat
const Chat = ({ chatData, handleDelete, handleSendLike, setIsEditing, setChatTicket,storeState }) => {
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
  };
  // chatData.createdAt 문자열을 Date 객체로 변환하고, KST로 변환
  const date = new Date(chatData.createdAt);
  date.setHours(date.getHours()); // UTC 시간에 9시간을 더해서 KST로 변환
  // 날짜 객체를 원하는 형식의 문자열로 변환
  const dateString = date.toLocaleString("ko-KR", { timeZone: "Asia/Seoul", hour12: false, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }).replace(/\. /g, "-");
  return (
    <li className='chat'>
      <div className='chatDate'>{dateString}</div>
      <div className='chat_left'>
        <div className='profileWrap'>
          <img className='profileImg' src={profileIMG} alt='바인딩 해야함' />
          <p className='profileID'>{chatData.id}</p>
          <div className={`profileAors ${chatData.aors}`}>{chatData.aors}</div>
        </div>
        <div className='txtWrap'>
          <p className="disclaimer" style={{color:'#666666', fontSize:12, marginBottom:10}}>ticket : {chatData.ticket} (test용)</p>
          <p className='txt'>{chatData.text}</p>
        </div>
      </div>
      <div className='chat_right'>
        {
          storeState.id === chatData.id &&
          <button onClick={() =>{setIsEditing(true); setChatTicket(chatData.ticket);}}>
            <img src={editIcon} alt='' />
          </button>
        }
        {
          storeState.id === chatData.id &&
          <button onClick={(e) =>{handleDelete(chatData.ticket); snackBar(e,'삭제가 완료되었습니다.')}}>
            <img src={deleteIcon} alt='' />
          </button> 
        }
        <button onClick={(e) =>{handleSendLike(chatData.ticket);}}>
          <img src={chatData.isLike ? like_yes : like_no} alt='' />
          <span>{chatData.like}</span>
        </button>
      </div>
    </li>
  );
};

const EditModal = ({ chatData, handleEdit, setIsEditing,snackBar }) => {
  const [text, setText] = useState(chatData.text);
  const handleSubmit = (e) => {
    e.preventDefault();
    handleEdit(text);
  };
  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className='edit-modal'>
      <form>
        <h2>수정하기</h2>
        <div className='inner'>
          <textarea value={text} onChange={(e) => setText(e.target.value)} />
          <div className='edit-modal-buttons'>
            <button type='submit' className='submit_btn' onClick={(e)=>{handleSubmit(e); setTimeout(()=>{snackBar(e,'수정이 완료되었습니다.')},900);}}>
              수정
            </button>
            <button type='button' onClick={handleCancel} className='cancel_btn'>
              취소
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default MainChats;
