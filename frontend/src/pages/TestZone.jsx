import axios from 'axios';


const TestZone = ()=>{
    
    // api/chatmain/app/post, {type:'chatApp' or 'chatSam', text:내용, id: redux에 있는 id,} 
    const postingTest = async ()=>{
        const result = await axios.post('/api/chatmain/app/post',{
            type:'chatApp',
            text: 'testZone에서 텍스트를 보냄',
            id : 'admin6',
        })
        console.log(result);
    }

    // api/chatmain/:type/update/:ticket , {type:'chatApp' or 'chatSam', text:'내용', id:redux에 있는 id}
    const updateTest = async () =>{
        const result = await axios.put('/api/chatmain/app/update/1', {type:'chatApp', text:'testZone에서 text입력', id:'admin3'})
        console.log(result)
    }
    

    return (
        <div className='testZone'>
            <button onClick={()=>{postingTest()}}>포스팅테스트(통과)</button>
            <button onClick={()=>{updateTest()}}>수정테스트(통과)</button> 
        </div>
    )
}

export default TestZone;
