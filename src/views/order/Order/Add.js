import React,{useEffect,useState} from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Button,
  
} from 'reactstrap';
// import { useParams } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { stateFromHTML } from 'draft-js-import-html';
import Product from './Products';
import './editor.scss';
import DashCard from '../../../components/dashboard/dashboardCards/DashCard';
// import ComponentCard from '../../components/ComponentCard';

const Add = () => {
  const navigate= useNavigate();
const [data1, setData1] = useState([]);
const [firstcheck, setFirstCheck] = useState(false);
const [secondcheck, setSecondCheck] = useState(false);




  const content = `
  <h5 style="color: rgb(97, 189, 109); font-family: 'Times New Roman'; font-size: 96px;">
    Your text with <s>strikethrough</s> and <sup>superscript</sup>.
  </h5>
`;

// Convert HTML to Draft.js ContentState
const contentFromHTML = stateFromHTML(content);

  console.log('convertFromRaw(content)',contentFromHTML);
  const [contentState, setEditorState] = useState(EditorState.createWithContent(contentFromHTML));
  const [htmlContent, sethtmlContent] = useState('');



  
  const [formDatas, setFormDataS] = useState({
    customerId:'x',
    billingAddressId:'x',
    deliveryAddressId:'x',
    orderNotes:'',
    severityId:'x',
    expectedDeliveryDate:'',
    purchaseOrder:'',
    representativeId:'x',
  });
  
  const onContentStateChange = (c) => {
    console.log('contentState',c);
    const htmlContent1 = draftToHtml(c);
    console.log('html',htmlContent1);
    console.log('htmlcontent',htmlContent);

    sethtmlContent(htmlContent1);

    setEditorState(c);
  };

  // const [data2, setData2] = useState([
  //   {
  //     id:'1',
  //     name:'black'
  //   },
  //   {
  //     id:'2',
  //     name:'white'
  //   }
  // ]);

// const [selectedType, setSelectedType] = useState('');

const handleChange = (e) => {
  const { name, value } = e.target;
  console.log('hi')
  setFormDataS(prevState => ({
    ...prevState,
    [name]: value
  }));
};


const checkboxclick1 = () => {
  console.log('check',firstcheck);
  setFirstCheck(!firstcheck);
};
const checkboxclick2 = () => {
  console.log('check',secondcheck);
  setSecondCheck(!secondcheck);
};


  async function apiCall() {
    try {
      
       

        console.log('formdataX',formDatas);
        console.log('final', JSON.stringify({
          customer_id:formDatas.customerId,
          billing_address_id:formDatas.billingAddressId,
          delivery_address_id:formDatas.deliveryAddressId,
          order_notes:formDatas.orderNotes,
          severity_id:formDatas.severityId,
          expected_delivery_date:formDatas.expectedDeliveryDate,
          purchase_order:formDatas.purchaseOrder,
          representative_id:formDatas.representativeId,
          is_trashed:0,
              // product_additional_treatment: filtered2,
        }));

        const token = localStorage.getItem('userToken');
        const response = await fetch(`https://factory.teamasia.in/api/public/products`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
           
            body: JSON.stringify({
              customer_id:formDatas.customerId,
              billing_address_id:formDatas.billingAddressId,
              delivery_address_id:formDatas.deliveryAddressId,
              order_notes:formDatas.orderNotes,
              severity_id:formDatas.severityId,
              expected_delivery_date:formDatas.expectedDeliveryDate,
              purchase_order:formDatas.purchaseOrder,
              representative_id:formDatas.representativeId,
              is_trashed:0,
            }),
        });

        const dataZ = await response.json();
        console.log("dataapi",dataZ)
        if (response.ok) {


          navigate('/order/factory-surplus');
            
        } 
            // Handle any errors, such as showing an error message to the user
            console.error("Authentication failed:", dataZ.message);
            return null;
      
    } catch (error) {
        console.error("Network error:", error);
        return null;
    }
}




