import React, { useEffect, useState } from 'react';

import "../StockDashboard/StockDashboard.css"
import Sidenav from '../Widget/Stocklist/Sidenav/SideNav';
function StockDashBoard(){


  const[ stockname, setStockname]=useState([])
  
  const [totalInvest,setTotalInvest]=useState([]);

  const [unit, setUnit]=useState([]);

  const [sold, setSold]=useState([]);





  useEffect(()=>{

    fetch("http://localhost:8000/all-stocks")
    .then(res=>res.json())
    .then(
        (result)=>{


            const allstock=result.map(x=> x.stockname)
            const unique=[...new Set(allstock)]

            // setAllStock(unique)
          setStockname(unique)
          
            

            


    

          const investTotal=[];

          const totalUnit=[];

          const totalSold=[];
            for (var i=0; i<=unique.length-1; i++){

           


                //total invest
                const total_inv= result.filter((item)=> item.stockname==unique[i]).map((item)=>item.amount)
        //total Unit
        const total_unit= result.filter((item)=> item.stockname==unique[i]).map((item)=>item.quantity)

    //total sold
    const total_sold= result.filter((item)=> (item.stockname==unique[i]) && (item.transactiontype=="sell" || item.transactiontype=="sell") ).map((item)=>item.amount)
console.log(total_sold)







   
        //sum invest

                 const total_sum=total_inv.reduce((a,b)=>parseInt(a)+parseInt(b));
                
//sum unit

        const grandUnit=total_unit.reduce((a,b)=>parseInt(a)+parseInt(b)); 
     
     
    

    
   


       

             //pushing 
            investTotal.push(parseInt(total_sum))
            totalUnit.push(parseInt(grandUnit));
          
         





  
            
            } 
            setTotalInvest(investTotal)
            setUnit(totalUnit)
            // setSold(totalSold)
         


        }


    )
  },[])

  

    return (


        <>

<div  className="stockdashboard-main">

<div className="stokdashboard-part1">
<Sidenav/>
</div>

<div className="stokdashboard-part2">
    <br/>
    <br/>

{
   stockname && stockname.map((item,index)=>(

        
            <div  className="data">
               
       Company Name:     {item}
            <br/>
       Total Investment:      {totalInvest[index]}

       <br/>

       Total Unit: {unit[index]}



            <br/>
            <br/>
           

                </div>
          
        
    ))
}


</div>

</div>
        </>
    );
}

export default StockDashBoard;