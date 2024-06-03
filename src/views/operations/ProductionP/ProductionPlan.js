import React, { useState } from 'react';
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
  const tableStyle = {
    // margin: 'auto', 
    // width: '60%',  
    // maxWidth: '1000px',
  };
  const toggle = () => setCollapse(!collapse);
  const toggle1 = () => setCollapse1(!collapse1);

  const handleViewClick = (item) => {
    // Navigate to the edit page with the item's id
    // Navigate(`/resources/address-types/edit/${itemId}`);
    navigate('/operations/production-plans/view', { state: item });
  };
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
                    <Button type="submit" className="btn btn-danger" style={{marginTop:"28px"}}>
                        Go
                    </Button>
                   </FormGroup>
                 </Col>
               </Row>
               
              
             </Form>
                </CardBody>
              </Card>
            </Collapse>

      <Button className='my-btn-color' onClick={toggle.bind(null)} style={{ marginBottom: '1rem' }}>
              Search
            </Button>
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
