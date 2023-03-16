import downArrow from '../assets/images/icons/down_arrow.png'

const CompareAll = ()=>{
    return (
        <>
        <NowSelected></NowSelected>
        <div className="compareAllWrap">
            
        </div>
        </>
    )
}

const NowSelected = ()=>{
    return (
        <div className="nowSelected">
            <div className="buttonWrap">
                <p>현재 선택한 제품</p>
                <button className='downButton'><img src={downArrow} alt="" /></button>
            </div>
            <div className="inner">
                <div className="logoWrapApp"></div>
                <div className="tableWrap"></div>
                <div className="logoWrapSam"></div>
            </div>
        </div>
    )
}

export default CompareAll;
