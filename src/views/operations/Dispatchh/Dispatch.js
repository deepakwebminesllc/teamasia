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

const Dispatch = () => {
  const [collapse, setCollapse] = useState(false);
  const orders = [
    {orderId: '#1591',address: 'Aggarwal Coated Fab Pvt. Ltd., Khasra No. 26/12/1, MIE Part-A, Bahadurgarh, Haryana, India',invoiceNo: 'TCINV/22-23/0784',invoiceDate: '28 Jun, 2022'},
    {orderId: '#1592',address: 'Aggarwal Bag Manufacturing, A-1151/B, 1st Floor, Utsav Vihar, Near Rama Vihar Bus Stand, 110081, Delhi, India',invoiceNo: 'TCINV/22-23/0783',invoiceDate: '24 Jun, 2022'},
    {orderId: '#1593',address: 'Aggarwal Bag Manufacturing, A-1151/B, 1st Floor, Utsav Vihar, Near Rama Vihar Bus Stand, 110081, Delhi, India',invoiceNo: 'TCINV/22-23/0783',invoiceDate: '24 Jun, 2022'},
    {orderId: '#1594',address: 'Aggarwal Bag Manufacturing, A-1151/B, 1st Floor, Utsav Vihar, Near Rama Vihar Bus Stand, 110081, Delhi, India',invoiceNo: 'TCINV/22-23/0783',invoiceDate: '24 Jun, 2022'},
    {orderId: '#1595',address: 'Aggarwal Bag Manufacturing, A-1151/B, 1st Floor, Utsav Vihar, Near Rama Vihar Bus Stand, 110081, Delhi, India',invoiceNo: 'TCINV/22-23/0783',invoiceDate: '24 Jun, 2022'},
    {orderId: '#1596',address: 'Aggarwal Bag Manufacturing, A-1151/B, 1st Floor, Utsav Vihar, Near Rama Vihar Bus Stand, 110081, Delhi, India',invoiceNo: 'TCINV/22-23/0783',invoiceDate: '24 Jun, 2022'},
    {orderId: '#1597',address: 'Aggarwal Bag Manufacturing, A-1151/B, 1st Floor, Utsav Vihar, Near Rama Vihar Bus Stand, 110081, Delhi, India',invoiceNo: 'TCINV/22-23/0783',invoiceDate: '24 Jun, 2022'},
    {orderId: '#1598',address: 'Aggarwal Bag Manufacturing, A-1151/B, 1st Floor, Utsav Vihar, Near Rama Vihar Bus Stand, 110081, Delhi, India',invoiceNo: 'TCINV/22-23/0783',invoiceDate: '24 Jun, 2022'},
    {orderId: '#1599',address: 'Aggarwal Bag Manufacturing, A-1151/B, 1st Floor, Utsav Vihar, Near Rama Vihar Bus Stand, 110081, Delhi, India',invoiceNo: 'TCINV/22-23/0783',invoiceDate: '24 Jun, 2022'},
    {orderId: '#1590',address: 'Aggarwal Bag Manufacturing, A-1151/B, 1st Floor, Utsav Vihar, Near Rama Vihar Bus Stand, 110081, Delhi, India',invoiceNo: 'TCINV/22-23/0783',invoiceDate: '24 Jun, 2022'},

  ];
  const tableStyle = {
    // margin: 'auto', 
    // width: '60%',  
    // maxWidth: '1000px',
  };
  
  const toggle = () => setCollapse(!collapse);

  const addressStyle = {
    width: '250px',
    maxWidth: '250px', 
    overflow: 'hidden', 
    textOverflow: 'ellipsis', 
    whiteSpace: 'nowrap' 
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
    <Button className='my-btn-color' style={{ marginBottom: '1rem',marginRight:'10px' }}>
           Dispatch An Order
            </Button>
           

      <Button className='my-btn-color' onClick={toggle.bind(null)} style={{ marginBottom: '1rem' }}>
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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <table className="table" style={tableStyle}>
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
                {orders.map((order) => (
                    <tr key={order.orderId}>
                      <td>{order.orderId}</td>
                      <td style={addressStyle} title={order.address}>{order.address}</td>
                      <td>{order.invoiceNo}</td>
                      <td>{order.invoiceDate}</td>
                      <td>
                        {/* Replace with actual action components or icons */}
                        <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2"><i className="bi bi-eye-fill my-eye-color" /></button>
                        <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2"> <i className="bi bi-bell-fill my-bell-color" /> </button>
                        <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2"><i className="bi bi-printer-fill my-printer-color" /></button>
                        <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2"><i className="bi bi-list my-list-color" /></button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            
    </div>
   
  </ComponentCard>

   
   
  );
};

export default Dispatch;