import downArrow from '../assets/images/icons/down_arrow.png'
import appLogo from '../assets/images/apple_logo.png';
import samLogo from '../assets/images/sam_logo.png';

import Dropdown from 'react-bootstrap/Dropdown';

import { useState } from 'react';

const gradeMap = {
  value_for_money : '가성비급',
  entry_level : '엔트리급',
  mid_high_level : '중상급',
  flagship : '플래그쉽',
  latest_release : '가장최신',
  masterpiece : '명작',
  cost_effectiveness : '가성비인증'
}

//CompareAll 페이지에서 데이터 받은 후 CompareAllHeader로 props전송 -> SelectBoxCustom으로 props전송
const CompareAllHeader = ()=>{

  const [headerActive, setHeaderActive] = useState(false);
  
  return (
      <div className="nowSelected">
          <button onClick={()=>{setHeaderActive(!headerActive)}} className="buttonWrap">
              <p>현재 선택한 제품</p>
              <div className={`downButton ${headerActive ? 'upsideDown' : null}`}><img src={downArrow} alt="" /></div>
          </button>
          <div className={`inner ${headerActive && 'active'}`}>
              <div className="inner_logoWrap">
                <div className="logoSizer">
                  <img src={appLogo} className='apple logo' alt="apple logo" />
                </div>
                <div className="priceWrap">
                  <p>최종가격</p>
                  <span className="price">24,214,242원</span>
                </div>
              </div>
              <table className="tableWrap">
                <thead className='tHead'>
                  <tr>
                    <th>종류</th>
                    <th>Apple</th>
                    <th>Samsung</th>  
                  </tr>
                </thead>
                <tbody>
                <tr>
                  <td>스마트폰</td>
                  <td>
                    <SelectBoxCustom grade={'flagship'}></SelectBoxCustom>
                  </td>
                  <td>
                    <SelectBoxCustom grade={'value_for_money'}></SelectBoxCustom>
                  </td>
                </tr>
                <tr>
                  <td>태블릿 PC</td>
                  <td>
                    <SelectBoxCustom grade={'entry_level'}></SelectBoxCustom>
                  </td>
                  <td>
                    <SelectBoxCustom grade={'mid_high_level'}></SelectBoxCustom>
                  </td>
                </tr>
                <tr>
                  <td>노트북</td>
                  <td>
                    <SelectBoxCustom grade={'latest_release'}></SelectBoxCustom>
                  </td>
                  <td>
                    <SelectBoxCustom grade={'masterpiece'}></SelectBoxCustom>
                  </td>
                </tr>
                <tr>
                  <td>데스크톱</td>
                  <td>
                    <SelectBoxCustom grade={'cost_effectiveness'}></SelectBoxCustom>
                  </td>
                  <td>
                    <SelectBoxCustom></SelectBoxCustom>
                  </td>
                </tr>
                <tr>
                  <td>워치</td>
                  <td>
                    <SelectBoxCustom></SelectBoxCustom>
                  </td>
                  <td>
                    <SelectBoxCustom></SelectBoxCustom>
                  </td>
                </tr>
                <tr>
                  <td>이어폰</td>
                  <td>
                    <SelectBoxCustom></SelectBoxCustom>
                  </td>
                  <td>
                    <SelectBoxCustom></SelectBoxCustom>
                  </td>
                </tr>
                </tbody>
              </table>
              <div className="inner_logoWrap">
                <div className="logoSizer">
                  <img src={samLogo} className='samsung logo' alt="samsung logo" />
                </div>
                <div className="priceWrap">
                  <p>최종가격</p>
                  <span className="price">24,214,242원</span>
                </div>
                </div>
                <button className={`closeBtn ${headerActive && 'upsideDown'}`} onClick={()=>{setHeaderActive(!headerActive)}}>
                  <div className='downButton'><img src={downArrow} alt="down button" /></div>
                </button>
          </div>
      </div>
  )
}


const SelectBoxCustom = ({grade})=>{
  return (
<Dropdown>
<Dropdown.Toggle variant="secondary" className='dropdown_product'>
  <p>Iphone 14 Pro max</p>
  <span className={`badge ${grade}`}>{gradeMap[grade]}</span>
</Dropdown.Toggle>

<Dropdown.Menu variant="dark">
  <Dropdown.Item onClick={()=>{console.log('clickTest')}}>메뉴들</Dropdown.Item>
  <Dropdown.Item onClick={()=>{console.log('clickTest')}}>메뉴들</Dropdown.Item>
  <Dropdown.Divider />
  <Dropdown.Item>메뉴들</Dropdown.Item>
</Dropdown.Menu>
</Dropdown>
  )
}



export default CompareAllHeader;