const handleSubmit = async (event) => {
  event.preventDefault();
  
    apiCall();
 

};

  const handleTypeChange = (e) => {
    const { name, value } = e.target;
    // setSelectedType(e.target.value);
      setFormDataS(prevState => ({
        ...prevState,
        [name]: value
      }));
   
    
    // console.log('e',e.target.options[e.target.selectedIndex].text);
    console.log('e',e.target.value);
  };


  useEffect(() => {
    
    // Fetch the data from the API
    const fetchData1 = async () => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch('https://factory.teamasia.in/api/public/customers', {
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
      console.log("data1 customers",result.customers);
      const resultX = result.customers.slice();
      resultX.push({id:'x',company_name:'Choose'});
      setData1(resultX); 
    };

    fetchData1();

  },[]);
  




  return (
<div>
     
     <Row>
       <Col md="12">
         <Card>
           <CardTitle tag="h4" className="border-bottom bg-primary p-3 mb-0 text-white">
           </CardTitle>
           <CardBody className="bg-light">
             <CardTitle tag="h4" className="mb-0">
             </CardTitle>
           </CardBody>
           <CardBody style={{background:'#edf1f5'}}>
             <Form onSubmit={handleSubmit}>
               <Row>
                   <Col md="6">
                      <DashCard title="Address" >
                          <Col md="10" className=''>
                            <FormGroup>
                              <Label>Customer Details</Label>
                              <Input type="select" 
                                name="customerId" 
                                value={formDatas.customerId}
                                onChange={handleTypeChange}
                                >
                                  {data1.map((item)=>{
          
                                    return <option key={item.id} value={item.id}>{item.company_name}</option>
                                  })}
                              </Input>
                            
                                <FormText className="text-danger"></FormText>
                              
                              
                            </FormGroup>
                          </Col>
                      </DashCard>

                      <DashCard title="Address" >
                          <Col md="10">
                            <FormGroup>
                              <Label>Billing Address</Label>
                              <Input type="select" 
                                name="addressId" 
                                value={formDatas.addressId}
                                onChange={handleTypeChange}
                                >
                                  {data1.map((item)=>{
                                  
          
                                    return <option key={item.id} value={item.id}>{item.name}</option>
                                  })}
                              </Input>
                              
                                <FormText className="text-danger"></FormText>
                              
                            </FormGroup>
                          </Col>
                          <Col md="10">
                          <FormGroup>
                            {/* <Input type="checkbox" checked={ DefaultToFactoryStock === '1'} onChange={checkboxclick()}  /> */}
                            <Input type="checkbox" checked={ firstcheck} onChange={checkboxclick1}  />
                            <Label className='mx-1'> Delivery Address is same as Billing Address</Label>
                            <FormText className="muted"></FormText>
                          </FormGroup>
                        </Col>

                        {firstcheck?null:<><Col md="10">
                          <FormGroup>
                            {/* <Input type="checkbox" checked={ DefaultToFactoryStock === '1'} onChange={checkboxclick()}  /> */}
                            <Input type="checkbox" checked={secondcheck} onChange={checkboxclick2}  />
                            <Label className='mx-1'> Deliver the order to another Company</Label>
                            <FormText className="muted"></FormText>
                          </FormGroup>
                        </Col>
                        {secondcheck?<>
                                <Col md="10" className=''>
                                    <FormGroup>
                                      <Label>Customer </Label>
                                      <Input type="select" 
                                        name="customerId" 
                                        value={formDatas.customerId}
                                        onChange={handleTypeChange}
                                        >
                                          {data1.map((item)=>{
                  
                                            return <option key={item.id} value={item.id}>{item.company_name}</option>
                                          })}
                                      </Input>
                                    
                                        <FormText className="text-danger"></FormText>
                                      
                                      
                                    </FormGroup>
                                  </Col>
                        </>:null}
                        
                            
                        <Col md="10">
                            <FormGroup>
                              <Label>Delivery Address</Label>
                              <Input type="select" 
                                name="addressId" 
                                value={formDatas.addressId}
                                onChange={handleTypeChange}
                                >
                                  {data1.map((item)=>{
                                  
          
                                    return <option key={item.id} value={item.id}>{item.name}</option>
                                  })}
                              </Input>
                              
                                <FormText className="text-danger"></FormText>
                              
                            </FormGroup>
                          </Col></>}  
                      </DashCard>

                      <DashCard title="Additional Documents" >
                        <Editor
                          defaultEditorState={contentState}
                          wrapperClassName="demo-wrapper mb-0"
                          editorClassName="demo-editor border mb-4 edi-height"
                          onContentStateChange={onContentStateChange}
                        />
                        {/* <Input type="textarea" raw={4} disabled value={JSON.stringify(contentState, null, 4)} /> */}
                    </DashCard>

                   </Col>
                   <Col md="6">
                    <DashCard title="Other Information" >
                      <Col md="8">
                          <FormGroup>
                            <Label>Priority</Label>
                            <Input type="text" 
                            name="purchaseNumber" 
                            id="name"
                            placeholder="Enter name" 
                            value={formDatas.purchaseNumber}
                            onChange={handleChange}
                              />
                            <FormText className="muted"></FormText>
                          </FormGroup>
                       </Col>
                      <Col md="8">
                          <FormGroup>
                            <Label>Expected Delivery Date</Label>
                            <Input type="date" 
                            name="purchaseDocumentFilePath" 
                            id="name"
                            placeholder="Enter name" 
                            onChange={handleChange} 
                              />
                            <FormText className="muted"></FormText>
                          </FormGroup>
                       </Col>
                      <Col md="8">
                          <FormGroup>
                            <Label>Purchase Order</Label>
                            <Input type="text" 
                            name="vendorInvoiceNumber" 
                            id="name"
                            placeholder="Enter name" 
                            value={formDatas.vendorInvoiceNumber}
                            onChange={handleChange} 
                              />
                            <FormText className="muted"></FormText>
                          </FormGroup>
                       </Col>
                      <Col md="8">
                            <FormGroup>
                              <Label>Purchase Order Document</Label>
                              <Input type="file" 
                              name="vendorInvoiceFilePath" 
                              id="name"
                              placeholder="Enter name" 
                              onChange={handleChange} 
                                />
                              <FormText className="muted"></FormText>
                            </FormGroup>
                       </Col>
                    </DashCard>

                    <DashCard title="Representative Details" >
                        <Col md="8">
                            <FormGroup>
                              <Input type="select" 
                                name="vendorId" 
                                value={formDatas.vendorId}
                                onChange={handleTypeChange}
                                >
                                  {data1.map((item)=>{
          
                                    return <option key={item.id} value={item.id}>{item.company_name}</option>
                                  })}
                              </Input>
                             
                                <FormText className="text-danger"></FormText>
                              
                              
                            </FormGroup>
                        </Col>
                    </DashCard>
                    <DashCard>
                      <Row>
                        <Col md="6">
                            Order Date <br></br>
                            17 Dec,2021
                          </Col>
                          <Col md="6">
                            Order No <br></br>
                            #572
                          </Col>
                      </Row>
                      <Row style={{marginTop:'10px'}}>
                        <Col md="8">
                              <FormGroup>
                                <Label>Status</Label>
                                <Input type="select" 
                                  name="vendorId" 
                                  value={formDatas.vendorId}
                                  onChange={handleTypeChange}
                                  >
                                    {data1.map((item)=>{
            
                                      return <option key={item.id} value={item.id}>{item.company_name}</option>
                                    })}
                                </Input>
                              
                                  <FormText className="text-danger"></FormText>
                              
                                
                              </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Button type="submit" className="btn my-btn-color" style={{marginTop:"28px"}}>
                                  Update
                              </Button>
                            </FormGroup>
                          </Col>
                      </Row>
                        
                    </DashCard>
                  </Col>

                </Row>


                  
                 
                  
                

                
               
                 
                 
                 <Row style={{marginTop:'10px'}}>
                  <Col md="12">
                        <Product/>
                  </Col>
                </Row>
              
             </Form>
             
           </CardBody>
          
          
           
         </Card>
       </Col> 
     </Row>
     
   </div>

   
   
  );
};

export default Add;