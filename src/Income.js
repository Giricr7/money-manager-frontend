
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import swal from 'sweetalert'

const url='https://money-manager-backend-srvr.herokuapp.com'

function Income() {

    var [Type, setType] = useState('Monthly Income');
    var [Amount, setAmount] = useState('');
    var [Description, setDescription] = useState('');
    let Day = new Date().toLocaleDateString();
    let Time = new Date().toLocaleTimeString();
    let expTime = Date.now() + 43200000;
    
    function resetData()
    {
        setType('Monthly Income');
        setAmount('');
        setDescription('');
    }
   
    let submitData = async (e) => {
        e.preventDefault();
        try {
            if (Type!=='' && Amount!=='' && Description!=='')
            {
                const res = await axios.post(url, { Type, Amount, Description, Day,Time,expTime });
                console.log(res);
                if (res) {
                    swal("Success!", "Data Added Successfully!", "success");
                    resetData()
                    e.target.reset();
                }
              
                
            }else {
                swal("Error!","Fill the required fields", "warning");
            }
            }catch (err) {
            console.log('server error');
        }
        
    }

    
    return (
    
        <>

            <div className="income-div">
                <h1>ADD NEW INCOME</h1>
                <hr></hr>
                <div className="card income-items">
                <div >
                        <form onSubmit={submitData }>

                        <label>Type</label><br></br>
                        <select onChange={(e)=>{setType(e.target.value)}}>
                            <option>Monthly Income</option>
                            <option>Business Income</option>
                        </select><br></br><br></br><br></br>
                        
                        <label>Enter the Amount in-(Rs.)</label><br></br>
                            <input
                                className='inc-inp'
                                type='number'
                                onChange={(e)=>{setAmount(e.target.value)}}
                                onInput = {(e) =>{
                                e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,12)
                                }}
                        ></input><br></br><br></br><br></br>
                        
                        <label>Description</label><br></br>
                            <textarea
                                className='inc-inp'
                                type='text'
                                maxLength={100}
                                onChange={(e)=>{setDescription(e.target.value)}}
                                ></textarea><br></br><br></br><br></br>
                            
                            <label>Transaction Date & Time</label>

                            <p id='date'>{Day}-{Time }</p><br></br><br></br>


                            <input className='btn btn-success' type='submit' value='Add Transaction' ></input>
                            &nbsp;&nbsp;
                                <Link to='/expense' >Go to Expense</Link>
                            <br></br><br></br><br></br>
                            
                           

                        </form>
                    
                </div>
                </div>
                
                

          </div>  



        </>
            )


}

export default Income