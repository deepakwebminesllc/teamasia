import React,{ useState,useEffect} from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import { Table ,
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  Label,
  Button,} from 'reactstrap';

const FactorySurplus = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {id} = location.state || {};

  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);


  const addProductItem = () => {
    console.log('idxxxxx',id);
     navigate('/order/orders/product-add',{state: id});
  };

  const editProductItem = (product) => {
    console.log('idxxxxx',id);
     navigate('/order/order-templates/product-edit',{state: product});
  };


  function getGrainNameById(grainId) {
    const Name = data1.find(item => item.id === grainId);
    console.log('a1',Name);
    return Name ? Name.name : 'Unknown grain';
  }

  function getFabricNameById(fabricId) {
    const Name = data2.find(item => item.id === fabricId);
    console.log('a1',Name);
    return Name ? Name.name : 'Unknown fabric';
  }

  function getQualityNameById(qualityId) {
    const Name = data3.find(item => item.id === qualityId);
    console.log('a1',Name);
    return Name ? Name.name : 'Unknown quality';
  }

  function getColorNameById(colorId) {
    const Name = data4.find(item => item.id === colorId);
    console.log('a1',Name);
    return Name ?  Name.name : 'Unknown color';
  }

  
  const productwithNames = data.map(product => ({
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
      const response = await fetch(`https://factory.teamasia.in/api/public/products/?order_id=${id}`, {
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
      console.log("responsejson",result);
      setData(result.products);

    };

    const fetchData1 = async () => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch('https://factory.teamasia.in/api/public/grains/?is_trashed=0', {
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
      setData1(result.grains); 
    };
    const fetchData2 = async () => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch('https://factory.teamasia.in/api/public/fabrics/?is_trashed=0', {
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
      setData2(result.fabrics); 
    };
    const fetchData3 = async () => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch('https://factory.teamasia.in/api/public/qualities/?is_trashed=0', {
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
      console.log("responsejson3",result);
      setData3(result.qualities); 
    };
    const fetchData4 = async () => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch('https://factory.teamasia.in/api/public/colors/?is_trashed=0', {
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
      console.log("responsejson4",result);
      setData4(result.colors); 
    };
    fetchData4();
    fetchData3();
    fetchData2();
    fetchData1();
    fetchData();

  
  },[]);

  return (
    <Card>
         <CardTitle tag="h4" className="mb-0 text-white">
           </CardTitle>
          
           <CardBody>
    <Row>
    <Col md="10">
      <Label>Products</Label>
    </Col>
    <Col md="2">
      <Button type="button" className='my-btn-color-red' onClick={addProductItem}>Add Product</Button>
    </Col>
    <Table size='sm' responsive className="order-page-table">
              <thead >
                    <tr >
                      <th>Grain</th>
                      <th>Quality</th>
                      <th>Color</th>
                      <th>Thickness</th>
                      <th>Fabric</th>
                      <th>Quantity</th>
                      <th>Delivery Date</th>
                      <th>Action</th>
                    </tr>
              </thead>

              <tbody>
                {productwithNames.map((product) => (
                  <tr key={product.id}>
                  <td title={product.grainName}>{product.grainName}</td>
                  <td title={product.qualityName}>{product.qualityName}</td>
                  <td title={product.colorName}>{product.colorName}</td>
                  <td title={product.thickness}>{product.thickness}</td>
                  <td title={product.fabricName}>{product.fabricName}</td>
                  <td title={product.quantity}>{product.quantity}</td>
                  <td>{product.delivery_date}</td>
                  <td>
                            {/* Action buttons or icons */}
                              <button type="button" className="btn btn-secondary btn-sm mr-2" onClick={() => editProductItem(product)}><i className="bi bi-pencil-fill my-pen-color" /></button>
                              <button type="button" className="btn btn-secondary btn-sm mr-2" ><i className="bi bi-trash-fill my-trash-color" /></button>
                  </td>
                </tr>
                ))}
              </tbody>
            
              </Table>  
   </Row>
   </CardBody>
   </Card>
   
   
  );
};

export default FactorySurplus;
