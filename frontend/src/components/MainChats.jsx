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
  // 글쓰기를 누르면 post 요청
  const handleSendMessage = (e) => {
    e.preventDefault();
    const data = { type: "chatApp", text: message, id: storeState.id };
    console.log("전송 데이터:", data); // 추가
    const url = "/api/chatmain/app/post";
    axios
      .post(url, data)
      .then((response) => {
        const newData = response.data;
        console.log(newData);
        setMessage("");
        setRefresh(!refresh);
        if (activeIndex !== 1) {
          setActiveIndex(1);
        } else {
          setRefresh(!refresh);
        }
        setChatData((prev) =>
          Array.isArray(prev)
            ? [...prev, ...(Array.isArray(newData) ? newData : [newData])]
            : newData
        );
      })
      .catch((error) => {
        console.error(error);
        console.log(error);
        alert("메시지를 보내는 동안 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      });
  };

  // 글 삭제버튼을 누르면 delete 요청
  const handleDelete = (ticket) => {
    const idx = chatData.findIndex((chat) => chat.ticket === ticket);
    const data = { type: "chatApp", id: storeState.id };
    const url = `/api/chatmain/app/delete/${ticket}`;
    axios
      .delete(url, { data: data })
      .then((response) => {
        const newData = response.data;
        console.log(newData);
        // 삭제한 데이터를 chatData 배열에서 제거
        const updatedChatData = [...chatData];
        updatedChatData.splice(idx, 1);
        setChatData(updatedChatData);
      })
      .catch((error) => {
        console.error(error);
        alert("삭제할 권한이 없습니다.");
      });
  };

  // 좋아요버튼을 누르면 patch 요청
  const handleSendLike = (ticket) => {
    const idx = chatData.findIndex((chat) => chat.ticket === ticket);
    const data = { type: "chatApp", id: storeState.id };
    const url = `/api/chatmain/app/like/${ticket}`;
    axios
      .patch(url, { data: data })
      .then((response) => {
        const newData = response.data;
        const updatedChatData = [...chatData];
        if (newData.stat === false) {
          updatedChatData[idx].like = updatedChatData[idx].like - 1;
          updatedChatData[idx].isLike = false;
          setChatData(updatedChatData);
        } else {
          updatedChatData[idx].like = updatedChatData[idx].like + 1; // 좋아요 수 증가
          updatedChatData[idx].isLike = true;
          setChatData(updatedChatData);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // 글숴정버튼을 누르면 put 요청
  const handleEdit = async (text) => {
    try {
      console.log(chatTicket, text);
      const idx = chatData.findIndex((chat) => chat.ticket === chatTicket);
      const data = { type: "chatApp", text: text, id: storeState.id };
      const url = `/api/chatmain/app/update/${chatTicket}`;
      const response = await axios.put(url, data);
      const updatedChatData = [...chatData];
      updatedChatData[idx].text = text;
      setChatData(updatedChatData);
      setIsEditing(false);
      console.log(response);
    } catch (error) {
      console.error(error);
      setIsEditing(false);
    }
  };

  // 최대 글자수를 초과하면 입력을 막음
  const handleTextareaChange = (event) => {
    const value = event.target.value;
    if (value.length > MAX_LENGTH) {
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

  //get 통신으로 데이터 4개씩 가져오기
  const getPosts = useCallback(() => {
    //page추가
    if (preventRef.current) {
      setLoad(false);
      return;
    }
    setLoad(true);
    const url = `/api/chatmain/app/recent?start=${page}&count=4`;
    axios
      .get(url)
      .then((res) => {
        if (res.data.end) {
          endRef.current = true;
          console.log(res.data);
        } else {
          if (res.data.stat) {
            const newData = res.data.data;
            setChatData((prev) =>
              Array.isArray(prev)
                ? [...prev, ...(Array.isArray(newData) ? newData : [newData])]
                : newData
            );
            preventRef.current = true;
            setNoData(false);
          } else {
            setNoData(true);
            obsRef.current.textContent = "더 이상 데이터가 없습니다.";
          }
        }
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setLoad(false);
      });
  }, [page]);

  // 무한스크롤 활성화
  const debouncedGetPosts = useCallback(
    debounce(() => {
      // setLoad(true);
      getPosts();
      console.log(load);
    }, 1500),
    [getPosts]
  );

  // 무한스크롤 실행
  useEffect(() => {
    debouncedGetPosts();
  }, [page]);

  // 탭이 바꼈을때와 최신순 버튼이 유지될때 로직
  useEffect(() => {
    setPage(0);
    console.log("포스트성곧");
    const url =
      activeIndex === 0
        ? "/api/chatmain/app/popular/0"
        : `/api/chatmain/app/recent?start=${page}&count=4`;
    axios
      .get(url)
      .then((response) => {
        const newData = response.data.data;
        setChatData(newData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [activeIndex, refresh]);

  //탭 클릭했을때 state변경
  const handleClick = (i) => {
    setActiveIndex(i);
  };

  // 탭이 최신순일때만 무한스크롤 리프레쉬
  useEffect(() => {
    if (activeIndex === 0) return;
    const observer = new IntersectionObserver(obsHandler, { threshold: 0.2 });
    if (obsRef.current) observer.observe(obsRef.current);
    return () => {
      observer.disconnect();
    };
  }, [activeIndex]);

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
            {/* <Chat chatData = {chatData[0]}></Chat>
                      <Chat chatData = {chatData[0]}></Chat>
                      <Chat chatData = {chatData[0]}></Chat>
                      <Chat chatData = {chatData[0]}></Chat> */}
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
          <form className='chatInputForm' onSubmit={handleSendMessage}>
            <div className='inputWrap'>
              <div className='profileWrap'>
                {storeState.id ? (
                  <img className='profileImg' src={profileIMG} alt='바인딩 해야함' />
                ) : null}
                {storeState.id ? <p className='profileID'>{storeState.id}</p> : null}
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
      {isEditing && (
        <EditModal chatData={chatData} handleEdit={handleEdit} setIsEditing={setIsEditing} />
      )}
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
  date.setHours(date.getHours() + 9); // UTC 시간에 9시간을 더해서 KST로 변환
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
          <p className='txt'>{chatData.text}</p>
        </div>
      </div>
      <div className='chat_right'>
        {storeState.id === chatData.id ? 
        <button
          onClick={() => {
            setIsEditing(true);
            setChatTicket(chatData.ticket);
          }}
        >
          <img src={editIcon} alt='' />
        </button> : null}
        {storeState.id === chatData.id ?
         <button
         onClick={() => {
           handleDelete(chatData.ticket);
         }}
       >
         <img src={deleteIcon} alt='' />
       </button> : null  
      }
        <button
          onClick={(e) => {
            handleSendLike(chatData.ticket);
          }}
        >
          <img src={chatData.isLike ? like_yes : like_no} alt='' />
          <span>{chatData.like}</span>
        </button>
      </div>
    </li>
  );
};

const EditModal = ({ chatData, handleEdit, setIsEditing }) => {
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
            <button type='submit' className='submit_btn' onClick={handleSubmit}>
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
