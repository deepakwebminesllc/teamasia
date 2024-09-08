import React, { useState, useEffect } from 'react';
import { Table} from 'reactstrap';
import PropTypes from 'prop-types';

const JumbotronComponent = (props) => {
  const { productID } = props;
  const [Frontdata, setFrontData] = useState(null);
  const [Backdata, setBackData] = useState(null);
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


// console.log(data7, data8);


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

       const fetchDataFront = async (frontProductId) => {
      const token = localStorage.getItem('userToken');
      const response = await fetch(`https://factory.teamasia.in/api/public/products/${frontProductId}`, {
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
        setFrontData(result);
    };

       const fetchDataBack = async (backProductId) => {
        console.log('back',backProductId);

      const token = localStorage.getItem('userToken');
      const response = await fetch(`https://factory.teamasia.in/api/public/products/${backProductId}`, {
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
        setBackData(result);

    };


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
      console.log('result product',result);
      if(!Array.isArray(result.front_side)){
        fetchDataFront(result.front_side?.id);
      }
      if(!Array.isArray(result.back_side)){
        fetchDataBack(result.back_side?.id);
      }
    };

    fetchData8();
    fetchData7();
    fetchData();
  }, []);

  

  return (
    <>
    
        <div className='table-margin' >
          <Table className='table-margin-zero order-table-button' size="sm" style={{ background: '#e3e3e3', padding: '2px' }}>
            
             
                <div style={{ margin: '5px 0px' }}>
                  <div className='fix-wid-1'>
                    <i className="bi-menu-button-wide-fill my-eye-color" style={{ fontSize: '20px', marginRight: '1px' }} />
                    <span style={{ fontWeight: '900' }}> Product {Frontdata?.id}</span>
                  </div>
                </div>
             
              
          
          </Table>
          {Frontdata && (   <Table className='table-margin-zero' responsive size="sm">
            <thead>
              <tr>
                <th colSpan={13} style={{ background: '#777', textAlign: 'center', color: 'white' }}>{Backdata && 'Front Side'}</th>
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
                <td title={Frontdata.grain_name}>{Frontdata.grain_name}</td>
                <td title={Frontdata.color_name}>{Frontdata.color_name}</td>
                <td title={Frontdata.quality_name}>{Frontdata.quality_name}</td>
                <td title={Frontdata.thickness}>{Frontdata.thickness}</td>
                <td title={Frontdata.fabric_name}>{Frontdata.fabric_name}</td>
                <td title={Frontdata.fabric_color_name}>{Frontdata.fabric_color_name}</td>
                <td title={Frontdata.hsn_name}>{Frontdata.hsn_name}</td>
                <td title={Frontdata.price}>{Frontdata.price}</td>
                <td title={Frontdata.tax_rate}>{Frontdata.tax_rate}%</td>
                <td title={Frontdata.emboss_name}>{Frontdata.emboss_name}</td>
                <td>{printing(Frontdata.productprints)?.map(item=> <div>{item}</div>)}</td>
                <td>N/A</td>
                <td>N/A</td>
              </tr>
            </tbody>
          </Table>
        ) }
       
        </div>
        {Backdata && (
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
                {Backdata ?<tr key={Backdata.id}>
                      <td title={Backdata.grain_name}>{Backdata.grain_name}</td>
                      <td title={Backdata.color_name}>{Backdata.color_name}</td>
                      <td title={Backdata.quality_name}>{Backdata.quality_name}</td>
                      <td title={Backdata.thickness}>{Backdata.thickness}</td>
                      <td title={Backdata.fabric_name}>{Backdata.fabric_name}</td>
                      <td title={Backdata.fabric_color_name}>{Backdata.fabric_color_name}</td>
                      <td title={Backdata.hsn_name}>{Backdata.hsn_name}</td>
                      <td title={Backdata.price}>{Backdata.price}</td>
                      <td title={Backdata.tax_rate}>{Backdata.tax_rate}%</td>
                      <td title={Backdata.emboss_name}>{Backdata.emboss_name}</td>
                      <td>{printing(Backdata.productprints).map(item=> <div>{item}</div>)}</td>
                      <td>N/A</td>
                      <td>N/A</td>
                  </tr> :""}
                  
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



