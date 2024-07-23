import React ,{useState,useEffect} from 'react';
import {
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Row,
  Col,
  Label,
  Input,
  Button,
  FormText,
} from 'reactstrap';

import PropTypes from 'prop-types';
import ComponentCard5 from '../../../components/ComponentCard5';
import 'react-table-v6/react-table.css';

const JumbotronComponent = ({modal,setModal1,toggle,data2,data6}) => {
  
  const [modalRoll,setModalRoll] = useState(false);
  const [modalFault,setModalFault] = useState(false);
  const [sendOption,setSendOption] = useState(false);
  const [data7,setData7] = useState([]);
  const [formDatasRoll, setFormDatasRoll] = useState({
     quantity:'',
     startTime:'',
     endTime:'',
     note:'',
     qa_id:''
  });
  
  const [formDatas, setFormDataS] = useState({
    items1:[]
  });
  const [errorMessageFromApi, setErrorMessageFromApi] = useState([]);
  const [errorMessageFromFaultApi, setErrorMessageFromFaultApi] = useState([]);
  const [errors,setErrors] = useState({});
  const [faultChanged,setFaultChanged] = useState('1');

  const checkboxclick1 = () => {
    console.log('check',sendOption);
    setSendOption(!sendOption);
   
  };
const handleTypeChange = (e) => {
    const { name, value } = e.target;
    console.log('name and value',name,value);
      setFormDatasRoll(prevState => ({
        ...prevState,
        [name]: value
      }));
   
    
    // console.log('e',e.target.options[e.target.selectedIndex].text);
    console.log('e',e.target.value);
  };

  const updateRollToggle = ()=>{
    setModalRoll(!modalRoll);
    setModalFault(false);
    setModal1(false);
    console.log('toggle',toggle);
  }

  const updateFaultToggle = ()=>{
    setModalFault(!modalFault);
    setModal1(false);
    console.log('toggle',toggle);
  }

  const closer =()=>{
    setErrorMessageFromApi([]);
  }
  
    async function apiCall() {
      try {
          console.log('formdatas',formDatasRoll);
          const token = localStorage.getItem('userToken');
          const response = await fetch(`https://factory.teamasia.in/api/public/jumboroll`, {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
             
              body: JSON.stringify({
                qa_pe_id:formDatasRoll.qa_id,
                quantity:formDatasRoll.quantity,
                start_date:formDatasRoll.startTime,
                end_date:formDatasRoll.endTime,
                note:formDatasRoll.note,
                send_for_additional_treatment: sendOption === false?0:1 
              }),
          });
  
          const dataZ = await response.json();
          console.log("dataapi",dataZ,response);
          if (response.status === 201) {
            updateRollToggle();
          } else {
            console.error("Authentication failed:", Object.values(dataZ.messages.errors));
            if (dataZ.error) {
              setErrorMessageFromApi(Object.values(dataZ.messages.errors));
            }
          }  
          return null;
        } catch (error) {
          console.log('error',error);
           setErrorMessageFromApi(["Network error"]);
          return null;
        }
  }
  
  
  
  
  const handleSubmit = async (event) => {
    event.preventDefault();
      apiCall();
  };

  const addItem1 = () => {
    const newItems = formDatas.items1.slice();
    console.log("data",newItems);
    newItems.push({ 
      id:'x',
      jumbo_roll_id : "0",
      small_roll_id : "0",
      fault_id : "x",
      fault_start_point : "",
      fault_length : "",
      severity_id : "x",
      is_external : "0",
    })
    setFormDataS(prevState => ({
      ...prevState,
      items1: newItems
    }));
  };

  const handleDeleteClick = async (itemId) => {
    try {
      // Call your API endpoint to delete the item
      const token = localStorage.getItem('userToken');
      const response = await fetch(`https://factory.teamasia.in/api/public/faultlogs/${itemId}`, {
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
    const { name, value } = e.target;
    const newItems = formDatas.items1.slice();
    console.log("data",index,newItems);
    newItems[index][name] = value;
    console.log('newX',newItems);
    setFormDataS(prevState => ({
      ...prevState,
      items1: newItems
    }));
  };

  

  const closerForFault =()=>{
    setErrorMessageFromFaultApi([]);
  }
  
    async function apiCallForFaultCreate(item) {
      try {
          console.log('formdatas',formDatas);
          const token = localStorage.getItem('userToken');
          const response = await fetch(`https://factory.teamasia.in/api/public/faultlogs`, {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
             
              body: JSON.stringify({
                jumbo_roll_id :item.jumbo_roll_id,
                small_roll_id :item.small_roll_id,
                fault_id:item.fault_id,
                fault_start_point:item.fault_start_point,
                fault_length:item.fault_length,
                severity_id:item.severity_id,
                is_external :item.is_external 
              }),
          });
  
          const dataZ = await response.json();
          console.log("dataapi",dataZ,response);
          if (response.status === 201) {
            setFaultChanged(faultChanged + 1);
            // updateRollToggle();
          } else {
            console.error("Authentication failed:", Object.values(dataZ.messages.errors));
            if (dataZ.error) {
              setErrorMessageFromFaultApi(Object.values(dataZ.messages.errors));
            }
          }  
          return null;
        } catch (error) {
          console.log('error',error);
          setErrorMessageFromFaultApi(["Network error"]);
          return null;
        }
  }

  async function apiCallForFaultUpdate(item) {
    try {
        console.log('formdatas',formDatas);
        const token = localStorage.getItem('userToken');
        const response = await fetch(`https://factory.teamasia.in/api/public/faultlogs/${item.id}`, {
            method: "PUT",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
           
            body: JSON.stringify({
                jumbo_roll_id :item.jumbo_roll_id,
                small_roll_id :item.small_roll_id,
                fault_id:item.fault_id,
                fault_start_point:item.fault_start_point,
                fault_length:item.fault_length,
                severity_id:item.severity_id,
                is_external :item.is_external
            }),
        });

        const dataZ = await response.json();
        console.log("dataapi",dataZ,response);
        if (response.status === 200) {
          setFaultChanged(faultChanged + 1);
          // updateRollToggle();
        } else {
          console.error("Authentication failed:", Object.values(dataZ.messages.errors));
          if (dataZ.error) {
            setErrorMessageFromFaultApi(Object.values(dataZ.messages.errors));
          }
        }  
        return null;
      } catch (error) {
        console.log('error',error);
        setErrorMessageFromFaultApi(["Network error"]);
        return null;
      }
}
  
  const validateForm=()=>{
    let formIsValid =true;
    const errors1 ={};
    
      formDatas.items1.forEach((element) => {
      console.log('element',element);
      if(element.fault_id === 'x'){
               formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["fault_id"] ="Required"
            }
      
      if(element.fault_start_point === ''){
              formIsValid = false;
       // eslint-disable-next-line dot-notation
             errors1["fault_start_point"] ="Required"
           }
    
            if(element.fault_length === ''){
               formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["fault_length"] ="Required"
            }
           
            if(element.severity_id === 'x'){
               formIsValid = false;
        // eslint-disable-next-line dot-notation
              errors1["severity_id"] ="Required"
            }
        });
    setErrors(errors1);
    return formIsValid;
    }
  
  
  const handleSubmitforFault = async (item) => {
    if(validateForm()) {
      console.log('Form is valid, proceed with API call');
      if(item.id !== 'x')
      {
        apiCallForFaultUpdate(item);
      }
      else{
        apiCallForFaultCreate(item);
      }
    } else {
      console.log('Form is invalid, do not submit');
    }
     
  };

  useEffect(() => {
    
    // Fetch the data from the API
    const fetchData = async () => {
      const token = localStorage.getItem('userToken');
      console.log('token',token);
      const response = await fetch(`https://factory.teamasia.in/api/public/faultlogs`, {
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
        items1: result.faultlogs
      }));
      console.log('result',result.faultlogs);
    };
    fetchData();
  }, [faultChanged]);

  useEffect(() => {
    const fetchSeverityData = async () => {
      const token = localStorage.getItem('userToken');
      console.log('token',token);
      const response = await fetch(`https://factory.teamasia.in/api/public/severities`, {
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
      const resultX = result.severities.slice();
      resultX.push({id:'x',name:'Choose'});
      setData7(resultX);
      console.log('result',result.severities);
    };
    const fetchPhysicalData = async () => {
      const token = localStorage.getItem('userToken');
      console.log('token',token);
      const response = await fetch(`https://factory.teamasia.in/api/public/severities`, {
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
      const resultX = result.severities.slice();
      resultX.push({id:'x',name:'Choose'});
      setData7(resultX);
      console.log('result',result.severities);
    };
    fetchPhysicalData();
    fetchSeverityData();
  }, []);

  return (
    <>
     <ComponentCard5 >
            <Modal isOpen={modal} toggle={toggle} style={{'--bs-modal-width': '800px'}}>
              <ModalHeader toggle={toggle}></ModalHeader>
              <ModalBody>
                 <Form>
                    <Row>
                       <Row>
                          <Col md="12" className=''>
                            <FormGroup>
                              <Label>*Name of the Production Engineer</Label>
                              <Input type="select" 
                                name="qa_id" 
                                value={formDatasRoll.qa_id}
                                onChange={handleTypeChange}>
                                  {data2.map((item)=>{
                                    
                                    return <option key={item.id} value={item.id}>{item.name}</option>
                                  })}
                              </Input>

                              <FormText className="muted"></FormText>
                            </FormGroup>
                          </Col>
                       </Row>
                       <Col md="4">
                          <FormGroup>
                            <Button className="btn my-btn-color" style={{marginTop:"28px"}} onClick={()=>{updateFaultToggle()}}>
                                Save
                            </Button>
                          </FormGroup>
                       </Col>
                   </Row>
                 </Form>
              </ModalBody>
             
            </Modal>
            
            <Modal isOpen={modalFault} toggle={updateFaultToggle} style={{'--bs-modal-width': '1000px'}}>
              <ModalHeader toggle={updateFaultToggle}>
                           <span>JUMBO037104</span> 
                           <Button onClick={()=>{updateRollToggle()}}><i className="bi bi-pencil-fill my-pen-color" />Update Jumbo Roll</Button>
              </ModalHeader>
              <ModalBody>
                 <Form>
                    <Row>
                        <Col md="9">{errorMessageFromFaultApi.length !== 0 && (
                          <div style={{ background:'#ff9c7a',color: 'black', marginBottom: '10px', padding:"5px 10px"}}>
                            <div style={{display:'flex',justifyContent:'space-between'}}>
                              Following errors were found:
                              <span onClick={closerForFault} style={{cursor:'pointer'}}>X</span>
                            </div>
                            <ul>
                              {errorMessageFromFaultApi.map((item)=>
                              <li>
                                  {item}
                              </li>
                              )}
                            </ul>
                          </div>
                        )}
                      </Col>
                      <Col md="12">
                           <div style={{display:'flex',background:'#e3e3e3',justifyContent:'space-between',ackground:'#e3e3e3',padding:'10px'}}><span style={{fontWeight:'900',fontSize:'18px'}}> Physical Properties</span><Button className='my-btn-color' onClick={()=>{updateRollToggle()}}><i className="bi bi-pencil-fill" /></Button></div>
                            <Table className="report-page-lab-table" size="sm" responsive>
                              <thead>
                                <tr>
                                  <th colSpan={3}><div style={{textAlign:'center'}}>GSM (g/m2)</div></th>
                                  <th colSpan={2}><div style={{textAlign:'center'}}>PEEL OFF (N/mm)	</div></th>
                                  <th colSpan={2}><div style={{textAlign:'center'}}>COATING ADHES. (N/mm)	</div></th>
                                  <th colSpan={2}><div style={{textAlign:'center'}}>STIFFNESS (mm)</div></th>
                                </tr>
                              </thead>
                              <tbody>
                                    <tr>
                                      <td>Expected</td>
                                      <td>Observed</td>
                                      <td>Actual</td>
                                      <td>Along	</td>
                                      <td>Across</td>
                                      <td>Along	</td>
                                      <td>Across</td>
                                      <td>Along	</td>
                                      <td>Across</td>
                                    </tr>
                             
                              </tbody>
                            </Table>
                      </Col>
                      <Col>
                         <div style={{background:'#e3e3e3',padding:'10px',marginTop:'10px'}}><span style={{fontWeight:'900'}}>Fault Log(s)</span></div>
                          <FormGroup>
                            <Table className="qa-packaging-roll-modal-items-padding" size="sm">
                              <thead>
                                <tr>
                                <th><div> #	</div></th>
                                <th><div>Fault</div></th>
                                <th><div>Fault Start Point (m)</div></th>
                                <th><div>Fault Length (m)</div></th>
                                <th><div>Severity</div></th>
                                <th><Button type="button" className='btn-success' onClick={addItem1}>+</Button></th>
                                </tr>
                              </thead>
                              <tbody>
                                {formDatas.items1.map((item, index) => (
                                    <tr key={item}>
                                      <td>{item.id === 'x' ? '#':item.id}</td>
                                      <td>
                                          <Input name="fault_id"
                                                value={item.fault_id} 
                                                type="select" 
                                                onChange={e => handleInputChange1(index, e)}  
                                                className={item.fault_id === 'x' && errors.fault_id? "is-invalid":""}
                                                >
                                                   {data6.map((fault)=>{
                                                        return <option key={fault.id} value={fault.id}>{fault.name}</option>
                                                      })}
                                                  </Input>
                                                  {item.fault_id === 'x' && errors.fault_id &&  <FormText className="text-danger">Required</FormText>}
                                                 
                                        </td>

                                        <td>
                                          <Input type="number" 
                                              name="fault_start_point" 
                                              id="name"
                                              value={item.fault_start_point}
                                              onChange={e => handleInputChange1(index, e)} 
                                              className={item.fault_start_point === '' && errors.fault_start_point ? "is-invalid":""}

                                              />
                                            {item.fault_start_point === '' && errors.fault_start_point &&  <FormText className="text-danger">Required</FormText>}
                                        </td>
                                        <td>
                                          <Input type="number" 
                                              name="fault_length" 
                                              id="name"
                                              value={item.fault_length}
                                              onChange={e => handleInputChange1(index, e)} 
                                              className={item.fault_length === '' && errors.fault_length ? "is-invalid":""}

                                                />
                                              {item.fault_length === '' && errors.fault_length &&  <FormText className="text-danger">Required</FormText>}
                                        </td>
                                        <td>
                                          <Input name="severity_id"
                                                value={item.severity_id} 
                                                type="select" 
                                                onChange={e => handleInputChange1(index, e)}  
                                                className={item.severity_id === 'x' && errors.severity_id ? "is-invalid":""}
                                                >
                                                   {data7.map((severity)=>{
                                                        return <option key={severity.id} value={severity.id}>{severity.name}</option>
                                                      })}
                                                  </Input>
                                                  {item.severity_id === 'x' && errors.severity_id &&  <FormText className="text-danger">Required</FormText>}
                                                 
                                        </td>
                                        <td>
                                          <Button style={{ marginTop:"5px"}}  onClick={() => handleSubmitforFault(item)} className="btn-sm mybtncustomer btn-secondary" outline color="info" >✓</Button>
                                          <Button style={{ marginTop:"5px"}} onClick={() => removeItem1(index)} className="btn-sm mybtncustomer btn-secondary" outline color="danger" >X</Button></td>
                                    </tr>
                                ))}
                              </tbody>
                            </Table>
                          </FormGroup>
                        </Col>
                       <Row>
                       </Row>
                   </Row>
                 </Form>
              </ModalBody>
             
            </Modal>
            <Modal isOpen={modalRoll} toggle={updateRollToggle} style={{'--bs-modal-width': '800px'}}>
              <ModalHeader toggle={updateRollToggle}></ModalHeader>
              <ModalBody>
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
                       <Row>
                       <Col md="12" className=''>
                            <FormGroup>
                              <Label>*Quantity</Label>
                              <Input type="text" 
                                name="quantity" 
                                value={formDatasRoll.quantity}
                                onChange={handleTypeChange}/>

                              <FormText className="muted"></FormText>
                            </FormGroup>
                          </Col>
                       <Col md="6" className=''>
                            <FormGroup>
                              <Label>*Start time</Label>
                              <Input type="datetime-local" 
                                name="startTime" 
                                value={formDatasRoll.startTime}
                                onChange={handleTypeChange}/>

                              <FormText className="muted"></FormText>
                            </FormGroup>
                          </Col>
                       <Col md="6" className=''>
                            <FormGroup>
                              <Label>*End time</Label>
                              <Input type="datetime-local" 
                                name="endTime" 
                                value={formDatasRoll.endTime}
                                onChange={handleTypeChange}/>

                              <FormText className="muted"></FormText>
                            </FormGroup>
                          </Col>

                       <Col md="6" className=''>
                            <FormGroup>
                              <Label>*Note</Label>
                              <Input type="textarea" 
                                name="note" 
                                value={formDatasRoll.note}
                                onChange={handleTypeChange}/>
                              
                              <FormText className="muted"></FormText>
                            </FormGroup>
                          </Col>

                       <Col md="12" className='' style={{marginTop:"20px"}}>
                            <FormGroup>
                              <Input type="checkbox" 
                                name="sendOption"
                                checked={sendOption}
                                onChange={checkboxclick1}
                                />
                              <Label>Send for Additional Treatment</Label>
                              
                              <FormText className="muted"></FormText>
                            </FormGroup>
                          </Col>
                     
                          <Col md="12" className=''>
                            <FormGroup>
                              <Label>*Name of the Production Engineer</Label>
                              <Input type="select" 
                                name="qa_id" 
                                value={formDatasRoll.qa_id}
                                onChange={handleTypeChange}>
                                  {data2.map((item)=>{
                                    
                                    return <option key={item.id} value={item.id}>{item.name}</option>
                                  })}
                              </Input>

                              <FormText className="muted"></FormText>
                            </FormGroup>
                          </Col>
                       </Row>
                       <Col md="4">
                          <FormGroup>
                            <Button type="submit" className="btn my-btn-color" style={{marginTop:"28px"}}>
                               Update
                            </Button>
                            <Button onClick={()=>{updateRollToggle()}} className="btn my-btn-color" style={{marginTop:"28px"}}>
                                Cancel
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
  modal: PropTypes.string.isRequired,
  setModal1: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
  data2: PropTypes.array.isRequired,
  data6: PropTypes.array.isRequired,
};