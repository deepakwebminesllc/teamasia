
// const a = [1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1];
const a = [
           [0,1,2],
           [3,4,5],
           [6,7,8]
          ];
const s=(a,x,y)=>{
  var temp=0;
  temp=a[x];
  a[x]=a[y];
  a[y]=temp;
}

// [
//   [0,3,6],
//   [1,4,7],
//   [2,5,8]
//  ];
// [
  //   [2,5,8]
  //   [1,4,7],
  //   [0,3,6],
//  ];
// [
  //   [6,3,0]
  //   [7,4,1],
  //   [8,5,2],
//  ];
// const a = [5,6,7,8,9,10,10,10,10,11,12,14,15];
// </Col>
// </Row>
// <Row>
//   <Col md="4">
//     <Input        
//         type="checkbox" 
//         name="Name" 
//         id="name" 
//         onChange={handleCheckBoxChange}
//       />
//     <Label style={{marginLeft:'4px'}}> small-rolls.print-lca</Label>
const pair=(a,start,end,item)=>{
  const sum = item*item;       
  while(start <end){
    if(a[start]*a[start] + a[end] *a[end] == sum){
      console.log('jumboRoll',a[start],a[end],item);
      console.log('JumboRoll',a[start]*a[start],a[end]*a[end],item*item);
      return true;
    }
    else if(a[start]*a[start] + a[end] *a[end] < sum){
      start++;
    }
    else{
      end--;
    }
  }
 return false;
}

//  </Col>
//   <Col md="4">
//     <Input        
//         type="checkbox" 
//         name="Name" 
//         id="name" 
//         onChange={handleCheckBoxChange}
//       />
//     <Label style={{marginLeft:'4px'}}> small-rolls.send-to-stock</Label>
//  </Col>
// const InputLabel = (a)=>{
//    const n = a.length;
//    if(n == 0 || n == 1)
//    {
//     return true
//    }
//    else {
//     var max = Math.floor(n/2)+1,count = 0;
//       var maybe = InputLabel2(a);
const x = "abc";
//       for(var i=0;i<n;i++){
//         if(a[i] == maybe){
//           count++
//         }
//       }
//       if(count >= max){
//         console.log('item',maybe);
//         return true
//       }
//     }
//     return false;
// }
const factory=(a,l,r,p)=>{
  var i=l,j=l;
  var point =p;
  while(j<r){
    if(a[j] < point )
    {
      s(a,i,j);
      i++;
    }
    j++;
  }
  // s(a,i,r);
  return i;
}

const Roll=(xarr,i,index)=>{
  var str='';
  if(i >0){
    var k = i%2;
    var m= Math.floor(i/2);
    if(k >0){
      str = Roll(xarr,m,index+1) + xarr[xarr.length-index];
    }else{
      str =Roll(xarr,m,index+1)
    }
  }
  return str;
}


const order =(a,b)=>{
  console.log('ab',a,b)
 const n1=a.length;
 const n2=b.length;
 var i=0;j=0,k=[];
 var m=0;
  while(i<n1 && j <n2){
    if(a[i]<= b[j]){
      k[m] =a[i];
      i++;
      m++;
    }else{
      k[m]=b[j];
      j++;
      m++;
    }
  }
  while(i<n1){
    k[m] =a[i];
    i++;
    m++;
  }
  while(j<n2){
    k[m] =b[j];
    j++;
    m++;
  }
  return k;
}
// const InputLabel2 = (a)=>{
//    const n = a.length;
//    var count=1,item;
//    for(var i=0;i<n-1;i++){
//      if(a[i] == a[i+1]){
//        count++;
//      }
//      else{
//        count--;
//        if(count == 0){
//          item = a[i+1];
//          count = 1;
//        }
//      }
//    }
//    return item;
// }
// console.log('orders data',InputLabel(a));

const tab=(a,l,r)=>{
 if(l>r){
  return [];
 }else if(l==r){
  return [a[l]];
 }
  var mid = Math.floor((l+r)/2);
   var tabLeftResult = tab(a,l,mid);
   var tabRightResult = tab(a,mid+1,r);
   return order(tabLeftResult,tabRightResult);
}

// console.log('no of rolls ',tab(a,0,a.length-1));


// </Col>
// </Row>
// <Row>
//   <Col md="4">
//     <Input        
//         type="checkbox" 
//         name="Name" 
//         id="name" 
//         onChange={handleCheckBoxChange}
//       />
//     <Label style={{marginLeft:'4px'}}> small-rolls.print-lca</Label>

