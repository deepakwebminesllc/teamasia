import React,{ useState,useEffect} from 'react';
import { Table} from 'reactstrap';
import PropTypes from 'prop-types';


const JumbotronComponent = (props) => {

  const {orderID,data1,data2,data3,data4} = props;
  const [data, setData] = useState([]);



  function getGrainNameById(grainId) {
    const Name = data1.find(item => item.id === grainId);
    // console.log('a1',Name);
    return Name ? Name.name : 'Unknown grain';
  }

  function getFabricNameById(fabricId) {
    const Name = data2.find(item => item.id === fabricId);
    // console.log('a1',Name);
    return Name ? Name.name : 'Unknown fabric';
  }

  function getQualityNameById(qualityId) {
    const Name = data3.find(item => item.id === qualityId);
    // console.log('a1',Name);
    return Name ? Name.name : 'Unknown quality';
  }

  function getColorNameById(colorId) {
    const Name = data4.find(item => item.id === colorId);
    // console.log('a1',Name);
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
      const response = await fetch(`https://factory.teamasia.in/api/public/products/?order_id=${orderID}`, {
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
      setData(resultFiltered);
    };
    fetchData();  
  },[]);

  return (
  
    <Table size='sm' className="order-page-table">
    
              <tbody>
                {productwithNames.map((product) => (
                  <tr key={product.id}>
                  <td title={product.grainName}>{product.grainName}</td>
                  <td title={product.qualityName}>{product.qualityName}</td>
                  <td title={product.thickness}>{product.thickness}</td>
                  {/* <td title={product.fabricName}>{product.fabricName}</td> */}
                  <td title={product.colorName}>{product.colorName}</td>
                  <td title={product.quantity}>{product.quantity}</td>
                  <td title="996.70m">996.70m</td>
                  <td title="491.10m"> 491.10m</td>
                  <td title="0.00m">0.00m</td>
                  <td title="3.30m">3.30m</td>
                  <td title="3.30m">3.30m</td>
                  
                </tr>
                ))}
              </tbody>
            
              </Table>  
   


   
   
  );
};

export default JumbotronComponent;

JumbotronComponent.propTypes = {
  orderID: PropTypes.string.isRequired,
  data1: PropTypes.array.isRequired,
  data2: PropTypes.array.isRequired,
  data3: PropTypes.array.isRequired,
  data4: PropTypes.array.isRequired
};