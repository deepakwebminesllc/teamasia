import React, {useState} from 'react';
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

const ProductBackSideAdd = ({ orderID,refproductidforParent,FrontSubmitBlock, frontSidedata,data1, data3, data4, data5, data6, data7, data8 }) => {
  const navigate= useNavigate();
  const [items, setItems] = React.useState([]);
  const [items1, setItems1] = React.useState([{ design_id: 'x', shade_id: 'x' }]);
  const [items2, setItems2] = React.useState([]);
  const [errorMessageFromApi, setErrorMessageFromApi] = useState([]);
  const [errors, setErrors] = useState({});

  console.log('refproductidforParent',refproductidforParent);
  const [formDatas, setFormDataS] = React.useState({
    grain: 'x',
    fabricId: '0',
    fabricColorId: '0',
    qualityId: 'x',
    colorId: 'x',
    hsnId: 'x',
    quantity: '0',
    PricePerUnit: '0',
    Thickness: '0',
    TaxRate: '0',
    deliveryDate: '00-00-0000',
    CustomerItemRefernce: '',
  });

  

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
    const newItems = items1.slice();
    newItems.push({ design_id: 'x', shade_id: 'x' });
    setItems1(newItems);
  };

  const removeItem1 = index => {
    const newItems = items1.slice();
    newItems.splice(index, 1);
    setItems1(newItems);
  };

  const addItem2 = () => {
    const newItems = items2.slice();
    newItems.push({ description: '' });
    setItems2(newItems);
  };

  const removeItem2 = index => {
    const newItems = items2.slice();
    newItems.splice(index, 1);
    setItems2(newItems);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newItems = items.slice();
    newItems[index][name] = value;
    setItems(newItems);
  };

  const handleInputChange1 = (index, event) => {
    const { name, value } = event.target;
    const newItems = items1.slice();
    newItems[index][name] = value;
    setItems1(newItems);
  };

  const handleInputChange2 = (index, event) => {
    const { name, value } = event.target;
    const newItems = items2.slice();
    newItems[index][name] = value;
    setItems2(newItems);
  };

  const closer =()=>{
    setErrorMessageFromApi([]);
  }

  async function apiCall() {
    try {

        console.log('item',items);
        console.log('item1',items1);
        console.log('item2',items2);

        // console.log('orderID is useless',orderID);
        // console.log('dataX',formDatas);
        const filtered = items.filter((temp)=>{
          return temp.id !== 'z';
        });
        const filtered1 = items1.filter((temp)=>{
          return  (temp.design_id !== 'x') &&  (temp.shade_id !== 'x');
        });
        const filtered2 = items2.filter((temp)=>{
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
        const response = await fetch(`https://factory.teamasia.in/api/public/products`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
           
            body: JSON.stringify({
              order_id:orderID,
              template_id:'0',
              grain_id: formDatas.grain,
              fabric_id: frontSidedata.fabricId,
              fabric_color_id: frontSidedata.fabricColorId.id,
              quality_id: formDatas.qualityId,
              color_id: formDatas.colorId,
              hsn_id: formDatas.hsnId,

              quantity: frontSidedata.quantity,
              price: frontSidedata.PricePerUnit,
              thickness: frontSidedata.Thickness,
              tax_rate: frontSidedata.TaxRate,
              delivery_date: frontSidedata.deliveryDate,
              customer_item_reference:frontSidedata.CustomerItemRefernce,

              topcoat: 'temp',
              foam_1: 'temp',
              filler_in_foam_1: 'temp',
              foam_2: 'temp',
              filler_in_foam_2: 'temp',
              adhesive: 'temp',
              filler_in_adhesive: 'temp',
              final_gsm: 'temp',



              is_factory_surplus_product: '0',
              is_online_product: '0',
              is_trashed:  '0',
              emboss_ids: csvString,
              product_print: filtered1,
              product_additional_treatment: filtered2,
              ref_product_id:refproductidforParent
            }),
        });

        const datas = await response.json();
        console.log("dataapi",datas,response.status);
        if (response.status === 201) {
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
  if(formDatas.hsnId === 'x') {
    formIsValid = false;
    // eslint-disable-next-line dot-notation
    errors1["hsnId"] = "Please select a hsn.";
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

                  <Col md="10">
                    <FormGroup>
                      <Label>HSN Code</Label>
                      <Input type="select" 
                         name="hsnId" 
                         value={formDatas.hsnId}
                        onChange={handleTypeChange}
                        className={errors.hsnId ? "is-invalid" : ""}
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
                    {items1.map((item, index) => (
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
                    {items2.map((item, index) => (
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
                    <Button 
                      type="submit" 
                      className="btn my-btn-color" 
                      style={{marginTop:"28px"}}
                      disabled={!FrontSubmitBlock}>
                        Submit
                    </Button>
                   </FormGroup>
                    <div className="text-danger">Note: Please Submit Front Side First</div>
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

export default ProductBackSideAdd;
ProductBackSideAdd.propTypes = {
  
  orderID: PropTypes.string.isRequired,
  refproductidforParent:PropTypes.string.isRequired,
  FrontSubmitBlock: PropTypes.bool.isRequired,
  frontSidedata: PropTypes.object.isRequired,
  data1: PropTypes.array.isRequired,
  data3: PropTypes.array.isRequired,
  data4: PropTypes.array.isRequired,
  data5: PropTypes.array.isRequired,
  data6: PropTypes.array.isRequired,
  data7: PropTypes.array.isRequired,
  data8: PropTypes.array.isRequired
};