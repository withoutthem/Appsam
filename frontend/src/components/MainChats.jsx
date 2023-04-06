/** @format */

import { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeSnackBar, openSnackBar } from "../store";
import axios from "axios";
import debounce from "lodash.debounce";

import deleteIcon from "../assets/images/icons/delete_24.png";
import editIcon from "../assets/images/icons/edit_24.png";
import like_no from "../assets/images/icons/like_no.png";
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
              return <Chat key={chat._id} chatData={chat} handleDelete={handleDelete} />;
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
  );
};

//개별 chat
const Chat = ({ chatData, message, currentTime, handleDelete }) => {
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

  return (
    <li className='chat'>
      <div className='chatDate'></div>
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
        <button
          onClick={(e) => {
            snackBar(e, "수정 완료 후 스낵바입니다.");
          }}
        >
          <img src={editIcon} alt='' />
        </button>
        <button
          onClick={() => {
            handleDelete(chatData.ticket);
          }}
        >
          <img src={deleteIcon} alt='' />
        </button>
        <button
          onClick={(e) => {
            snackBar(e, "좋아요 후 스낵바입니다.");
          }}
        >
          <img src={like_no} alt='' />
          <span>{chatData.like}</span>
        </button>
      </div>
    </li>
  );
};

export default MainChats;
