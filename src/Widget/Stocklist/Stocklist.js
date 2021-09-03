import React, { Component } from 'react';
import Select from "react-select";
import axios from "axios";

class Stocklist extends Component{


    constructor(props){

        super(props);
        this.state={

            selectOptions:[],
            id: "",
           stockname:""
        }



    }


    async getOptions(){

        const res=await axios.get("http://localhost:8000/all-stocks")
        const data=res.data
        
        const options=data.map((d)=>(

            {

                value: d.id,
                label:d.stockname
            }
        ))

        this.setState({selectOptions:options})
    }

    handleChange=(e)=>{
        this.setState({id:e.value,stockname:e.label})
    }


    componentDidMount(){

        this.getOptions();
    }


    
render(){
   
   
    return(

        <>
<div>

    <Select
    options={this.state.selectOptions}
    onChange={this.handleChange.bind(this)}
   
    
    />

    <p>
        Yout slect <strong>{this.state.stockname}</strong>

        
    </p>

   
</div>

        </>
    );
}
}
export default Stocklist;
