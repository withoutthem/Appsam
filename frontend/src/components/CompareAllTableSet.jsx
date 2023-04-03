import sampleIMG from '../assets/images/sampleimg.jpeg'
import Dropdown from 'react-bootstrap/Dropdown';

const CompareAllTableSet = ({type,})=>{
  return(
    <div className="compareAllTable">
      <div className="type">
        <h3>Phone</h3>
        <div className="productWrap">
          <img src={sampleIMG} alt="" />
          <div className="badgeWrap">
            <div className="badge flagship">플래그쉽</div>
          </div>
          {/* apple product select box  */}
          <SelectBoxCustom></SelectBoxCustom>
        </div>
        <div className="productWrap">
          <img src={sampleIMG} alt="" />
          <div className="badgeWrap">
            <div className="badge flagship">플래그쉽</div>
            <div className="badge flagship">플래그쉽</div>
            <div className="badge flagship">플래그쉽</div>
            <div className="badge flagship">플래그쉽</div>
            <div className="badge flagship">플래그쉽</div>
            <div className="badge flagship">플래그쉽</div>
          </div>
          {/* samsung product select box  */}
          <SelectBoxCustom></SelectBoxCustom>
        </div>
      </div>
      <div className="tableSet">
        <div className="table_header">
          <div className="empty"></div>
          <div className="info grow">정보</div>
          <div className="eval grow">평가</div>
          <div className="info grow">정보</div>
          <div className="eval grow">평가</div>
        </div>
        <div className="table_body">
          <div className="head">출시일</div>
          <div className="value app_val grow">lsdjfaklsdj</div>
          <div className="editor app_edit grow">lasjdflasdjflkasjf</div>
          <div className="editor sam_val grow">lasjdflasdjflkasjf</div>
          <div className="editor sam_edit grow">lasjdflasdjflkasjf</div>
        </div>
        <div className="table_body">
          <div className="head">AP/벤치마크(성능)</div>
          <div className="value app_val grow">lsdjfaklsdj</div>
          <div className="editor app_edit grow">lasjdflasdjflkasjf</div>
          <div className="editor sam_val grow">lasjdflasdjflkasjf</div>
          <div className="editor sam_edit grow">lasjdflasdjflkasjf</div>
        </div>
        <div className="table_body">
          <div className="head">메모리</div>
          <div className="value app_val grow">lsdjfaklsdj</div>
          <div className="editor app_edit grow">lasjdflasdjflkasjf</div>
          <div className="editor sam_val grow">lasjdflasdjflkasjf</div>
          <div className="editor sam_edit grow">lasjdflasdjflkasjf</div>
        </div>
        <div className="table_body">
          <div className="head">디스플레이</div>
          <div className="value app_val grow">lsdjfaklsdj</div>
          <div className="editor app_edit grow">lasjdflasdjflkasjf</div>
          <div className="editor sam_val grow">lasjdflasdjflkasjf</div>
          <div className="editor sam_edit grow">lasjdflasdjflkasjf</div>
        </div>
        <div className="table_body">
          <div className="head">카메라</div>
          <div className="value app_val grow">lsdjfaklsdj</div>
          <div className="editor app_edit grow">lasjdflasdjflkasjf</div>
          <div className="editor sam_val grow">lasjdflasdjflkasjf</div>
          <div className="editor sam_edit grow">lasjdflasdjflkasjf</div>
        </div>
        <div className="table_body">
          <div className="head">배터리</div>
          <div className="value app_val grow">lsdjfaklsdj</div>
          <div className="editor app_edit grow">lasjdflasdjflkasjf</div>
          <div className="editor sam_val grow">lasjdflasdjflkasjf</div>
          <div className="editor sam_edit grow">lasjdflasdjflkasjf</div>
        </div>
        <div className="table_body">
          <div className="head">색상</div>
          <div className="value app_val grow">lsdjfaklsdj</div>
          <div className="editor app_edit grow">lasjdflasdjflkasjf</div>
          <div className="editor sam_val grow">lasjdflasdjflkasjf</div>
          <div className="editor sam_edit grow">lasjdflasdjflkasjf</div>
        </div>
        <div className="table_body">
          <div className="head">무게</div>
          <div className="value app_val grow">lsdjfaklsdj</div>
          <div className="editor app_edit grow">lasjdflasdjflkasjf</div>
          <div className="editor sam_val grow">lasjdflasdjflkasjf</div>
          <div className="editor sam_edit grow">lasjdflasdjflkasjf</div>
        </div>
        <div className="table_body">
          <div className="head">생체인식</div>
          <div className="value app_val grow">lsdjfaklsdj</div>
          <div className="editor app_edit grow">lasjdflasdjflkasjf</div>
          <div className="editor sam_val grow">lasjdflasdjflkasjf</div>
          <div className="editor sam_edit grow">lasjdflasdjflkasjf</div>
        </div>
        <div className="table_body">
          <div className="head">기타</div>
          <div className="value app_val grow">lsdjfaklsdj</div>
          <div className="editor app_edit grow">lasjdflasdjflkasjf</div>
          <div className="editor sam_val grow">lasjdflasdjflkasjf</div>
          <div className="editor sam_edit grow">lasjdflasdjflkasjf</div>
        </div>
        <div className="table_body">
          <div className="head">가격(출고가)</div>
          <div className="value app_val grow">lsdjfaklsdj</div>
          <div className="editor app_edit grow">lasjdflasdjflkasjf</div>
          <div className="editor sam_val grow">lasjdflasdjflkasjf</div>
          <div className="editor sam_edit grow">lasjdflasdjflkasjf</div>
        </div>
        <div className="table_body">
          <div className="head">장점</div>
          <div className="value app_val grow">lsdjfaklsdj</div>
          <div className="editor app_edit grow">lasjdflasdjflkasjf</div>
          <div className="editor sam_val grow">lasjdflasdjflkasjf</div>
          <div className="editor sam_edit grow">lasjdflasdjflkasjf</div>
        </div>
        <div className="table_body">
          <div className="head">단점</div>
          <div className="value app_val grow">lsdjfaklsdj</div>
          <div className="editor app_edit grow">lasjdflasdjflkasjf</div>
          <div className="editor sam_val grow">lasjdflasdjflkasjf</div>
          <div className="editor sam_edit grow">lasjdflasdjflkasjf</div>
        </div>
        <div className="table_body">
          <div className="head">총평</div>
          <div className="value app_val grow">lsdjfaklsdj</div>
          <div className="editor app_edit grow">lasjdflasdjflkasjf</div>
          <div className="editor sam_val grow">lasjdflasdjflkasjf</div>
          <div className="editor sam_edit grow">lasjdflasdjflkasjf</div>
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
