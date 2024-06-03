import React, {useState,useEffect } from 'react';
import { Row,Col,Button,Input,Label,Collapse,Card,CardBody,Form,FormGroup,FormText,Table} from 'reactstrap';
import PropTypes from 'prop-types';
import 'react-table-v6/react-table.css';
import { useNavigate } from 'react-router-dom';
import ComponentCard from '../../../components/ComponentCard';

const MyTooltip = ({children,text})=>{

  return (<div className="tooltip-container">
      {/* {console.log('children',children)} */}
      {children}
      <span className="my-tooltip">{text}</span>
  </div>)
}

const JumbotronComponent = () => {
// const [data,setData] = useState([]);
      const [collapse, setCollapse] = useState(false);
      const navigate = useNavigate();

      const toggle = () => setCollapse(!collapse);
      const handleEditAdd = () => {
        navigate('/order/orders/add');
      };

      const  editOrder = () => {
        navigate('/order/orders/edit');
      };

      const  viewOrder = () => {
        console.log('hi');
        navigate('/order/orders/view');
      };

      useEffect(()=>{
        const fetchData = async ()=>{

          const token = localStorage.getItem('userToken');
          const response =await  fetch(`https://factory.teamasia.in/api/public/orders/?is_trashed=0`,{
            method: "GET",
            headers:{
              'Authorization': `Bearer ${token}`
            }
          });

          if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const datas = await response.json();
            // setData(datas.orders);
            console.log('result',datas.orders);
        }
        fetchData();
      },[])

  return (
    <>
     
        <Row>
            <ComponentCard>
              <Row>
                <Col md="4">
                  <Button className='my-btn-color' style={{ marginBottom: '1rem',marginRight:'10px' }} onClick={() => handleEditAdd()}>
                    Add Order
                  </Button>
                  <Button className='my-btn-color' onClick={toggle.bind(null)} style={{ marginBottom: '1rem',marginRight:'10px' }}>
                    Search
                  </Button>
                  <Button className='my-btn-color-green' style={{ marginBottom: '1rem',marginRight:'10px' }} onClick={() => handleEditAdd()}>
                    Parked
                  </Button>
                </Col>
                <Col md="8" style={{textAlign:'right'}}>
                   <Button className='my-btn-color-red' style={{ marginBottom: '1rem',marginRight:'10px' }} onClick={() => handleEditAdd()}>
                     Print
                  </Button>
                   <Button className='my-btn-color-green' style={{ marginBottom: '1rem',marginRight:'10px' }} onClick={() => handleEditAdd()}>
                    Sort By Customer
                  </Button>
                </Col>
              </Row>
              <Row>
                  <Collapse isOpen={collapse}>
                    <Card className="border">
                      <CardBody>
                      <Form>
                    <Row>
                      <Col md="2">
                        <FormGroup>
                          <Label>Order No</Label>
                          <Input type="text" placeholder="Order No" />
                          <FormText className="muted"></FormText>
                        </FormGroup>
                      </Col>
                      <Col md="2">
                        <FormGroup>
                          <Label>Customer</Label>
                          <Input type="text" placeholder="" />
                          <FormText className="muted"></FormText>
                        </FormGroup>
                      </Col>
                      <Col md="2">
                        <FormGroup>
                          <Label>Order Date</Label>
                          <Input type="date" placeholder="Order Date" />
                          <FormText className="muted"></FormText>
                        </FormGroup>
                      </Col>
                      <Col md="2">
                        <FormGroup>
                          <Label>Expected Date</Label>
                          <Input type="date" placeholder="Expected Date" />
                          <FormText className="muted"></FormText>
                        </FormGroup>
                      </Col>
                      <Col md="2">
                        <FormGroup>
                          <Label>Grain</Label>
                          <Input type="text" placeholder="" />
                          <FormText className="muted"></FormText>
                        </FormGroup>
                      </Col>
                      <Col md="2">
                      <FormGroup>
                          <Label>Priority</Label>
                          <Input type="select">
                            <option>Choose Priority...</option>
                            <option>High</option>
                            <option>Medium</option>
                            <option>Low</option>
                          </Input>
                      </FormGroup>
                      </Col>
                      <Col md="2">
                        <FormGroup>
                          <Label>Status</Label>
                          <Input type="text" placeholder="" />
                          <FormText className="muted"></FormText>
                        </FormGroup>
                      </Col>
                      <Col md="2">
                        <FormGroup>
                          <Label>Quality</Label>
                          <Input type="text" placeholder="" />
                          <FormText className="muted"></FormText>
                        </FormGroup>
                      </Col>
                      <Col md="2">
                        <FormGroup>
                          <Label>Purchase Order</Label>
                          <Input type="text" placeholder="" />
                          <FormText className="muted"></FormText>
                        </FormGroup>
                      </Col>
                      <Col md="2">
                        <FormGroup>
                          <Label>Color</Label>
                          <Input type="text" placeholder="" />
                          <FormText className="muted"></FormText>
                        </FormGroup>
                      </Col>
                      <Col md="2">
                        <FormGroup>
                          <Label>Thickness</Label>
                          <Input type="text" placeholder="Thickness" />
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
              </Row>
              <div className='table-margin table-responsive'>
                <Table className='table-margin-zero-temp responsive table-size-x' size="sm">
                  <thead>
                    <tr>
                      <th>Order Details</th>
                      <th>Order and Exp Date</th>
                      <th>
                        <div style={{display:'flex'}} className='my-table'>
                              <div className="heading">Grain</div>
                              <div className="heading">Quality</div>
                              <div className="heading">THKNS</div>
                              <div className="heading">Color</div>
                              <div className="heading">T.Qty</div>
                              <div className="heading">2PLN</div>
                              <div className="heading">MFG</div>
                              <div className="heading">DISP</div>
                              <div className="heading">DISP OT</div>
                              <div className="heading">Actual Pending</div>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody >
                    {/* Repeat this block for each set of order details */}
                    <tr >
                      <td className='table-size-x-button'>
                        <div className="table-size-x-button-row">
                           <div>
                             <a  href="https://factory.teamcolence.com/admin/orders/572" className="fix-wid"> #572</a>      
                           </div>
                           <div className="fix-wid-1"> 
                                  Aqualite Industries Pvt. Ltd.
                            </div>
                        </div>

                        <div className="table-size-x-button-row">
                              <div className="fix-wid"> 
                                  Confirmed
                              </div>
                              <div> 
                                          <button type="button" className="btn mybtncustomer btn-secondary  mr-1" onClick={()=>{editOrder()}}><i className="bi bi-pencil-fill my-pen-color" /></button>
                                   
                                          <button type="button" className="btn mybtncustomer btn-secondary  mr-1" onClick={()=>{viewOrder()}}><i className="bi bi-eye-fill my-list-color" /></button>
                                    
                                          <button type="button" className="btn mybtncustomer btn-secondary  mr-1"><i className="bi bi-files my-eye-color" /></button>
                                    
                                          <button type="button" className="btn mybtncustomer btn-secondary  mr-1"><i className="bi bi-file-earmark-check-fill my-eye-color" /></button>
                                    
                                          <button type="button" className="btn mybtncustomer btn-secondary  mr-1"><i className="bi bi-person-fill my-trash-color" /></button>
                             </div>
                        </div>
                      </td>
                      <td  className="date-cell">
                        <div>
                          17 Dec, 2021
                        </div>
                        <div>
                          23 Dec, 2021
                        </div>
                      </td> 
                      <td className='noborder'>
                         <tr className='noborder'>
                          <div style={{display:'flex'}} className='my-table'>
                          <MyTooltip text="ALINEA">ALINEA</MyTooltip>
                                      <MyTooltip text="Q22/CX0Y12Z02 spspspspspspspspspspsp">Q22/CX0Y12Z02 spspspspspspspspspspsp</MyTooltip>
                                      <MyTooltip text="2.4mm">2.4mm</MyTooltip>
                                      <MyTooltip text="peach">peach</MyTooltip>
                                      <MyTooltip text="1000m">1000m</MyTooltip>
                                      <MyTooltip text="2000.00m">2000.00m</MyTooltip>
                                      <MyTooltip text="996.70m">996.70m</MyTooltip>
                                      <MyTooltip text="491.10m">491.10m</MyTooltip>
                                      <MyTooltip text="0.00m">0.00m</MyTooltip>
                                      <MyTooltip text="3.30m">3.30m</MyTooltip>
                          </div>
                            
                         </tr>
                         <tr className='noborder'>

                         <div style={{display:'flex',flexWrap: 'nowrap', position: 'relative'}} className='my-table'>
                                      <MyTooltip text="ALINEA">ALINEA</MyTooltip>
                                      <MyTooltip text="Q22/CX0Y12Z02">Q22/CX0Y12Z02</MyTooltip>
                                      <MyTooltip text="2.4mm">2.4mm</MyTooltip>
                                      <MyTooltip text="peach">peach</MyTooltip>
                                      <MyTooltip text="1000m">1000m</MyTooltip>
                                      <MyTooltip text="2000.00m">2000.00m</MyTooltip>
                                      <MyTooltip text="996.70m">996.70m</MyTooltip>
                                      <MyTooltip text="491.10m">491.10m</MyTooltip>
                                      <MyTooltip text="0.00m">0.00m</MyTooltip>
                                      <MyTooltip text="3.30m">3.30m</MyTooltip>
                          </div>
                         </tr>
                         <tr className='noborder'>
                         <div style={{display:'flex'}} className='my-table'>
                                      <MyTooltip text="ALINEA">ALINEA</MyTooltip>
                                      <MyTooltip text="Q22/CX0Y12Z02">Q22/CX0Y12Z02</MyTooltip>
                                      <MyTooltip text="2.4mm">2.4mm</MyTooltip>
                                      <MyTooltip text="peach">peach</MyTooltip>
                                      <MyTooltip text="1000m">1000m</MyTooltip>
                                      <MyTooltip text="2000.00m">2000.00m</MyTooltip>
                                      <MyTooltip text="996.70m">996.70m</MyTooltip>
                                      <MyTooltip text="491.10m">491.10m</MyTooltip>
                                      <MyTooltip text="0.00m">0.00m</MyTooltip>
                                      <MyTooltip text="3.30m">3.30m</MyTooltip>
                          </div>
                         </tr>
                         <tr className='noborder'>
                         <div style={{display:'flex'}} className='my-table'>
                                      <MyTooltip text="ALINEA">ALINEA</MyTooltip>
                                      <MyTooltip text="Q22/CX0Y12Z02">Q22/CX0Y12Z02</MyTooltip>
                                      <MyTooltip text="2.4mm">2.4mm</MyTooltip>
                                      <MyTooltip text="peach">peach</MyTooltip>
                                      <MyTooltip text="1000m">1000m</MyTooltip>
                                      <MyTooltip text="2000.00m">2000.00m</MyTooltip>
                                      <MyTooltip text="996.70m">996.70m</MyTooltip>
                                      <MyTooltip text="491.10m">491.10m</MyTooltip>
                                      <MyTooltip text="0.00m">0.00m</MyTooltip>
                                      <MyTooltip text="3.30m">3.30m</MyTooltip>
                          </div>
                         </tr>
                      </td>
                    </tr>
                    
                    <tr >
                      <td className='table-size-x-button'>
                        <div className="table-size-x-button-row">
                           <div>
                             <a  href="https://factory.teamcolence.com/admin/orders/572" className="fix-wid"> #572</a>      
                           </div>
                           <div className="fix-wid-1"> 
                                  Aqualite Industries Pvt. Ltd.
                            </div>
                        </div>

                        <div className="table-size-x-button-row">
                              <div className="fix-wid"> 
                                  Confirmed
                              </div>
                              <div> 
                                          <button type="button" className="btn mybtncustomer btn-secondary  mr-1"><i className="bi bi-pencil-fill my-pen-color" /></button>
                                   
                                          <button type="button" className="btn mybtncustomer btn-secondary  mr-1"><i className="bi bi-eye-fill my-list-color" /></button>
                                    
                                          <button type="button" className="btn mybtncustomer btn-secondary  mr-1"><i className="bi bi-files my-eye-color" /></button>
                                    
                                          <button type="button" className="btn mybtncustomer btn-secondary  mr-1"><i className="bi bi-file-earmark-check-fill my-eye-color" /></button>
                                    
                                          <button type="button" className="btn mybtncustomer btn-secondary  mr-1"><i className="bi bi-person-fill my-trash-color" /></button>
                             </div>
                        </div>
                      </td>
                      <td  className="date-cell">
                        <div>
                          17 Dec, 2021
                        </div>
                        <div>
                          23 Dec, 2021
                        </div>
                      </td> 
                      <td className='noborder'>
                         <tr className='noborder'>
                          <div style={{display:'flex'}} className='my-table'>
                          <MyTooltip text="ALINEA">ALINEA</MyTooltip>
                                      <MyTooltip text="Q22/CX0Y12Z02 spspspspspspspspspspsp">Q22/CX0Y12Z02 spspspspspspspspspspsp</MyTooltip>
                                      <MyTooltip text="2.4mm">2.4mm</MyTooltip>
                                      <MyTooltip text="peach">peach</MyTooltip>
                                      <MyTooltip text="1000m">1000m</MyTooltip>
                                      <MyTooltip text="2000.00m">2000.00m</MyTooltip>
                                      <MyTooltip text="996.70m">996.70m</MyTooltip>
                                      <MyTooltip text="491.10m">491.10m</MyTooltip>
                                      <MyTooltip text="0.00m">0.00m</MyTooltip>
                                      <MyTooltip text="3.30m">3.30m</MyTooltip>
                          </div>
                            
                         </tr>
                         <tr className='noborder'>

                         <div style={{display:'flex',flexWrap: 'nowrap', position: 'relative'}} className='my-table'>
                                      <MyTooltip text="ALINEA">ALINEA</MyTooltip>
                                      <MyTooltip text="Q22/CX0Y12Z02">Q22/CX0Y12Z02</MyTooltip>
                                      <MyTooltip text="2.4mm">2.4mm</MyTooltip>
                                      <MyTooltip text="peach">peach</MyTooltip>
                                      <MyTooltip text="1000m">1000m</MyTooltip>
                                      <MyTooltip text="2000.00m">2000.00m</MyTooltip>
                                      <MyTooltip text="996.70m">996.70m</MyTooltip>
                                      <MyTooltip text="491.10m">491.10m</MyTooltip>
                                      <MyTooltip text="0.00m">0.00m</MyTooltip>
                                      <MyTooltip text="3.30m">3.30m</MyTooltip>
                          </div>
                         </tr>
                         <tr className='noborder'>
                         <div style={{display:'flex'}} className='my-table'>
                                      <MyTooltip text="ALINEA">ALINEA</MyTooltip>
                                      <MyTooltip text="Q22/CX0Y12Z02">Q22/CX0Y12Z02</MyTooltip>
                                      <MyTooltip text="2.4mm">2.4mm</MyTooltip>
                                      <MyTooltip text="peach">peach</MyTooltip>
                                      <MyTooltip text="1000m">1000m</MyTooltip>
                                      <MyTooltip text="2000.00m">2000.00m</MyTooltip>
                                      <MyTooltip text="996.70m">996.70m</MyTooltip>
                                      <MyTooltip text="491.10m">491.10m</MyTooltip>
                                      <MyTooltip text="0.00m">0.00m</MyTooltip>
                                      <MyTooltip text="3.30m">3.30m</MyTooltip>
                          </div>
                         </tr>
                         <tr className='noborder'>
                         <div style={{display:'flex'}} className='my-table'>
                                      <MyTooltip text="ALINEA">ALINEA</MyTooltip>
                                      <MyTooltip text="Q22/CX0Y12Z02">Q22/CX0Y12Z02</MyTooltip>
                                      <MyTooltip text="2.4mm">2.4mm</MyTooltip>
                                      <MyTooltip text="peach">peach</MyTooltip>
                                      <MyTooltip text="1000m">1000m</MyTooltip>
                                      <MyTooltip text="2000.00m">2000.00m</MyTooltip>
                                      <MyTooltip text="996.70m">996.70m</MyTooltip>
                                      <MyTooltip text="491.10m">491.10m</MyTooltip>
                                      <MyTooltip text="0.00m">0.00m</MyTooltip>
                                      <MyTooltip text="3.30m">3.30m</MyTooltip>
                          </div>
                         </tr>
                      </td>
                    </tr>
                    <tr >
                      <td className='table-size-x-button'>
                        <div className="table-size-x-button-row">
                           <div>
                             <a  href="https://factory.teamcolence.com/admin/orders/572" className="fix-wid"> #572</a>      
                           </div>
                           <div className="fix-wid-1"> 
                                  Aqualite Industries Pvt. Ltd.
                            </div>
                        </div>

                        <div className="table-size-x-button-row">
                              <div className="fix-wid"> 
                                  Confirmed
                              </div>
                              <div> 
                                          <button type="button" className="btn mybtncustomer btn-secondary  mr-1"><i className="bi bi-pencil-fill my-pen-color" /></button>
                                   
                                          <button type="button" className="btn mybtncustomer btn-secondary  mr-1"><i className="bi bi-eye-fill my-list-color" /></button>
                                    
                                          <button type="button" className="btn mybtncustomer btn-secondary  mr-1"><i className="bi bi-files my-eye-color" /></button>
                                    
                                          <button type="button" className="btn mybtncustomer btn-secondary  mr-1"><i className="bi bi-file-earmark-check-fill my-eye-color" /></button>
                                    
                                          <button type="button" className="btn mybtncustomer btn-secondary  mr-1"><i className="bi bi-person-fill my-trash-color" /></button>
                             </div>
                        </div>
                      </td>
                      <td  className="date-cell">
                        <div>
                          17 Dec, 2021
                        </div>
                        <div>
                          23 Dec, 2021
                        </div>
                      </td> 
                      <td className='noborder'>
                         <tr className='noborder'>
                          <div style={{display:'flex'}} className='my-table'>
                          <MyTooltip text="ALINEA">ALINEA</MyTooltip>
                                      <MyTooltip text="Q22/CX0Y12Z02 spspspspspspspspspspsp">Q22/CX0Y12Z02 spspspspspspspspspspsp</MyTooltip>
                                      <MyTooltip text="2.4mm">2.4mm</MyTooltip>
                                      <MyTooltip text="peach">peach</MyTooltip>
                                      <MyTooltip text="1000m">1000m</MyTooltip>
                                      <MyTooltip text="2000.00m">2000.00m</MyTooltip>
                                      <MyTooltip text="996.70m">996.70m</MyTooltip>
                                      <MyTooltip text="491.10m">491.10m</MyTooltip>
                                      <MyTooltip text="0.00m">0.00m</MyTooltip>
                                      <MyTooltip text="3.30m">3.30m</MyTooltip>
                          </div>
                            
                         </tr>
                         <tr className='noborder'>

                         <div style={{display:'flex',flexWrap: 'nowrap', position: 'relative'}} className='my-table'>
                                      <MyTooltip text="ALINEA">ALINEA</MyTooltip>
                                      <MyTooltip text="Q22/CX0Y12Z02">Q22/CX0Y12Z02</MyTooltip>
                                      <MyTooltip text="2.4mm">2.4mm</MyTooltip>
                                      <MyTooltip text="peach">peach</MyTooltip>
                                      <MyTooltip text="1000m">1000m</MyTooltip>
                                      <MyTooltip text="2000.00m">2000.00m</MyTooltip>
                                      <MyTooltip text="996.70m">996.70m</MyTooltip>
                                      <MyTooltip text="491.10m">491.10m</MyTooltip>
                                      <MyTooltip text="0.00m">0.00m</MyTooltip>
                                      <MyTooltip text="3.30m">3.30m</MyTooltip>
                          </div>
                         </tr>
                         <tr className='noborder'>
                         <div style={{display:'flex'}} className='my-table'>
                                      <MyTooltip text="ALINEA">ALINEA</MyTooltip>
                                      <MyTooltip text="Q22/CX0Y12Z02">Q22/CX0Y12Z02</MyTooltip>
                                      <MyTooltip text="2.4mm">2.4mm</MyTooltip>
                                      <MyTooltip text="peach">peach</MyTooltip>
                                      <MyTooltip text="1000m">1000m</MyTooltip>
                                      <MyTooltip text="2000.00m">2000.00m</MyTooltip>
                                      <MyTooltip text="996.70m">996.70m</MyTooltip>
                                      <MyTooltip text="491.10m">491.10m</MyTooltip>
                                      <MyTooltip text="0.00m">0.00m</MyTooltip>
                                      <MyTooltip text="3.30m">3.30m</MyTooltip>
                          </div>
                         </tr>
                         <tr className='noborder'>
                         <div style={{display:'flex'}} className='my-table'>
                                      <MyTooltip text="ALINEA">ALINEA</MyTooltip>
                                      <MyTooltip text="Q22/CX0Y12Z02">Q22/CX0Y12Z02</MyTooltip>
                                      <MyTooltip text="2.4mm">2.4mm</MyTooltip>
                                      <MyTooltip text="peach">peach</MyTooltip>
                                      <MyTooltip text="1000m">1000m</MyTooltip>
                                      <MyTooltip text="2000.00m">2000.00m</MyTooltip>
                                      <MyTooltip text="996.70m">996.70m</MyTooltip>
                                      <MyTooltip text="491.10m">491.10m</MyTooltip>
                                      <MyTooltip text="0.00m">0.00m</MyTooltip>
                                      <MyTooltip text="3.30m">3.30m</MyTooltip>
                          </div>
                         </tr>
                      </td>
                    </tr>
                    <tr >
                      <td className='table-size-x-button'>
                        <div className="table-size-x-button-row">
                           <div>
                             <a  href="https://factory.teamcolence.com/admin/orders/572" className="fix-wid"> #572</a>      
                           </div>
                           <div className="fix-wid-1"> 
                                  Aqualite Industries Pvt. Ltd.
                            </div>
                        </div>

                        <div className="table-size-x-button-row">
                              <div className="fix-wid"> 
                                  Confirmed
                              </div>
                              <div> 
                                          <button type="button" className="btn mybtncustomer btn-secondary  mr-1"><i className="bi bi-pencil-fill my-pen-color" /></button>
                                   
                                          <button type="button" className="btn mybtncustomer btn-secondary  mr-1"><i className="bi bi-eye-fill my-list-color" /></button>
                                    
                                          <button type="button" className="btn mybtncustomer btn-secondary  mr-1"><i className="bi bi-files my-eye-color" /></button>
                                    
                                          <button type="button" className="btn mybtncustomer btn-secondary  mr-1"><i className="bi bi-file-earmark-check-fill my-eye-color" /></button>
                                    
                                          <button type="button" className="btn mybtncustomer btn-secondary  mr-1"><i className="bi bi-person-fill my-trash-color" /></button>
                             </div>
                        </div>
                      </td>
                      <td  className="date-cell">
                        <div>
                          17 Dec, 2021
                        </div>
                        <div>
                          23 Dec, 2021
                        </div>
                      </td> 
                      <td className='noborder'>
                         <tr className='noborder'>
                          <div style={{display:'flex'}} className='my-table'>
                          <MyTooltip text="ALINEA">ALINEA</MyTooltip>
                                      <MyTooltip text="Q22/CX0Y12Z02 spspspspspspspspspspsp">Q22/CX0Y12Z02 spspspspspspspspspspsp</MyTooltip>
                                      <MyTooltip text="2.4mm">2.4mm</MyTooltip>
                                      <MyTooltip text="peach">peach</MyTooltip>
                                      <MyTooltip text="1000m">1000m</MyTooltip>
                                      <MyTooltip text="2000.00m">2000.00m</MyTooltip>
                                      <MyTooltip text="996.70m">996.70m</MyTooltip>
                                      <MyTooltip text="491.10m">491.10m</MyTooltip>
                                      <MyTooltip text="0.00m">0.00m</MyTooltip>
                                      <MyTooltip text="3.30m">3.30m</MyTooltip>
                          </div>
                            
                         </tr>
                         <tr className='noborder'>

                         <div style={{display:'flex',flexWrap: 'nowrap', position: 'relative'}} className='my-table'>
                                      <MyTooltip text="ALINEA">ALINEA</MyTooltip>
                                      <MyTooltip text="Q22/CX0Y12Z02">Q22/CX0Y12Z02</MyTooltip>
                                      <MyTooltip text="2.4mm">2.4mm</MyTooltip>
                                      <MyTooltip text="peach">peach</MyTooltip>
                                      <MyTooltip text="1000m">1000m</MyTooltip>
                                      <MyTooltip text="2000.00m">2000.00m</MyTooltip>
                                      <MyTooltip text="996.70m">996.70m</MyTooltip>
                                      <MyTooltip text="491.10m">491.10m</MyTooltip>
                                      <MyTooltip text="0.00m">0.00m</MyTooltip>
                                      <MyTooltip text="3.30m">3.30m</MyTooltip>
                          </div>
                         </tr>
                         <tr className='noborder'>
                         <div style={{display:'flex'}} className='my-table'>
                                      <MyTooltip text="ALINEA">ALINEA</MyTooltip>
                                      <MyTooltip text="Q22/CX0Y12Z02">Q22/CX0Y12Z02</MyTooltip>
                                      <MyTooltip text="2.4mm">2.4mm</MyTooltip>
                                      <MyTooltip text="peach">peach</MyTooltip>
                                      <MyTooltip text="1000m">1000m</MyTooltip>
                                      <MyTooltip text="2000.00m">2000.00m</MyTooltip>
                                      <MyTooltip text="996.70m">996.70m</MyTooltip>
                                      <MyTooltip text="491.10m">491.10m</MyTooltip>
                                      <MyTooltip text="0.00m">0.00m</MyTooltip>
                                      <MyTooltip text="3.30m">3.30m</MyTooltip>
                          </div>
                         </tr>
                         <tr className='noborder'>
                         <div style={{display:'flex'}} className='my-table'>
                                      <MyTooltip text="ALINEA">ALINEA</MyTooltip>
                                      <MyTooltip text="Q22/CX0Y12Z02">Q22/CX0Y12Z02</MyTooltip>
                                      <MyTooltip text="2.4mm">2.4mm</MyTooltip>
                                      <MyTooltip text="peach">peach</MyTooltip>
                                      <MyTooltip text="1000m">1000m</MyTooltip>
                                      <MyTooltip text="2000.00m">2000.00m</MyTooltip>
                                      <MyTooltip text="996.70m">996.70m</MyTooltip>
                                      <MyTooltip text="491.10m">491.10m</MyTooltip>
                                      <MyTooltip text="0.00m">0.00m</MyTooltip>
                                      <MyTooltip text="3.30m">3.30m</MyTooltip>
                          </div>
                         </tr>
                      </td>
                    </tr>
                    
                   
                    
                    
                  
                  </tbody>
                </Table>
                
              </div>
            </ComponentCard>
        </Row>
    </>
  );
};

export default JumbotronComponent;

MyTooltip.propTypes = {
  children: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
};