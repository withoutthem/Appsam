import axios from 'axios';


const TestZone = ()=>{
    
    // api/chatmain/app/post, {type:'chatApp' or 'chatSam', text:내용, id: redux에 있는 id,} 
    // 포스트를 게시하는데, admin6로 접속해있어야하며, 타입을 정확히 입력하여 요청해야함.
    const postingTest = async ()=>{
        const result = await axios.post('/api/chatmain/app/post',{
            type:'chatApp',
            text: 'testZone에서 텍스트를 보냄',
            id : 'admin6',
        })
        console.log(result);
    }

    // api/chatmain/:type/update/:ticket , {type:'chatApp' or 'chatSam', text:'내용', id:redux에 있는 id}
    // 1번 티켓(포스트의 고유번호)을 가지고 있는 포스트를 수정하는데, admin3로 접속해있어야하며, 타입을 정확히 입력하여 요청해야함.
    const updateTest = async () =>{
        const result = await axios.put('/api/chatmain/app/update/1', {
            type:'chatApp', 
            text:'testZone에서 text입력', 
            id:'admin3'
        })
        console.log(result)
    }

    // api/chatmain/:type/delete/:ticket , {type:'chatApp' or 'chatSam', id:redux에 있는 id}
    // 2번 티켓(포스트의 고유번호)을 가지고 있는 포스트를 삭제하는데, admin1로 접속해있어야하며, 타입을 정확히 입력하여 요청해야함.
    const deleteTest = async () => {
        const result = await axios.delete('/api/chatmain/app/delete/2', {
            data: { 
                type: 'chatApp', 
                id: 'admin1' 
            },
        });
        console.log(result);
    };

    // api/chatmain/:type/like/:ticket , {type:'chatApp' or 'chatSam', id:redux에 있는 id} 
    // ticket번호를 가지고 있는 포스트의 좋아요 배열에 현재 내 아이디가 있으면 좋아요를 -1하고 배열에서 내아이디 삭제
    // 배열에 현재 내 아이디가 없으면 좋아요를 +1하고 배열에 내 아이디 추가
    const likePostTest = async (type, ticket) => {
        try {
            const response = await axios.patch(`/api/chatmain/${type}/like/${ticket}`);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='testZone'>
            <button onClick={()=>{postingTest()}}>포스팅테스트(통과)</button>
            <button onClick={()=>{updateTest()}}>수정테스트(통과)</button> 
            <button onClick={()=>{deleteTest()}}>삭제테스트(통과)</button> 
            <button onClick={()=>{likePostTest('app', 1)}}>좋아요테스트(통과)</button> 
        </div>
    )
}

export default TestZone;
