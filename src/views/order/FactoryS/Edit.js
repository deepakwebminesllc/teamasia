import React,{useEffect,useState} from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Button,

} from 'reactstrap';
// import { useParams } from 'react-router-dom';
import {useNavigate,useLocation} from 'react-router-dom';
import ProductBackSideEdit from './productBackSideEdit';

// import ComponentCard from '../../components/ComponentCard';

const Edit = () => {
    const location = useLocation();
    const   {
      id,
      order_id:orderId,
      template_id:templateId,
      grain_id:grain,
      fabric_id:fabricId,
      fabric_color_id:fabricColorId,
      quality_id:qualityId,
      color_id:colorId,
      hsn_id:hsnId,
      quantity,
      price,
      thickness:Thickness,
      tax_rate:TaxRate,
      topcoat:Topcoat,
      foam_1:FoamI,
      filler_in_foam_1:FillerInFoamI,
      foam_2:FoamII,
      filler_in_foam_2:FillerInFoamII,
      adhesive:Adhesive,
      filler_in_adhesive:FillerInAdhesive,
      final_gsm:FinalGsm,

      delivery_date:deliveryDate,
      customer_item_reference:CustomerItemRefernce,
      is_factory_surplus_product: isFactorySurplusProduct,
      is_online_product:isOnlineProduct,
      is_trashed:isTrashed,
      emboss_ids:embossIds,
      productadditionaltreatments,
      productprints,  
  }  = location.state.item;
  console.log('local XXXX',productadditionaltreatments,productprints)
  const {data1,data2,data3,data4,data5} = location.state;
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  const [data6, setData6] = useState([]);
  const [data7, setData7] = useState([]);
  const [data8, setData8] = useState([]);
  const [dataX, setDataX] = useState([]);
  const [errorMessageFromApi, setErrorMessageFromApi] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitBlock, setsubmitBlock] = useState(false);

  const [formDatas, setFormDataS] = useState({
    grain,
    fabricId,
    fabricColorId,
    qualityId,
    colorId,
    hsnId,
    
    quantity,
    PricePerUnit:price,

    Thickness,
    TaxRate,
    Topcoat,
    FoamI,
    FillerInFoamI,
    FoamII,
    FillerInFoamII,
    Adhesive,
    FillerInAdhesive,
    FinalGsm,
    isTrashed,
    deliveryDate,
    CustomerItemRefernce,
    isFactorySurplusProduct,
    isOnlineProduct,
    productprints, 
    productadditionaltreatments,
  });


// console.log('local',id,location.state);

// const checkboxclick1 = () => {
//   console.log('isonline',formDatas.isOnlineProduct);
//     setFormDataS(prevState => ({
//       ...prevState,
//       isOnlineProduct: formDatas.isOnlineProduct === '0' ? '1':'0'
//     }));
// };

const handleChange = (e) => {
  const { name, value } = e.target;
  console.log('hi')
  setFormDataS(prevState => ({
    ...prevState,
    [name]: value
  }));
};

 console.log("items in edit factorysurplus",items,embossIds);

 const addItem = () => {
  console.log('mega',items);
  const newItems = items.slice();
  newItems.push({id:'z'});
  console.log('mega',newItems);
  setItems(newItems);
};

const removeItem = index => {
  const newItems = items.slice();
  newItems.splice(index, 1);
  setItems(newItems);
};
const addItem1 = () => {
  const newItems = formDatas.productprints.slice();
  newItems.push({design_id:'x',shade_id:'x'})
  console.log('mega',newItems);
  setFormDataS(prevState => ({
    ...prevState,
    productprints: newItems
  }));

};

const removeItem1 = index => {
  const newItems = formDatas.productprints.slice();
  newItems.splice(index, 1);
  setFormDataS(prevState => ({
    ...prevState,
    productprints: newItems
  }));
  
};

const addItem2 = () => {
  console.log('mega',items);
  const newItems = formDatas.productadditionaltreatments.slice();
  newItems.push({description:''})
  console.log('mega',newItems);
  setFormDataS(prevState => ({
    ...prevState,
    productadditionaltreatments: newItems
  }));
};

