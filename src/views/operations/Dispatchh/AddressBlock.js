import React ,{useState,useEffect} from 'react';
import {
} from 'reactstrap';
// import { useLocation} from 'react-router-dom';
import PropTypes from 'prop-types';
import ComponentCard4 from '../../../components/ComponentCard4';
import 'react-table-v6/react-table.css';

const JumbotronComponent = (props) => {
  // const location = useLocation();
  const [data,setData] = useState({});
  const [data1,setData1] = useState(['unknown city']);
  const [data2,setData2] = useState(['unknown state']);
  const [data3,setData3] = useState(['unknown addresstypes']);
  const [data4,setData4] = useState(['unknown country']);


  // console.log('locationHYBRID',location.state,props)

   useEffect(()=>{

    const fetchDataforCity = async (id)=>{
      const token = localStorage.getItem('userToken');
      const response = await fetch(`https://factory.teamasia.in/api/public/cities/${id}?is_trashed=0`,{
        method:'GET',
        headers:{
          'Authorization': `Bearer ${token}`
        }
    });

    if(!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`);
    }
   const result = await response.json();
  //  console.log('responsejsonHYBRID',result);
   if(result.length !==0){
     setData1(result[0].name);
   }
  }
    const fetchDataforState = async (id)=>{
      const token = localStorage.getItem('userToken');
      const response = await fetch(`https://factory.teamasia.in/api/public/states/${id}?is_trashed=0`,{
        method:'GET',
        headers:{
          'Authorization': `Bearer ${token}`
        }
    });

    if(!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`);
    }
   const result = await response.json();
   console.log('responsejsonHYBRID state',result);
   if(result.length !==0){
    setData2(result[0].name);
  }
  }

    const fetchDataforAddressType = async (id)=>{
      const token = localStorage.getItem('userToken');
      const response = await fetch(`https://factory.teamasia.in/api/public/addresstypes/${id}?is_trashed=0`,{
        method:'GET',
        headers:{
          'Authorization': `Bearer ${token}`
        }
    });

    if(!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`);
    }
   const result = await response.json();
  //  console.log('responsejsonHYBRID',result);
   if(result.length !==0){
    setData3(result[0].name);
  }
  }

    const fetchDataforCountry = async (id)=>{
      const token = localStorage.getItem('userToken');
      const response = await fetch(`https://factory.teamasia.in/api/public/countries/${id}?is_trashed=0`,{
        method:'GET',
        headers:{
          'Authorization': `Bearer ${token}`
        }
    });

    if(!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`);
    }
   const result = await response.json();
  //  console.log('responsejsonHYBRID',result);
   if(result.length !==0){
    setData4(result[0].name);
  }
  }

    const fetchData = async ()=>{
      const token = localStorage.getItem('userToken');
      const response = await fetch(`https://factory.teamasia.in/api/public/addresses/${props.addressId}`,{
        method:'GET',
        headers:{
          'Authorization': `Bearer ${token}`
        }
    });

    if(!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`);
    }
   const result = await response.json();
  //  console.log('responsejsonHYBRID',result);
   if(result){
     fetchDataforCity(result.city_id);
     fetchDataforAddressType(result.address_type_id);
     fetchDataforState(result.state_id);
     fetchDataforCountry(result.country_id);
     setData(result);
   }
  }
    fetchData();
  },[]);
  
  console.log('data',data);

  return (
    <>
                            <ComponentCard4 >
                               <div className="order-view-page-flex-temp">
                                <div>{data3}</div> 
                                <div>{data.address_alias}</div> 
                                <div>{data.address_line_1}</div> 
                                <div>{data.address_line_2}</div> 
                                <div>{data1}</div> 
                                <div>{data2} - 06</div> 
                                <div>{data.pincode}, {data4}</div> 
                                <div><span className='production-plan-page-collape-heading' > GST No. </span>: {data.gst}</div> 
                              </div>                    
                          </ComponentCard4>
                        
                    
     
         
    </>
  );
};

export default JumbotronComponent;

JumbotronComponent.propTypes = {
  addressId: PropTypes.string.isRequired
};
