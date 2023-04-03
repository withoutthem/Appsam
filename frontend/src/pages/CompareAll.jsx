import appLogo from '../assets/images/apple_logo.png';
import samLogo from '../assets/images/sam_logo.png';

import CompareAllHeader from '../components/CompareAllHeader';
import CompareAllTableSet from '../components/CompareAllTableSet';

import { useState, useEffect } from 'react'
import axios from 'axios';

// 메인 로직

// page 마운트 시 '/api/product/getgrade?grade=flagship' 로 get요청을 통해 각 회사2가지, 기기종류6가지 총12개의 플래그쉽제품정보를 전체 표에 뿌려준다. -> useMemo 캐시 메모이제이션을 통해 재요청하지 않도록 한다.

// page 마운트 시 '/api/product/getproductlist' 로 get요청을 통해 모든 제품의 리스트를 가져온다. (상세정보는 제외된 데이터다.) : 각각의 selectBox에 바인딩한다.

// selectBox에서 하나의 제품을 고를 경우 '/api/product/getoneproduct?name=제품이름' 으로 get요청을 통해 제품의 데이터를 가져와 CompareAllTableSet에 props로 내려서 렌더링한다.

// 단, 들어온 데이터를 메모이제이션 하여 제품이 로컬에 존재하지 않을 경우에만 get요청을 한다. 로컬 캐시에 존재할 경우 그 데이터를 가져온다. useMemo를 활용하면 될듯하다.

// 현재 고른 제품을 state로 저장하여 CompareAllHead er에 props로 내려서 상단 팝업과 동기화한다. 상단 팝업에서 선택할 경우에도 현재 비교중인 제품 변경이 가능하다.

const CompareAll = ()=>{

  const [allList, setAllList] = useState();
  const [allData, setAllData] = useState();
  const [baseData, setBaseData] = useState();

  const getAllData = async ()=>{ //예시 
    const allProduct = await axios.get('/api/product/getgrade?grade=flagship');
    setBaseData(allProduct);
  }

  useEffect( () => { //예시
    getAllData();
  }, []);

    return (
        <>
        <CompareAllHeader></CompareAllHeader>
        <div className="compareAllWrap">
            <div className="disclaimer">
              <p>
                1. 2020제품부터 비교 가능합니다. <br/>
                2. 표기되지 않은 자세한 스펙은 공홈을 참고하세요. 아주 간혹 오타도 있을 수 있으니 주의하시기 바랍니다.<br/>
                3. 사용자의 구매의사 및 결정에 대해서 책임지지 않습니다.<br/>
                4. 평가에는 에디터의 개인적인 의견이 포함되어 있습니다. <br/>
                5. 가격의 기준은 출고가 입니다. 나중에 중고가 가격기준도 추가 해보겠습니다. 
              </p>
            </div>
            <div className="fast apple">
              <div className="logoSizer">
                <img src={appLogo} alt="" />
              </div>
              <div className="badgeWrap">
                {/* 클릭 한번에 모든 셋을 대입하는 컨트롤러 */}
                <button className="badge flagship">플래그쉽</button>
                <button className="badge latest_release">가장최신</button>
                <button className="badge masterpiece">명작</button>
                <button className="badge cost_effectiveness">가성비인증</button>
              </div>
            </div>
            <div className="fast samsung">
              <div className="logoSizer">
                <img src={samLogo} alt="" />
              </div>
              <div className="badgeWrap">
                {/* 클릭 한번에 모든 셋을 대입하는 컨트롤러 */}
                <button className="badge flagship">플래그쉽</button>
                <button className="badge latest_release">가장최신</button>
                <button className="badge masterpiece">명작</button>
                <button className="badge cost_effectiveness">가성비인증</button>
              </div>
            </div>
        </div>
        <CompareAllTableSet></CompareAllTableSet>
        </>
    )
}


export default CompareAll;
