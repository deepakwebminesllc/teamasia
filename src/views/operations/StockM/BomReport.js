import React from 'react';

import 'react-table-v6/react-table.css';
import {Table} from 'reactstrap'
import ComponentCard5 from '../../../components/ComponentCard5';

const JumbotronComponent = () => {
  const data = [
    '256',
    '254',
    '272',
    '292',
    '296'
  ]

console.log(data);

 
  return (
    <>
    <ComponentCard5>
      <Table responsive>
        <thead>
          <tr>
            <th colSpan={4}>Customer: Plasco Traders</th>
          </tr>
          <tr>
           <th>Grain</th>
           <th>Product Quality</th>
           <th>Thickness</th>
           <th>Fabric</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1002 A</td>
            <td>Q11/CX0Y13Z02</td>
            <td>0.8mm</td>
            <td>WP.matty_132g_95gsm</td>
          </tr>
        </tbody>
        </Table>
    </ComponentCard5>

    <ComponentCard5>
      <Table className="report-page-table" responsive>
        <thead>
          <tr>
            <th colSpan={7} style={{textAlign:'center',color:'green'}}>BOM PARAMETERS TO BE CHECKED</th>
          </tr>
          <tr>
           <th>Raw Material</th>
           <th>Top Coat</th>
           <th>First Coat</th>
           <th>Foam Coat</th>
           <th>Adhesive Coat</th>
           <th><span style={{opacity:0}}>Top</span></th>
           <th><span style={{opacity:0}}>Top</span></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th> PVC </th>				
            <td> </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            			
            <th> Chemplast </th>
            <td></td>
            <td></td>
            <td>100</td>
            <td>100</td>
            <td></td>
            <td></td>
           
          </tr>
          <tr>
           
            <th> LG PB </th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
           
          </tr>
          <tr>
           
            <th> LG LP 170</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
           
          </tr>
          <tr>
           
            <th> LG LP 090</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            				
            <th> Blending Resin	</th>	
            <td></td>	
            <td></td>	
            <td></td>	
            <td></td>	
            <td></td>	
            <td></td>	
            
          </tr>
          <tr>
           		
            <th> PRF	 </th>
            <td>100</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            
          </tr>
          <tr>
           
            <th> ETC 2 </th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            
          </tr>
          <tr>
            
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <th colSpan={2} style={{textAlign:'center',color:'green'}}>Weight in GSM</th>
          </tr>
          <tr>
            
            <th> Plasticizer</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            
            <th> DOP </th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>Top</td>
            <td>125</td>
          </tr>
          <tr>
            
            <th>DOA</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>Foam</td>
            <td>300</td>
          </tr>
          <tr>
            
            <th>DBP</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>Adhesive</td>
            <td>100</td>
          </tr>
          <tr>
            
            <th>CPW</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>Fabric</td>
            <td>80</td>
          </tr>
          <tr>
            
            <th> EPOXY </th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>Final Wt.</td>
            <td>610</td>
          </tr>
          <tr>
            
          <th>X</th>	
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            
          <th>Y</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            
          <th>High Molecular Weight</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            
          <th>Reach Compliant</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            
          <th>DINP</th>
            <td>50</td>
            <td></td>
            <td>75</td>
            <td>45</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            
          <th>N-73</th>
            <td></td>
            <td></td>
            <td>15</td>
            <td>10</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            
            <th> ETC 3 </th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            
            <th></th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <th>Department:</th>
            <td>MIXING</td>
          </tr>
          <tr>
            
          <th>Stabilizer</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <th>Date:</th>
            <td>2022-04-13</td>
          </tr>
          <tr>
            
          <th>Baerlocher 1090</th>
            <td>2.0</td>
            <td></td>
            <td></td>
            <td></td>
            <th>Signature:</th>
            <td>RAJENDRA</td>
          </tr>
          <tr>
            
            <th> ETC 1 </th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            
            <th> ETC 2 </th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            
            <th> ETC 3 </th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            
            <th></th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            
            <th> Foaming </th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            
            <th> ADCL </th>
            <td></td>
            <td></td>
            <td></td>
            <td>1.5</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            
            <th> ADCL-3 </th>
            <td></td>
            <td></td>
            <td>10.0</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            
            <th> KK-48	</th>
            <td></td>
            <td></td>
            <td>2.5</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            
            <th></th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            
            <th>Filler </th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            
            <th> Dolomite	 </th>
            <td></td>
            <td></td>
            <td>175</td>
            <td>50</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            
            <th> Talc </th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            
            <th> ETC 1 </th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            
            <th> ETC 2 </th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            
            <th></th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            
            <th> Reducer</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            
            <th> D80	 </th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            
            <th> MTO </th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            
            <th> ETC 1 </th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            
            <th> ETC 2 </th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            
            <th></th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            
            <th> Pigment </th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            
            <th> Pigment M.B </th>
            <td>10</td>
            <td></td>
            <td>5</td>
            <td>1</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            
            <th> ETC 1 </th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            
            <th> BOM </th>
            <td>PVC/6A43</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          
         
        </tbody>
        </Table>
    </ComponentCard5>
    </>
  );
};

export default JumbotronComponent;
