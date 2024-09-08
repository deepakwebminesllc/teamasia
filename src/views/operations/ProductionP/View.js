import React, {useState,useEffect } from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
  Table
} from 'reactstrap';
import {useLocation, useNavigate} from 'react-router-dom';
import ComponentCard from '../../../components/ComponentCard';
import ComponentCard4 from '../../../components/ComponentCard2';
import 'react-table-v6/react-table.css';
import CreateJumboRoll from './createJumboRoll'
import UpdateJumboRoll from './UpdateJumboRoll'
import PasteConsumption from './pasteConsumption'
import PlanViewProduct from "./planViewProduct";
import PlanViewJumbo from "./planViewJumbo";

const JumbotronComponent = () => {
  const [activeTab, setActiveTab] = useState('1');
  const navigate = useNavigate();
  const location = useLocation();
  const {Customerdata,data6} = location.state
  const { date: planDate } = location.state.item
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [QaData, setQaData] = useState([]);
  const [line1, setLine1] = useState([]);
  const [line2, setLine2] = useState([]);
  const [line3, setLine3] = useState([]);
  const [line4, setLine4] = useState([]);
  const [JumboDataFromPlan, setJumboDataFromPlan] = useState({});
  const [JumboUpdateDataFromPlan, setJumboUpdateDataFromPlan] = useState({});
  const [refreshKey, setRefreshKey] = useState(0); // New state to trigger re-render

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };


 console.log('data.....',location.state.item,location);

 function formatDate(inputDate) {
  const date = new Date(inputDate);

  // Use Intl.DateTimeFormat to format the date
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  return new Intl.DateTimeFormat('en-GB', options).format(date);
}

 const CustomerName =(customerId)=>{
  const result =  Customerdata.find((item)=> item.id === customerId);
  if(!result){
    return 'unknown customer'
  }
  return result.company_name;
}

 const addRollTogglefunction = ()=>{
  console.log('click');
  setModal1(!modal1);
}
 const setterJumboDataFromPlan = (product)=>{
  // console.log('productxxxxxxxxxxxxxx',product)
  setJumboDataFromPlan(product);
  addRollTogglefunction();
}

 const  updateRollTogglefunction = ()=>{
  console.log('click');
  setModal2(!modal2);
}

const handleCreateJumboRoll = () => {
  // Callback function to handle jumbo roll creation
  console.log('something happened !');
  setRefreshKey(oldKey => oldKey + 1);
};

const setterJumboUpdateDataFromPlan = (product)=>{
  // console.log('product',product);
  setJumboUpdateDataFromPlan(product);
  updateRollTogglefunction();
}



 const addPasteConsumption = ()=>{
  console.log('click');
  setModal(!modal);
}

const setterPasteDataFromPlan = (product)=>{
  console.log('hi',product)
  setJumboUpdateDataFromPlan(product);
  addPasteConsumption();
}

 const LabReport = (product)=>{
  console.log('click');
  navigate('/operations/production-plans/manage-plan/lab-report',{state:{product}})
}

