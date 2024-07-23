import React,{ useState,useEffect} from 'react';
import { Table ,
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  } from 'reactstrap';
import PropTypes from 'prop-types';

const Products = (props) => {
  const {orderID,data1,data2,data3,data4,data5} = props;

  const [data, setData] = useState([]);

  console.log('in product',orderID);

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
  function getHsnNameById(hsnId) {
    // console.log('dataX',data5)
    const Name = data5.find(item => item.id === hsnId);
    // console.log('a1',Name);
    return Name ?  Name.name : 'Unknown hsn';
  }

  
  // const productwithNames = data.map(product => ({
  //   ...product,
  //   grainName: getGrainNameById(product.grain_id),
  //   fabricName: getFabricNameById(product.fabric_id),
  //   fabricColorName: getFabricColorNameById(product.fabric_id,product.fabric_color_id),
  //   qualityName: getQualityNameById(product.quality_id),
  //   colorName: getColorNameById(product.color_id),
  //   hsnName: getHsnNameById(product.hsn_id)
  // }));


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
      // console.log("responsejson in products",result);
      // const resultFiltered = result.products.filter(product => product.ref_product_id === '0');

      const products = result.products.slice();

      // Create an array to store the paired products
      const pairedProducts = [];

      // Create a function to find the back side of a product
      const findBackside = (frontId) => {
          return products.find(product => product.ref_product_id === frontId);
      };

      // Iterate over the products to create pairs
      products.forEach(product => {
          if (product.ref_product_id === "0") {
              // If the product is a front side, create a pair object
              const pair = {
                  front: product,
                  back: findBackside(product.id)
              };
              pairedProducts.push(pair);
          }
      });

      console.log('pairedProducts',pairedProducts);

      // setData(resultFiltered);
      setData(pairedProducts);

    };
    fetchData();  
  },[]);

  return (
    <Card>
         <CardTitle tag="h4" className="mb-0 text-white">
           </CardTitle>
          
           <CardBody>
           {data.map(({ front, back }) => (
          <div key={front.id} className='table-margin'>
            <Table className='table-margin-zero order-table-button' size="sm">
              <Row style={{ background: '#e3e3e3', padding: '2px' }}>
                <Col md="2">
                  <div style={{ margin: '5px 0px' }}>
                    <div className='fix-wid-1'><i className="bi-menu-button-wide-fill my-eye-color" style={{ fontSize: '20px', marginRight: '1px' }} /><span style={{ fontWeight: '900' }}> Product {front.id}</span></div>
                  </div>
                </Col>
                <Col md="10" style={{ padding: '5px 0px' }}>
                  {/* Your buttons for product metrics */}
                </Col>
              </Row>
            </Table>
            <div>
              <Table className='table-margin-zero ' responsive size="sm">
                <thead>
                  <tr>
                    <th colSpan={20}>
                      <p style={{ background: '#777', textAlign: 'center', color: 'white', marginBottom: '0px' }}> Front Side </p>
                    </th>
                  </tr>
                  <tr>
                    <th scope="col">Grain</th>
                    <th scope="col">Color</th>
                    <th scope="col">Quality</th>
                    <th scope="col">Thickness</th>
                    <th scope="col">Fabric</th>
                    <th scope="col">FabricColor</th>
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
                    <td title={getGrainNameById(front.grain_id)}>{getGrainNameById(front.grain_id)}</td>
                    <td title={getColorNameById(front.color_id)}>{getColorNameById(front.color_id)}</td>
                    <td title={getQualityNameById(front.quality_id)}>{getQualityNameById(front.quality_id)}</td>
                    <td title={front.thickness}>{front.thickness}</td>
                    <td title={getFabricNameById(front.fabric_id)}>{getFabricNameById(front.fabric_id)}</td>
                    <td title={getFabricColorNameById(front.fabric_id, front.fabric_color_id)}>{getFabricColorNameById(front.fabric_id, front.fabric_color_id)}</td>
                    <td title={getHsnNameById(front.hsn_id)}>{getHsnNameById(front.hsn_id)}</td>
                    <td title={front.price}>{front.price}</td>
                    <td title={front.tax_rate}>{front.tax_rate}%</td>
                    <td>N/A</td>
                    <td>N/A</td>
                    <td>N/A</td>
                    <td>N/A</td>
                  </tr>
                </tbody>
              </Table>
              {back && (
                <Table className='table-margin-zero ' responsive size="sm">
                  <thead>
                    <tr>
                      <th colSpan={20}>
                        <p style={{ background: '#777', textAlign: 'center', color: 'white', marginBottom: '0px' }}> Back Side </p>
                      </th>
                    </tr>
                    <tr>
                      <th scope="col">Grain</th>
                      <th scope="col">Color</th>
                      <th scope="col">Quality</th>
                      <th scope="col">Thickness</th>
                      <th scope="col">Fabric</th>
                      <th scope="col">FabricColor</th>
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
                      <td title={getGrainNameById(back.grain_id)}>{getGrainNameById(back.grain_id)}</td>
                      <td title={getColorNameById(back.color_id)}>{getColorNameById(back.color_id)}</td>
                      <td title={getQualityNameById(back.quality_id)}>{getQualityNameById(back.quality_id)}</td>
                      <td title={back.thickness}>{back.thickness}</td>
                      <td title={getFabricNameById(back.fabric_id)}>{getFabricNameById(back.fabric_id)}</td>
                      <td title={getFabricColorNameById(back.fabric_id, back.fabric_color_id)}>{getFabricColorNameById(back.fabric_id, back.fabric_color_id)}</td>
                      <td title={getHsnNameById(back.hsn_id)}>{getHsnNameById(back.hsn_id)}</td>
                      <td title={back.price}>{back.price}</td>
                      <td title={back.tax_rate}>{back.tax_rate}%</td>
                      <td>N/A</td>
                      <td>N/A</td>
                      <td>N/A</td>
                      <td>N/A</td>
                    </tr>
                  </tbody>
                </Table>
              )}
            </div>
          </div>
        ))}
   </CardBody>
   </Card>
   
   
  );
};

export default Products;
Products.propTypes = {
  orderID: PropTypes.string.isRequired,
  data1: PropTypes.array.isRequired,
  data2: PropTypes.array.isRequired,
  data3: PropTypes.array.isRequired,
  data4: PropTypes.array.isRequired,
  data5: PropTypes.array.isRequired,
};