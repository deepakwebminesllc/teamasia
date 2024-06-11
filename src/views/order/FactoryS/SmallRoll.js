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

// import ComponentCard from '../../components/ComponentCard';

const Add = () => {
  const navigate= useNavigate();
  const location= useLocation();
const productId = location.state || {}; // Default to an empty object if state is undefined 
const [data1, setData1] = useState([]);
const [data2, setData2] = useState([]);
const [errorMessageFromApi, setErrorMessageFromApi] = useState([]);


const [formDatas, setFormDataS] = useState({
    product_id:productId,
    roll_code:'sp',
    cut_piece_length:'',
    quantity:'',
    grade_id:'x',
    bin:'',
    weight:'',
    width:'',
    t1:'',
    t2:'',
    t3:'',
    send_to_factory_stock:'0',
    comment:'',
    qa_id:'x',
    is_trashed:'0'
  });
  
  const [firstcheck, setFirstCheck] = useState(formDatas.send_to_factory_stock !== '0');
  const checkboxclick1 = () => {
    console.log('formdatas',formDatas.send_to_factory_stock);
    const send = formDatas.send_to_factory_stock=== '1' ? '0' : '1'
    setFormDataS((prevState) => ({
      ...prevState,
      send_to_factory_stock:send,
    }));
    setFirstCheck(!firstcheck);
  };

const handleChange = (e) => {
  const { name, value } = e.target;
  console.log('hi')
  setFormDataS(prevState => ({
    ...prevState,
    [name]: value
  }));
};



const closer =()=>{
  setErrorMessageFromApi([]);
}

  async function apiCall() {
    try {
      
        const formData = new FormData();
        formData.append('product_id', formDatas.product_id);
        formData.append('roll_code', formDatas.roll_code);
        formData.append('cut_piece_length', formDatas.cut_piece_length);
        formData.append('quantity', formDatas.quantity);
        formData.append('grade_id', formDatas.grade_id);
        formData.append('bin', formDatas.bin);
        formData.append('weight', formDatas.weight);
        formData.append('width', formDatas.width);
        formData.append('t1', formDatas.t1);
        formData.append('t2', formDatas.t2);
        formData.append('t3', formDatas.t3);
        formData.append('send_to_factory_stock', formDatas.send_to_factory_stock);
        formData.append('comment', formDatas.comment);
        formData.append('qa_id', formDatas.qa_id);
        formData.append('is_trashed', formDatas.is_trashed);
       
        console.log('product_id', formDatas.product_id);
        console.log('roll_code', formDatas.roll_code);
        console.log('cut_piece_length', formDatas.cut_piece_length);
        console.log('quantity', formDatas.quantity);
        console.log('grade_id', formDatas.grade_id);
        console.log('bin', formDatas.bin);
        console.log('weight', formDatas.weight);
        console.log('width', formDatas.width);
        console.log('t1', formDatas.t1);
        console.log('t2', formDatas.t2);
        console.log('t3', formDatas.t3);
        console.log('send_to_factory_stock', formDatas.send_to_factory_stock);
        console.log('comment', formDatas.comment);
        console.log('qa_id', formDatas.qa_id);
        console.log('is_trashed', formDatas.is_trashed);
      


        const token = localStorage.getItem('userToken');
        const response = await fetch(`https://factory.teamasia.in/api/public/rolls`, {
            method: "POST",
            headers: {
              'Authorization': `Bearer ${token}`
            },
           
            body: formData
        });

        const dataZ = await response.json();
        console.log('dataapi', dataZ);
        if (response.status === 201) {
           navigate(-1);
         } else {
           console.error("Authentication failed:", Object.values(dataZ.messages.errors));
           if (dataZ.error) {
             setErrorMessageFromApi(Object.values(dataZ.messages.errors));
           }
         }  
         return null;
     } catch (error) {
       setErrorMessageFromApi(["Network error"]);
         return null;
     }
}

const handleSubmit = async (event) => {
  event.preventDefault();
  console.log('event',event);
  apiCall();

};

  const handleTypeChange = (e) => {
    const { name, value } = e.target;
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
      const response = await fetch('https://factory.teamasia.in/api/public/grades?is_trashed=0', {
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
      const resultX = result.grades.slice();
      resultX.push({id:'x',name:'Choose'});
      setData1(resultX); 
    };

    const fetchData2 = async () => {
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
      setData2(resultX); 
    };

    fetchData2();
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
           <CardBody>
             <Form onSubmit={handleSubmit}>
               <Row>
               <Col md="8">{errorMessageFromApi.length !== 0 && (
                      <div style={{ background:'#ff9c7a',color: 'black', marginBottom: '10px', padding:"5px 10px"}}>
                        <div style={{display:'flex',justifyContent:'space-between'}}>
                          Following errors were found:
                          <span onClick={closer} style={{cursor:'pointer'}}>X</span>
                        </div>
                        <ul>
                        {errorMessageFromApi.map((item)=>
                        <li>
                            {item}
                        </li>
                        )}
                        </ul>
                      </div>
                    )}
                  </Col>

               <Col md="10" >
                   <FormGroup>
                     <Label>Quantity (in meters)</Label>
                     <Input type="text" 
                     name="quantity" 
                     id="name"
                     placeholder="Enter name" 
                     value={formDatas.quantity}
                     onChange={handleChange} 
                      />
                     
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>

                  <Col md="10" className=''>
                    <FormGroup>
                      <Label>Grade</Label>
                      <Input type="select" 
                         name="grade_id" 
                         value={formDatas.grade_id}
                        onChange={handleTypeChange}>
                           {data1.map((item)=>{
   
                             return <option key={item.id} value={item.id}>{item.name}</option>
                           })}
                      </Input>

                      <FormText className="muted"></FormText>
                    </FormGroup>
                  </Col>
                  <Col md="10" >
                   <FormGroup>
                     <Label>BIN</Label>
                     <Input type="text"
                     name="bin"
                     id="name"
                     placeholder="Enter name" 
                     value={formDatas.bin}
                     onChange={handleChange} 
                      />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>

                  <Col md="5" >
                   <FormGroup>
                     <Label>Weight</Label>
                     <Input type="text" 
                     name="weight" 
                     id="name"
                     placeholder="Enter name" 
                     value={formDatas.weight}
                     onChange={handleChange} 
                      />
                     
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>

                 <Col md="5" >
                   <FormGroup>
                     <Label>Width</Label>
                     <Input type="text" 
                     name="width" 
                     id="name"
                     placeholder="Enter name" 
                     value={formDatas.width}
                     onChange={handleChange}
                      />
                     
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 <Col md="3" >
                   <FormGroup>
                     <Label>T1</Label>
                     <Input type="text" 
                     name="t1" 
                     id="name"
                     placeholder="Enter name" 
                     value={formDatas.t1}
                     onChange={handleChange} 
                      />      
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 
                 <Col md="3" >
                   <FormGroup>
                     <Label>T2</Label>
                     <Input type="text" 
                     name="t2" 
                     id="name"
                     placeholder="Enter name" 
                     value={formDatas.t2}
                     onChange={handleChange} 
                      />
                     
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>

                 <Col md="3" >
                   <FormGroup>
                     <Label>T3</Label>
                     <Input type="text" 
                     name="t3" 
                     id="name"
                     placeholder="Enter name" 
                     value={formDatas.t3}
                     onChange={handleChange} 
                      />
                     
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 <Col md="10">
                   <FormGroup>
                     <Input type="checkbox" 
                     name="send_to_factory_stock" 
                     id="name"
                     placeholder="Enter name" 
                     value={firstcheck}
                     onChange={checkboxclick1} 
                     />
                     <Label> Send to factory stock</Label>
                     
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>

                 <Col md="10" >
                   <FormGroup>
                     <Label>Comments</Label>
                     <Input type="textarea" 
                     name="comment" 
                     id="name"
                     placeholder="Enter name" 
                     value={formDatas.comment}
                     onChange={handleChange} 
                      />
                     
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 
                  
                  
                 

                 <Col md="4" className=''>
                    <FormGroup>
                      <Label>Name Of the QA</Label>
                      <Input type="select" 
                         name="qa_id" 
                         value={formDatas.qa_id}
                        onChange={handleTypeChange}>
                           {data2.map((item)=>{
   
                             return <option key={item.id} value={item.id}>{item.name}</option>
                           })}
                      </Input>

                      <FormText className="muted"></FormText>
                    </FormGroup>
                  </Col>

                 <Col md="4">
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

export default Add;