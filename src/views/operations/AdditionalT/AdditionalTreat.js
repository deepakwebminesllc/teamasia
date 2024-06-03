import React, { useState } from 'react';
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

const AdditionalTreat = () => {
  const [collapse, setCollapse] = useState(false);
  const data = [
    { id: 1, code: 'JR-001', planDate: '2024-01-01', companyName: 'ABC Textiles', quantity: 1000, orderId: 'O-201', productId: 'P-101' },
    { id: 2, code: 'JR-002', planDate: '2024-01-02', companyName: 'XYZ Fabrics', quantity: 850, orderId: 'O-202', productId: 'P-102' },
    { id: 3, code: 'JR-003', planDate: '2024-01-03', companyName: 'Looms & Weaves', quantity: 1200, orderId: 'O-203', productId: 'P-103' },
    { id: 4, code: 'JR-003', planDate: '2024-01-03', companyName: 'Looms & Weaves', quantity: 1200, orderId: 'O-203', productId: 'P-103' },
    { id: 5, code: 'JR-003', planDate: '2024-01-03', companyName: 'Looms & Weaves', quantity: 1200, orderId: 'O-203', productId: 'P-103' },
    { id: 6, code: 'JR-003', planDate: '2024-01-03', companyName: 'Looms & Weaves', quantity: 1200, orderId: 'O-203', productId: 'P-103' },
    { id: 7, code: 'JR-003', planDate: '2024-01-03', companyName: 'Looms & Weaves', quantity: 1200, orderId: 'O-203', productId: 'P-103' },
    { id: 8, code: 'JR-003', planDate: '2024-01-03', companyName: 'Looms & Weaves', quantity: 1200, orderId: 'O-203', productId: 'P-103' },
    { id: 9, code: 'JR-003', planDate: '2024-01-03', companyName: 'Looms & Weaves', quantity: 1200, orderId: 'O-203', productId: 'P-103' },
    { id: 10, code: 'JR-003', planDate: '2024-01-03', companyName: 'Looms & Weaves', quantity: 1200, orderId: 'O-203', productId: 'P-103' },
    

  
  ];
  const tableStyle = {
    // margin: 'auto', 
    // width: '60%',  
    // maxWidth: '1000px',
  };

  const toggle = () => setCollapse(!collapse);

  return (
    <ComponentCard
    title=""
    subtitle={
      <p>
        {/* Overview of the projects */}
      </p>
    }
  >
     <Button className='my-btn-color' style={{ marginBottom: '1rem',marginRight:'10px' }}>
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
                    <td>{roll.code}</td>
                    <td>{roll.planDate}</td>
                    <td>{roll.companyName}</td>
                    <td>{roll.quantity}</td>
                    <td>{roll.orderId}</td>
                    <td>{roll.productId}</td>
                  <td>
                    {/* Action buttons or icons */}
                      <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2" ><i className="bi bi-pencil-fill my-pen-color" /></button>
                      <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2"><i className="bi bi-eye-fill my-eye-color" /></button>
                      <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2"> <i className="bi bi-geo-alt-fill my-geo-color" /> </button>
                      <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2"><i className="bi bi-list my-list-color" /></button>
                      <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2"><i className="bi bi-trash-fill my-trash-color" /></button>
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
            
    </div>
   
  </ComponentCard>

   
   
  );
};

export default AdditionalTreat;