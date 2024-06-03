import React,{useState, useEffect} from 'react';
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
import { useLocation,useNavigate } from 'react-router-dom';

// import ComponentCard from '../../components/ComponentCard';

const Edit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {id,title,type,customer_id: customerId} = location.state || {}; // Default to an empty object if state is undefined
  
  const [data, setData] = useState([]);

  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [data5, setData5] = useState([]);


  console.log('local',location.state);


  const [formDatas, setFormDataS] = useState({
  title,
  type,
  customerId
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('hi')
    setFormDataS(prevState => ({
      ...prevState,
      [name]: value
    }));
  };



//  console.log("items",items);

  const addProductItem = () => {
    console.log('idxxxxx',id);
     navigate('/order/order-templates/product-add',{state: id});
  };

  const editProductItem = (product) => {
    console.log('idxxxxx',id);
     navigate('/order/order-templates/product-edit',{state: product});
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

  async function apiCall() {
    try {
        const token = localStorage.getItem('userToken');
        const response = await fetch(`https://factory.teamasia.in/api/public/ordertemplates/${id}`, {
            method: "PUT",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
           
            body: JSON.stringify({
              title: formDatas.title,
              type: formDatas.type,
              customer_id: formDatas.customerId,
              is_trashed: '0'
            }),
        });

        const dataZ = await response.json();
        console.log("dataapi",dataZ)
        if (response.ok) {


          navigate('/order/order-templates');
            
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

function getGrainNameById(grainId) {
  const Name = data2.find(item => item.id === grainId);
  console.log('a1',Name);
  return Name ? Name.name : 'Unknown';
}

function getFabricNameById(fabricId) {
  const Name = data3.find(item => item.id === fabricId);
  console.log('a1',Name);
  return Name ? Name.name : 'Unknown';
}

function getQualityNameById(qualityId) {
  const Name = data4.find(item => item.id === qualityId);
  console.log('a1',Name);
  return Name ? Name.name : 'Unknown';
}

function getColorNameById(colorId) {
  const Name = data5.find(item => item.id === colorId);
  console.log('a1',Name);
  return Name ?  Name.name : 'Unknown';
}


const productwithNames = data1.map(product => ({
  ...product,
  grainName: getGrainNameById(product.grain_id),
  fabricName: getFabricNameById(product.fabric_id),
  qualityName: getQualityNameById(product.quality_id),
  colorName: getColorNameById(product.color_id)
}));

  useEffect(() => {

    // Fetch the data from the API
    const fetchData = async () => {
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
      console.log("response(customers)",result);
      setData(result.customers); 
    };

    const fetchData1 = async () => {
      const token = localStorage.getItem('userToken');
      console.log('token',token);
      const response = await fetch(`https://factory.teamasia.in/api/public/products/?template_id=${id}&is_trashed=0`, {
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
      console.log("response(products)",result);
      setData1(result.products); 
    };

    const fetchData2 = async () => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch('https://factory.teamasia.in/api/public/grains', {
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
      console.log("response(grains)",result.grains);
      setData2(result.grains); 
    };
    const fetchData3 = async () => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch('https://factory.teamasia.in/api/public/fabrics', {
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
      console.log("response(fabrics)",result.fabrics);
      setData3(result.fabrics); 
    };
    const fetchData4 = async () => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch('https://factory.teamasia.in/api/public/qualities', {
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
      console.log("response(qualities)",result.qualities);
      setData4(result.qualities); 
    };
    const fetchData5 = async () => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch('https://factory.teamasia.in/api/public/colors', {
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
      console.log("response(colors)",result.colors);
      setData5(result.colors); 
    };

    fetchData();

    fetchData1();
    fetchData2();
    fetchData3();
    fetchData4();
    fetchData5();
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
                 <Col md="8" className=''>
                   <FormGroup>
                     <Label>Template Title</Label>
                     <Input type="text" 
                     name="title" 
                     id="name"
                     placeholder="Enter name" 
                     value={formDatas.title}
                     onChange={handleChange} 
                      />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>

                 <Col md="8" className='mb-5'>
                    <FormGroup>
                      <Label>Choose Customer</Label>
                      <Input type="select" 
                         name="customerId" 
                         value={formDatas.customerId}
                        onChange={handleTypeChange} >
                           {data.map((item)=>{
   
                             return <option key={item.id} value={item.id}>{item.company_name}</option>
                           })}
                      </Input>
                      {/* <FormText className="muted">Popular Dates</FormText> */}
                    </FormGroup>
                  </Col>

                  <Row>
                  <Col md="10">
                    <Label>Products</Label>
                  </Col>
                  <Col md="2">
                    <Button type="button" className='my-btn-color-red' onClick={addProductItem}>Add Product</Button>
                  </Col>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <table className="table" >        
                      <thead >
                          <tr >
                            <th>Grain</th>
                            <th>Fabric</th>
                            <th>Quality</th>
                            <th>Color</th>
                            <th>Quantity</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
            
                      <tbody>
                        {productwithNames.map((product) => (
                          <tr key={product.id}>
                          <td>{product.grainName}</td>
                          <td>{product.fabricName}</td>
                          <td>{product.qualityName}</td>
                          <td>{product.colorName}</td>
                          <td>{product.quantity}</td>
                          <td>
                            {/* Action buttons or icons */}
                              <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2" onClick={() => editProductItem(product)}><i className="bi bi-pencil-fill my-pen-color" /></button>
                              <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2"><i className="bi bi-eye-fill my-eye-color" /></button>
                              <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2" ><i className="bi bi-trash-fill my-trash-color" /></button>
                          </td>
                        </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                </Row>

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

export default Edit;