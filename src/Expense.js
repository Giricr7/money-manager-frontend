import { Expenses } from './custStyle'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import { RingLoader } from "react-spinners"
import { css } from "@emotion/react";
import swal from 'sweetalert'
const url = 'https://money-manager-backend-srvr.herokuapp.com/expense'


function Expense() {

    var [Type, setType] = useState('Mortgage or Rent');
    var [Amount, setAmount] = useState('');
    var [Description, setDescription] = useState('');
    var [Division, setDivision] = useState('Personal Expense');
    let Day = new Date().toLocaleDateString();
    let Time = new Date().toLocaleTimeString();
    let expTime = Date.now() + 43200000;
    let [loading, setLoading] = useState(false);

    const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    direction:column;
    justify-content:center;
    align-items:center;
  `;

    function resetData()
    {
        setType('Monthly Income');
        setAmount('');
        setDescription('');
        setDivision('Personal Expense');
    }

    let submitData = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            if (Type!=='' && Amount!=='' && Description!=='' && Division!=='') {
                const res = await axios.post(url, { Type, Amount, Description,Division, Day,Time,expTime});
                if (res) {
                    setLoading(false)
                    swal("Success!", "Data Added Successfully!", "success");
                    resetData()
                    e.target.reset();
                }
            } else {
                setLoading(false)
                swal("Error!","Fill the required fields", "warning");
            }
            }catch (err) {
            console.log('server error');
        }
        
    }

    return (
        
        <>
            {loading ? <div className="App"> <RingLoader color={"blue"} loading={loading} css={override} size={60} /></div> :
                <div className="expense-div">
                    <h1>ADD NEW EXPENSE</h1>
                    <hr></hr>
                    <div className="card expense-items">
                        <div >
                            <form onSubmit={submitData}>
                            
                                <label>Division</label><br></br>
                                <select onChange={(e) => { setDivision(e.target.value) }}>
                                    <option>Personal Expense</option>
                                    <option>Official Expense</option>
                                </select><br></br><br></br><br></br>

                                <label>Type</label><br></br>
                                <select onChange={(e) => { setType(e.target.value) }}>
                                    {
                                        Expenses.map((exp) => <option>{exp}</option>)
                                    }
                                </select><br></br><br></br><br></br>
                        
                                <label>Enter the Amount in-(Rs.)</label><br></br>
                                <input
                                    className='exp-inp'
                                    type='number'
                                    onChange={(e) => { setAmount(e.target.value) }}
                                    onInput={(e) => {
                                        e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 12)
                                    }}
                                ></input><br></br><br></br><br></br>
                        
                                <label>Description</label><br></br>
                                <textarea
                                    className='exp-inp'
                                    type='text'
                                    onChange={(e) => { setDescription(e.target.value) }}
                                    maxLength={100}
                                ></textarea><br></br><br></br><br></br>
                            
                                <label>Transaction Date & Time</label>

                                <p >{Day}-{Time}</p><br></br><br></br>


                                <input className='btn btn-success' type='submit' value='Add Transaction' ></input>
                                &nbsp;&nbsp;
                                <Link to='/income' >Go to Income</Link>
                                <br></br><br></br><br></br>
                            
                            

                            </form>
                    
                        </div>
                    </div>
                
                

                </div>

            }
        </>
    )
}



export default Expense;

