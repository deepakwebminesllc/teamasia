import React,{useState,useEffect} from 'react';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import {
  Card,
  Collapse,
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
import { useNavigate } from 'react-router-dom';

// import ComponentCard from '../../components/ComponentCard';

const Edit = () => {
  const navigate = useNavigate();

  const [collapse,setCollapse] = useState(false);
  

  const [data2, setData2] = useState([]);

  const [formDatas, setFormDataS] = useState({
    customerId:'',
    voucherNo:'',
    paymentDate:'',
    amount:'',
    description:'',
    isCreditNote:'0',
    billNumber:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataS(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleDateChange = (date) => {
    
    setFormDataS(prevState => ({
      ...prevState,
       paymentDate: date.format('YYYY-MM-DD')
    }));
  };

  

  async function apiCall() {
    try {
     
        const formData = new FormData();
        formData.append('customer_id', formDatas.customerId);
        formData.append('voucher_no', formDatas.voucherNo);
        formData.append('payment_date', formDatas.paymentDate);
        formData.append('amount', formDatas.amount);
        formData.append('description', formDatas.description);
        formData.append('is_credit_note', formDatas.isCreditNote);
        formData.append('bill_number', formDatas.billNumber);
        console.log("json",JSON.stringify({
          name:formDatas.name
        }));

        const token = localStorage.getItem('userToken');
        console.log('country_id',formDatas)
        const response = await fetch(`https://factory.teamasia.in/api/public/payments`, {
            method: "POST",
            headers: {
              'Authorization': `Bearer ${token}`
            },

            body: formData
        });
        const data = await response.json();
        console.log("dataapi",data)
        if (response.ok) {


          navigate('/accounts/payments');
            
        } 
            // Handle any errors, such as showing an error message to the user
            console.error("Authentication failed:", data.message);
            return null;;
      
    } catch (error) {
        console.error("Network error:", error);
        return null;
    }
}

const handleSubmit = async (event) => {
  event.preventDefault();
  console.log('event',event);
  apiCall();

};

useEffect(() => {

  const fetchData2 = async () => {
    const token = localStorage.getItem('userToken');
    // console.log('token',token);
    const response = await fetch(`https://factory.teamasia.in/api/public/customers`, {
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
    setData2(result.customers); 
  };


  fetchData2();


},[]);

const toggle=()=>{
  setFormDataS(prevState =>({
    ...prevState,
    isCreditNote: collapse?'0':'1'
  }))
  setCollapse(!collapse);
}
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
           <CardBody>
             <Form onSubmit={handleSubmit}>
               <Row>
                 
                 <Col md="6">
                    <FormGroup>
                      <Label>Customer Name</Label>
                      <Input type="select" 
                         name="customerId" 
                         value={formDatas.customerId}
                        onChange={handleChange}>
                           {data2.map((item)=>{
   
                             return <option key={item.id} value={item.id}>{item.company_name}</option>
                           })}
                      </Input>
                      {/* <FormText className="muted">Popular Dates</FormText> */}
                    </FormGroup>
                  </Col>

                  <Col md="6">
                   <FormGroup>
                     <Label>Voucher No</Label>
                     <Input type="text" 
                     name="voucherNo" 
                     id="name"
                     placeholder="Enter name" 
                     value={formDatas.voucherNo}
                     onChange={handleChange} 
                      />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                  <Col md="6">
                   <FormGroup>
                     <Label>Payment Date</Label>
                      <Datetime
                        locale="en-gb"
                        name="paymentDate"
                        dateFormat="YYYY-MM-DD"
                        timeFormat={false}
                        inputProps={{ placeholder: 'select Date' }}
                        onChange={handleDateChange}
                      />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 <Col md="6">
                   <FormGroup>
                     <Label>Amount in ₹</Label>
                     <Input type="text" 
                     name="amount" 
                     id="name"
                     placeholder="Enter name" 
                     value={formDatas.amount}
                     onChange={handleChange} 
                      />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 <Col md="12">
                   <FormGroup>
                     <Label>Description</Label>
                     <Input type="textarea" 
                     name="description" 
                     id="name"
                     placeholder="Enter name" 
                     value={formDatas.description}
                     onChange={handleChange} 
                      />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 <Col md="8">
                    <FormGroup check>
                      <Input type="checkbox" id="" onClick={toggle.bind(null)}/>
                      <Label check>This is credit Note</Label>
                    </FormGroup>
                    <Collapse isOpen={collapse}>
                            <Row>
                              <Col md="8">
                                <FormGroup>
                                  <Label>Bill Number</Label>
                                  <Input type="textarea" 
                                    name="billNumber" 
                                    id="name"
                                    placeholder="Enter name" 
                                    value={formDatas.billNumber}
                                    onChange={handleChange} 
                                      />
                                  <FormText className="muted"></FormText>
                                </FormGroup>
                              </Col>
                            </Row>
                    </Collapse>
                 </Col>
                 <Col md="6">
                   <FormGroup>
                    <Button type="submit" className="btn my-btn-color" style={{marginTop:"28px"}}>
                        Submit
                    </Button>
                   </FormGroup>
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

export default Edit;