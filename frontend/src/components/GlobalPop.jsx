import { useDispatch, useSelector } from "react-redux";
import { closePop } from "../store";

const GlobalPop = ()=>{
    const storeState = useSelector(state => state.globalPop)
    const dispatch = useDispatch();
    const nowClosePop = () =>{
        dispatch(closePop());
    }
    return(
        <>
        {
            storeState.nowPopState &&
            <div className="globalPop">
                <div className="globalPop_inner">
                    <p>{storeState.nowMessage}</p>
                    <button onClick={nowClosePop}>OK</button>
                    <button className="globalPop_xBtn" onClick={nowClosePop}>x</button>
                </div>
                
            </div>
        }
        </>
    )
}

export default GlobalPop;