const removeItem2 = index => {
  const newItems = formDatas.productadditionaltreatments.slice();
  newItems.splice(index, 1);
  setFormDataS(prevState => ({
    ...prevState,
    productadditionaltreatments: newItems
  }));
};

 const handleInputChange = (index, event) => {
   const {name,value} = event.target;
    const newItems = items.slice();
    console.log("data",index,name,value,newItems);
    newItems[index][name] = value;
    setItems(newItems);
  };

  const handleInputChange1 = (index, event) => {
    const {name,value} = event.target;
    const newItems = formDatas.productprints.slice();
    console.log("data1xxxxxxxx",index,name,value,newItems);
    newItems[index][name] = value;
    setFormDataS(prevState => ({
      ...prevState,
      productprints: newItems
    }));
  };

  const handleInputChange2 = (index, event) => {
    const {name,value} = event.target;
    const newItems = formDatas.productadditionaltreatments.slice();
    console.log("data2",index,name,value,newItems);
    newItems[index][name] = value;
    setFormDataS(prevState => ({
      ...prevState,
      productadditionaltreatments: newItems
    }));
  };

  const closer =()=>{
    setErrorMessageFromApi([]);
  }

  async function apiCall() {
    try {

        console.log('item',items);
    

        console.log('XXXXX',id);
        // console.log('dataX',formDatas);
        const filtered = items.filter((temp)=>{
          return temp.id !== 'z';
        });

        const csvString = filtered.map(item => item.id).join(', ');
        console.log('csvString',csvString);

        // const filtered1 = formDatas.CompanyDocuments.filter((temp)=>{
        //   return temp.name !== '';
        // });
        const filtered2 = formDatas.productadditionaltreatments.filter((temp)=>{
          return temp.description !== '';
        });

        console.log('formdataXxxxx',formDatas);
        console.log('filtered',filtered);
      


        const token = localStorage.getItem('userToken');
        const response = await fetch(`https://factory.teamasia.in/api/public/products/${id}`, {
            method: "PUT",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
           
            body: JSON.stringify({
              order_id:orderId,
              template_id:templateId,
              grain_id: formDatas.grain,
              fabric_id: formDatas.fabricId,
              fabric_color_id: formDatas.fabricColorId,
              quality_id: formDatas.qualityId,
              color_id: formDatas.colorId,
              hsn_id: formDatas.hsnId,
              quantity: formDatas.quantity,
              price: formDatas.PricePerUnit,
              thickness: formDatas.Thickness,
              tax_rate: formDatas.TaxRate,
              delivery_date:formDatas.deliveryDate,
              customer_item_reference:formDatas.CustomerItemRefernce,

              topcoat: formDatas.Topcoat,
              foam_1: formDatas.FoamI,
              filler_in_foam_1: formDatas.FillerInFoamI,
              foam_2: formDatas.FoamII,
              filler_in_foam_2: formDatas.FillerInFoamII,
              adhesive: formDatas.Adhesive,
              filler_in_adhesive: formDatas.FillerInAdhesive,
              final_gsm: formDatas.FinalGsm,

              is_factory_surplus_product:formDatas.isFactorySurplusProduct,
              is_online_product: formDatas.isOnlineProduct,
              is_trashed: formDatas.isTrashed,
              emboss_ids: csvString,
              product_print: formDatas.productprints,
              product_additional_treatment: filtered2,
            }),
        });

        const datas = await response.json();
        console.log("dataapi",datas,response.status);
        if (response.status === 200) {
          if(formDatas.isOnlineProduct === '0'){
            navigate(-1)
          }
          setsubmitBlock(true);
          console.log('this is product edit ,so "product is added successfully ,please use this product id as ref_id in back side product" is not valid')
        } else {
          console.error("Authentication failed:", Object.values(datas.messages.errors));
          if (datas.error) {
            setErrorMessageFromApi(Object.values(datas.messages.errors));
          }
        }  
        return null;
      } catch (error) {
        console.log('error',error);
         setErrorMessageFromApi(["Network error"]);
        return null;
      }
}

const validateForm = () => {
  let formIsValid = true;
  const errors1 = {};

  if(formDatas.grain === 'x') {
    formIsValid = false;
    // eslint-disable-next-line dot-notation
    errors1["grain"] = "Please select a grain.";
  }

  if(formDatas.fabricId === 'x') {
    formIsValid = false;
    // eslint-disable-next-line dot-notation
    errors1["fabricId"] = "Please select a fabric.";
  }
  if(formDatas.qualityId === 'x') {
    formIsValid = false;
    // eslint-disable-next-line dot-notation
    errors1["qualityId"] = "Please select a quality.";
  }
  if(formDatas.colorId === 'x') {
    formIsValid = false;
    // eslint-disable-next-line dot-notation
    errors1["colorId"] = "Please select a color.";
  }
  if(formDatas.hsnId === 'x') {
    formIsValid = false;
    // eslint-disable-next-line dot-notation
    errors1["hsnId"] = "Please select a hsn.";
  }

  setErrors(errors1);
  return formIsValid;
};


