import React ,{useState,useEffect} from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Row,
  Col,
  Input,
  Button,
  Table,
  FormText

} from 'reactstrap';

import PropTypes from 'prop-types';
import ComponentCard5 from '../../../components/ComponentCard5';
import 'react-table-v6/react-table.css';

const JumbotronComponent = ({JumboDataFromPlan,modal,toggle,data2,data3,data4,data6}) => {
  const [errorMessageFromApi, setErrorMessageFromApi] = useState([]);
  const [errors,setErrors] = useState({});

  const [formDatas, setFormDataS] = useState({
    items1:[]
  });


console.log('JumboDataFromPlan',JumboDataFromPlan);

 const CancelPaste = ()=>{
  toggle(false);
 }

  const addItem1 = () => {
    const newItems = formDatas.items1.slice();
    console.log("data",newItems);
    newItems.push({ 
      id:'x',
      production_plan_id: JumboDataFromPlan.id,
      line_id: JumboDataFromPlan.line_id,
      order_id: JumboDataFromPlan.order_id,
      product_id: JumboDataFromPlan.product_id,
      jumbo_roll_id:'1',
      consumption_date:'',
      quality_id:'x',
      color_id	:'x',
      vessel_no:'',
      shift:'',
      paste_type_id:'x',
      empty_vessel_weight:'',
      supply_paste_weight:'',
      return_paste_weight:'',
      paste_consumed:'',
      qty_produced :'',
      return_paste:'',
      viscosity_check_time:'',
      standard_viscosity:'',
      observed_viscosity:'',
      standard_gsm	:'',
      actual_gsm:'',
      qa_pe_id:'x',
      remarks:''})
    setFormDataS(prevState => ({
      ...prevState,
      items1: newItems
    }));
  };

  const handleDeleteClick = async (itemId) => {
    try {
      // Call your API endpoint to delete the item
      const token = localStorage.getItem('userToken');
      const response = await fetch(`https://factory.teamasia.in/api/public/pasteconsumptions/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      // Check if the request was successful
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      console.log('Item deleted successfully');
    } catch (error) {
      //only checks for error that are generated by fetch function , and cors 
      console.error('Failed to delete the item', error);
    }
  };

  const removeItem1 = index => {
    const newItems = formDatas.items1.slice();
    if(newItems[index].id !== 'x'){
      handleDeleteClick(newItems[index].id);
    }
    newItems.splice(index, 1);
    setFormDataS(prevState => ({
      ...prevState,
      items1: newItems
    }));
  };

  const handleInputChange1 = (index, e) => {
    const {name,value}  = e.target;
    const newItems = formDatas.items1.slice();
    console.log("data",index,newItems);
    newItems[index][name] =  value;
    console.log('newX',newItems);
    setFormDataS(prevState => ({
      ...prevState,
      items1: newItems
    }));
  };


  
  const closer =()=>{
    setErrorMessageFromApi([]);
  }

  async function apiCall() {
    try {
        const filtered = formDatas.items1.filter((item)=>item.id !== 'x');

        if(filtered.length !== 0){
          console.log('country_id',formDatas);
            const token = localStorage.getItem('userToken');
            const response = await fetch(`https://factory.teamasia.in/api/public/pasteconsumptions/1`, {
                method: "PUT",
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
              
                body: JSON.stringify(filtered),
            });
            const data = await response.json();
            console.log("dataapi",data,response.status);
            if (response.status === 200) {
              CancelPaste();
            } else {
              console.error("Authentication failed:", Object.values(data.messages.errors));
              if (data.error) {
                setErrorMessageFromApi(Object.values(data.messages.errors));
              }
            } 
        }
         
        return null;
    } catch (error) {
      setErrorMessageFromApi(["Network error"]);
        return null;
    }
}
  async function apiCall1() {
    try {
      const filtered = formDatas.items1.filter((item)=>item.id === 'x');

      if(filtered.length !== 0){
        console.log('country_id',formDatas);
          const token = localStorage.getItem('userToken');
          const response = await fetch(`https://factory.teamasia.in/api/public/pasteconsumptions`, {
              method: "POST",
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            
              body: JSON.stringify(filtered),
          });
          const data = await response.json();
          console.log("dataapi",data,response.status);
          if (response.status === 201) {
            CancelPaste();
          } else {
            console.error("Authentication failed:", Object.values(data.messages.errors));
            if (data.error) {
              setErrorMessageFromApi(Object.values(data.messages.errors));
            }
          } 
      }
       
      return null;
  } catch (error) {
    setErrorMessageFromApi(["Network error"]);
      return null;
  }
}

