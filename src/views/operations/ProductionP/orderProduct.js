import React,{ useState,useEffect} from 'react';
import { Table} from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard4 from '../../../components/ComponentCard5';


const JumbotronComponent = (props) => {

  const {orderID,formatDate,customerNameFromManagePlan,data1,data2,data3,data4,addItemToLine,removeItemFromLine} = props;
  const [data, setData] = useState([]);

   console.log('removeItemFromLine',removeItemFromLine,addItemToLine);

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
    customerNameFromManagePlan
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
  <>
    
    {productwithNames.map((product) => {
      return  <ComponentCard4 key={product.id}>
                <div>
                  <span className='production-plan-page-collape-heading'>PRODUCT</span> { product.id} <button type='button' style={{padding:'1px',background:'#777',borderRadius:'5px',marginLeft:'5px',marginRight:'5px',color:'white'}}>{product.is_factory_surplus_product !== 0?'factory product':''}</button>
                   <button type='button' style={{padding:'1px',background: '#B33C12',borderRadius:'5px',marginRight:'20px',color:'white'}}>{product.is_online_product !== 0?'online product':''}</button>
                    <span style={{paddingTop:'2px'}}><i className="bi bi-arrow-right-square-fill" style={{fontSize:"20px",marginTop:'2px'}} onClick={()=>addItemToLine(product)}></i></span>
                 </div>
       <Table size='sm' className="order-page-table" responsive>
                 
            <tbody>
                 
                  <tr >
                    <td title={product.grainName}>{product.grainName}</td>
                    <td title={product.colorName}>{product.colorName}</td>
                    <td title={product.qualityName}>{product.qualityName}</td>
                    <td title={product.fabricName}>{product.fabricName}</td>
                    <td title={product.fabricColorName}>{product.fabricColorName}</td>
                  </tr>
                  <tr >
                    <td title="">{}</td>
                    <td title="">{}</td>
                    <td title="">{}</td>
                    <td title="">{}</td>
                    <td title={product.thickness}>{product.thickness}mm</td>
                  </tr>
                  <tr >
                    <td title="" colSpan={3}>Additional Treatment :</td>
                  </tr>
                  <tr >
                    <td title="" colSpan={3}><span className='production-plan-page-collape-heading'>Delivery Date:</span> {formatDate(product.delivery_date)}</td>
                    <td title="" colSpan={2}><span className='production-plan-page-collape-heading'>Price Per Unit:</span> ₹{product.price}</td>
                  </tr>
                  <tr >
                    <td title="" colSpan={3}><span className='production-plan-page-collape-heading'>Cust. Item Ref:</span>  {product.customer_item_reference}</td>
                    <td title="" colSpan={2}> <span className='production-plan-page-collape-heading'>Total Qty:</span> {product.quantity}m</td>
                  </tr>
                  <tr >
                    <td title="" colSpan={3}> <span className='production-plan-page-collape-heading'>Remaining Qty:</span> 0.00m</td>
                    <td title="" colSpan={2}> <span className='production-plan-page-collape-heading'>Planned Qty:</span> {product.quantity}m</td>
                  </tr>
                </tbody>
                </Table> 
                </ComponentCard4>
                })}
  </>

  );
};

export default JumbotronComponent;

JumbotronComponent.propTypes = {
  orderID: PropTypes.string.isRequired,
  customerNameFromManagePlan: PropTypes.string.isRequired,
  data1: PropTypes.array.isRequired,
  data2: PropTypes.array.isRequired,
  data3: PropTypes.array.isRequired,
  data4: PropTypes.array.isRequired,
  addItemToLine: PropTypes.func.isRequired,
  removeItemFromLine: PropTypes.func.isRequired,
  formatDate: PropTypes.func.isRequired,
};