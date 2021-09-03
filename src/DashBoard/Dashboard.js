import React, { useEffect, useState } from 'react';
import Sidenav from '../Widget/Stocklist/Sidenav/SideNav';
import {getUser} from "../utils/Common";
import "../DashBoard/Dashboard.css"
import { reduceHooks } from 'react-table';


function DashBoard(){

    const [error, setError]=useState(null);
    
    const [stocks,setStocks]=useState([]);
    const [unit,setUnit]=useState();
    const [totalInvestment, setTotalInvestment]=useState();
    const [soldAmount,setSoldAmount]=useState();
    const[totalsoldAmount, setTotalSoldAmount]=useState()

    const [totalbuyAmount, setTotalbuyAmount]=useState()

    const profit=totalsoldAmount-totalbuyAmount;
    // console.log(profit);
    const user=getUser();
  
  

   
  
    const total=(soldAmount)=>{
let aux=0;
for (var key in soldAmount){

    aux=+soldAmount[key]
}
setTotalSoldAmount(aux);
    }
    
    
    
    useEffect(()=>{
    
        fetch(`http://localhost:8000/get-all?user=${user}`)
        .then(res=>res.json())
        .then(
            (result)=>{
    
                setStocks(result);
               const unit=result.map(item=>item.quantity).reduce((a,b)=>parseInt(a)+parseInt(b));
               setUnit(unit);

               const invest=result.map(item=>item.buyingorsellingprice).reduce((a,b)=>parseInt(a)+parseInt(b));
              setTotalInvestment(invest);

            //   const sold=result.map(item=>item.transactiontype).reduce((a,b)=>parseInt(a)+parseInt(b));

           
        //    const sold=result.map(item=>item.transactiontype=="Sell" || item.transactiontype=="sell");

           const sold=result.filter((item)=>item.transactiontype=="Sell" || item.transactiontype=="sell").map((item=>parseInt(item.buyingorsellingprice))
        
           );



           const totalsold=sold.reduce((a,b)=>(a)+(b))
        //   setSoldAmount(sold);
        setTotalSoldAmount(totalsold);



        const buy=result.filter((item)=>item.transactiontype=="Buy" || item.transactiontype=="buy").map((item=>parseInt(item.buyingorsellingprice))
        
        );

        const totalbuy=buy.reduce((a,b)=>a+b)
        setTotalbuyAmount(totalbuy);
    
         


        //   console.log(soldAmount)
        //    console.log(sold);

        //    const totalsold=soldAmount.reduce((a,b)=>parseInt(a)+parseInt(b),0)
        //    console.log(totalsold)
              
            },
            (error)=>{
                setError(error);
    
                
            }
        )
    },[])
        return (
    
            <>
    <div className="dashboard-main">
    <div className="dashboard-sidenav">
    <Sidenav/>
      
    </div>
    
        <div className="dashboard-part1">
    
       
        </div>
    
        <div className="dashboard-part2">
    
        Total:{unit}
        <br/>
        Total Investment:{totalInvestment}
        <br/>
        Sold Amount: {totalsoldAmount}
        <br/>
        Total Buy: {totalbuyAmount}

        <br/>




        
           
           <h2>Overall Profit/Loss: {profit}</h2>
            
    

        </div>     
    </div>
    
            </>
        );
    }


    
    
    export default DashBoard;
