import axios from 'axios';


const TestZone = ()=>{
    
    // api/chatmain/app/post, {type:'chatApp' or 'chatSam', text:내용, id: redux에 있는 id,} -> 응답: 수정 성공 시 dbPost, {stat:true, message:'댓글 포스팅 성공'} -> global SnackBar에 메시지 띄우기
    const postingTest = async ()=>{
        const result = await axios.post('/api/chatmain/app/post',{
            type:'chatApp',
            text: 'testZone에서 텍스트를 보냄',
            id : 'admin6',
        })
        console.log(result);
    }

    return (
        <div className='testZone'>
            <button onClick={()=>{postingTest()}}>this is test zone</button>
        </div>
    )
}

export default TestZone;
