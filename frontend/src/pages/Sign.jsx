import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import {validationID, validationPS} from '../util/validation';


const Sign = () =>{
    
    const [userInfo, setUserInfo] = useState({
        id: {value:'', valid : false},
        ps: {value:'', valid : false},
        email: {value:'', valid : false},
        name: {value:'', valid : false},
        aors: {value:'', valid: true}
    })
    
    const setInfo = (key, value)=>{
        let nowInfo = {...userInfo};
        nowInfo[key]['value'] = value;
        setUserInfo(nowInfo);
    }

    return (
        <div className="signWrap">
            id : <input type="text" value={userInfo.id} onChange={(e)=>{validationID(e.target.value, setInfo)}} />
            ps : <input type="password" value={userInfo.ps} onChange={(e)=>{validationPS(e.target.value, setInfo)}} />
            email : <input type="email" />
            name : <input type="text" />
            nickName : <input type="text" />
            I'm 
            <select name="" id="">
                <option value="Apple">Apple</option>
                <option value="Samsung">Samsung</option>
            </select>
            {
                userInfo.id
            }
        </div>
    )
}

export default Sign;