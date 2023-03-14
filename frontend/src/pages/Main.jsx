//libs
import { useState } from "react";
import { Link } from "react-router-dom";
//images
import IMG_mainVisual from '../assets/images/visual.png';
import IMG_mainIphone from '../assets/images/main_iph.png';
import IMG_mainGalaxy from '../assets/images/main_sam.png';
//components
import MainChats from "../components/MainChats";

const Main = ()=>{
    
    const [barState, setBarState]= useState([30,70])
    const [typeData , setTypeData] = useState({
        appleData:{
            type:'typeA',
            background:IMG_mainIphone
        },
        samsungData:{
            type:'typeB',
            background:IMG_mainGalaxy
        }
    })

    return (
        <div className="visualWrap">
            <div className="ratioBarWrap">
                <div className="appBar" style={{width: barState[0]+'%'}} ></div>
                <div className="samBar" style={{width: barState[1]+'%'}}></div>
            </div>
            <div className="visual">
                <img src={IMG_mainVisual} alt="" />
                <div className="floatingBtnWrap">
                    <Link className="boxShadow" to='/compareone'>제품 비교</Link>
                    <Link className="boxShadow" to='/compareall'>풀세트 비교</Link>
                    <Link className="boxShadow" to='/donation'>후원하기</Link>
                </div>                
            </div>
            <MainChats allData={typeData.appleData}></MainChats>
            <MainChats allData={typeData.samsungData}></MainChats>
        </div>
    )

}

export default Main;