useEffect(()=>{
  const fetchQaData = async () => {
    const token = localStorage.getItem('userToken');
    // console.log('token',token);
    const response = await fetch('https://factory.teamasia.in/api/public/qapateams/?is_trashed=0', {
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
    // console.log("responsejson1",result);
    const resultX = result.qapateams.slice();
    resultX.push({id:'x',name:'Choose'});
    setQaData(resultX); 
  };
  const fetchDataPlan = async () => {
    const token = localStorage.getItem('userToken');
    // console.log('token',token);
    const response = await fetch(`https://factory.teamasia.in/api/public/productionplan/?plan_date=${planDate}`, {
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
    // console.log("responsejson1 producton",result);
    const plans = result.production_plan;

    const line1Data = plans.filter(plan => plan.line_id === '1');
    const line2Data = plans.filter(plan => plan.line_id === '2');
    const line3Data = plans.filter(plan => plan.line_id === '3');
    const line4Data = plans.filter(plan => plan.line_id === '4');

    // Set state
    setLine1(line1Data);
    setLine2(line2Data);
    setLine3(line3Data);
    setLine4(line4Data);

  };

  fetchDataPlan();
  fetchQaData();
},[]);
  
console.log(line1,line2,line3,line4);
  return (
    <>
       {/* <CreateJumboRoll modal={modal1} JumboDataFromPlan={JumboDataFromPlan} setModal1={setModal1} toggle={addRollTogglefunction}   data2={QaData} data6={data6}/>
       <UpdateJumboRoll modal={modal2} JumboUpdateDataFromPlan={JumboUpdateDataFromPlan} setModal1={setModal2} toggle={updateRollTogglefunction}   data2={QaData} data6={data6}/>
       <PasteConsumption modal={modal}  toggle={addPasteConsumption }  data2={QaData} data3={data3} data4={data4} data6={data6}/> */}

       {modal1 && <CreateJumboRoll handleCreateJumboRoll ={handleCreateJumboRoll} modal={modal1} JumboDataFromPlan={JumboDataFromPlan} setModal1={setModal1} toggle={addRollTogglefunction} data2={QaData} data6={data6} />}
      {modal2 && <UpdateJumboRoll modal={modal2} JumboUpdateDataFromPlan={JumboUpdateDataFromPlan} setModal1={setModal2} toggle={updateRollTogglefunction} data2={QaData} data6={data6} />}
      {modal && <PasteConsumption modal={modal} toggle={addPasteConsumption} JumboDataFromPlan={JumboUpdateDataFromPlan} data2={QaData} data3={[]} data4={[]} data6={data6} />}
      
      <ComponentCard title="">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={activeTab === '1' ? 'active' : ''}
              onClick={() => {
                toggle('1');
              }}
            >
              Line 1
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '2' ? 'active' : ''}
              onClick={() => {
                toggle('2');
              }}
            >
              Line 2
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '3' ? 'active' : ''}
              onClick={() => {
                toggle('3');
              }}
            >
              Line 1 (night)
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '4' ? 'active' : ''}
              onClick={() => {
                toggle('4');
              }}
            >
              Line 2 (night)
            </NavLink>
          </NavItem>
          <Button>Print Plan</Button>
        </Nav>
        <TabContent className="p-4" activeTab={activeTab}>
          <TabPane tabId="1">
            
              <Table responsive size="sm">
                <thead>
                  <tr>
                    <th scope="col"><Button className='my-btn-color'>{"Total Jumbo Rolls => Count : 0, Qty : 0 m"}</Button></th>
                    <th scope="col"><Button className='my-btn-color-red'>{"Total Small Rolls => Count : 0, Qty : 0 m"}</Button></th>
                  </tr>
                </thead>
            </Table>
            {line1?.length <1 ? <div className="my-btn-color-temp"  style={{background: 'aliceblue',textAlign:'center',border: '2px solid black',color:'black',marginBottom:'2px',padding:'40px'}}>
                    <div>
                      <i className="bi bi-emoji-frown" style={{fontSize:'25px',color:'black'}}/>
                    </div>
                    No item on this production line.
               </div>:line1.map((product)=>{
                return <React.Fragment key={product.id}>
                
            
            <ComponentCard4>

              <div className='table-margin'>
               <Table className='table-margin-zero' responsive size="sm">
                  <thead>
                    <tr>
                      <th scope="col">
                        <div>{CustomerName(product.customer_id)}  
                          <button type="button" style={{background:'rgb(28 81 28)',color:'white',borderRadius:'7px'}}>Product({product.product_id})</button>
                            {(product?.product_details.is_online_product !== '0' || product?.product_details.ref_product_id !== '0') && <button type='button' style={{padding:'1px',background: '#B33C12',borderRadius:'5px',marginLeft:'5px',marginRight:'20px',color:'white'}}>online product</button>}
                            {product?.product_details.is_online_product !== '0' && product?.product_details.ref_product_id === '0' && <button type='button' style={{padding:'1px',background: '#B33C12',borderRadius:'5px',marginLeft:'5px',marginRight:'20px',color:'white'}}>front side</button>}
                            {product?.product_details.is_online_product === '0' && product?.product_details.ref_product_id !== '0' && <button type='button' style={{padding:'1px',background: '#B33C12',borderRadius:'5px',marginLeft:'5px',marginRight:'20px',color:'white'}}>back side</button>}
                        </div>
                        <div>Delivery Date :{ formatDate(product.created_at)}, Total : {product.quantity} | Total : API missing | Remaining : API missing </div>
                        </th>
                      <th scope="col"><Button className='my-btn-color' onClick={()=>setterJumboDataFromPlan(product)}>Create Jumbo Roll</Button></th>
                      <th scope="col"><Button className='my-btn-color-red' onClick={()=>setterPasteDataFromPlan(product)}>Paste Consumption</Button></th>
                      <th scope="col"><Button className='my-btn-color-red'>Manage daily Usage</Button></th>
                      <th scope="col"><Button className='my-btn-color-red' onClick={()=>LabReport(product)}>Lab Report</Button></th>
                      <th scope="col"><Button className='my-btn-mo-color'>More</Button></th>

                    </tr>
                  </thead>
                  
                </Table>

                <PlanViewProduct productID ={product.product_id}/>
              
                
                <Table responsive size="sm">
                  <thead>
                    <tr>
                      <th scope="col">Pre Skin</th>
                      <th scope="col">Skin</th>
                      <th scope="col">Top Coat</th>
                      <th scope="col">Filler In Top Coat</th>
                      <th scope="col">Foam</th>
                      <th scope="col">Filler In Foam</th>
                      <th scope="col">Adhesive</th>
                      <th scope="col">Filler In Adhesive</th>
                      <th scope="col">Final GSM</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{product.pre_skin}</td>
                      <td>{product.skin} gsm</td>
                      <td>{product.top_coat}</td>
                      <td>{product.filler_in_top_coat}</td>
                      <td>{product.foam} gsm</td>
                      <td>{product.filler_in_foam} PHR</td>
                      <td>{product.adhesive} gsm</td>
                      <td>{product.filler_in_adhesive} PHR</td>
                      <td>{product.final_gsm} gsm</td>
                    </tr>
                  
                  </tbody>
                </Table>
                  {activeTab === '1' &&  <PlanViewJumbo Refreshkey={refreshKey} product={product} updateRollTogglefunction={setterJumboUpdateDataFromPlan}/>}
               </div>
               
             </ComponentCard4>
             </React.Fragment>
              })
            }
          </TabPane>
          <TabPane tabId="2">
                <Table responsive size="sm">
                  <thead>
                    <tr>
                      <th scope="col"><Button className='my-btn-color'>{"Total Jumbo Rolls => Count : 0, Qty : 0 m"}</Button></th>
                      <th scope="col"><Button className='my-btn-color-red'>{"Total Small Rolls => Count : 0, Qty : 0 m"}</Button></th>
                    </tr>
                  </thead>
                  
                </Table>
                {line2?.length <1 ? <div className="my-btn-color-temp"  style={{background: 'aliceblue',textAlign:'center',border: '2px solid black',color:'black',marginBottom:'2px',padding:'40px'}}>
                    <div>
                      <i className="bi bi-emoji-frown" style={{fontSize:'25px',color:'black'}}/>
                    </div>
                    No item on this production line.
               </div>:line2.map((product)=>{
                return <React.Fragment key={product.id}>
                
            
            <ComponentCard4>

              <div className='table-margin'>
               <Table className='table-margin-zero' responsive size="sm">
                  <thead>
                    <tr>
                      <th scope="col">
                        <div>{CustomerName(product.customer_id)}  
                          <button type="button" style={{background:'rgb(28 81 28)',color:'white',borderRadius:'7px'}}>Product({product.product_id})</button>
                            {(product?.product_details.is_online_product !== '0' || product?.product_details.ref_product_id !== '0') && <button type='button' style={{padding:'1px',background: '#B33C12',borderRadius:'5px',marginLeft:'5px',marginRight:'20px',color:'white'}}>online product</button>}
                            {product?.product_details.is_online_product !== '0' && product?.product_details.ref_product_id === '0' && <button type='button' style={{padding:'1px',background: '#B33C12',borderRadius:'5px',marginLeft:'5px',marginRight:'20px',color:'white'}}>front side</button>}
                            {product?.product_details.is_online_product === '0' && product?.product_details.ref_product_id !== '0' && <button type='button' style={{padding:'1px',background: '#B33C12',borderRadius:'5px',marginLeft:'5px',marginRight:'20px',color:'white'}}>back side</button>}
                        </div>
                        <div>Delivery Date :{ formatDate(product.created_at)}, Total : {product.quantity} | Total : API missing | Remaining : API missing </div>
                        </th>
                      <th scope="col"><Button className='my-btn-color' onClick={()=>setterJumboDataFromPlan(product)}>Create Jumbo Roll</Button></th>
                      <th scope="col"><Button className='my-btn-color-red' onClick={()=>setterPasteDataFromPlan(product)}>Paste Consumption</Button></th>
                      <th scope="col"><Button className='my-btn-color-red'>Manage daily Usage</Button></th>
                      <th scope="col"><Button className='my-btn-color-red' onClick={()=>LabReport(product)}>Lab Report</Button></th>
                      <th scope="col"><Button className='my-btn-mo-color'>More</Button></th>

                    </tr>
                  </thead>
                  
                </Table>

                <PlanViewProduct productID ={product.product_id}/>
              
                
                <Table responsive size="sm">
                  <thead>
                    <tr>
                      <th scope="col">Pre Skin</th>
                      <th scope="col">Skin</th>
                      <th scope="col">Top Coat</th>
                      <th scope="col">Filler In Top Coat</th>
                      <th scope="col">Foam</th>
                      <th scope="col">Filler In Foam</th>
                      <th scope="col">Adhesive</th>
                      <th scope="col">Filler In Adhesive</th>
                      <th scope="col">Final GSM</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{product.pre_skin}</td>
                      <td>{product.skin} gsm</td>
                      <td>{product.top_coat}</td>
                      <td>{product.filler_in_top_coat}</td>
                      <td>{product.foam} gsm</td>
                      <td>{product.filler_in_foam} PHR</td>
                      <td>{product.adhesive} gsm</td>
                      <td>{product.filler_in_adhesive} PHR</td>
                      <td>{product.final_gsm} gsm</td>
                    </tr>
                  
                  </tbody>
                </Table>
                  {activeTab === '2' &&  <PlanViewJumbo Refreshkey={refreshKey} product={product} updateRollTogglefunction={setterJumboUpdateDataFromPlan}/>}
               </div>
               
             </ComponentCard4>
             </React.Fragment>
              })
            }
          </TabPane>
          <TabPane tabId="3">
                <Table responsive size="sm">
                  <thead>
                    <tr>
                       <th scope="col"><Button className='my-btn-color'>{"Total Jumbo Rolls => Count : 0, Qty : 0 m"}</Button></th>
                       <th scope="col"><Button className='my-btn-color-red'>{"Total Small Rolls => Count : 0, Qty : 0 m"}</Button></th>
                    </tr>
                  </thead>
                  
                </Table>
                {line3?.length <1 ? <div className="my-btn-color-temp"  style={{background: 'aliceblue',textAlign:'center',border: '2px solid black',color:'black',marginBottom:'2px',padding:'40px'}}>
                    <div>
                      <i className="bi bi-emoji-frown" style={{fontSize:'25px',color:'black'}}/>
                    </div>
                    No item on this production line.
               </div>:line3.map((product)=>{
                return <React.Fragment key={product.id}>
                
            
            <ComponentCard4>

              <div className='table-margin'>
               <Table className='table-margin-zero' responsive size="sm">
                  <thead>
                    <tr>
                      <th scope="col">
                        <div>{CustomerName(product.customer_id)}  
                          <button type="button" style={{background:'rgb(28 81 28)',color:'white',borderRadius:'7px'}}>Product({product.product_id})</button>
                            {(product?.product_details.is_online_product !== '0' || product?.product_details.ref_product_id !== '0') && <button type='button' style={{padding:'1px',background: '#B33C12',borderRadius:'5px',marginLeft:'5px',marginRight:'20px',color:'white'}}>online product</button>}
                            {product?.product_details.is_online_product !== '0' && product?.product_details.ref_product_id === '0' && <button type='button' style={{padding:'1px',background: '#B33C12',borderRadius:'5px',marginLeft:'5px',marginRight:'20px',color:'white'}}>front side</button>}
                            {product?.product_details.is_online_product === '0' && product?.product_details.ref_product_id !== '0' && <button type='button' style={{padding:'1px',background: '#B33C12',borderRadius:'5px',marginLeft:'5px',marginRight:'20px',color:'white'}}>back side</button>}
                        </div>
                        <div>Delivery Date :{ formatDate(product.created_at)}, Total : {product.quantity} | Total : API missing | Remaining : API missing </div>
                        </th>
                      <th scope="col"><Button className='my-btn-color' onClick={()=>setterJumboDataFromPlan(product)}>Create Jumbo Roll</Button></th>
                      <th scope="col"><Button className='my-btn-color-red' onClick={()=>setterPasteDataFromPlan(product)}>Paste Consumption</Button></th>
                      <th scope="col"><Button className='my-btn-color-red'>Manage daily Usage</Button></th>
                      <th scope="col"><Button className='my-btn-color-red' onClick={()=>LabReport(product)}>Lab Report</Button></th>
                      <th scope="col"><Button className='my-btn-mo-color'>More</Button></th>

                    </tr>
                  </thead>
                  
                </Table>

                <PlanViewProduct productID ={product.product_id}/>
              
                
                <Table responsive size="sm">
                  <thead>
                    <tr>
                      <th scope="col">Pre Skin</th>
                      <th scope="col">Skin</th>
                      <th scope="col">Top Coat</th>
                      <th scope="col">Filler In Top Coat</th>
                      <th scope="col">Foam</th>
                      <th scope="col">Filler In Foam</th>
                      <th scope="col">Adhesive</th>
                      <th scope="col">Filler In Adhesive</th>
                      <th scope="col">Final GSM</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{product.pre_skin}</td>
                      <td>{product.skin} gsm</td>
                      <td>{product.top_coat}</td>
                      <td>{product.filler_in_top_coat}</td>
                      <td>{product.foam} gsm</td>
                      <td>{product.filler_in_foam} PHR</td>
                      <td>{product.adhesive} gsm</td>
                      <td>{product.filler_in_adhesive} PHR</td>
                      <td>{product.final_gsm} gsm</td>
                    </tr>
                  
                  </tbody>
                </Table>
                  {activeTab === '3' &&  <PlanViewJumbo Refreshkey={refreshKey} product={product} updateRollTogglefunction={setterJumboUpdateDataFromPlan}/>}
               </div>
               
             </ComponentCard4>
             </React.Fragment>
              })
            }
          </TabPane>
          <TabPane tabId="4">
                <Table responsive size="sm">
                  <thead>
                    <tr>
                       <th scope="col"><Button className='my-btn-color'>{"Total Jumbo Rolls => Count : 0, Qty : 0 m"}</Button></th>
                       <th scope="col"><Button className='my-btn-color-red'>{"Total Small Rolls => Count : 0, Qty : 0 m"}</Button></th>
                    </tr>
                  </thead>
                  
                </Table>
                {line4?.length <1 ? <div className="my-btn-color-temp"  style={{background: 'aliceblue',textAlign:'center',border: '2px solid black',color:'black',marginBottom:'2px',padding:'40px'}}>
                    <div>
                      <i className="bi bi-emoji-frown" style={{fontSize:'25px',color:'black'}}/>
                    </div>
                    No item on this production line.
               </div>:line4.map((product)=>{
                return <React.Fragment key={product.id}>
                
            
            <ComponentCard4>

              <div className='table-margin'>
               <Table className='table-margin-zero' responsive size="sm">
                  <thead>
                    <tr>
                      <th scope="col">
                        <div>{CustomerName(product.customer_id)}  
                          <button type="button" style={{background:'rgb(28 81 28)',color:'white',borderRadius:'7px'}}>Product({product.product_id})</button>
                            {(product?.product_details.is_online_product !== '0' || product?.product_details.ref_product_id !== '0') && <button type='button' style={{padding:'1px',background: '#B33C12',borderRadius:'5px',marginLeft:'5px',marginRight:'20px',color:'white'}}>online product</button>}
                            {product?.product_details.is_online_product !== '0' && product?.product_details.ref_product_id === '0' && <button type='button' style={{padding:'1px',background: '#B33C12',borderRadius:'5px',marginLeft:'5px',marginRight:'20px',color:'white'}}>front side</button>}
                            {product?.product_details.is_online_product === '0' && product?.product_details.ref_product_id !== '0' && <button type='button' style={{padding:'1px',background: '#B33C12',borderRadius:'5px',marginLeft:'5px',marginRight:'20px',color:'white'}}>back side</button>}
                        </div>
                        <div>Delivery Date :{ formatDate(product.created_at)}, Total : {product.quantity} | Total : API missing | Remaining : API missing </div>
                        </th>
                      <th scope="col"><Button className='my-btn-color' onClick={()=>setterJumboDataFromPlan(product)}>Create Jumbo Roll</Button></th>
                      <th scope="col"><Button className='my-btn-color-red' onClick={()=>setterPasteDataFromPlan(product)}>Paste Consumption</Button></th>
                      <th scope="col"><Button className='my-btn-color-red'>Manage daily Usage</Button></th>
                      <th scope="col"><Button className='my-btn-color-red' onClick={()=>LabReport(product)}>Lab Report</Button></th>
                      <th scope="col"><Button className='my-btn-mo-color'>More</Button></th>

                    </tr>
                  </thead>
                  
                </Table>

                <PlanViewProduct productID ={product.product_id}/>
              
                
                <Table responsive size="sm">
                  <thead>
                    <tr>
                      <th scope="col">Pre Skin</th>
                      <th scope="col">Skin</th>
                      <th scope="col">Top Coat</th>
                      <th scope="col">Filler In Top Coat</th>
                      <th scope="col">Foam</th>
                      <th scope="col">Filler In Foam</th>
                      <th scope="col">Adhesive</th>
                      <th scope="col">Filler In Adhesive</th>
                      <th scope="col">Final GSM</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{product.pre_skin}</td>
                      <td>{product.skin} gsm</td>
                      <td>{product.top_coat}</td>
                      <td>{product.filler_in_top_coat}</td>
                      <td>{product.foam} gsm</td>
                      <td>{product.filler_in_foam} PHR</td>
                      <td>{product.adhesive} gsm</td>
                      <td>{product.filler_in_adhesive} PHR</td>
                      <td>{product.final_gsm} gsm</td>
                    </tr>
                  
                  </tbody>
                </Table>
                  {activeTab === '1' &&  <PlanViewJumbo Refreshkey={refreshKey} product={product} updateRollTogglefunction={setterJumboUpdateDataFromPlan}/>}
               </div>
               
             </ComponentCard4>
             </React.Fragment>
              })
            }
          </TabPane>
        </TabContent>
      </ComponentCard>
    </>
  );
};

export default JumbotronComponent;
