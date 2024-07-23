import React, { useState,useEffect } from 'react';
import {
  Collapse,
  Button,
  Card,
  Col,
  Input,
  Label,
  FormText,
  FormGroup,
  Form,
  Row,
  CardBody,
  Table
} from 'reactstrap';

import {useNavigate} from 'react-router-dom';

import ComponentCard from '../../../components/ComponentCard';

const Dispatch = () => {
  const [collapse, setCollapse] = useState(false);
  const [dispatch,setDispatch] = useState([]);

  const [dispatchAddresses,setDispatchAddresses] =  useState([]);
  const [OrderWithCompleteData,setOrderWithCompleteData] =  useState([]);
  const [Customerdata,setCustomerData] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [data5, setData5] = useState([]);

  const navigate = useNavigate();

  const tableStyle = {
    // margin: 'auto', 
    // width: '60%',  
    // maxWidth: '1000px',
  };
  
  const toggle = () => setCollapse(!collapse);

  const dispatchOrder = ()=>{
    navigate('/operations/dispatch-order',{state: {OrderWithCompleteData,Customerdata,data1,data2,data3,data4,data5}});
  }

  const dispatchView = (dispatchItem)=>{
    navigate('/operations/dispatch/view',{state: {dispatchItem,data1,data2,data3,data4,data5}});
  }

  const addressStyle = {
    width: '250px',
    maxWidth: '250px',
    overflow: 'hidden', 
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  };

  const addressNames = (orderId) => {
    const orderValue = OrderWithCompleteData.find(order => order.id === orderId);
    console.log('ordervalue 0',orderValue);
    if (orderValue) {
      const addressValue = dispatchAddresses.find(address => address.id === orderValue.delivery_address_id);
      return addressValue ? addressValue.address_line_1 : 'Address not found';
    }
    return 'Order not found';
  };

  const customerNames = (orderId) => {
    const orderValue = OrderWithCompleteData.find(order => order.id === orderId);
    console.log('ordervalue',orderValue);
    if (orderValue) {
      const customerValue = Customerdata.find(customer => customer.id === orderValue.customer_id);
    console.log('ordervalue 2',customerValue);
      return customerValue ? customerValue.company_name : 'customer not found';
    }
    return 'customer not found';
  };

  const deliveryDate = (orderId) => {
    const orderValue = OrderWithCompleteData.find(order => order.id === orderId);
    console.log('ordervalue',orderValue);
    if (orderValue) {
     
      return orderValue.expected_delivery_date
    }
    return 'customer not found';
  };
  
const DispatchData = dispatch.map((dis)=>({
  ...dis,
  address: addressNames(dis.order_id),
  customerName:customerNames(dis.order_id),
  delivery:deliveryDate(dis.order_id),
  
}))

  useEffect(()=>{
    const fetchDispatch = async () => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch(`https://factory.teamasia.in/api/public/dispatch`, {
        method: 'GET', 
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      // console.log('result',response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      // console.log("responsejson1",result.dispatch);
      setDispatch(result.dispatch); 
    };

    const fetchOrderDispatchAddresses = async () => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch(`https://factory.teamasia.in/api/public/addresses`, {
        method: 'GET', 
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      // console.log('result',response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      // console.log("responsejson1",result.dispatch);
      setDispatchAddresses(result.addresses);
    };
    const fetchOrderWithCompleteData = async () => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch(`https://factory.teamasia.in/api/public/orders/?status_id=3`, {
        method: 'GET', 
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      // console.log('result',response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      // console.log("responsejson1",result.orders);
      setOrderWithCompleteData(result.orders);
    };
    const fetchCustomerData = async ()=>{

      const token = localStorage.getItem('userToken');
      const response =await  fetch(`https://factory.teamasia.in/api/public/customers`,{
        method: "GET",
        headers:{
          'Authorization': `Bearer ${token}`
        }
      });

      if(!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const datas = await response.json();
      // console.log('result customer',datas.customers);
      setCustomerData(datas.customers);
    }

    const fetchData1 = async () => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch('https://factory.teamasia.in/api/public/grains', {
        method: 'GET', 
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      // console.log('result',response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      // console.log("responsejson grain",result);
      const resultX = result.grains.slice();
      resultX.push({id:'x',name:'Choose'});
      setData1(resultX); 
    };
    const fetchData2 = async () => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch('https://factory.teamasia.in/api/public/fabrics', {
        method: 'GET', 
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      // console.log('result',response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      // console.log("responsejson fabric",result);
      const resultX = result.fabrics.slice();
      resultX.push({id:'x',name:'Choose'});
      setData2(resultX);
    };
    const fetchData3 = async () => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch('https://factory.teamasia.in/api/public/qualities', {
        method: 'GET', 
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      // console.log('result',response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      // console.log("responsejson quality",result);
      const resultX = result.qualities.slice();
      resultX.push({id:'x',name:'Choose'});
      setData3(resultX);
    };
  
    const fetchData4 = async () => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch('https://factory.teamasia.in/api/public/colors', {
        method: 'GET', 
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      // console.log('result',response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      // console.log("responsejson colors",result);
      const resultX = result.colors.slice();
      resultX.push({id:'x',name:'Choose'});
      setData4(resultX);
    };
    const fetchData5 = async () => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch('https://factory.teamasia.in/api/public/hsns', {
        method: 'GET', 
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      // console.log('result',response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      // console.log("responsejson hsn",result);
      const resultX = result.hsns.slice();
      resultX.push({id:'x',name:'Choose'});
      setData5(resultX);
    };

    fetchDispatch();
    fetchOrderDispatchAddresses();
    fetchData5();
    fetchData4();
    fetchData3();
    fetchData2();
    fetchData1();
    fetchOrderWithCompleteData();
    fetchCustomerData();
  },[])

  return (
    <ComponentCard
    title=""
    subtitle={
      <p>
        {/* Overview of the projects */}
      </p>
    }
  >
      <Button className='my-btn-color' style={{ marginBottom: '1rem',marginRight:'10px' }} onClick={()=>dispatchOrder()}>
           Dispatch An Order
      </Button>

      <Button className='my-btn-color' onClick={toggle.bind(null)} style={{ marginBottom: '1rem' }} disabled>
              Search
      </Button>
            <Collapse isOpen={collapse}>
              <Card className="border">
                <CardBody>
                <Form>
               <Row>
               <Col md="3">
                   <FormGroup>
                     <Label>Invoice No</Label>
                     <Input type="text" placeholder="" />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 <Col md="3">
                   <FormGroup>
                     <Label>Customer</Label>
                     <Input type="text" placeholder="" />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>

                 <Col md="3">
                   <FormGroup>
                     <Label>Date</Label>
                     <Input type="date" placeholder="" />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 <Col md="3">
                   <FormGroup>
                    <Button type="submit" className="btn btn-info" style={{marginTop:"28px"}}>
                        Search
                    </Button>
                    <Button type="reset" className="btn btn-info" style={{marginTop:"28px",marginLeft:"10px"}}>
                        Reset
                    </Button>
                   </FormGroup>
                 </Col>
               </Row>
               
              
             </Form>
                </CardBody>
              </Card>
            </Collapse>
      <Table responsive style={tableStyle}>
              <thead>
              <tr>
                <th>Order ID</th>
                <th style={addressStyle}>Address</th>
                <th>Invoice No.</th>
                <th>Invoice Date</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody>
                {DispatchData.map((dispatchItem,index) => (
                    <tr key={dispatchItem.order_id}>
                      <td style={{fontWeight:900,paddingLeft:"40px"}}># {dispatchItem.order_id}</td>
                      <td style={addressStyle} title={dispatchItem.address}>{dispatchItem.address}</td>
                      <td>TCINV/22-23/078{index}{dispatchItem.invoice}</td>
                      <td>2{index} Jun, 2024{dispatchItem.invoiceDate}</td>
                      <td>
                        {/* Replace with actual action components or icons */}
                        <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2"><i className="bi bi-eye-fill my-eye-color" onClick={()=>dispatchView(dispatchItem)}/></button>
                        {/* <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2"> <i className="bi bi-bell-fill my-bell-color" /> </button>
                        <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2"><i className="bi bi-printer-fill my-printer-color" /></button>
                        <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2"><i className="bi bi-list my-list-color" /></button> */}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
  </ComponentCard>
  );
};

export default Dispatch;