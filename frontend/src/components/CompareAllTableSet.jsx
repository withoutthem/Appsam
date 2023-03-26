import sampleIMG from '../assets/images/sampleimg.jpeg'
import Dropdown from 'react-bootstrap/Dropdown';

const CompareAllTableSet = ()=>{
  return(
    <div className="compareAllTable">
      <div className="type">
        <h3>Phone</h3>
        <div className="productWrap">
          <img src={sampleIMG} alt="" />
          <div className="badgeWrap">
            <div className="badge flagship">플래그쉽</div>
          </div>
          <SelectBoxCustom></SelectBoxCustom>
        </div>
        
      </div>
    </div>
  )
}



const SelectBoxCustom = ({grade})=>{
  return (
<Dropdown>
<Dropdown.Toggle variant="secondary" className='dropdown_product'>
  <p>Iphone 14 Pro max</p>
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

export default CompareAllTableSet;
