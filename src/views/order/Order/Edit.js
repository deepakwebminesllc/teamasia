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
import {useLocation,useNavigate} from 'react-router-dom';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { stateFromHTML } from 'draft-js-import-html';
import './editor.scss';
import Product from './Products';
import DashCard from '../../../components/dashboard/dashboardCards/DashCard';
// import ComponentCard from '../../components/ComponentCard';

const Add = () => {
  const navigate= useNavigate();
  const location = useLocation();
  const 
  {
    id,
    billing_address_id:billingAddressId,
    delivery_address_id:deliveryAddressId,
    order_notes:orderNotes,
    severity_id:severityId,
    expected_delivery_date:expectedDeliveryDate,
    created_at:createdAt,
    purchase_order:purchaseOrder,
    image_id:imageId,
    purchase_order_document_file_path:purchaseOrderDocumentFilePath,
    representative_id:representativeId,
    customer_id:customerId
 } = location.state;
const [data1, setData1] = useState([]);
const [data, setData] = useState([]);
const [data2, setData2] = useState([]);
const [data3, setData3] = useState([]);
const [firstcheck, setFirstCheck] = useState(false);
const [secondcheck, setSecondCheck] = useState(false);


const content1 = orderNotes;


const contentFromHTML = stateFromHTML(content1);

console.log('convertFromRaw(content)',contentFromHTML ,EditorState.createWithContent(contentFromHTML));



  const [contentState, setEditorState] = useState(EditorState.createWithContent(contentFromHTML));
  const [htmlContent, sethtmlContent] = useState('');



  
  const [formDatas, setFormDataS] = useState({
    customerId,
    customerId2:'x',
    billingAddressId,
    deliveryAddressId,
    orderNotes,
    severityId,
    expectedDeliveryDate,
    createdAt,
    purchaseOrder,
    imageId,
    purchaseOrderDocumentFilePath,
    representativeId,
  });
  
  const onContentStateChange = (c) => {
    console.log('contentState',c);
    const htmlContent1 = draftToHtml(c);
    console.log('html',htmlContent1);
    console.log('htmlcontent',htmlContent);

    sethtmlContent(htmlContent1);

    setEditorState(c);
  };

  function formatDate(inputDate) {
    const date = new Date(inputDate);
  
    // Use Intl.DateTimeFormat to format the date
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Intl.DateTimeFormat('en-GB', options).format(date);
  }

const handleChange = (e) => {
  const { name, value } = e.target;

  setFormDataS(prevState => ({
    ...prevState,
    [name]: value
  }));
  if(name === 'billingAddressId' && firstcheck){
    console.log('change1')
    setFormDataS(prevState => ({
      ...prevState,
      deliveryAddressId: value
    }));
  }
  if(name === 'customerId2'){
    console.log('change1')
    setFormDataS(prevState => ({
      ...prevState,
      deliveryAddressId: 'x'
    }));
  }
  console.log('hi',formDatas.billingAddressId,formDatas.deliveryAddressId);
};


const checkboxclick1 = () => {
  console.log('check',firstcheck);
  if(!firstcheck){
    console.log('change')
    setFormDataS(prevState => ({
      ...prevState,
      deliveryAddressId: formDatas.billingAddressId
    }));
  }
  setFirstCheck(!firstcheck);
 
};
const checkboxclick2 = () => {
  console.log('check',secondcheck);
  if(secondcheck){
    setData3(data2);
  }
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
        const response = await fetch(`https://factory.teamasia.in/api/public/orders/${id}`, {
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


          navigate('/order/orders');
            
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


useEffect(()=>{
  const fetchData2 = async () => {
    const token = localStorage.getItem('userToken');
    // console.log('token',token);
    let temp = formDatas.customerId;
    if(secondcheck){
      temp = formDatas.customerId2;
    }
    const response = await fetch(`https://factory.teamasia.in/api/public/addresses/?customer_id=${temp}`, {
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
    console.log("data addresses",result.addresses);
    const resultX = result.addresses.slice();
    resultX.push({id:'x',address_line_1:'Choose'});
    if(secondcheck){
      setData3(resultX);
    }else{
      setData2(resultX);
      setData3(resultX);
    }
  };
  fetchData2();

},[formDatas.customerId,formDatas.customerId2])

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
      const sever = resultX.find(item => item.id === customerId);
      if(!sever){
        setFormDataS(prevState => ({
          ...prevState,
           customerId:'x',
           billingAddressId:'x',
           deliveryAddressId:'x'
        }));
      }
      resultX.push({id:'x',company_name:'Choose'});
      setData1(resultX); 
    };

    const fetchData = async () => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch('https://factory.teamasia.in/api/public/severities/?is_trashed=0', {
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
      console.log("data severities",result.severities);
      const resultX = result.severities.slice();
      const sever = resultX.find(item => item.id === severityId);
      if(!sever){
        setFormDataS(prevState => ({
          ...prevState,
          severityId:'x'
        }));
      }
      resultX.push({id:'x',name:'Choose'});
      setData(resultX); 
    };

    
    fetchData1();
    fetchData();
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
                                onChange={handleChange}
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
                                name="billingAddressId" 
                                value={formDatas.billingAddressId}
                                onChange={handleChange}
                                >
                                  {data2.map((item)=>{
                                  
          
                                    return <option key={item.id} value={item.id}>{item.address_line_1}</option>
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
                                        name="customerId2" 
                                        value={formDatas.customerId2}
                                        onChange={handleChange}
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
                                name="deliveryAddressId" 
                                value={formDatas.deliveryAddressId}
                                onChange={handleChange}
                                >
                                  {data3.map((item)=>{
                                  
          
                                    return <option key={item.id} value={item.id}>{item.address_line_1}</option>
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
                            <Input type="select" 
                                name="severityId" 
                                value={formDatas.severityId}
                                onChange={handleChange} >
                                  {data.map((item)=>{
          
                                    return <option key={item.id} value={item.id}>{item.name}</option>
                                  })}
                            </Input>
                            
                          </FormGroup>
                       </Col>
                      <Col md="8">
                          <FormGroup>
                            <Label>Expected Delivery Date</Label>
                            <Input type="date" 
                            name="expectedDeliveryDate" 
                            id="name"
                            placeholder="Enter name"
                            value={formDatas.expectedDeliveryDate}
                            onChange={handleChange} 
                              />
                            <FormText className="muted"></FormText>
                          </FormGroup>
                       </Col>
                      <Col md="8">
                          <FormGroup>
                            <Label>Purchase Order</Label>
                            <Input type="text" 
                            name="purchaseOrder" 
                            id="name"
                            placeholder="Enter name" 
                            value={formDatas.purchaseOrder}
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
                                onChange={handleChange}
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
                            {formatDate(formDatas.createdAt)}
                          </Col>
                          <Col md="6">
                            Order No <br></br>
                            #{id}
                          </Col>
                      </Row>
                      <Row style={{marginTop:'10px'}}>
                        <Col md="8">
                              <FormGroup>
                                <Label>Status</Label>
                                <Input type="select" 
                                  name="vendorId" 
                                  value={formDatas.vendorId}
                                  onChange={handleChange}
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