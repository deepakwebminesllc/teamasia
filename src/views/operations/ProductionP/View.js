import React, { useState } from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
  Table
} from 'reactstrap';
import ProgressBar from 'react-bootstrap/ProgressBar';
import ComponentCard from '../../../components/ComponentCard';
import 'react-table-v6/react-table.css';
import Barcode from "../../../assets/images/bg/barcode.png"

const JumbotronComponent = () => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

 const var1 = " Combit Footwear Pvt. Ltd. (#1409) , Product(1409_1)"
 const var2 = "Delivery Date : 04 Jun, 2022 Total : 200 m | Remaining : 30.00 m"

  
  return (
    <>
      <ComponentCard title="">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={activeTab === '1' ? 'active' : ''}
              onClick={() => {
                toggle('1');
              }}
            >
              Line 1
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '2' ? 'active' : ''}
              onClick={() => {
                toggle('2');
              }}
            >
              Line 2
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '3' ? 'active' : ''}
              onClick={() => {
                toggle('3');
              }}
            >
              Line 1 (night)
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '4' ? 'active' : ''}
              onClick={() => {
                toggle('4');
              }}
            >
              Line 2 (night)
            </NavLink>
          </NavItem>
          <Button>Print Plan</Button>
        </Nav>
        <TabContent className="p-4" activeTab={activeTab}>
          <TabPane tabId="1">
            <Table responsive>
                  <thead>
                    <tr>
                      <th scope="col"><Button className='my-btn-color'>{"Total Jumbo Rolls => Count : 16, Qty : 4983 m"}</Button></th>
                      <th scope="col"><Button className='my-btn-color-red'>{"Total Small Rolls => Count : 208, Qty : 4871.7 m"}</Button></th>
                    </tr>
                  </thead>
                  
                </Table>
            <Row>
            <ComponentCard>

              <div className='table-margin'>
               <Table className='table-margin-zero'>
                  <thead>
                    <tr>
                      <th scope="col">
                        <div>{var1}</div>
                        <div>{var2}</div>
                        </th>
                      <th scope="col"><Button className='my-btn-color'>Create Jumbo Roll</Button></th>
                      <th scope="col"><Button className='my-btn-color-red'>Paste Consumption</Button></th>
                      <th scope="col"><Button className='my-btn-color-red'>Manage daily Usage</Button></th>
                      <th scope="col"><Button className='my-btn-color-red'>Lab Report</Button></th>
                      <th scope="col"><Button className='my-btn-mo-color'>More</Button></th>
                      
                    </tr>
                  </thead>
                  
                </Table>

                <Table className='table-margin-zero'>
                  <thead>
                    <tr>
                      <th scope="col">Grain</th>
                      <th scope="col">Color</th>
                      <th scope="col">Quality</th>
                      <th scope="col">Thickness</th>
                      <th scope="col">Fabric</th>
                      <th scope="col">Fabric Color</th>
                      <th scope="col">HSN</th>
                      <th scope="col">Price($)</th>
                      <th scope="col">Tax</th>
                      <th scope="col">Embossing</th>
                      <th scope="col">Printing</th>
                      <th scope="col">CIR.</th>
                      <th scope="col">AT</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td >1001 A</td>
                              <td>black</td>
                              <td>Q2/CX0Y13Z03</td>
                              <td>1.7 mm </td>
                              <td>WP.matty_185g_120gsm</td>
                              <td>black</td>
                              <td>59031090</td>
                              <td>313.6</td>
                              <td>12%</td>
                              <td>N/A</td>
                              <td>N/A</td>
                              <td>N/A</td>
                              <td>N/A</td>

                    </tr>
                  
                  </tbody>
                </Table>
                <Table responsive>
                  <thead>
                    <tr>
                      <th scope="col">Pre Skin</th>
                      <th scope="col">Skin</th>
                      <th scope="col">Top Coat</th>
                      <th scope="col">Filler In Top Coat</th>
                      <th scope="col">Foam</th>
                      <th scope="col">Filler In Foam</th>
                      <th scope="col">Adhesive</th>
                      <th scope="col">Filler In Adhesive</th>
                      <th scope="col">Final GSM</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>N/A</td>
                              <td>200 gsm</td>
                              <td>N/A</td>
                              <td>N/A</td>
                              <td>910 gsm</td>
                              <td>175 PHR</td>
                              <td>120 gsm</td>
                              <td>75 PHR</td>
                              <td>1350 gsm</td>
                              

                    </tr>
                  
                  </tbody>
                </Table>

                  <>{"Jumbo Rolls (Total : 1, Qty : 170 m, Small Rolls => Count : 8 , Qty : 161 m, Avg GSM : 1334.69 g/m2"}</>
                <Table responsive>
                  <thead>
                    <tr>
                      <th scope="col">S. No.</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Code</th>
                      <th scope="col">LCA</th>
                      <th scope="col">Action</th>
                     
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>170 m</td>
                      <td><img src={Barcode} alt='barcode'/></td>
                      <td><ProgressBar now={220} label={`${220}`} style={{width:"300px",height:"25px"}}/></td>
                      <td>
                        <td ><Button ><i className="bi bi-printer-fill my-bell-color" /></Button></td>
                        <td ><Button ><i className="bi bi-pencil-fill my-pen-color" /></Button></td>
                        <td ><Button ><i className="bi bi-trash-fill my-trash-color" /></Button></td>
                     
                      </td>
                              

                    </tr>
                  
                  </tbody>
                </Table>
               </div>
                
               <div className='table-margin'>
               <Table className='table-margin-zero'>
                  <thead>
                    <tr>
                      <th scope="col">
                        <div>{var1}</div>
                        <div>{var2}</div>
                        </th>
                      <th scope="col"><Button className='my-btn-color'>Create Jumbo Roll</Button></th>
                      <th scope="col"><Button className='my-btn-color-red'>Paste Consumption</Button></th>
                      <th scope="col"><Button className='my-btn-color-red'>Manage daily Usage</Button></th>
                      <th scope="col"><Button className='my-btn-color-red'>Lab Report</Button></th>
                      <th scope="col"><Button className='my-btn-mo-color'>More</Button></th>
                      
                    </tr>
                  </thead>
                  
                </Table>

                <Table className='table-margin-zero'>
                  <thead>
                    <tr>
                      <th scope="col">Grain</th>
                      <th scope="col">Color</th>
                      <th scope="col">Quality</th>
                      <th scope="col">Thickness</th>
                      <th scope="col">Fabric</th>
                      <th scope="col">Fabric Color</th>
                      <th scope="col">HSN</th>
                      <th scope="col">Price($)</th>
                      <th scope="col">Tax</th>
                      <th scope="col">Embossing</th>
                      <th scope="col">Printing</th>
                      <th scope="col">CIR.</th>
                      <th scope="col">AT</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td >1001 A</td>
                              <td>black</td>
                              <td>Q2/CX0Y13Z03</td>
                              <td>1.7 mm </td>
                              <td>WP.matty_185g_120gsm</td>
                              <td>black</td>
                              <td>59031090</td>
                              <td>313.6</td>
                              <td>12%</td>
                              <td>N/A</td>
                              <td>N/A</td>
                              <td>N/A</td>
                              <td>N/A</td>

                    </tr>
                  
                  </tbody>
                </Table>
                <Table responsive>
                  <thead>
                    <tr>
                      <th scope="col">Pre Skin</th>
                      <th scope="col">Skin</th>
                      <th scope="col">Top Coat</th>
                      <th scope="col">Filler In Top Coat</th>
                      <th scope="col">Foam</th>
                      <th scope="col">Filler In Foam</th>
                      <th scope="col">Adhesive</th>
                      <th scope="col">Filler In Adhesive</th>
                      <th scope="col">Final GSM</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>N/A</td>
                              <td>200 gsm</td>
                              <td>N/A</td>
                              <td>N/A</td>
                              <td>910 gsm</td>
                              <td>175 PHR</td>
                              <td>120 gsm</td>
                              <td>75 PHR</td>
                              <td>1350 gsm</td>
                              

                    </tr>
                  
                  </tbody>
                </Table>

                  <>{"Jumbo Rolls (Total : 1, Qty : 170 m, Small Rolls => Count : 8 , Qty : 161 m, Avg GSM : 1334.69 g/m2"}</>
                <Table responsive>
                  <thead>
                    <tr>
                      <th scope="col">S. No.</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Code</th>
                      <th scope="col">LCA</th>
                      <th scope="col">Action</th>
                     
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>170 m</td>
                      <td><img src={Barcode} alt='barcode'/></td>
                      <td><ProgressBar now={220} label={`${220}`} style={{width:"300px",height:"25px"}}/></td>
                      <td>
                        <td ><Button ><i className="bi bi-printer-fill my-bell-color" /></Button></td>
                        <td ><Button ><i className="bi bi-pencil-fill my-pen-color" /></Button></td>
                        <td ><Button ><i className="bi bi-trash-fill my-trash-color" /></Button></td>
                     
                      </td>
                              

                    </tr>
                  
                  </tbody>
                </Table>
               </div>

             </ComponentCard>
           
              
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <h4>Tab 2 Contents</h4>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="3">
            <Row>
              <Col sm="12">
                <h4>Tab 3 Contents</h4>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="4">
            <Row>
              <Col sm="6">
                <Card body>
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>
                    With supporting text below as a natural lead-in to additional content.
                  </CardText>
                  <Button>Go somewhere</Button>
                </Card>
              </Col>
              <Col sm="6">
                <Card body>
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>
                    With supporting text below as a natural lead-in to additional content.
                  </CardText>
                  <Button>Go somewhere</Button>
                </Card>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </ComponentCard>
    </>
  );
};

export default JumbotronComponent;
