import { useSelector } from "react-redux";
import checkCircle from '../assets/images/icons/check_circle.png';

const SnackBar = ()=>{
    const storeState = useSelector(state => state.globalSnackBar)

    return(
            <div className={`globalSnackBar ${storeState.nowSnackBarState}`} >
                <div className="globalSnackBar_inner">
                    <p>{storeState.nowMessage}</p>
                    <img src={checkCircle} alt="checked" />
                </div>
            </div>
    )
}

export default SnackBar;