import React, { useState, useEffect } from 'react';
import { 
  Table,
  Button,
  Row,
  Col
} from 'reactstrap';
import PropTypes from 'prop-types';

const JumbotronComponent = (props) => {
  const { productID } = props;
  const [data, setData] = useState({ front_side: {}, back_side: {} });
  const [data7, setData7] = useState([]);
  const [data8, setData8] = useState([]);

  const printing  = (productprints = [])=>{
    console.log('productprints',productprints);
    
   const printArray =  productprints.map((item)=> {
      let str = ''
      const design = data7.find((d)=> d.id === item.design_id);
      const shade = data8.find((s)=> s.id === item.shade_id);
      
      console.log('design,shade',design,shade)
      if(design){
        str += `${design.code}/${design.code}/`
      }
      if(shade){
        str += shade.name
      }

      return str
    }  
)

console.log('printArray',printArray);

    return printArray.length > 0? printArray:[];
  }





  useEffect(() => {

    const fetchData7 = async () => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch('https://factory.teamasia.in/api/public/designs', {
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
      const resultX = result.designs.slice();
      // resultX.push({id:'x',design_id:'x',code:'Choose'});
      setData7(resultX);
    };

    const fetchData8 = async () => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch('https://factory.teamasia.in/api/public/shades', {
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
      const resultX = result.shades.slice();
      // resultX.push({id:'x',shade_id:'x',name:'Choose'});
      setData8(resultX);
    }

    const fetchData = async () => {
      const token = localStorage.getItem('userToken');
      const response = await fetch(`https://factory.teamasia.in/api/public/products/pair/${productID}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log('result product',result)
      setData(result);
    };


     
    fetchData8();
    fetchData7();
    fetchData();
  }, [productID]);

  // if (!data.front_side && !data.back_side) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
    
        <div className='table-margin' >
          <Table className='table-margin-zero order-table-button' size="sm" style={{ background: '#e3e3e3', padding: '2px',margin:'10px' }}>
            
          <Row style={{ background: '#012e43', padding: '2px' }}>
              <Col md="2">
                <div style={{ margin: '5px 0px'}}>
                  <div className='fix-wid-1-temp'>
                    <i className="bi-menu-button-wide-fill my-eye-color" style={{ fontSize: '20px', marginRight: '1px' }} />
                    {/* <span style={{ fontWeight: '900' }}> Product {data.front_side.is_online_product === '0' && data.front_side.ref_product_id === '0' && `${data?.front_side?.id}`}{data?.back_side?.id} {data.front_side.is_online_product === '1' && data.front_side.ref_product_id === '0' && `(front_side:${data?.front_side?.id})`}</span> */}
                    <span style={{ fontWeight: '900' }}> Product {data?.front_side?.id}</span>
                  </div>
                  </div>
               </Col>
               <Col md="10" style={{ padding: '5px 0px',display:'flex',justifyContent:'space-around'}}>
                  
                            <Button  className="btn mybtncustomer btn-secondary" outline color="info"> Planned: {data.planned}m</Button>
                            <Button  className="btn mybtncustomer btn-secondary" outline color="danger"> Mfd Length: {data.manufactured}m</Button>
                            <Button  className="btn mybtncustomer btn-secondary" outline color="info"> Dispatched: {data.dispatched}m</Button>
                            <Button  className="btn mybtncustomer btn-secondary" outline color="danger"> Actual Pending: {data.pending}m</Button>
                            <Button  className="btn mybtncustomer btn-secondary" outline color="info"> Delivery Date: {data.delivery_date}</Button>
                            <button type='button' className="btn mybtncustomer my-btn-color mr-1"> Total: {data.total}m</button>
                  
               </Col>
            </Row>
                
                
          
          </Table>
          <Table className='table-margin-zero' responsive size="sm">
            <thead>
              <tr>
                <th colSpan={13} style={{ background: '#777', textAlign: 'center', color: 'white' }}>{data.front_side.is_online_product === '1' && data.front_side.ref_product_id === '0' && 'Front Side'}{data.front_side.is_online_product === '0' && data.front_side.ref_product_id === '0' && ''}</th>
              </tr>
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
                <td title={data.front_side.grain_name}>{data.front_side.grain_name}</td>
                <td title={data.front_side.color_name}>{data.front_side.color_name}</td>
                <td title={data.front_side.quality_name}>{data.front_side.quality_name}</td>
                <td title={data.front_side.thickness}>{data.front_side.thickness}</td>
                <td title={data.front_side.fabric_name}>{data.front_side.fabric_name}</td>
                <td title={data.front_side.fabric_color_name}>{data.front_side.fabric_color_name}</td>
                <td title={data.front_side.hsn_name}>{data.front_side.hsn_name}</td>
                <td title={data.front_side.price}>{data.front_side.price}</td>
                <td title={data.front_side.tax_rate}>{data.front_side.tax_rate}%</td>
                <td title={data.front_side.emboss_name}>{data.front_side.emboss_name}</td>
                <td>{printing(data?.front_side?.productprints)?.map(item=> <div>{item}</div>)}</td>
                <td>N/A</td>
                <td>N/A</td>
              </tr>
            </tbody>
          </Table>
        </div>
        {Object.keys(data.back_side).length  > 0 && (
          <div>
            <Table className='table-margin-zero' responsive size="sm">
              <thead>
                <tr>
                  <th colSpan={13} style={{ background: '#777', textAlign: 'center', color: 'white' }}>Back Side</th>
                </tr>
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
                  <tr >
                  <td title={data.back_side.grain_name}>{data.back_side.grain_name}</td>
                  <td title={data.back_side.color_name}>{data.back_side.color_name}</td>
                  <td title={data.back_side.quality_name}>{data.back_side.quality_name}</td>
                  <td title={data.back_side.thickness}>{data.back_side.thickness}</td>
                  <td title={data.back_side.fabric_name}>{data.back_side.fabric_name}</td>
                  <td title={data.back_side.fabric_color_name}>{data.back_side.fabric_color_name}</td>
                  <td title={data.back_side.hsn_name}>{data.back_side.hsn_name}</td>
                  <td title={data.back_side.price}>{data.back_side.price}</td>
                  <td title={data.back_side.tax_rate}>{data.back_side.tax_rate}%</td>
                  <td title={data.back_side.emboss_name}>{data.back_side.emboss_name}</td>
                    <td>{printing(data?.back_side?.productprints)?.map(item=> <div>{item}</div>)}</td>
                    <td>N/A</td>
                    <td>N/A</td>
                  </tr>
              </tbody>
            </Table>
          </div>
        )}
    </>
  );
};

export default JumbotronComponent;

JumbotronComponent.propTypes = {
  productID: PropTypes.string.isRequired,
};
