import React,{ useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Button,
  Input,
  Label,
  Col,
  Row,
} from 'reactstrap';

import ComponentCard from '../../../components/ComponentCard';

const States = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [istrashed, setIstrashed] = useState('0');

  const tableStyle = {
   
  };
  const handleEditClick = (item) => {
    
    navigate('/resources/states/edit', { state: item });
  };
  const handleEditAdd = () => {
   
    navigate('/resources/states/add');
  };
  const handleTrash = ()=>{
     
    if(istrashed === '0')
    {
      setIstrashed('1')
    }
    else{
      setIstrashed('0')
    }
  }
  const handleDeleteClick = async (itemId) => {
    try {
      // Call your API endpoint to delete the item
      const token = localStorage.getItem('userToken');
      const response = await fetch(`https://factory.teamasia.in/api/public/states/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      // Check if the request was successful
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      // Filter out the deleted item from your data state
      const updatedData = data.filter((item) => item.id !== itemId);
      setData(updatedData);
  
      console.log('Item deleted successfully');
    }catch(error) {
      //only checks for error that are generated by fetch function , and cors 
      console.error('Failed to delete the item', error);
    }
  };
  

  // This function finds the name of the country by its ID
  function getCountryNameById(countryId) {
    const countryName = data2.find(country => country.id === countryId);
    // console.log('country',countryName);
    return countryName ? countryName.name : 'Unknown Country';
  }

  const citiesWithNames = data.map(city => ({
    ...city,
    countryName: getCountryNameById(city.country_id)
  }));

  useEffect(() => {
    
    // Fetch the data from the API
    const fetchData = async () => {
      const token = localStorage.getItem('userToken');
      console.log('token',token);
      const response = await fetch(`https://factory.teamasia.in/api/public/states/?is_trashed=${istrashed}`, {
        method: 'GET', 
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('result',response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log("responsejson in country",result.states);
      if(result.states){
        result.states.sort((a, b) => {
           return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
      });
    }
      setData(result.states);
    };
    const fetchData2 = async () => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch(`https://factory.teamasia.in/api/public/countries/?is_trashed=${istrashed}`, {
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
      console.log("responsejson2",result.countries);
      setData2(result.countries); 
    };
    fetchData2();
    fetchData();
  }, [istrashed]);

  return (
    <ComponentCard
    title=""
    subtitle={
      <p>
        {/* Overview of the projects */}
      </p>
    }
  >
    <Row>
      <Col md="8">
        <Button className='my-btn-color' color="" style={{ marginBottom: '1rem',marginRight:'10px' }} onClick={() => handleEditAdd()}>
          Add State
        </Button>
      </Col>
      <Col md="4" className='p-2'>
          <Input  type="checkbox" style={{marginRight:'5px'}} onClick={()=> handleTrash()}/>
          <Label style={{fontWeight:'500'}}>Show Trashed Items</Label>
      </Col>
    </Row>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <table className="table" style={tableStyle}>
              <thead>
              <tr>
            <th>State Name</th>
            <th>Country</th>
            <th>Actions</th>
          </tr>
              </thead>
              <tbody>
                {citiesWithNames.map((product) => (
                  <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.countryName}</td>
                  <td>
                    {/* Action buttons or icons */}
                      <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2" onClick={() => handleEditClick(product)}><i className="bi bi-pencil-fill my-pen-color" /></button>
                      <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2" onClick={() => handleDeleteClick(product.id)}><i className="bi bi-trash-fill my-trash-color" /></button>
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
            
    </div>
   
  </ComponentCard>
  );
};

export default States;