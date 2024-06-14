import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
} from 'reactstrap';

import ComponentCard from '../../../components/ComponentCard';

const ProductionPlan = () => {
  const [collapse, setCollapse] = useState(false);
  const [collapse1, setCollapse1] = useState(false);
  const navigate = useNavigate();
  const data = [
      { id: 1, planDate: '01 Aug, 2022', createdBy: 'Team Operations', status: 'published' },
      { id: 2, planDate: '10 Jun, 2022', createdBy: 'Team Operations', status: 'published' },
      { id: 3, planDate: '10 Jun, 2022', createdBy: 'Team Operations', status: 'published' },
      { id: 4, planDate: '10 Jun, 2022', createdBy: 'Team Operations', status: 'published' },
      { id: 5, planDate: '10 Jun, 2022', createdBy: 'Team Operations', status: 'published' },
      { id: 6, planDate: '10 Jun, 2022', createdBy: 'Team Operations', status: 'published' },
      { id: 7, planDate: '10 Jun, 2022', createdBy: 'Team Operations', status: 'published' },
      { id: 8, planDate: '10 Jun, 2022', createdBy: 'Team Operations', status: 'published' },
      { id: 9, planDate: '10 Jun, 2022', createdBy: 'Team Operations', status: 'published' },
      { id: 10, planDate: '10 Jun, 2022', createdBy: 'Team Operations', status: 'published' },
      { id: 11, planDate: '10 Jun, 2022', createdBy: 'Team Operations', status: 'published' },
      { id: 12, planDate: '10 Jun, 2022', createdBy: 'Team Operations', status: 'published' },
  ];
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [data5, setData5] = useState([]);
  const tableStyle = {
    // margin: 'auto', 
    // width: '60%',  
    // maxWidth: '1000px',
  };
  const toggle = () => setCollapse(!collapse);
  const toggle1 = () => setCollapse1(!collapse1);

  const handleViewClick = (item) => {
    navigate('/operations/production-plans/view', { state: item });
  };
  const handleManagePlan = () => {
    navigate('/operations/production-plans/manage-plan',{ state: {data1,data2,data3,data4,data5} });
  };

  useEffect(()=>{
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
      console.log("responsejson1",result);
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
      console.log("responsejson2",result);
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
      console.log("responsejson3",result);
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
      const resultX = result.hsns.slice();
      resultX.push({id:'x',name:'Choose'});
      setData5(resultX);
    };

    fetchData5();
    fetchData4();
    fetchData3();
    fetchData2();
    fetchData1();
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
         <Button className='my-btn-color-red' onClick={toggle1.bind(null)} style={{ marginBottom: '1rem',marginRight:'10px' }}>
             Manage Plan
          </Button>
          <Button className='my-btn-color' onClick={toggle.bind(null)} style={{ marginBottom: '1rem' }}>
              Search
          </Button>
            <Collapse isOpen={collapse1}>
              <Card className="border">
                <CardBody>
                <Form>
               <Row>
                 <Col md="8">
                   <FormGroup>
                     <Label>Date</Label>
                     <Input type="date" placeholder="" />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 <Col md="4">
                   <FormGroup>
                    <Button type="submit" className="btn btn-danger" style={{marginTop:"28px"}} onClick={()=>handleManagePlan()}>
                        Go
                    </Button>
                   </FormGroup>
                 </Col>
               </Row>
               
              
             </Form>
                </CardBody>
              </Card>
            </Collapse>

      
            <Collapse isOpen={collapse}>
              <Card className="border">
                <CardBody>
                <Form>
               <Row>
                 <Col md="8">
                   <FormGroup>
                     <Label>Plan Date</Label>
                     <Input type="date" placeholder="" />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 <Col md="4">
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

    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
    <table className="table" style={tableStyle}>
        <thead>
          <tr>
            <th>Plan Date</th>
            <th>Created By</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((plan) => (
            <tr key={plan.id}>
              <td>{plan.planDate}</td>
              <td>{plan.createdBy}</td>
              <td>{plan.status}</td>
              <td>
                {/* Replace these with actual icons or buttons */}
                      <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2" onClick={() => handleViewClick(plan)}><i className="bi bi-eye-fill my-eye-color" /></button>
                      <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2"><i className="bi bi-printer-fill my-bell-color" /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
            
    </div>
   
  </ComponentCard>

   
   
  );
};

export default ProductionPlan;
