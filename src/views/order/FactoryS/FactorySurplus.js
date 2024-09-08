import React,{ useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Table
} from 'reactstrap';
import ComponentCard from '../../../components/ComponentCard';

const FactorySurplus = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [ProductsAll, setAllProducts] = useState([]);

  const tableStyle = {
    // margin: 'auto', 
    // width: '60%',  
    // maxWidth: '1000px',
  };

  const handleEditClick = (item) => {
    console.log('item',item,ProductsAll);

    const backSideProduct = ProductsAll.find((prod)=> prod.ref_product_id === item.id);

    console.log('backSideProduct',backSideProduct);

    navigate('/order/factory-surplus/edit', { state: { product : item, backSideProduct }});
  };

  const handleView = (item) => {

    console.log('item',item,ProductsAll);

    const backSideProduct = ProductsAll.find((prod)=> prod.ref_product_id === item.id);

    console.log('backSideProduct',backSideProduct);
    navigate('/order/factory-surplus/view',{state: { item, backSideProduct }});
  };
  
  const handleEditAdd = () => {

    navigate('/order/factory-surplus/add');
  };
  
  const handleDeleteClick = async (itemId) => {
    try {
      // Call your API endpoint to delete the item
      const token = localStorage.getItem('userToken');
      const response = await fetch(`https://factory.teamasia.in/api/public/products/${itemId}`, {
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
    } catch (error) {
      //only checks for error that are generated by fetch function , and cors 
      console.error('Failed to delete the item', error);
    }
  };




  



  useEffect(() => {
    
    // Fetch the data from the API
    const fetchData = async () => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch('https://factory.teamasia.in/api/public/products/?is_factory_surplus_product=1', {
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
      const resultFiltered = result.products.filter(product => product.ref_product_id === '0');
      setAllProducts(result.products);
      setData(resultFiltered);
    };


    fetchData();

  
  },[]);

  return (
    <ComponentCard
    title=""
    subtitle={
      <p>
        {/* Overview of the projects */}
      </p>
    }
  >
     <Button className='my-btn-color' style={{ marginBottom: '1rem',marginRight:'10px' }} onClick={() => handleEditAdd()}>
      Add Surplus Product
            </Button>
      <Table style={tableStyle} responsive>
              <thead>
              <tr>
            <th>Grain</th>
            <th>Fabric</th>
            <th>Quality</th>
            <th>Color</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
              </thead>
              <tbody>
                {data.map((product) => (
                  <tr key={product.id}>
                   <td>{product.grain_name}</td>
                  <td>{product.fabric_name}</td>
                  <td>{product.quality_name}</td>
                  <td>{product.color_name}</td>
                  <td>{product.quantity}</td>
                  <td>
                    {/* Action buttons or icons */}
                      <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2" onClick={() => handleEditClick(product)}><i className="bi bi-pencil-fill my-pen-color" /></button>
                      <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2" onClick={() => handleView(product)}><i className="bi bi-eye-fill my-eye-color" /></button>
                      <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2" onClick={() => handleDeleteClick(product.id)}><i className="bi bi-trash-fill my-trash-color" /></button>
                  </td>
                </tr>
                ))}
              </tbody>
            </Table>
            
   
  </ComponentCard>

   
   
  );
};

export default FactorySurplus;
