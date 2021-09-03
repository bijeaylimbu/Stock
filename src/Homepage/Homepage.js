import { Button } from "bootstrap";
import React, { useEffect, useState } from "react";
import { Table } from "react-fluid-table";
import "../Homepage/Homepage.css"
import StockForm from "../StockForm/StockForm";

import {getUser, removeUserSession} from "../utils/Common";
import Sidenav from "../Widget/Stocklist/Sidenav/SideNav";


function Homepage(){

const [error, setError]=useState(null);

const [stocks,setStocks]=useState([]);

const user=getUser();

const [showForm, setShowForm]=useState(false);
const showForms=()=>{

    setShowForm(!showForm);
}


function handleScroll() {
    window.scroll({
      top: document.body.offsetHeight,
      left: 0, 
      behavior: 'smooth',
    });
  }


useEffect(()=>{

    fetch("http://localhost:8000/all-stocks")
    .then(res=>res.json())
    .then(
        (result)=>{

            setStocks(result);
        },
        (error)=>{
            setError(error);

            
        }
    )
},[])
    return (

        <>
<div className="homepage-main">
<div className="homepage-sidenav">
<Sidenav/>
  
</div>

    <div className="homepage-part1">

     Hello    {user}
     <button type="button" onClick={handleScroll}  className="add-stock-mockup">Add Stock Mockup</button>
    </div>

    

    <div className="homepage-part2">

    <table>

<tr>

    <th>Stock Name</th>
    <th>Transaction Type</th>
    <th>quantity</th>
    <th>
        Amount
    </th>
    <th>Transaction Date</th>
</tr>
{
stocks.map(item=>(

   <tr>

       <td>

           {item.stockname}
       </td>
       <td>
         {item.transactiontype}  
       </td>
<td>


{item.quantity}
</td>

<td>
{item.amount}

</td>

<td>
{item.transactiondate}
</td>

   </tr>
))
}
</table>
    </div>


<div className="add-button">
<button className="add-stock-mockup" onClick={showForms} > Add Stock Mockup</button>
{

    showForm && (
        // <Stocklist/>
       <StockForm/>
    )
}
</div>
       
</div>

        </>
    );
}

export default Homepage;