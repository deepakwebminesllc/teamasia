import React ,{ useState } from 'react';

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
import { useNavigate } from 'react-router-dom';
// import ComponentCard from '../../components/ComponentCard';

const Edit = () => {
  const navigate = useNavigate();
  const [errorMessageFromApi, setErrorMessageFromApi] = useState([]);
  const [errors,setErrors] = useState({});
  const [formDatas, setFormDataS] = useState({
    name:'',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataS(prevState => ({
      ...prevState,
      [name]: value
    }));
    switch (name){
      case 'name':{
          // const regex = /^[A-Za-z\s/]+$/;
          // console.log('hi');
          //  if (!regex.test(value.trim())) {
          //     setErrors((prev)=>({...prev,"name": "Please use only characters"}));
          // } else {
          //     setErrors((prev)=>({...prev,"name": ""}));
          // }
          setErrors((prev)=>({...prev,"name": ""}));
          break;
        }
      default:
            break;
    
        }

  };

  const closer =()=>{
    setErrorMessageFromApi([]);
  }


  async function apiCall() {
    try {
        const formData = new FormData();
        formData.append('name', formDatas.name);
        formData.append('is_trashed','0');
        

        const token = localStorage.getItem('userToken');
        const response = await fetch(`https://factory.teamasia.in/api/public/severities`, {
            method: "POST",
            headers: {
              'Authorization': `Bearer ${token}`
            },
           
            body: formData,
        });
        const data = await response.json();
        console.log("dataapi",data,response.status);
        if (response.status === 201) {
          navigate('/resources/severities');
        } else {
          console.error("Authentication failed:", Object.values(data.messages.errors));
          if (data.error) {
            setErrorMessageFromApi(Object.values(data.messages.errors));
          }
        }  
        return null;
    } catch (error) {
      setErrorMessageFromApi(["Network error"]);
        return null;
    }
}

const validateForm=()=>{
  let formIsValid =true;
  const errors1 ={};
  
  if(formDatas.name === '') {
    formIsValid = false;
    // eslint-disable-next-line dot-notation
    errors1["name"] = "Required";
  }

  
  setErrors(errors1);
  return formIsValid;
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(validateForm()) {
      console.log('Form is valid, proceed with API call');
      apiCall();
    } else {
      console.log('Form is invalid, do not submit');
    }
  };

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
                  
                 <Col md="8">
                   <FormGroup>
                     <Label>Severity Name</Label>
                     <Input        
                     type="text" 
                      name="name" 
                      id="name" 
                      placeholder="Enter name" 
                      value={formDatas.name}
                      onChange={handleChange} 
                      className={errors.name ? "is-invalid":""}
                      />
                      {errors.name &&  <FormText className="text-danger">{errors.name}</FormText>}
                   </FormGroup>
                 </Col>
                 <Col md="4">
                   <FormGroup>
                   <Button type="submit" 
                            className="btn my-btn-color" 
                            style={{marginTop:"28px"}}
                            disabled={errors.name}
                    >
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