//  </Col>
//   <Col md="4">
//     <Input        
//         type="checkbox" 
//         name="Name" 
//         id="name" 
//         onChange={handleCheckBoxChange}
//       />
//     <Label style={{marginLeft:'4px'}}> small-rolls.send-to-stock</Label>
//  </Col>

//   <Col md="4">
//     <Input        
//         type="checkbox" 
//         name="Name" 
//         id="name" 
//         onChange={handleCheckBoxChange}
//       />
//    <Label style={{marginLeft:'4px'}}> small-rolls.show</Label>


//  </Col>

const productionPlan =(x)=>{
   var xarr =  x.split(''),i=0;
   console.log('xarr',xarr);
   var xarr2 = Math.pow(2,xarr.length);
   console.log('xarr2',xarr2);
   while(i <xarr2){
    console.log(Roll(xarr,i,1));
     i++;
   }
}

// productionPlan('sp');

const qapackaging =(a,l,r)=>{
  if(l>=r){
    return null
  }
  var correct = factory(a,l,r);
  qapackaging(a,l,correct-1);
  qapackaging(a,correct+1,r);
}
// qapackaging(a,0,a.length-1);

// console.log(factory(a,0,a.length-1));

const dividor=(a,l,r)=>{
  
  const div = factory(a,l,r,2)
  console.log(a,div);
  factory(a,l,div,1);
}
// dividor(a,0,a.length)
// console.log(a);

const userRoles = [
  [1]
]


// const createuserRoles =(m,n)=>{
//   var mA = new Array(m);
//   for(var i =0;i<m;i++){
//     mA[i] =new Array(n);
//   }
//   for(var i =0;i<m;i++){
//     for(var j=0;j<n;j++){
//       mA[i][j]= 2
//     }
//   }
// return mA;
// }

// console.log(createuserRoles(3,4));

const sw =(a,x,y)=>{
 var temp;
  temp = a[x][y];
  a[x][y] =a[y][x];
  a[y][x] =temp;
}

{/* <div style={{textAlign:'center',background:'#3780a2',padding:'10px',color:'white',fontSize:'14px'}}>
Surplus Stock
 </div>
 <Table responsive size="sm" className="stockmanagementtable" title='Overall Stock' style={{background:'white'}}>
         <thead>
         
         </thead>
         
       <thead>
           
         
         <tr>
           <th scope="col"></th>op;
           <th scope="col">Count</th>
           <th scope="col">Qty</th>
         </tr>
       </thead>
       <tbody>
         
        
         <tr>
         <th scope="row">B</th>
                   <td>24</td>
                   <td>402.00 M</td>
         </tr>
         <tr>
         <th scope="row">Surplus</th>
                   <td> 0</td>
                   <td>0.00 M</td>
         </tr>
       
       </tbody>
     </Table> */}


// const invoice =(a,tempTarget)=>{

//   if(a.length == 1){
//     console.log('w',a[0])
//   }
//   else{
//     var target = (tempTarget % a.length);
//     var SpecialA = [],i=1;
//     var k=0,rem;
//     while(true){
//      rem = (target + i) % a.length;
   
//      if(rem == target){
//        break;
//      }
//       SpecialA[k] =a[rem];
//       i++;
//       k++;
//     }
//     console.log('special',SpecialA);
//     invoice(SpecialA,tempTarget);
//   }

// }

// var grade = ['a','b','c','d','e','f']
// invoice(grade,3);



{/* <div style={{textAlign:'center',background:'#3780a2',padding:'10px',color:'white',fontSize:'14px'}}>
Surplus Stock
 </div>
 <Table responsive size="sm" className="stockmanagementtable" title='Overall Stock' style={{background:'white'}}>
         <thead>
         
         </thead>
         
       <thead>
           
         
         <tr>
           <th scope="col"></th>
           <th scope="col">Count</th>
           <th scope="col">Qty</th>
         </tr>
       </thead>
       <tbody>
         <tr>
         <th scope="row">Total</th>
                   <td>59</td>
                   <td>1,829.40 M</td>
         </tr>
         <tr>
           <th scope="row">Grades</th>
         </tr>
         <tr>
         <th scope="row">Ist</th>
                   <td>59</td>
                   <td>1,829.40 M</td>
         </tr>
         <tr>
         <th scope="row">A</th>
                   <td>0</td>
                   <td>0.00 M</td>
         </tr>
         <tr>
         <th scope="row">B</th>
                   <td>24</td>
                   <td>402.00 M</td>
         </tr>
         <tr>
         <th scope="row">Surplus</th>
                   <td> 0</td>
                   <td>0.00 M</td>
         </tr>
       
       </tbody>
     </Table> */}