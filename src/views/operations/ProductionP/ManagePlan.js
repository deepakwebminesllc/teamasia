import React ,{useState,useEffect} from 'react';
import {
  Collapse,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
  Row,
  Col,
  Table,
  Input
} from 'reactstrap';
import { useLocation,useNavigate } from 'react-router-dom';
import ComponentCard1 from '../../../components/ComponentCard1';
import ComponentCard4 from '../../../components/ComponentCard4';
import 'react-table-v6/react-table.css';
import OrderProduct from './orderProduct';

const JumbotronComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapse, setCollapse] = useState([]);
  const {id,data1,data2,data3,data4,data5}    = location.state || {}; 
  const [data,setData] = useState([]);
  const [CustomerData,setCustomerData] = useState([]);
  const [line1, setLine1] = useState([]);
  const [line2, setLine2] = useState([]);
  const [line3, setLine3] = useState([]);
  const [line4, setLine4] = useState([]);

  const [activeTab, setActiveTab] = useState('1');

  const toggle1 = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  console.log('location',location.state,id);
  const toggle = (index) => {
    const newArray = [...collapse];
    newArray[index]= !newArray[index];
    setCollapse(newArray);
  }

  const addItemToLine = (product) => {
    let newItems;
    console.log('mega in additemline',line1,product);
    if(activeTab === '1'){
       newItems = line1.slice();
    }
    else if(activeTab === '2'){
       newItems = line2.slice();
    }
    else if(activeTab === '3'){
       newItems = line3.slice();
    }
    else if(activeTab === '4'){
       newItems = line4.slice();
    }

    newItems.push({...product,quantity:'',preSkin:'',skin:'',topCoat:'',fillerInTopCoat:'',form:'',fillerInForm:'',adhesive:'',fillerInAdhesive:'',finalGsm:''});

    console.log('mega',newItems);
    if(activeTab === '1'){
       setLine1(newItems);
   }
   else if(activeTab === '2'){
       setLine2(newItems);
   }
   else if(activeTab === '3'){
       setLine3(newItems);
   }
   else if(activeTab === '4'){
       setLine4(newItems);
   }
  };
  
  const removeItemFromLine = index => {
    let newItems;
    console.log('mega in removeitemline',line1);
    if(activeTab === '1'){
       newItems = line1.slice();
    }
    else if(activeTab === '2'){
       newItems = line2.slice();
    }
    else if(activeTab === '3'){
       newItems = line3.slice();
    }
    else if(activeTab === '4'){
       newItems = line4.slice();
    }
    newItems.splice(index, 1);

    console.log('mega',newItems);
    if(activeTab === '1'){
       setLine1(newItems);
   }
   else if(activeTab === '2'){
       setLine2(newItems);
   }
   else if(activeTab === '3'){
       setLine3(newItems);
   }
   else if(activeTab === '4'){
       setLine4(newItems);
   }
  };

  const handleInputChangeOfPlan = (index, event) => {
    let newItems;
    const {name ,value} = event.target;
    if(activeTab === '1'){
      newItems = line1.slice();
   }
   else if(activeTab === '2'){
      newItems = line2.slice();
   }
   else if(activeTab === '3'){
      newItems = line3.slice();
   }
   else if(activeTab === '4'){
      newItems = line4.slice();
   }

  console.log("data",index,newItems[index]);
  newItems[index][name] =  value;

if(activeTab === '1'){
    setLine1(newItems);
}
else if(activeTab === '2'){
    setLine2(newItems);
}
else if(activeTab === '3'){
    setLine3(newItems);
}
else if(activeTab === '4'){
    setLine4(newItems);
}
  };

  const handleEditcustomer = () => {
    navigate('/order/customers/edit',{state:location.state});
  };
  
const CustomerName =(customerId)=>{
    console.log('customerData',CustomerData);
    const result =  CustomerData.find((item)=> item.id === customerId);
    if(!result){
      return 'unknown customer'
    }
    return result.company_name.toUpperCase();
}

function formatDate(inputDate) {
    const date = new Date(inputDate);
  
    // Use Intl.DateTimeFormat to format the date
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Intl.DateTimeFormat('en-GB', options).format(date);

}

