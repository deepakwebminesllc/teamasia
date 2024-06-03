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
const {id,product_id: productId,
roll_code: rollCode,
cut_piece_length: cutPieceLength,
quantity,
grade_id: gradeId,
bin,
weight,
width,
t1,
t2,
t3,
send_to_factory_stock:sendToFactoryStock,
comment,
qa_id:qaId,
is_trashed: isTrashed
} = location.state || {}; // Default to an empty object if state is undefined 

  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
 
 
  const [formDatas, setFormDataS] = useState({
      id,
      productId,
      rollCode,
      cutPieceLength,
      quantity,
      gradeId,
      bin,
      weight,
      width,
      t1,
      t2,
      t3,
      sendToFactoryStock,
      comment,
      qaId,
      isTrashed
  });
  
        
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


console.log('loc',location.state);
 

  async function apiCall() {
    try {
      
        // const formData = new FormData();
        // formData.append('product_id', formDatas.productId);
        // formData.append('roll_code', formDatas.rollCode);
        // formData.append('cut_piece_length', formDatas.cutPieceLength);
        // formData.append('quantity', formDatas.quantity);
        // formData.append('grade_id', formDatas.gradeId);
        // formData.append('bin', formDatas.bin);
        // formData.append('weight', formDatas.weight);
        // formData.append('width', formDatas.width);
        // formData.append('t1', formDatas.t1);
        // formData.append('t2', formDatas.t2);
        // formData.append('t3', formDatas.t3);
        // formData.append('send_to_factory_stock', formDatas.sendToFactoryStock);
        // formData.append('comment', formDatas.comment);
        // formData.append('qa_id', formDatas.qaId);
        // formData.append('is_trashed', formDatas.isTrashed);
       
        console.log('product_id', formDatas.productId);
        console.log('roll_code', formDatas.rollCode);
        console.log('cut_piece_length', formDatas.cutPieceLength);
        console.log('quantity', formDatas.quantity);
        console.log('grade_id', formDatas.gradeId);
        console.log('bin', formDatas.bin);
        console.log('weight', formDatas.weight);
        console.log('width', formDatas.width);
        console.log('t1', formDatas.t1);
        console.log('t2', formDatas.t2);
        console.log('t3', formDatas.t3);
        console.log('send_to_factory_stock', formDatas.sendToFactoryStock);
        console.log('comment', formDatas.comment);
        console.log('qa_id', formDatas.qaId);
        console.log('is_trashed', formDatas.isTrashed);
      


        const token = localStorage.getItem('userToken');
        const response = await fetch(`https://factory.teamasia.in/api/public/rolls/${id}`, {
            method: "PUT",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
           
            body: JSON.stringify({
              product_id :formDatas.productId,
              roll_code:formDatas.rollCode,
              cut_piece_length: formDatas.cutPieceLength,
              quantity: formDatas.quantity,
              grade_id: formDatas.gradeId,
              bin:formDatas.bin,
              weight: formDatas.weight,
              width: formDatas.width,
              t1: formDatas.t1,
              t2: formDatas.t2,
              t3: formDatas.t3,
              send_to_factory_stock: formDatas.sendToFactoryStock,
              comment: formDatas.comment,
              qa_id: formDatas.qaId,
              is_trashed: formDatas.isTrashed
            })
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
                         name="gradeId" 
                         value={formDatas.gradeId}
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
                     value={formDatas.sendToFactoryStock}
                     onChange={handleChange} 
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
                         name="qaId" 
                         value={formDatas.qaId}
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