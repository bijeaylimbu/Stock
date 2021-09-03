import React, { useEffect, useState } from 'react';
import '../StockForm/StockForm.css'
import axios from 'axios';
import {getUser, removeUserSession} from "../utils/Common";
import Stocklist from '../Widget/Stocklist/Stocklist';





function StockForm(props){

    const stockname=useFormInput()
    const transactiontype=useFormInput()
    const quantity=useFormInput()
    const buyingorsellingprice=useFormInput()
    const[error, setError]=useState(null)
    const user=getUser();
    const [items, setItems]=useState([])
    const [loading, setLoading]=useState(false);

   
  

  

    const handleSubmit=()=>{
        setError(null)
        setLoading(true);

        axios.post("http://localhost:8000/user-stock",
        {

           

            stockname:stockname.value,
            transactiontype:transactiontype.value,
            quantity:quantity.value,
            buyingorsellingprice:buyingorsellingprice.value,
            user: user
            
            
        }
        
        ).then(

            response=>{
                alert("Successful")
                
                
               
            }
        ).catch(error=>{
          
            if(error.response.status==400){
                // console.log(error.response.data.message);
                setError("Cannot be null");

            }

            else       {

                setError("Cannot be null");
            }    
            
            
        })
    }




useEffect(()=>{

    fetch("http://localhost:8000/all-stocks")
    .then(res=>res.json())
    .then(
        (result)=>{

            setItems(result);
         
        }


  )
},
[])


    return (


        <>

<div class="stock-fill-form">


{/* <input type="text" {...stockname} /> */}




Stock Name: 
<select {...stockname}  className="stockname">
<option value="">----</option>
    {items.map(item=>(
       
<option>
    {item.stockname}
</option>

    ))}


</select>

<br/>
Transaction Type:
<select {...transactiontype} className="stockname">

<option >----</option>
    <option value="Buy">Buy</option>
    <option value="Sell"> Sell</option>
</select>
<br/>
Quantity
<input type="number" {...quantity} className="form-input" />

<br/>



{/* {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br /> */}
Buying or Selling price
<input type="number" {...buyingorsellingprice} className="form-input" />




<br/>
{error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
<br/>
<button onClick={handleSubmit} className="form-submit" >Submit</button>

</div>


        </>
    );
}




const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);

   
    const handleChange = e => {
      setValue(e.target.value);
    }
    return {
      value,
      onChange: handleChange
    }
  }
export default StockForm;