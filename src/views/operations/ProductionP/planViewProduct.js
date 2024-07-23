import React,{ useState,useEffect} from 'react';
import { Table} from 'reactstrap';
import PropTypes from 'prop-types';
// import ComponentCard4 from '../../../components/ComponentCard5';


const JumbotronComponent = (props) => {

  const {productID,data1,data2,data3,data4,} = props;
  const [data, setData] = useState([]);

  console.log('productID',productID)

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
  function getFabricColorNameById(fabricId,fabricColorId) {
    const Name = data2.find(item => item.id === fabricId);
    let FabricColor = null;
    if(Name){
       FabricColor = Name.fabriccolors.find(item => item.id === fabricColorId);
    }
    // console.log('a1',Name);
    return FabricColor ? FabricColor.name : 'Unknown fabricColor';
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
    fabricColorName: getFabricColorNameById(product.fabric_id,product.fabric_color_id),
    qualityName: getQualityNameById(product.quality_id),
    colorName: getColorNameById(product.color_id),
  
  }));

  useEffect(() => {
    
    // Fetch the data from the API
    const fetchData = async () => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch(`https://factory.teamasia.in/api/public/products/${productID}`, {
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
      console.log("responsejson in s..",result);
      setData([result]);
    };
    fetchData();  
  },[]);

  return (
  <>
    
    {productwithNames.map((pro) => {
      return  <Table key={pro.id} size='sm' className="table-margin-zero" responsive>
              <thead>
                    <tr>
                      <th scope="col">Grain</th>
                      <th scope="col">Color</th>
                      <th scope="col">Quality</th>
                      <th scope="col">Thickness</th>
                      <th scope="col">Fabric</th>
                      <th scope="col">Fabric Color</th>
                      <th scope="col">HSN</th>
                      <th scope="col">Price($)</th>
                      <th scope="col">Tax</th>
                      <th scope="col">Embossing</th>
                      <th scope="col">Printing</th>
                      <th scope="col">CIR.</th>
                      <th scope="col">AT</th>
                    </tr>
                  </thead> 
            <tbody> 
              <tr>
                    <td title={pro.grainName}>{pro.grainName}</td>
                    <td title={pro.colorName}>{pro.colorName}</td>
                    <td title={pro.qualityName}>{pro.qualityName}</td>   
                    <td title={pro.thickness}>{pro.thickness}mm</td>
                    <td title={pro.fabricName}>{pro.fabricName}</td>
                    <td title={pro.fabricColorName}>{pro.fabricColorName}</td>
                              <td>59031090</td>
                    <td title={pro.price}>${pro.price}</td>
                              <td>313.6</td>
                              <td>12%</td>
                              <td>N/A</td>
                              <td>N/A</td>
                              <td>N/A</td>
                    </tr>
                </tbody>
                </Table> 
                })}
  </>

  );
};

export default JumbotronComponent;

JumbotronComponent.propTypes = {
  productID: PropTypes.string.isRequired,
  data1: PropTypes.array.isRequired,
  data2: PropTypes.array.isRequired,
  data3: PropTypes.array.isRequired,
  data4: PropTypes.array.isRequired,
};