const validateForm=()=>{
  let formIsValid =true;
  const errors1 ={};
  
    formDatas.items1.forEach((element) => {
    console.log('element',element);
    if(element.consumption_date=== ''){
             formIsValid = false;
      // eslint-disable-next-line dot-notation
            errors1["consumption_date"] ="Required"
          }
          if(element.quality_id=== 'x'){
             formIsValid = false;
      // eslint-disable-next-line dot-notation
            errors1["quality_id"] ="Required"
          }
          if(element.color_id	=== 'x'){
             formIsValid = false;
      // eslint-disable-next-line dot-notation
            errors1["color_id"] ="Required"
          }
          if(element.vessel_no=== ''){
             formIsValid = false;
      // eslint-disable-next-line dot-notation
            errors1["vessel_no"] ="Required"
          }
          if(element.shift=== ''){
             formIsValid = false;
      // eslint-disable-next-line dot-notation
            errors1["shift"] ="Required"
          }
          if(element.paste_type_id=== 'x'){
             formIsValid = false;
      // eslint-disable-next-line dot-notation
            errors1["paste_type_id"] ="Required"
          }
          if(element.empty_vessel_weight === ''){
             formIsValid = false;
      // eslint-disable-next-line dot-notation
            errors1["empty_vessel_weight"] ="Required"
          }
          if(element.supply_paste_weight=== ''){
             formIsValid = false;
      // eslint-disable-next-line dot-notation
            errors1["supply_paste_weight"] ="Required"
          }
          if(element.return_paste_weight=== ''){
             formIsValid = false;
      // eslint-disable-next-line dot-notation
            errors1["return_paste_weight"] ="Required"
          }
          if(element.paste_consumed=== ''){
             formIsValid = false;
      // eslint-disable-next-line dot-notation
            errors1["paste_consumed"] ="Required"
          }
          if(element.qty_produced === ''){
             formIsValid = false;
      // eslint-disable-next-line dot-notation
            errors1["qty_produced"] ="Required"
          }
          if(element.return_paste=== ''){
             formIsValid = false;
      // eslint-disable-next-line dot-notation
            errors1["return_paste"] ="Required"
          }
          if(element.viscosity_check_time=== ''){
             formIsValid = false;
      // eslint-disable-next-line dot-notation
            errors1["viscosity_check_time"] ="Required"
          }
          if(element.standard_viscosity=== ''){
             formIsValid = false;
      // eslint-disable-next-line dot-notation
            errors1["standard_viscosity"] ="Required"
          }
          if(element.observed_viscosity=== ''){
             formIsValid = false;
      // eslint-disable-next-line dot-notation
            errors1["observed_viscosity"] ="Required"
          }
          if(element.standard_gsm	=== ''){
             formIsValid = false;
      // eslint-disable-next-line dot-notation
            errors1["standard_gsm"] ="Required"
          }
          if(element.actual_gsm=== ''){
             formIsValid = false;
      // eslint-disable-next-line dot-notation
            errors1["actual_gsm"] ="Required"
          }
          if(element.qa_pe_id=== 'x'){
             formIsValid = false;
      // eslint-disable-next-line dot-notation
            errors1["qa_pe_id"] ="Required"
          }
          
         
      });

  setErrors(errors1);
  return formIsValid;
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(validateForm()) {
      console.log('Form is valid, proceed with API call');
      apiCall();
      apiCall1();
    } else {
      console.log('Form is invalid, do not submit');
    }
};



  console.log('modal',data2);


  useEffect(() => {
    
    // Fetch the data from the API
    const fetchData = async () => {
      const token = localStorage.getItem('userToken');
      console.log('token',token);
      const response = await fetch(`https://factory.teamasia.in/api/public/pasteconsumptions/?production_plan_id=${JumboDataFromPlan.id} & line_id=${JumboDataFromPlan.line_id} & order_id=${JumboDataFromPlan.order_id} & product_id=${JumboDataFromPlan.product_id}`, {
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

      setFormDataS(prevState => ({
        ...prevState,
        items1: result.pasteconsumptions
      }));
      console.log('result',result.pasteconsumptions);
    };
  
    fetchData();
  }, []);

  return (         
    <>
     <ComponentCard5 >
            <Modal isOpen={modal} toggle={toggle} style={{'--bs-modal-width': 'fit-content'}}>
              <ModalHeader toggle={toggle}>Paste Consumption</ModalHeader>
              <ModalBody>
                 <Form onSubmit={handleSubmit}>
                   <Row>
                      <Row>
                      <Col md="8">{errorMessageFromApi.length !== 0 && (
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
                        <Col>
                          <FormGroup>
                            <Table className="qa-packaging-roll-modal-items-padding">
                              <thead>
                                <tr>
                                <th><div> #	</div></th>
                                <th><div>Consumption Date</div></th>
                                <th><div>Quality Code</div></th>
                                <th><div>Color	</div></th>
                                <th><div>Vessel No</div></th>
                                <th><div>Shift</div></th>
                                <th><div>Paste Type</div></th>
                                <th><div>Empty Vessel Weight (Kg)</div></th>
                                <th><div>Supply Paste Weight (Kg)</div></th>
                                <th><div>Return Paste Weight (Kg)</div></th>
                                <th><div>Paste Consumed</div></th>
                                <th><div>Qty Produced (meter)</div></th>
                                <th><div>Return Paste %</div></th>
                                <th><div>Viscosity Check Time</div></th>
                                <th><div>Standard Viscosity</div></th>
                                <th><div>Observed Viscosity</div></th>
                                <th><div>Standard GSM	</div></th>
                                <th><div>Actual GSM</div></th>
                                <th><div>Operator</div></th>
                                <th><div>remarks</div></th>
                                <th><Button type="button" className='btn-success' onClick={addItem1}>+</Button></th>
                                </tr>
                              </thead>
                              <tbody>
                                {formDatas.items1.map((item, index) => (
                                    <tr key={item}>
                                      <td>{item.id === 'x' ? '#':item.id}</td>
                                      <td>
                                          <Input name="consumption_date"
                                                value={item.consumption_date} 
                                                type="date" 
                                                onChange={e => handleInputChange1(index, e)} 
                                                placeholder=""
                                                className={item.consumption_date === '' && errors.consumption_date ? "is-invalid":""}
                                          />
                                         {item.consumption_date === '' && errors.consumption_date &&  <FormText className="text-danger">Required</FormText>}
                                        </td>
                                        <td>
                                        <Input type="select" 
                                              name="quality_id" 
                                              id="name"
                                              value={item.quality_id}
                                              onChange={e => handleInputChange1(index, e)} 
                                              className={item.quality_id === 'x' && errors.quality_id ? "is-invalid":""}
                                              >
                                              {data3.map((quality)=>{
                                                  return <option key={quality.id} value={quality.id}>{quality.name}</option>
                                                })}
                                            </Input>
                                                { item.quality_id === 'x' && errors.quality_id &&  <FormText className="text-danger">Required</FormText>}
                                        </td>
                                      
                                        <td>
                                          <Input name="color_id"
                                                value={item.color_id} 
                                                type="select" 
                                                onChange={e => handleInputChange1(index, e)}  
                                                className={item.color_id === 'x' && errors.color_id ? "is-invalid":""}
                                                >
                                                  {data4.map((color)=>{
                                                      return <option key={color.id} value={color.id}>{color.name}</option>
                                                    })}
                                                  </Input>
                                                  {item.color_id === 'x' && errors.color_id &&  <FormText className="text-danger">Required</FormText>}
                                                 
                                        </td>
                                        <td>
                                          <Input name="vessel_no"
                                                value={item.vessel_no} 
                                                type="text" 
                                                onChange={e => handleInputChange1(index, e)}  
                                                placeholder=""
                                                className={item.vessel_no === '' && errors.vessel_no ? "is-invalid":""}
                                                />
                                                  {item.vessel_no === '' && errors.vessel_no &&  <FormText className="text-danger">Required</FormText>}
                                        </td>
                                        <td>
                                          <Input name="shift"
                                                value={item.shift} 
                                                type="text" 
                                                onChange={e => handleInputChange1(index, e)}  
                                                placeholder=""
                                                className={item.shift === '' && errors.shift ? "is-invalid":""}
                                                />
                                                  {item.shift === '' && errors.shift &&  <FormText className="text-danger">Required</FormText>}
                                                 
                                        </td>
                                        <td>
                                          <Input name="paste_type_id"
                                                value={item.paste_type_id} 
                                                type="select" 
                                                onChange={e => handleInputChange1(index, e)}  
                                                className={item.paste_type_id === 'x' && errors.paste_type_id ? "is-invalid":""}
                                                >
                                                   {data6.map((paste)=>{
                                                        return <option key={paste.id} value={paste.id}>{paste.name}</option>
                                                      })}
                                                  </Input>
                                                  {item.paste_type_id === 'x' && errors.paste_type_id &&  <FormText className="text-danger">Required</FormText>}
                                                 
                                        </td>
                                        <td>
                                          <Input name="empty_vessel_weight"
                                                value={item.empty_vessel_weight} 
                                                type="number" 
                                                onChange={e => handleInputChange1(index, e)}  
                                                placeholder=""
                                                className={item.empty_vessel_weight === '' && errors.empty_vessel_weight ? "is-invalid":""}
                                                />
                                                  {item.empty_vessel_weight === '' && errors.empty_vessel_weight &&  <FormText className="text-danger">Required</FormText>}
                                                 
                                        </td>
                                        <td>
                                          <Input name="supply_paste_weight"
                                                value={item.supply_paste_weight} 
                                                type="number" 
                                                onChange={e => handleInputChange1(index, e)}  
                                                placeholder=""
                                                className={item.supply_paste_weight === '' && errors.supply_paste_weight ? "is-invalid":""}
                                                />
                                                  {item.supply_paste_weight === '' && errors.supply_paste_weight &&  <FormText className="text-danger">Required</FormText>}
                                                 
                                        </td>
                                        <td>
                                          <Input name="return_paste_weight"
                                                value={item.return_paste_weight} 
                                                type="number" 
                                                onChange={e => handleInputChange1(index, e)}  
                                                placeholder=""
                                                className={item.return_paste_weight === '' && errors.return_paste_weight ? "is-invalid":""}
                                                />
                                                  {item.return_paste_weight === '' && errors.return_paste_weight &&  <FormText className="text-danger">Required</FormText>}
                                                 
                                        </td>
                                        <td>
                                          <Input name="paste_consumed"
                                                value={item.paste_consumed} 
                                                type="number" 
                                                onChange={e => handleInputChange1(index, e)}  
                                                placeholder=""
                                                className={item.paste_consumed === '' && errors.paste_consumed ? "is-invalid":""}
                                                />
                                                  {item.paste_consumed === '' && errors.paste_consumed &&  <FormText className="text-danger">Required</FormText>}
                                                 
                                        </td>
                                        <td>
                                          <Input name="qty_produced"
                                                value={item.qty_produced } 
                                                type="number" 
                                                onChange={e => handleInputChange1(index, e)}  
                                                placeholder=""
                                                className={item.qty_produced === '' && errors.qty_produced ? "is-invalid":""}
                                                />
                                                  {item.qty_produced === '' && errors.qty_produced &&  <FormText className="text-danger">Required</FormText>}
                                                 
                                        </td>
                                        <td>
                                          <Input name="return_paste"
                                                value={item.return_paste} 
                                                type="number" 
                                                onChange={e => handleInputChange1(index, e)}  
                                                placeholder=""
                                                className={item.return_paste === '' && errors.return_paste ? "is-invalid":""}
                                                />
                                                  {item.return_paste === '' && errors.return_paste &&  <FormText className="text-danger">Required</FormText>}
                                                 
                                        </td>
                                        <td>
                                          <Input name="viscosity_check_time"
                                                value={item.viscosity_check_time} 
                                                type="datetime-local" 
                                                onChange={e => handleInputChange1(index, e)}  
                                                className={item.viscosity_check_time === '' && errors.viscosity_check_time ? "is-invalid":""}
                                                placeholder=''
                                                />
                                                  {item.viscosity_check_time === '' && errors.viscosity_check_time &&  <FormText className="text-danger">Required</FormText>}
                                                 
                                        </td>
                                        <td>
                                          <Input name="standard_viscosity"
                                                value={item.standard_viscosity} 
                                                type="number" 
                                                onChange={e => handleInputChange1(index, e)}  
                                                placeholder=""
                                                className={item.standard_viscosity === '' && errors.standard_viscosity ? "is-invalid":""}
                                                />
                                                  {item.standard_viscosity === '' && errors.standard_viscosity &&  <FormText className="text-danger">Required</FormText>}
                                                 
                                        </td>
                                        <td>
                                          <Input name="observed_viscosity"
                                                value={item.observed_viscosity} 
                                                type="number" 
                                                onChange={e => handleInputChange1(index, e)}  
                                                placeholder=""
                                                className={item.observed_viscosity=== '' && errors.observed_viscosity ? "is-invalid":""}
                                                />
                                                  {item.observed_viscosity=== '' && errors.observed_viscosity &&  <FormText className="text-danger">Required</FormText>}
                                                 
                                        </td>
                                        <td>
                                          <Input name="standard_gsm"
                                                value={item.standard_gsm} 
                                                type="number" 
                                                onChange={e => handleInputChange1(index, e)}  
                                                placeholder=""
                                                className={item.standard_gsm === '' && errors.standard_gsm ? "is-invalid":""}
                                                /> 
                                                  {item.standard_gsm === '' && errors.standard_gsm &&  <FormText className="text-danger">Required</FormText>}
                                                 
                                        </td>
                                        <td>
                                          <Input name="actual_gsm"
                                                value={item.actual_gsm} 
                                                type="number" 
                                                onChange={e => handleInputChange1(index, e)}  
                                                placeholder=""
                                                className={item.actual_gsm === '' && errors.actual_gsm ? "is-invalid":""}
                                                />
                                                  {item.actual_gsm === '' && errors.actual_gsm &&  <FormText className="text-danger">Required</FormText>}
                                                 
                                        </td>
                                        <td>
                                          <Input name="qa_pe_id"
                                                value={item.qa_pe_id} 
                                                type="select" 
                                                onChange={e => handleInputChange1(index, e)}  
                                                className={item.qa_pe_id === 'x' && errors.qa_pe_id ? "is-invalid":""}
                                                >
                                                   {data2.map((operator)=>{
                                                  return <option key={operator.id} value={operator.id}>{operator.name}</option>
                                                })}

                                              </Input>
                                                  {item.qa_pe_id === 'x' && errors.qa_pe_id &&  <FormText className="text-danger">Required</FormText>}
                                                 
                                        </td>
                                        <td>
                                          <Input name="remarks"
                                                value={item.remarks} 
                                                type="text" 
                                                onChange={e => handleInputChange1(index, e)}  
                                                placeholder=""
                                                />
                                                 
                                        </td>
                                        <td><button type="button"  style={{ backgroundColor:"red",marginTop:"5px"}} onClick={() => removeItem1(index)} >X</button></td>
                                    </tr>
                                ))}
                              </tbody>
                            </Table>
                          </FormGroup>
                        </Col>
                      </Row>
                       
                      <Col md="4">
                        <FormGroup>
                          <Button type="submit" className="btn my-btn-color" style={{marginTop:"28px"}}>
                              Save
                          </Button>
                          <Button className='my-btn-color-red' style={{marginTop:"28px"}} onClick={()=>CancelPaste()}>
                              cancel
                          </Button>
                        </FormGroup>
                      </Col>
                   </Row>
                 </Form>
              </ModalBody>
             
            </Modal>
          </ComponentCard5>
    </>
  );
};

export default JumbotronComponent;
JumbotronComponent.propTypes = {
  JumboDataFromPlan:PropTypes.object.isRequired,
  modal: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
  data2: PropTypes.array.isRequired,
  data3: PropTypes.array.isRequired,
  data4: PropTypes.array.isRequired,
  data6: PropTypes.array.isRequired,
};