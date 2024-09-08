import React, { useState ,useEffect} from 'react';
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

import { useNavigate } from 'react-router-dom';
import ComponentCard from '../../../components/ComponentCard';

const AdditionalTreat = () => {
  const [collapse, setCollapse] = useState(false);
  // const data = [
  //   { id: 1, code: 'JR-001', planDate: '2024-01-01', companyName: 'ABC Textiles', quantity: 1000, orderId: 'O-201', productId: 'P-101' },
  // ];

  const [data, setData] = useState([]);
  const [plans, setPlans] = useState([]);
  const [Customerdata,setCustomerData] = useState([]);
  const [QaData, setQaData] = useState([]);
  const navigate = useNavigate();

  const JumboQaView = (dispatchItem)=>{
    console.log('hi',dispatchItem);
    navigate('/operations/find-a-jumbo-roll',{state: {jumboId:dispatchItem}});
  }
  
  const tableStyle = {
    // margin: 'auto', 
    // width: '60%',  
    // maxWidth: '1000px',
  };

  const toggle = () => setCollapse(!collapse);



  const planDate = (planId)=>{
    console.log('hi',planId,plans);
    const date = plans.find((p)=> p.id === planId);
    console.log('date',date);
    return date? date.plan_date:'unknown date'
  }

  const customerNames = (planId) => {
    const PlanData = plans.find((p)=> p.id === planId);
    console.log('ordervalue',PlanData);
    if (PlanData) {
      const customerValue = Customerdata.find(customer => customer.id === PlanData.customer_id);
    console.log('ordervalue 2',customerValue);
      return customerValue ? customerValue.company_name : 'customer not found';
    }
    return 'customer not found';
  };

  const QaPackView = (rollItem)=>{
    const customerName =customerNames(rollItem.production_plan_id)
    navigate('/operations/qa-packaging/view',{state: { id:rollItem.id, customerName,plans,QaData}})
  }

  // const handleJumboSearch = ()=>{
  //   navigate('/operations/qa-packaging/view-old');
  // }

  useEffect(()=>{
    const fetchDispatch = async () => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch(`https://factory.teamasia.in/api/public/jumboroll/fetchjumborollforqanp`, {
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
      setData(result.jumborolls); 
    };

  
    const fetchPlans = async () => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch(`https://factory.teamasia.in/api/public/productionplan`, {
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
      setPlans(result.production_plan); 
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
    const fetchQaData = async () => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch('https://factory.teamasia.in/api/public/qapateams/?is_trashed=0', {
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
      console.log("responsejson1",result);
      const resultX = result.qapateams.slice();
      resultX.push({id:'x',name:'Choose'});
      setQaData(resultX); 
    };

    fetchQaData();
    fetchCustomerData();
    fetchPlans();
    fetchDispatch();
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
     {/* <Button className='my-btn-color' style={{ marginBottom: '1rem',marginRight:'10px' }} onClick={() => handleJumboSearch()}>
           Load By Code
     </Button> */}
     <Button onClick={()=>JumboQaView()} className='my-btn-color' style={{ marginBottom: '1rem',marginRight:'10px' }}>
           Load By Code
     </Button>
           

      <Button className='my-btn-color' onClick={toggle.bind(null)} style={{ marginBottom: '1rem' }}>
              Search
            </Button>
            <Collapse isOpen={collapse}>
              <Card className="border">
                <CardBody>
                <Form>
               <Row>
               <Col md="4">
                   <FormGroup>
                     <Label>Order ID</Label>
                     <Input type="text" placeholder="Order ID" />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>

                 <Col md="4">
                   <FormGroup>
                     <Label>Production date</Label>
                     <Input type="date" placeholder="" />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 <Col md="4">
                   <FormGroup>
                    <Button type="submit" className="btn btn-info" style={{marginTop:"28px"}} disabled>
                        Search
                    </Button>
                    <Button type="reset" className="btn btn-info" style={{marginTop:"28px",marginLeft:"10px"}} disabled>
                        Reset
                    </Button>
                   </FormGroup>
                 </Col>
               </Row>
               
              
             </Form>
                </CardBody>
              </Card>
            </Collapse>
      <Table  style={tableStyle} responsive>
      <thead>
            <tr>
              <th>Jumbo Roll Code</th>
              <th>Plan Date</th>
              <th>Company Name</th>
              <th>Quantity</th>
              <th>Order ID</th>
              <th>Product ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          
          </tbody>
              <tbody>
                {data.map((roll) => (
                  <tr key={roll.id}>
                    <td>JUMBO{roll.id}</td>
                    <td>{planDate(roll.production_plan_id)}</td>
                    <td style={{display:'none'}}>{customerNames(roll.production_plan_id)}</td>
                    <td>testing team</td>
                    <td>{roll.quantity}</td>
                    <td>{roll.order_id}</td>
                    <td>{roll.product_id}</td>
                  <td>
                      <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2"><i className="bi bi-eye-fill my-eye-color" onClick={()=>{QaPackView(roll)}}/></button>
                  </td>
                </tr>
                ))}
              </tbody>
            </Table>
            
   
  </ComponentCard>
  );
};

export default AdditionalTreat;