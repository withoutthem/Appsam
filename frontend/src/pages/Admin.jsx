import axios from "axios";
import { useState, useCallback } from "react";

const Admin = () =>{

  const initialProduct = //제품정보 초기상태
  {
    companyType:'app', //'app' or 'sam'
    productType:'pc', // 'pc', 'mo', 'tablet', 'watch', 'laptop', 'earbuds'
    productName:'',
    productImg:'', // img uri
    badge:[],
    spec:{ //{value : 값, eval: 값에 대한 평가}
      released:{value:'', eval:''}, //출시일
      ap:{value:'', eval:''}, //AP (칩셋)
      memory:{value:'', eval:''}, //메모리
      display:{value:'', eval:''}, //디스플레이스펙
      camera:{value:'', eval:''}, //카메라스펙
      battery:{value:'', eval:''}, //배터리용량
      color:{value:'', eval:''}, //컬러 뭐뭐나왔음
      weight:{value:'', eval:''}, // 제품 무게
      bioAuth:{value:'', eval:''}, // 생체인증
      etc:{value:'', eval:''}, //기타사항 나열
      price:{value:'', eval:''}, // 예시 : {value : 값, eval: 너무 싸다 비싸다}
      pros:{value:'', eval:''}, // 장점 나열
      cons:{value:'', eval:''}, // 단점 나열
      summary:{value:'', eval:''} // 제품에 대한 총평
    },
    like:0, //좋아요 누른 사람
    likes:[], //좋아요 누른 사람들 목록
  }

  // 제품정보 스키마
  const [productInfo, setProductInfo] = useState(initialProduct)

  const inputChange = useCallback((e, key) => { //1뎁스 change
    setProductInfo(state => {
      let tempInfo = { ...state };
      tempInfo[key] = e; //스펙의 값
      return tempInfo;
    });
  }, [setProductInfo]);

  const specChange = useCallback((e, key) => { //spec depth 값 change
    setProductInfo(state => {
      let tempInfo = { ...state };
      let tempSpec = { ...tempInfo.spec };
      tempSpec[`${key}`].value = e;
      tempInfo.spec = tempSpec;
      return tempInfo;
    });
  }, [setProductInfo]);

  const specChangeEval = useCallback((e, key) => { //spec depth eval change
    setProductInfo(state => {
      let tempInfo = { ...state };
      let tempSpec = { ...tempInfo.spec };
      tempSpec[`${key}`].eval = e;
      tempInfo.spec = tempSpec;
      return tempInfo;
    });
  }, [setProductInfo]);

  const badgeOptions = [ //뱃지 옵션들
    "value_for_money",
    "entry_level",
    "mid_high_level",
    "flagship",
    "latest_release",
    "masterpiece",
    "cost_effectiveness",
  ];
  
  const onBadgeChange = (e) => { //뱃지 체크박스로 추가하는 함수
    const { value, checked } = e.target;
    setProductInfo((prevState) => {
      const updatedBadges = checked
        ? [...prevState.badge, value]
        : prevState.badge.filter((badge) => badge !== value);
  
      return { ...prevState, badge: updatedBadges };
    });
  };

  const renderSpecs = () => {
    return Object.entries(productInfo.spec).map(([key, spec]) => {
      return (
        <div className="specWrap" key={key}>
          <h4>
            {key}: 
          </h4>
          <input
            type="text"
            value={spec.value}
            onChange={(e) => specChange(e.target.value, key)}
          />
          <h4>eval</h4>
          <input
            type="text"
            value={spec.eval}
            onChange={(e) => specChangeEval(e.target.value, key)}
          />
          <br />
        </div>
      );
    });
  };
  



  const onSubmitTest = async (e)=>{ //제품 추가 api 요청
    e.preventDefault();
    try{
      const result = await axios.post('/api/product/add', {productInfo})
      console.log(result)
      if(result.data.stat){
        const consoleTest = result.data.message ? result.data.message : '메시지가 없다요'
        setProductInfo({...initialProduct});
        alert('성공')
      }
      else{
        throw new Error('에러가 났다.')
      }
    }
    catch(e){
      console.log(e)
    }
  }




  return(
    <div className="adminTest" style={{padding:20}}>
      <h1>제품 등록 페이지 (관리자용)</h1><br></br>
      <button style={{background:'lightblue', padding:20, color:'#101010'}} onClick={()=>{console.log(productInfo)}}>현재 state 확인버튼(콘솔)</button>
      <br></br><br></br>
      <form action="POST" onSubmit={(e)=>{onSubmitTest(e)}}>
        <h4>companyType :</h4>
        <select name="companyType" id="companyType" value={productInfo.companyType} onChange={(e)=>{inputChange(e.target.value, 'companyType')}}>
          <option value="app">app</option>
          <option value="sam">sam</option>
        </select><br></br><br></br>

        <h4>productType :</h4>
        <select name="productType" id="productType" value={productInfo.productType} onChange={(e)=>{inputChange(e.target.value, 'productType')}}>
          <option value="pc">pc</option>
          <option value="mo">mo</option>
          <option value="tablet">tablet</option>
          <option value="watch">watch</option>
          <option value="laptop">laptop</option>
          <option value="earbuds">earbuds</option>
        </select><br></br><br></br>

        <div className="inputWrap">
          <h4>productName :</h4> 
          <input type="text" value={productInfo.productName} onChange={(e)=>{inputChange(e.target.value, 'productName')}}/>
        </div><br></br>
        <div className="inputWrap">
          <h4>ImgUri</h4> 
          <input type="text" value={productInfo.productImg} onChange={(e)=>{inputChange(e.target.value, 'productImg')}}/>
        </div><br></br>
        <div className="badge">
          <h4>badge 설명</h4>
          가성비급: value_for_money<br/>
          엔트리급: entry_level<br/>
          중상급: mid_high_level<br/>
          플래그쉽: flagship<br/>
          가장최신: latest_release<br/>
          명작: masterpiece<br/>
          가성비: cost_effectiveness<br/>
        </div><br></br>
        <div className="badge">
          <h4>Badge</h4>
          {badgeOptions.map((option) => (
            <div key={option}>
              <label style={{display:'flex', marginBottom:10}}>
                <input
                  type="checkbox"
                  value={option}
                  checked={productInfo.badge.includes(option)}
                  onChange={onBadgeChange}
                  style={{marginRight:10}}
                />
                {option}
              </label>
            </div>
          ))}
        </div><br></br>
        
        {
          renderSpecs()
        }
        <button type='submit' style={{background:'lightblue', color:'#101010', padding:10}}>제출해서 등록하기</button>
      </form>
    </div>
  )
}





export default Admin;