import React, { useState } from "react";
import axios from "axios";
import {setUserSession, getToken} from "../utils/Common";

import "../Login/Login.css";
function Login(props){
const username=useFormInput("");
const password=useFormInput("");
const [error, setError]=useState(null);



const token=getToken();
if (token!==null && token !==undefined){
  props.history.push('/homepage');

}


const handleLogin=()=> {
    
    axios.post('http://localhost:8000/login',
     { username: username.value, password: password.value })
     .then(response => {
     
      setUserSession(response.data.accessToken, response.data.username);
      console.log(response)
      props.history.push('/homepage');
    }).catch(error => {
    
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });

}

    return (

<>
<div className="login">


<form 
 onSubmit={e => {
  e.preventDefault();
  handleLogin(e);

}}>
      <div>
        Username<br />
        <input type="text" {...username} className="login-input" />
      </div>
      <div style={{ marginTop: 10 }}>
        Password<br />
        <input type="password" {...password}  className="login-input"  />
      </div>
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <input type="submit"  value="Login" onClick={handleLogin} className="login-button" /><br />
    
      </form>
    </div>
</>

    )
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
export default Login;
