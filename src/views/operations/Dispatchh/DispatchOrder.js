import React, {useState} from 'react';
import {
  Row,
  Col,
  Collapse,
  Button,
} from 'reactstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import ComponentCard from '../../../components/ComponentCard';
import 'react-table-v6/react-table.css';
// import Barcode from "../../../assets/images/bg/barcode.png"
// import SmallRollDetails from './smallRollDetails'
import OrderProductView from './orderProductView';

const JumbotronComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {id,OrderWithCompleteData,Customerdata,data1,data2,data3,data4,data5} = location.state;

  const [collapse, setCollapse] = useState(Array.from({length: OrderWithCompleteData.length}, ()=>false));
  console.log('OrderWithCompleteData',OrderWithCompleteData)
 
  const collapseSetter = (index)=>{

    const newCollapse = [...collapse];
    newCollapse[index] = !newCollapse[index];
    setCollapse(newCollapse);
  }
  
  function formatDate(inputDate) {
    const date = new Date(inputDate);
  
    // Use Intl.DateTimeFormat to format the date
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Intl.DateTimeFormat('en-GB', options).format(date);

  }

  const dispatchOrderAdd= (item)=>{
    console.log('item',item);
    navigate('/operations/dispatch-order/add',{state:item});
  }

  const CustomerName =(customerId)=>{
    const result =  Customerdata.find((item)=> item.id === customerId);
    if(!result){
      return 'unknown customer'
    }
    return result.company_name;
}

  return (
    <>
       {/* <SmallRollDetails modal={modal} toggle={smallRollDetailsTogglefunction}/> */}
      <ComponentCard title="">
       {OrderWithCompleteData.map((item,index) =>(
        <>
          <Row key={item} style={{background:'rgb(21 101 104)',padding:'10px',margin:"5px 0px"}}>
             <Col md="5" onClick={()=>{collapseSetter(index)}} style={{color:'white'}}>
               
                  {`# ${item.id}`} {CustomerName(item.customer_id)} (Grains : ALINEA,3001 A) <br></br>
                   Order Date: {formatDate(item.created_at)} | Nearest Expected Date: {formatDate(item.expected_delivery_date)}
              
            </Col>
             <Col md="3" onClick={()=>{collapseSetter(index)}} style={{textAlign:'right',color:'white'}}>
               
                   {/* <span style={{borderRadius:'10px',padding:'2px 4px',background:'#1a1818',color:'white',fontWeight:'700'}}>26</span> Rolls Available */}
              
            </Col>
             <Col md="2" onClick={()=>{collapseSetter(index)}} style={{textAlign:'right',color:'white'}}>
               
                   {/* <span style={{borderRadius:'10px',padding:'2px 4px',background:'#1a1818',color:'white',fontWeight:'700'}}>26</span> Rolls Selected */}
              
            </Col>
             <Col md="2" onClick={()=>{collapseSetter(index)}} style={{textAlign:'right'}}>
               
                   <Button style={{borderRadius:'10px',background:'white',color:'black',fontWeight:'700'}} onClick={()=>dispatchOrderAdd(item)}>Dispatch</Button>
              
            </Col>
          </Row>
          <Row>
          <Collapse isOpen={collapse[index]}>
               <OrderProductView orderID={id} data1={data1} data2={data2} data3={data3} data4={data4} data5={data5}/>
            </Collapse>
          </Row>
        </>
        )) }    
      </ComponentCard>
    </>
  );
};

export default JumbotronComponent;
