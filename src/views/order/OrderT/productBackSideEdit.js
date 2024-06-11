import React, {useEffect,useState} from 'react';
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
import PropTypes from 'prop-types';
import {useNavigate} from 'react-router-dom';

const ProductBackSideEdit = ({ orderTemplateID,productIdOfParent,frontSidedata,data1, data3, data4,data6, data7, data8 }) => {
  const navigate= useNavigate();
  const [items, setItems] = React.useState([]);
  const [errorMessageFromApi, setErrorMessageFromApi] = useState([]);
  const [errors, setErrors] = useState({});

  const [formDatas, setFormDataS] = React.useState({
    grain: 'x',
    fabricId: '0',
    fabricColorId: '0',
    qualityId: 'x',
    colorId: 'x',
    hsnId: '0',
    quantity: '0',
    PricePerUnit: '0',
    Thickness: '0',
    TaxRate: '0',
    deliveryDate: '00-00-0000',
    CustomerItemRefernce: '',

    Topcoat:'',
    FoamI:'',
    FillerInFoamI:'',
    FoamII:'',
    FillerInFoamII:'',
    Adhesive:'',
    FillerInAdhesive:'',
    FinalGsm:'',
    productprints:[{ design_id: 'x', shade_id: 'x' }],
    productadditionaltreatments:[{description: ''}]
    
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('hi')
    setFormDataS(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const addItem = () => {
    const newItems = items.slice();
    newItems.push({ id: 'z' });
    setItems(newItems);
  };

  const removeItem = index => {
    const newItems = items.slice();
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const addItem1 = () => {
    const newItems = formDatas.productprints.slice();
    newItems.push({ design_id: 'x', shade_id: 'x' });
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
    const newItems = formDatas.productadditionaltreatments.slice();
    newItems.push({ description: '' });
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
    const { name, value } = event.target;
    const newItems = items.slice();
    newItems[index][name] = value;
    setItems(newItems);
  };

  const handleInputChange1 = (index, event) => {
    const { name, value } = event.target;
    const newItems = formDatas.productprints.slice();
    newItems[index][name] = value;
    setFormDataS(prevState => ({
      ...prevState,
      productprints: newItems
    }));
  };

  const handleInputChange2 = (index, event) => {
    const { name, value } = event.target;
    const newItems = formDatas.productadditionaltreatments.slice();
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

       

       console.log('orderTemplateID',orderTemplateID);
        // console.log('dataX',formDatas);
        const filtered = items.filter((temp)=>{
          return temp.id !== 'z';
        });
        const filtered1 = formDatas.productprints.filter((temp)=>{
          return  (temp.design_id !== 'x') &&  (temp.shade_id !== 'x');
        });
        const filtered2 = formDatas.productadditionaltreatments.filter((temp)=>{
          return temp.description !== '';
        });

        const csvString = filtered.map(item => item.id).join(', ');
        console.log('csvString',csvString);

        // const filtered1 = formDatas.CompanyDocuments.filter((temp)=>{
        //   return temp.name !== '';
        // });

        console.log('formdataX',formDatas);
        console.log('filtered',filtered);
        console.log('filtered1',filtered1);
        console.log('filtered2',filtered2);


        const token = localStorage.getItem('userToken');
        const response = await fetch(`https://factory.teamasia.in/api/public/products/${formDatas.resultId}`, {
            method: "PUT",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
           
            body: JSON.stringify({
              order_id:'0',
              template_id:formDatas.orderTemplateId,
              grain_id: formDatas.grain,
              fabric_id: frontSidedata.fabricId,
              fabric_color_id: frontSidedata.fabricColorId,
              quality_id: formDatas.qualityId,
              color_id: formDatas.colorId,
              hsn_id: formDatas.hsnId,

              quantity: frontSidedata.quantity,
              price: frontSidedata.PricePerUnit,
              thickness: frontSidedata.Thickness,
              tax_rate: frontSidedata.TaxRate,
              delivery_date: formDatas.deliveryDate,
              customer_item_reference:frontSidedata.CustomerItemRefernce,

              topcoat: formDatas.Topcoat,
              foam_1: formDatas.FoamI,
              filler_in_foam_1: formDatas.FillerInFoamI,
              foam_2: formDatas.FoamII,
              filler_in_foam_2: formDatas.FillerInFoamII,
              adhesive: formDatas.Adhesive,
              filler_in_adhesive: formDatas.FillerInAdhesive,
              final_gsm: formDatas.FinalGsm,



              is_factory_surplus_product: '0',
              is_online_product: '0',
              is_trashed:  '0',
              emboss_ids: csvString,
              product_print: filtered1,
              product_additional_treatment: filtered2,
              ref_product_id:productIdOfParent
            }),
        });

        const datas = await response.json();
        console.log("dataapi",datas,response.status);
        if (response.status === 200) {
          navigate(-1);
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

  


  // ... repeat for other fields ...

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

    setFormDataS(prevState => ({
      ...prevState,
      [name]: value
    }));

    // console.log('e',e.target.options[e.target.selectedIndex].text);
    console.log('e',e.target.value);
  };

  useEffect(() => {
    const fetchData8 = async () => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch(`https://factory.teamasia.in/api/public/products/?ref_product_id=${productIdOfParent}`, {
        method: 'GET', 
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      // console.log('result',response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const resultjson = await response.json();
      const result = resultjson.products[0];
      if(result){
        const embossArray = result.emboss_ids.split(',');
        if(embossArray.length !== 0 && embossArray[0] !== ''){
          setItems(embossArray.map((em)=>({'id':em})));
        }
        setFormDataS(prevState => ({
          ...prevState,
            orderId:result.order_id,
            orderTemplateId:result.template_id,
            resultId:result.id,
            grain: result.grain_id,
            fabricId: result.fabric_id,
            fabricColorId: result.fabric_color_id,
            qualityId: result.quality_id,
            colorId: result.color_id,
            hsnId: result.hsn_id,
            quantity: result.quantity,
            PricePerUnit: result.price,
            Thickness: result.price,
            TaxRate: result.tax_rate,
            deliveryDate: result.delivery_date,
            CustomerItemRefernce: result.customer_item_reference,
            Topcoat:result.topcoat,
            FoamI:result.foam_1,
            FillerInFoamI:result.filler_in_foam_1,
            FoamII:result.foam_2,
            FillerInFoamII:result.filler_in_foam_2,
            Adhesive:result.adhesive,
            FillerInAdhesive:result.filler_in_adhesive,
            FinalGsm:result.final_gsm,
  
            isFactorySurplusProduct:result.is_factory_surplus_product,
            isOnlineProduct:result.is_online_product,
            isTrashed:result.is_trashed,
            productIdOfParent:result.ref_product_id,  
            productprints:result.productprints,
            productadditionaltreatments:result.productadditionaltreatments
        })

      )
      }
      console.log("response in Productedit",result,resultjson.products[0]);
      
    };
    fetchData8();
  },[]);

  return (
    <div>
      <Row>
        <Col md="12">
          <Card>
            <CardTitle tag="h4" className="border-bottom bg-primary p-3 mb-0 text-white">
              Back Side
            </CardTitle>
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

                  <Col md="10">
                    <FormGroup>
                      <Label>Quality</Label>
                      <Input type="select" 
                         name="qualityId" 
                         value={formDatas.qualityId}
                        onChange={handleTypeChange}
                        className={errors.qualityId ? "is-invalid" : ""}
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

                 

               
                 <Col md="10" >
                   <FormGroup>
                     <Label>Topcoat</Label>
                     <Input type="text" 
                     name="Topcoat" 
                     id="name"
                     placeholder="Enter name" 
                     value={formDatas.Topcoat}
                     onChange={handleChange} 
                      />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 <Col md="10" >
                   <FormGroup>
                     <Label>Foam I</Label>
                     <Input type="text" 
                     name="FoamI" 
                     id="name"
                     placeholder="Enter name" 
                     value={formDatas.FoamI}
                     onChange={handleChange} 
                      />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 <Col md="10" >
                   <FormGroup>
                     <Label>Filler In Foam I</Label>
                     <Input type="text" 
                     name="FillerInFoamI" 
                     id="name"
                     placeholder="Enter name" 
                     value={formDatas.FillerInFoamI}
                     onChange={handleChange} 
                      />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 <Col md="10" >
                   <FormGroup>
                     <Label>Foam II</Label>
                     <Input type="text" 
                     name="FoamII" 
                     id="name"
                     placeholder="Enter name" 
                     value={formDatas.FoamII}
                     onChange={handleChange} 
                      />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 <Col md="10" >
                   <FormGroup>
                     <Label>Filler In Foam II</Label>
                     <Input type="text" 
                     name="FillerInFoamII" 
                     id="name"
                     placeholder="Enter name" 
                     value={formDatas.FillerInFoamII}
                     onChange={handleChange} 
                      />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 <Col md="10" >
                   <FormGroup>
                     <Label>Adhesive</Label>
                     <Input type="text" 
                     name="Adhesive" 
                     id="name"
                     placeholder="Enter name" 
                     value={formDatas.Adhesive}
                     onChange={handleChange} 
                      />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>
                 <Col md="10" >
                   <FormGroup>
                     <Label>Filler In Adhesive</Label>
                     <Input type="text" 
                     name="FillerInAdhesive" 
                     id="name"
                     placeholder="Enter name" 
                     value={formDatas.FillerInAdhesive}
                     onChange={handleChange} 
                      />
                     <FormText className="muted"></FormText>
                   </FormGroup>
                 </Col>

                 <Col md="10" >
                   <FormGroup>
                     <Label>Final Gsm</Label>
                     <Input type="text" 
                     name="FinalGsm" 
                     id="name"
                     placeholder="Enter name" 
                     value={formDatas.FinalGsm}
                     onChange={handleChange} 
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
                              <Button type="button" className='btn-success' onClick={addItem}>Add More</Button>
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
                              <Button type="button" className='btn-success' onClick={addItem1}>Add More</Button>
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
                              <Button type="button" className='btn-success' onClick={addItem2}>Add More</Button>
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
                 <Col md="4">
                   <FormGroup>
                    <Button type="submit" className="btn my-btn-color" style={{marginTop:"28px"}}>
                        Submit
                    </Button>
                   </FormGroup>
                 </Col>
               </Row>
               
              
             </Form>
             
             
           </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductBackSideEdit;
ProductBackSideEdit.propTypes = {
  
  orderTemplateID: PropTypes.string.isRequired,
  productIdOfParent:PropTypes.string.isRequired,
  frontSidedata: PropTypes.object.isRequired,
  data1: PropTypes.array.isRequired,
  data3: PropTypes.array.isRequired,
  data4: PropTypes.array.isRequired,
  data6: PropTypes.array.isRequired,
  data7: PropTypes.array.isRequired,
  data8: PropTypes.array.isRequired
};