useEffect(()=>{
    const fetchData = async ()=>{
      const token = localStorage.getItem('userToken');
      const response = await fetch(`https://factory.teamasia.in/api/public/orders/?status_id=1`,{
        method:'GET',
        headers:{
          'Authorization': `Bearer ${token}`
        }
    });

    if(!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`);
    }
   const result = await response.json();
   console.log('responsejson',result);
   if(result.orders.length !== 0){
    
     setCollapse(Array(result.orders.length).fill(false));
     setData(result.orders);
   }
  }
    const fetchCustomerData = async ()=>{
      const token = localStorage.getItem('userToken');
      const response = await fetch(`https://factory.teamasia.in/api/public/customers`,{
        method:'GET',
        headers:{
          'Authorization': `Bearer ${token}`
        }
    });

    if(!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`);
    }
   const result = await response.json();
   console.log('responsejson',result);
     setCustomerData(result.customers);
     console.log('CustomerData',CustomerData);
     console.log('data1',data1);
     console.log('data2',data2);
     console.log('data3',data3);
     console.log('data4',data4);
     console.log('data5',data5);
  
  }
    fetchCustomerData();
    fetchData();
  },[]);
  
  console.log('data',data);

  return (
    <>
      <ComponentCard1 title="">
              <Row>
                <Col md="12">
                    <ComponentCard4>
                        <div className="order-view-page-flex">
                          <div style={{fontSize:'17px',fontWeight:'500',textTransform:'uppercase'}}> Manage Production Plan @ <span style={{fontWeight:'800'}}>11 Jun, 2024 </span>
                            <span style={{marginLeft:'17px'}}><Button className='my-btn-color' onClick={() => handleEditcustomer()}>
                                        Change Date
                                    </Button>
                            </span>
                          </div>
                        </div>
                    </ComponentCard4>
                   
                </Col>
              </Row>
               
              <Row>
                 <Col md="5"> 
                        {data.length !== 0?
                          data.map((AddressItem,index)=>(
                            <div key={AddressItem.id}>
                            
                            {/* <div className="my-btn-color" onClick={()=>toggle(index)} style={{textAlign:'center',color:'white',marginBottom:'2px',padding:'5px'}}> Address {index+1}  <span className=""  style={{textAlign:'center',background:"white",color:'blue',marginBottom:'0px',borderRadius:'4px',padding:'1px'}}> </span></div> */}
                            <div className="my-btn-color" onClick={()=>toggle(index)} style={{textAlign:'center',color:'white',marginBottom:'2px',padding:'5px'}}> #{AddressItem.id} {CustomerName(AddressItem.customer_id)} (Grains : ALINEA,3001 A) <br></br>
                                 Order Date: {formatDate(AddressItem.created_at)} | Nearest Expected Date: {formatDate(AddressItem.expected_delivery_date)}</div>
                            <Collapse isOpen={collapse[index]}>
                            
                                <OrderProduct orderID ={AddressItem.id} formatDate = {formatDate} data1={data1} data2={data2} data3={data3} data4={data4} data5={data5} addItemToLine={addItemToLine} removeItemFromLine = {removeItemFromLine} customerNameFromManagePlan={CustomerName(AddressItem.customer_id)}/>
                        </Collapse>
                        </div>
                          ))
                        
                          :"" } 

                        
                 </Col>

                <Col md="7">
                    <ComponentCard4 title="">
                      <Nav tabs>
                        <NavItem>
                          <NavLink
                            className={activeTab === '1' ? 'active' : ''}
                            onClick={() => {
                              toggle1('1');
                            }}
                          >
                            Line 1
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={activeTab === '2' ? 'active' : ''}
                            onClick={() => {
                              toggle1('2');
                            }}
                          >
                            Line 2
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={activeTab === '3' ? 'active' : ''}
                            onClick={() => {
                              toggle1('3');
                            }}
                          >
                            Line 1 (night)
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={activeTab === '4' ? 'active' : ''}
                            onClick={() => {
                              toggle1('4');
                            }}
                          >
                            Line 2 (night)
                          </NavLink>
                        </NavItem>
                        <Button ><i className='bi bi-arrow-down-square'></i></Button>
                        <Button className='my-btn-color' >Save Plan</Button>
                      </Nav>
                      <TabContent className="p-2" activeTab={activeTab}>
                        <TabPane tabId="1">
                          {
                            line1.map((product,index)=>
                              {
                                return <div key={product.id}>
                                <div>
                                  <span className='production-plan-page-collape-heading'>PRODUCT</span> { product.id} 
                                  <button type='button' style={{padding:'1px',background:'aliceblue',borderRadius:'5px',marginLeft:'5px',marginRight:'5px'}}>{product.customerNameFromManagePlan}</button>
                                  <button type='button' style={{padding:'1px',background:'#777',borderRadius:'5px',marginLeft:'5px',marginRight:'5px',color:'white'}}>{product.is_factory_surplus_product !== 0?'factory product':''}</button>
                                  <button type='button' style={{padding:'1px',background: '#B33C12',borderRadius:'5px',marginRight:'20px',color:'white'}}>{product.is_online_product !== 0?'online product':''}</button>
                                    <span style={{paddingTop:'2px'}}><i className="bi bi-x-square" style={{fontSize:"20px",marginTop:'2px'}} onClick={()=>removeItemFromLine(index)}></i></span>
                                </div>
                                <Table size='sm' className="order-page-table" responsive>     
                                      <tbody> 
                                            <tr>
                                              <td title={product.grainName}>{product.grainName}</td>
                                              <td title={product.colorName}>{product.colorName}</td>
                                              <td title={product.qualityName}>{product.qualityName}</td>
                                              <td title={product.fabricName}>{product.fabricName}</td>
                                              <td title={product.fabricColorName}>{product.fabricColorName}</td>
                                            </tr>
                                            <tr>
                                              <td title="">{}</td>
                                              <td title="">{}</td>
                                              <td title="">{}</td>
                                              <td title="">{}</td>
                                              <td title={product.thickness}>{product.thickness}mm</td>
                                            </tr>
                                            
                                            <tr>
                                              <td title="" colSpan={3}><span className='production-plan-page-collape-heading'>Cust. Item Ref:</span>  {product.customer_item_reference}</td>
                                              <td title="" colSpan={2}><span className='production-plan-page-collape-heading'>Price Per Unit:</span> ₹{product.price}</td>
                                            </tr>
                                            <tr>
                                              <td title="" colSpan={3}>Additional Treatment :</td>
                                            </tr>
                                            <tr>
                                              <td title="">
                                                <Input 
                                                  name="quantity" 
                                                  value={product.quantity} 
                                                  type="number" 
                                                  
                                                  placeholder="quantity"
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  />
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="preSkin" 
                                                  value={product.preSkin} 
                                                  type="text" 
                              
                                                  placeholder="pre Skin"
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  />
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="skin" 
                                                  value={product.skin} 
                                                  type="text" 
                                                  
                                                  placeholder="skin"
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  />
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="topCoat" 
                                                  value={product.topCoat} 
                                                  type="text" 
                                                  
                                                  placeholder="topCoat"
                                                  onChange={e => handleInputChangeOfPlan(index, e)} 
                                                  />
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="fillerInTopCoat" 
                                                  value={product.fillerInTopCoat} 
                                                  type="text" 
                                                   
                                                  placeholder="filler In TopCoat" 
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  
                                                  />
                                              </td>
                                              
                                            </tr>
                                            <tr>
                                              <td title="">
                                                <Input 
                                                  name="form" 
                                                  value={product.form} 
                                                  type="text" 
                                                   
                                                  placeholder="form" 
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  />
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="fillerInForm" 
                                                  value={product.fillerInForm} 
                                                  type="text" 
                                                  
                                                  placeholder="filler In Form" 
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  />
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="adhesive" 
                                                  value={product.adhesive} 
                                                  type="text"  
                                                  placeholder="adhesive" 
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  />
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="fillerInAdhesive" 
                                                  value={product.fillerInAdhesive} 
                                                  type="text" 
                                                   
                                                  placeholder="filler In Adhesive" 
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  />
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="finalGsm" 
                                                  value={product.finalGsm} 
                                                  type="text" 
                                                   
                                                  placeholder="finalGsm"
                                                  onChange={e => handleInputChangeOfPlan(index, e)} 
                                                  />
                                              </td>
                                              
                                            </tr>
                                      </tbody>
                                </Table> 
                            </div>
                              }
                              
                            )
                          }
                            
                        </TabPane>
                        <TabPane tabId="2">
                        {
                            line2.map((product,index)=>
                              {
                                return <div key={product.id}>
                                <div>
                                  <span className='production-plan-page-collape-heading'>PRODUCT</span> { product.id} 
                                  <button type='button' style={{padding:'1px',background:'aliceblue',borderRadius:'5px',marginLeft:'5px',marginRight:'5px'}}>{product.customerNameFromManagePlan}</button>
                                  <button type='button' style={{padding:'1px',background:'#777',borderRadius:'5px',marginLeft:'5px',marginRight:'5px',color:'white'}}>{product.is_factory_surplus_product !== 0?'factory product':''}</button>
                                  <button type='button' style={{padding:'1px',background: '#B33C12',borderRadius:'5px',marginRight:'20px',color:'white'}}>{product.is_online_product !== 0?'online product':''}</button>
                                    <span style={{paddingTop:'2px'}}><i className="bi bi-x-square" style={{fontSize:"20px",marginTop:'2px'}} onClick={()=>removeItemFromLine(index)}></i></span>
                                </div>
                                <Table size='sm' className="order-page-table" responsive>     
                                      <tbody> 
                                            <tr>
                                              <td title={product.grainName}>{product.grainName}</td>
                                              <td title={product.colorName}>{product.colorName}</td>
                                              <td title={product.qualityName}>{product.qualityName}</td>
                                              <td title={product.fabricName}>{product.fabricName}</td>
                                              <td title={product.fabricColorName}>{product.fabricColorName}</td>
                                            </tr>
                                            <tr>
                                              <td title="">{}</td>
                                              <td title="">{}</td>
                                              <td title="">{}</td>
                                              <td title="">{}</td>
                                              <td title={product.thickness}>{product.thickness}mm</td>
                                            </tr>
                                            
                                            <tr>
                                              <td title="" colSpan={3}><span className='production-plan-page-collape-heading'>Cust. Item Ref:</span>  {product.customer_item_reference}</td>
                                              <td title="" colSpan={2}><span className='production-plan-page-collape-heading'>Price Per Unit:</span> ₹{product.price}</td>
                                            </tr>
                                            <tr>
                                              <td title="" colSpan={3}>Additional Treatment :</td>
                                            </tr>
                                            <tr>
                                              <td title="">
                                                <Input 
                                                  name="quantity" 
                                                  value={product.quantity} 
                                                  type="number" 
                                                  
                                                  placeholder="quantity"
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  />
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="preSkin" 
                                                  value={product.preSkin} 
                                                  type="text" 
                              
                                                  placeholder="pre Skin"
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  />
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="skin" 
                                                  value={product.skin} 
                                                  type="text" 
                                                  
                                                  placeholder="skin"
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  />
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="topCoat" 
                                                  value={product.topCoat} 
                                                  type="text" 
                                                  
                                                  placeholder="topCoat"
                                                  onChange={e => handleInputChangeOfPlan(index, e)} 
                                                  />
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="fillerInTopCoat" 
                                                  value={product.fillerInTopCoat} 
                                                  type="text" 
                                                   
                                                  placeholder="filler In TopCoat" 
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  
                                                  />
                                              </td>
                                              
                                            </tr>
                                            <tr>
                                              <td title="">
                                                <Input 
                                                  name="form" 
                                                  value={product.form} 
                                                  type="text" 
                                                   
                                                  placeholder="form" 
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  />
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="fillerInForm" 
                                                  value={product.fillerInForm} 
                                                  type="text" 
                                                  
                                                  placeholder="filler In Form" 
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  />
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="adhesive" 
                                                  value={product.adhesive} 
                                                  type="text"  
                                                  placeholder="adhesive" 
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  />
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="fillerInAdhesive" 
                                                  value={product.fillerInAdhesive} 
                                                  type="text" 
                                                   
                                                  placeholder="filler In Adhesive" 
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  />
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="finalGsm" 
                                                  value={product.finalGsm} 
                                                  type="text" 
                                                   
                                                  placeholder="finalGsm"
                                                  onChange={e => handleInputChangeOfPlan(index, e)} 
                                                  />
                                              </td>
                                              
                                            </tr>
                                      </tbody>
                                </Table> 
                            </div>
                              }
                              
                            )
                          }
                        </TabPane>
                        <TabPane tabId="3">
                        {
                            line3.map((product,index)=>
                              {
                                return <div key={product.id}>
                                <div>
                                  <span className='production-plan-page-collape-heading'>PRODUCT</span> { product.id} 
                                  <button type='button' style={{padding:'1px',background:'aliceblue',borderRadius:'5px',marginLeft:'5px',marginRight:'5px'}}>{product.customerNameFromManagePlan}</button>
                                  <button type='button' style={{padding:'1px',background:'#777',borderRadius:'5px',marginLeft:'5px',marginRight:'5px',color:'white'}}>{product.is_factory_surplus_product !== 0?'factory product':''}</button>
                                  <button type='button' style={{padding:'1px',background: '#B33C12',borderRadius:'5px',marginRight:'20px',color:'white'}}>{product.is_online_product !== 0?'online product':''}</button>
                                    <span style={{paddingTop:'2px'}}><i className="bi bi-x-square" style={{fontSize:"20px",marginTop:'2px'}} onClick={()=>removeItemFromLine(index)}></i></span>
                                </div>
                                <Table size='sm' className="order-page-table" responsive>     
                                      <tbody> 
                                            <tr>
                                              <td title={product.grainName}>{product.grainName}</td>
                                              <td title={product.colorName}>{product.colorName}</td>
                                              <td title={product.qualityName}>{product.qualityName}</td>
                                              <td title={product.fabricName}>{product.fabricName}</td>
                                              <td title={product.fabricColorName}>{product.fabricColorName}</td>
                                            </tr>
                                            <tr>
                                              <td title="">{}</td>
                                              <td title="">{}</td>
                                              <td title="">{}</td>
                                              <td title="">{}</td>
                                              <td title={product.thickness}>{product.thickness}mm</td>
                                            </tr>
                                            
                                            <tr>
                                              <td title="" colSpan={3}><span className='production-plan-page-collape-heading'>Cust. Item Ref:</span>  {product.customer_item_reference}</td>
                                              <td title="" colSpan={2}><span className='production-plan-page-collape-heading'>Price Per Unit:</span> ₹{product.price}</td>
                                            </tr>
                                            <tr>
                                              <td title="" colSpan={3}>Additional Treatment :</td>
                                            </tr>
                                            <tr>
                                              <td title="">
                                                <Input 
                                                  name="quantity" 
                                                  value={product.quantity} 
                                                  type="number" 
                                                  
                                                  placeholder="quantity"
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  />
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="preSkin" 
                                                  value={product.preSkin} 
                                                  type="text" 
                              
                                                  placeholder="pre Skin"
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  />
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="skin" 
                                                  value={product.skin} 
                                                  type="text" 
                                                  
                                                  placeholder="skin"
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  />
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="topCoat" 
                                                  value={product.topCoat} 
                                                  type="text" 
                                                  
                                                  placeholder="topCoat"
                                                  onChange={e => handleInputChangeOfPlan(index, e)} 
                                                  />
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="fillerInTopCoat" 
                                                  value={product.fillerInTopCoat} 
                                                  type="text" 
                                                   
                                                  placeholder="filler In TopCoat" 
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  
                                                  />
                                              </td>
                                              
                                            </tr>
                                            <tr>
                                              <td title="">
                                                <Input 
                                                  name="form" 
                                                  value={product.form} 
                                                  type="text" 
                                                   
                                                  placeholder="form" 
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  />
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="fillerInForm" 
                                                  value={product.fillerInForm} 
                                                  type="text" 
                                                  
                                                  placeholder="filler In Form" 
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  />
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="adhesive" 
                                                  value={product.adhesive} 
                                                  type="text"  
                                                  placeholder="adhesive" 
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  />
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="fillerInAdhesive" 
                                                  value={product.fillerInAdhesive} 
                                                  type="text" 
                                                   
                                                  placeholder="filler In Adhesive" 
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  />
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="finalGsm" 
                                                  value={product.finalGsm} 
                                                  type="text" 
                                                   
                                                  placeholder="finalGsm"
                                                  onChange={e => handleInputChangeOfPlan(index, e)} 
                                                  />
                                              </td>
                                              
                                            </tr>
                                      </tbody>
                                </Table> 
                            </div>
                              }
                              
                            )
                          }
                        </TabPane>
                        <TabPane tabId="4">
                        {
                            line4.map((product,index)=>
                              {
                                return <div key={product.id}>
                                <div>
                                  <span className='production-plan-page-collape-heading'>PRODUCT</span> { product.id} 
                                  <button type='button' style={{padding:'1px',background:'aliceblue',borderRadius:'5px',marginLeft:'5px',marginRight:'5px'}}>{product.customerNameFromManagePlan}</button>
                                  <button type='button' style={{padding:'1px',background:'#777',borderRadius:'5px',marginLeft:'5px',marginRight:'5px',color:'white'}}>{product.is_factory_surplus_product !== 0?'factory product':''}</button>
                                  <button type='button' style={{padding:'1px',background: '#B33C12',borderRadius:'5px',marginRight:'20px',color:'white'}}>{product.is_online_product !== 0?'online product':''}</button>
                                    <span style={{paddingTop:'2px'}}><i className="bi bi-x-square" style={{fontSize:"20px",marginTop:'2px'}} onClick={()=>removeItemFromLine(index)}></i></span>
                                </div>
                                <Table size='sm' className="order-page-table" responsive>     
                                      <tbody> 
                                            <tr>
                                              <td title={product.grainName}>{product.grainName}</td>
                                              <td title={product.colorName}>{product.colorName}</td>
                                              <td title={product.qualityName}>{product.qualityName}</td>
                                              <td title={product.fabricName}>{product.fabricName}</td>
                                              <td title={product.fabricColorName}>{product.fabricColorName}</td>
                                            </tr>
                                            <tr>
                                              <td title="">{}</td>
                                              <td title="">{}</td>
                                              <td title="">{}</td>
                                              <td title="">{}</td>
                                              <td title={product.thickness}>{product.thickness}mm</td>
                                            </tr>
                                            
                                            <tr>
                                              <td title="" colSpan={3}><span className='production-plan-page-collape-heading'>Cust. Item Ref:</span>  {product.customer_item_reference}</td>
                                              <td title="" colSpan={2}><span className='production-plan-page-collape-heading'>Price Per Unit:</span> ₹{product.price}</td>
                                            </tr>
                                            <tr>
                                              <td title="" colSpan={3}>Additional Treatment :</td>
                                            </tr>
                                            <tr>
                                              <td title="">
                                                <Input 
                                                  name="quantity" 
                                                  value={product.quantity} 
                                                  type="number" 
                                                  
                                                  placeholder="quantity"
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  />
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="preSkin" 
                                                  value={product.preSkin} 
                                                  type="text" 
                              
                                                  placeholder="pre Skin"
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  />
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="skin" 
                                                  value={product.skin} 
                                                  type="text" 
                                                  
                                                  placeholder="skin"
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  />
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="topCoat" 
                                                  value={product.topCoat} 
                                                  type="text" 
                                                  
                                                  placeholder="topCoat"
                                                  onChange={e => handleInputChangeOfPlan(index, e)} 
                                                  />
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="fillerInTopCoat" 
                                                  value={product.fillerInTopCoat} 
                                                  type="text" 
                                                   
                                                  placeholder="filler In TopCoat" 
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  
                                                  />
                                              </td>
                                              
                                            </tr>
                                            <tr>
                                              <td title="">
                                                <Input 
                                                  name="form" 
                                                  value={product.form} 
                                                  type="text" 
                                                   
                                                  placeholder="form" 
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  />
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="fillerInForm" 
                                                  value={product.fillerInForm} 
                                                  type="text" 
                                                  
                                                  placeholder="filler In Form" 
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  />
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="adhesive" 
                                                  value={product.adhesive} 
                                                  type="text"  
                                                  placeholder="adhesive" 
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  />
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="fillerInAdhesive" 
                                                  value={product.fillerInAdhesive} 
                                                  type="text" 
                                                   
                                                  placeholder="filler In Adhesive" 
                                                  onChange={e => handleInputChangeOfPlan(index, e)}
                                                  />
                                              </td>
                                              <td title="">
                                                <Input 
                                                  name="finalGsm" 
                                                  value={product.finalGsm} 
                                                  type="text" 
                                                   
                                                  placeholder="finalGsm"
                                                  onChange={e => handleInputChangeOfPlan(index, e)} 
                                                  />
                                              </td>
                                              
                                            </tr>
                                      </tbody>
                                </Table> 
                            </div>
                              }
                              
                            )
                          }
                        </TabPane>
                      </TabContent>
                    </ComponentCard4>
                 </Col>
              </Row>
         
      </ComponentCard1>
    </>
  );
};

export default JumbotronComponent;
