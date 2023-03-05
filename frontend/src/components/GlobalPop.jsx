import { useDispatch, useSelector } from "react-redux";
import { closePop } from "../store";

const GlobalPop = ()=>{
    const result = useSelector(state => state)
    const dispatch = useDispatch();
    const nowClosePop = () =>{
        dispatch(closePop());
    }
    return(
        <>
        {
            result.globalPop.nowPopState &&
            <div className="globalPop">
                <div className="globalPop_inner">
                    <p>글로벌 팝업 테스트</p>
                    <button onClick={nowClosePop}>OK</button>
                </div>
            </div>
        }
        </>
    )
}

export default GlobalPop;