const handleSubmit = async (event) => {
  event.preventDefault();
  if(validateForm()) {
    console.log('Form is valid, proceed with API call');
    apiCall();
  } else {
    console.log('Form is invalid, do not submit');
  }

};

  const handleTypeChange = (e) => {
    const { name, value } = e.target;
    // setSelectedType(e.target.value);
    console.log('element',value,data2);
    setFormDataS(prevState => ({
      ...prevState,
      [name]: value
    }));

    if(name === 'fabricId'){
      const element = data2.filter(item => item.id === value);
      console.log('element',value,data2,element);
      console.log('element',data2,element[0].fabriccolors[0]);
      setDataX(element[0].fabriccolors);
      setFormDataS(prevState => ({
        ...prevState,
        fabricColorId : element[0].fabriccolors[0].id
      }));
    }
    
   
   
    
    // console.log('e',e.target.options[e.target.selectedIndex].text);
    console.log('e',e.target.value);
  };

  useEffect(() => {
    
    const fetchData2 = async () => {    
      const resultFabric = data2.filter((item)=>(
        item.id === formDatas.fabricId
      ));
      
      if(resultFabric.length === 0){
        setFormDataS(prevState => ({
          ...prevState,
          fabricId: 'x',
          fabricColorId:'x'
        }));
      }

      if(resultFabric.length >0){
        console.log('robo',resultFabric[0].fabriccolors);
        setDataX(resultFabric[0].fabriccolors);
      }
      
      const embossArray = embossIds.split(',');
      if(embossArray.length !== 0 && embossArray[0] !== ''){
        setItems(embossArray.map((em)=>({'id':em})));
      }
    };

    const fetchData6 = async () => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch('https://factory.teamasia.in/api/public/embosses', {
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
      const resultX = result.embosses.slice();
      resultX.push({id:'z',name:'Choose'});
      setData6(resultX);
    };
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
      resultX.push({id:'x',design_id:'x',code:'Choose'});
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
      // console.log("responsejsonXY",formDatas);
      const resultX = result.shades.slice();
      resultX.push({id:'x',shade_id:'x',name:'Choose'});
      setData8(resultX);
    };
    fetchData8();
    fetchData7();
    fetchData6();
    fetchData2();
  },[]);
  




  return (
<div>
     
     <Row>
       <Col md="12">
         <Card>
           <CardTitle tag="h4" className="border-bottom bg-primary p-3 mb-0 text-white">
           </CardTitle>
           <CardBody className="bg-light">
             <CardTitle tag="h4" className="mb-0">
             </CardTitle>
           </CardBody>
           <CardBody>
             <Form onSubmit={handleSubmit}>
               <Row>
               <Col md="9">{errorMessageFromApi.length !== 0 && (
                      <div style={{ background:'#ff9c7a',color: 'black', marginBottom: '10px', padding:"5px 10px"}}>
                        <div style={{display:'flex',justifyContent:'space-between'}}>
                          Following errors were found:
                          <span onClick={closer} style={{cursor:'pointer'}}>X</span>
                        </div>
                        <ul>
                          {errorMessageFromApi.map((item)=>
                          <li>
                              {item}
                          </li>
                          )}
                        </ul>
                      </div>
                    )}
                  </Col>
                  
                  <Col md="10" className=''>
                    <FormGroup>
                      <Label>Grain</Label>
                      <Input type="select" 
                         name="grain" 
                         value={formDatas.grain}
                        onChange={handleTypeChange}
                        className={errors.grain ? "is-invalid" : ""}
                        disabled={submitBlock}
                        >
                           {data1.map((item)=>{
   
                             return <option key={item.id} value={item.id}>{item.name}</option>
                           })}
                      </Input>
                      {errors.grain && (
                        <FormText className="text-danger">{errors.grain}</FormText>
                      )}
                      
                    </FormGroup>
                  </Col>

                 <Col md="5">
                    <FormGroup>
                      <Label>Fabric</Label>
                      <Input type="select" 
                         name="fabricId" 
                         value={formDatas.fabricId}
                        onChange={handleTypeChange}
                        className={errors.fabricId ? "is-invalid" : ""}
                        disabled={submitBlock}
                        >
                           {data2.map((item)=>{
   
                             return <option key={item.id} value={item.id}>{item.name}</option>
                           })}
                      </Input>
                      {errors.fabricId && (
                        <FormText className="text-danger">{errors.fabricId}</FormText>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="5">
                    <FormGroup>
                      <Label>Fabric Color</Label>
                      <Input type="select" 
                         name="fabricColorId" 
                         value={formDatas.fabricColorId}
                        onChange={handleTypeChange}
                        disabled={submitBlock}
                        >
                           {dataX.map((item)=>{
                             return <option key={item.id} value={item.id}>{item.name}</option>
                           })}
                      </Input>
                      
                    </FormGroup>
                  </Col>

                  <Col md="10">
                    <FormGroup>
                      <Label>Quality</Label>
                      <Input type="select" 
                         name="qualityId" 
                         value={formDatas.qualityId}
                        onChange={handleTypeChange}
                        className={errors.qualityId ? "is-invalid" : ""}
                        disabled={submitBlock}
                        >
                           {data3.map((item)=>{
   
                             return <option key={item.id} value={item.id}>{item.name}</option>
                           })}
                      </Input>
                      {errors.qualityId && (
                        <FormText className="text-danger">{errors.qualityId}</FormText>
                      )}
                    </FormGroup>
                  </Col>

                  <Col md="10">
                    <FormGroup>
                      <Label>Color</Label>
                      <Input type="select" 
                         name="colorId" 
                         value={formDatas.colorId}
                        onChange={handleTypeChange}
                        className={errors.colorId ? "is-invalid" : ""}
                        disabled={submitBlock}
                       >
                           {data4.map((item)=>{
   
                             return <option key={item.id} value={item.id}>{item.name}</option>
                           })}
                      </Input>
                      {errors.colorId && (
                        <FormText className="text-danger">{errors.colorId}</FormText>
                      )}
                    </FormGroup>
                  </Col>

                  <Col md="10">
                    <FormGroup>
                      <Label>HSN Code</Label>
                      <Input type="select" 
                         name="hsnId" 
                         value={formDatas.hsnId}
                        onChange={handleTypeChange}
                        className={errors.hsnId ? "is-invalid" : ""}
                        disabled={submitBlock}
                        >
                           {data5.map((item)=>{
   
                             return <option key={item.id} value={item.id}>{item.name}</option>
                           })}
                      </Input>
                      {errors.hsnId && (
                        <FormText className="text-danger">{errors.hsnId}</FormText>
                      )}
                    </FormGroup>
                  </Col>

                  <Col md="10" >
                   <FormGroup>
                     <Label>Quantity (in meters)</Label>
                     <Input type="text" 
                     name="quantity" 
                     id="name"
                     placeholder="Enter name" 
                     value={formDatas.quantity}
                     onChange={handleChange}
                     disabled={submitBlock} 
                      />
                     
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>

                 <Col md="10" >
                   <FormGroup>
                     <Label>Price Per Unit (Inclusive of Tax)</Label>
                     <Input type="text" 
                     name="PricePerUnit" 
                     id="name"
                     placeholder="Enter name" 
                     value={formDatas.PricePerUnit}
                     onChange={handleChange} 
                     disabled={submitBlock}
                      />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 <Col md="10" >
                   <FormGroup>
                     <Label>Thickness (in mm)</Label>
                     <Input type="text" 
                     name="Thickness" 
                     id="name"
                     placeholder="Enter name" 
                     value={formDatas.Thickness}
                     onChange={handleChange} 
                     disabled={submitBlock}
                      />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 <Col md="10" >
                   <FormGroup>
                     <Label>Tax Rate (in %)</Label>
                     <Input type="text" 
                     name="TaxRate" 
                     id="name"
                     placeholder="Enter name" 
                     value={formDatas.TaxRate}
                     onChange={handleChange} 
                     disabled={submitBlock}
                      />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 <Col md="10" >
                   <FormGroup>
                     <Label>Delivery Date</Label>
                     <Input type="date" 
                     name="deliveryDate" 
                     id="name"
                     placeholder="Enter name" 
                     value={formDatas.deliveryDate}
                     onChange={handleChange} 
                     disabled={submitBlock}
                      />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 <Col md="10" >
                   <FormGroup>
                     <Label>Customer Item Reference</Label>
                     <Input type="text" 
                     name="CustomerItemRefernce" 
                     id="name"
                     placeholder="Enter name" 
                     value={formDatas.CustomerItemRefernce}
                     onChange={handleChange}
                     disabled={submitBlock} 
                      />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 

                 <Row>
                  <Col md="8">
                    <Label>Embosses</Label>
                  </Col>
                  <table className="table">        
                     <thead>
                        <tr>
                          <Row>
                            <Col md="8"><th className='noborder'>Embosses</th></Col>
                            <Col md="2">
                              <Button type="button" className='btn-success' onClick={addItem} disabled={submitBlock}>Add More</Button>
                            </Col>
                          </Row>
                        </tr>
                      </thead>
          
                    <tbody>
                    {items.map((item, index) => (
                        <tr key={item.index}>
                          <Row>
                            <Col md="8">
                              <Input type="select" 
                                name="id" 
                                value={item.id}
                                onChange={e => handleInputChange(index, e)}>
                                  {data6.map((itemdata)=>{
          
                                    return <option key={itemdata.id} value={itemdata.id}>{itemdata.name}</option>
                                  })}
                              </Input>
                            </Col>
                            
                            <Col md="2"><button type="button"  style={{ backgroundColor:"red",marginTop:"5px"}} onClick={() => removeItem(index)}>X</button></Col>
                          </Row>
                          
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Row>

                


               <Row>
                  <Col md="8">
                    <Label>Prints</Label>
                  </Col>
                    <table className="table">        
                     <thead>
                        <tr>
                          <Row>
                            <Col md="4"><th className='noborder'>Designs</th></Col>
                            <Col md="4"><th className='noborder'>Shades</th></Col>
                            <Col md="2">
                              <Button type="button" className='btn-success' onClick={addItem1} disabled={submitBlock}>Add More</Button>
                            </Col>
                          </Row>
                        </tr>
                      </thead>
          
                    <tbody>
                    {formDatas.productprints.map((item, index) => (
                        <tr key={item.index}>
                          <Row>
                            <Col md="4">
                              <Input type="select" 
                                name="design_id" 
                                value={item.design_id}
                                onChange={e => handleInputChange1(index, e)}>
                                  {data7.map((itemdata)=>{
          
                                    return <option key={itemdata.id} value={itemdata.id}>{itemdata.code}</option>
                                  })}
                              </Input>
                            </Col>
                            <Col md="4">
                              <Input type="select" 
                                  name="shade_id" 
                                  value={item.shade_id}
                                  onChange={e => handleInputChange1(index, e)}>
                                    {data8.map((itemdata)=>{
            
                                      return <option key={itemdata.id} value={itemdata.id}>{itemdata.name}</option>
                                    })}
                              </Input>
                            </Col>
                            <Col md="2"><button type="button"  style={{ backgroundColor:"red",marginTop:"5px"}} onClick={() => removeItem1(index)} disabled={index === 0}>X</button></Col>
                          </Row>
                          
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Row>

                <Row>
                  <Col md="8">
                    <Label>Additional Treatments</Label>
                  </Col>
                  <table className="table">        
                     <thead>
                        <tr>
                          <Row>
                            <Col md="8"><th className='noborder'>Additional Treatments</th></Col>
                            <Col md="2">
                              <Button type="button" className='btn-success' onClick={addItem2} disabled={submitBlock}>Add More</Button>
                            </Col>
                          </Row>
                        </tr>
                      </thead>
          
                    <tbody>
                    {formDatas.productadditionaltreatments.map((item, index) => (
                        <tr key={item.id}>
                          <Row>
                            <Col md="8"><Input name="description" value={item.description} type="text" onChange={e => handleInputChange2(index, e)} placeholder="" /></Col>
                            <Col md="2"><button type="button"  style={{ backgroundColor:"red",marginTop:"5px"}} onClick={() => removeItem2(index)}>X</button></Col>
                          </Row>
                          
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Row>

                <Col md="10">
                          <FormGroup>
                            {/* <Input type="checkbox" checked={ DefaultToFactoryStock === '1'} onChange={checkboxclick()}  /> */}
                            <Input type="checkbox" checked={formDatas.isOnlineProduct === '1'}  disabled={submitBlock} />
                            <Label className='mx-1'> This is a online product</Label>
                            <FormText className="muted"></FormText>
                          </FormGroup>
                </Col>

                 <Col md="4">
                   <FormGroup>
                    <Button type="submit" className="btn my-btn-color" style={{marginTop:"28px"}}
                     disabled={submitBlock}>
                        Submit
                    </Button>
                   </FormGroup>
                 </Col>
               </Row>
               
              
             </Form>
             
             {
              formDatas.isOnlineProduct === '1'? <ProductBackSideEdit productIdOfParent={id} frontSidedata={formDatas} data1={data1} data2={data2} data3={data3} data4={data4} data5={data5} data6={data6} data7={data7} data8={data8} />:''
             }
           </CardBody>
         </Card>
       </Col> 
     </Row>
     
   </div>

   
   
  );
};

export default Edit;