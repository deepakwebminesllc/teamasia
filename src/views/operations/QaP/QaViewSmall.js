import React,{memo, useState,useEffect} from 'react';
import {

  Button,

  Table
} from 'reactstrap';

import PropTypes from 'prop-types';
// import ComponentCard4 from '../../../components/ComponentCard5';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Barcode from 'react-barcode';


const JumbotronComponent = (props) => {

  const {Refreshkey,product,data1,updateRollTogglefunction} = props;
  const [data, setData] = useState([]);

  // console.log('productID',product,data)

  const handleDeleteClick = async (pro,index) => {
    try {
      // Call your API endpoint to delete the item
      const token = localStorage.getItem('userToken');
      const response = await fetch(`https://factory.teamasia.in/api/public/smallrolls/${pro.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      // Check if the request was successful
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const newItems = data.slice();
        newItems.splice(index, 1);
        setData(newItems);
      console.log('Item deleted successfully');
    } catch (error) {
      //only checks for error that are generated by fetch function , and cors 
      console.error('Failed to delete the item', error);
    }
  };


  const GradeName = (cut)=>{
      const grade = data1.find((i)=> i.id === cut);
      return grade? grade.name: 'unknown'
  }
  
  const cutPieceAdd = (cut)=>{
    if(cut !== '0' && cut.split(',').length > 0){
      return cut.split(',').join('+')
    }
    return null;
  }
  useEffect(() => {
    
    // Fetch the data from the API
    const fetchData = async () => {
      const token = localStorage.getItem('userToken');
      // console.log('token',token);
      const response = await fetch(`https://factory.teamasia.in/api/public/smallrolls?product_id=${product}`, {
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
      console.log("responsejson in s..",result);
      setData(result.smallrolls);
    };
    fetchData();  
  },[Refreshkey]);
  return (
  <>
  {
    data.length !== 0 ? <>
    {/* {"Jumbo Rolls (Total : 1, Qty : 170 m, Small Rolls => Count : 8 , Qty : 161 m, Avg GSM : 1334.69 g/m2"} */}
    <Table responsive size="sm">
        <thead>
          <tr>
            <th scope="col">S. No.</th>
            <th scope="col">Quantity</th>
            <th scope="col">Grade</th>			
            <th scope="col">Weight</th>
            <th scope="col">BIN</th>
            <th scope="col">GSM(g/m2)</th>
            <th scope="col">Code</th>
            <th scope="col">LCA</th>
            <th scope="col">Action</th>
           
          </tr>
        </thead>
          {data.map((pro,index) => {
            return<React.Fragment key={pro.id}>
            
              <tbody>
                
                <tr>
                  <td>{index+1}</td>
                  <td>{pro.quantity}<div>{cutPieceAdd(pro.cut_piece_length)}</div></td>
                  <td>{GradeName(pro.grade_id)}</td>
                  <td>{pro.weight}</td>
                  <td>{pro.bin}</td>
                  <td>{pro.bin}</td>
                  
                  <td><td> <td><Barcode value={`SMALL${pro.id}`} height={20} /></td></td></td>
                  <td><ProgressBar now={220} label={`${220}`} style={{width:"300px",height:"25px"}}/></td>
                  <td>
                    <td ><Button ><i className="bi bi-printer-fill my-bell-color" /></Button></td>
                    <td ><Button onClick={()=>updateRollTogglefunction(pro)}><i className="bi bi-pencil-fill my-pen-color" /></Button></td>
                    <td ><Button  onClick={()=>handleDeleteClick(pro,index)}><i className="bi bi-trash-fill my-trash-color" /></Button></td>
                  </td>
                </tr>
              
              </tbody>
              </React.Fragment>

                      })}
                      
            
        </Table> </>:''
  }
    
        </>
  );
};

export default memo(JumbotronComponent);

JumbotronComponent.propTypes = {
  product: PropTypes.object.isRequired,
  Refreshkey: PropTypes.string.isRequired,
  updateRollTogglefunction: PropTypes.func.isRequired,
  data1: PropTypes.array.isRequired,
};