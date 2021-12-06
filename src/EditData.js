import { Expenses,Income } from './custStyle'
import axios from 'axios'
import { HashLoader } from "react-spinners"
import { css } from "@emotion/react";
import { useState } from 'react'
import swal from 'sweetalert'
const url = 'https://money-manager-backend-srvr.herokuapp.com';

function EditData(props) {

    var [Type, setType] = useState(props.details.Type);
    var [Amount, setAmount] = useState(props.details.Amount);
    var [Description, setDescription] = useState(props.details.Description);
    var [Division, setDivision] = useState(props.details.Division);
    let Day = new Date().toLocaleDateString();
    let Time = new Date().toLocaleTimeString();
    let [loading, setLoading] = useState(false);
    
    const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    direction:column;
    justify-content:center;
    align-items:center;
  `;

    let updateData = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            if (props.details.Division) {
                if (Type !== '' && Amount !== '' && Description !== '' && Division !== '') {
                    const res = await axios.patch(`${url}/expense/${props.details._id}`, { Type, Amount, Description, Division, Day, Time });
                    const expense = await axios.get(`${url}/expense`);
                    props.setExpense(expense.data.reverse());
                    if (res && expense) {
                        setLoading(false)
                        swal("Success!", "Data Updated Successfully!", "success").then(() => {
                            props.modal_close()
                        
                        })
                    }
                } else {
                    setLoading(false)
                swal("Error!","Fill the required fields", "warning");
                }
            } else {
                if (Type !== '' && Amount !== '' && Description !== '') {
                    const res = await axios.patch(`${url}/income/${props.details._id}`, { Type, Amount, Description, Day, Time });
                    const income = await axios.get(`${url}/income`);
                    props.setIncome(income.data.reverse());
                    if (res && income) {
                        setLoading(false)
                        swal("Success!", "Data Updated Successfully!", "success").then(() => {
                            props.modal_close()
                        })
                    }
                } else {
                    setLoading(false)
                    swal("Error!","Fill the required fields", "warning");
                    }

            }
            }catch (err) {
            console.log(err);
        }
        
    }

    return (
        
        <>
            {loading?<div className="App"> <HashLoader color={"blue"} loading={loading} css={override} size={60} /></div>:
                <div className="Edit-div">
                <h1>EDIT TRANSACTION</h1>
                <hr></hr>
                <div className="card expense-items">
                <div >
                        <form onSubmit={updateData}>
                        
                            {
                                (() => {
                                        if (props.details.Division) {
                                            return (<>
                                                <label>Division</label><br></br>
                                                <select onChange={(e) => { setDivision(e.target.value) }} value={Division}>
                                                <option>Personal Expense</option>
                                                <option>Official Expense</option>
                                                </select><br></br><br></br><br></br>
                                            </>)
                                        }
                                    })()
                        }    
                        

                        <label>Type</label><br></br>
                        <select onChange={(e)=>{setType(e.target.value)}} value={Type}>
                                {
                                    (() => {
                                        if (props.details.Division) {
                                            return  Expenses.map((exp)=><option>{exp}</option>)
                                        } else {
                                            return  Income.map((exp)=><option>{exp}</option>)
                                        }
                                    })()
                                    
                                 }
                        </select><br></br><br></br><br></br>
                        
                        <label>Enter the Amount in-(Rs.)</label><br></br>
                            <input
                                className='exp-inp'
                                type='number'
                                onChange={(e) => { setAmount(e.target.value) }}
                                value={Amount}
                                onInput = {(e) =>{
                                e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,12)
                                }}
                            ></input><br></br><br></br><br></br>
                        
                        <label>Description</label><br></br>
                            <textarea
                                className='exp-inp'
                                type='text'
                                onChange={(e)=>{setDescription(e.target.value)}}
                                maxLength={100}
                                value={Description}
                                ></textarea><br></br><br></br><br></br>
                            
                            <label>Transaction Date & Time</label>

                            <p >{Day}-{Time }</p><br></br><br></br>


                            <input className='btn btn-success' type='submit' value='Update Transaction' ></input>
                            &nbsp;&nbsp;
                            <br></br><br></br><br></br>
                            
                            

                        </form>
                    
                </div>
                </div>
                
                

          </div>  
   
}


        </>
    )
}



export default EditData;
