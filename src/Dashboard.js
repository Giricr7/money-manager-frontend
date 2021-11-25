import {Expenses,Income,weekFirstDayInMilliSeconds, weekLastDayInMilliSeconds, monthFirstDayInMilliSeconds,
    monthLastDayInMilliSeconds,yearFirstDayInMilliSeconds} from './custStyle'
import axios from 'axios'
import HistoryCard from './historyCard'
import { useState, useEffect } from 'react'
import swal from 'sweetalert'
const url='https://money-manager-backend-srvr.herokuapp.com'
    
  function Dashboard() {

     
     var [income_data, setIncomeData] = useState([]);
     var [expense_data, setExpenseData] = useState([]);
     var [fetched_income, setFetchedIncome] = useState([]);
     var [fetched_expense, setFetchedExpense] = useState([]);
     const [filterPeriod, setFilterPeriod] = useState('Select');
     const [filterDivision, setFilterDivision] = useState('Select');
     const [filterExpenseType, setFilterExpenseType] = useState('Select');
     const [filterIncomeType, setFilterIncomeType] = useState('Select');
     const [filterFromDate, setFilterFromDate] = useState('');
     const [filterToDate, setFilterToDate] = useState('');


      
     
     
  
     useEffect(() =>
     {
         (async() => {
             const income = await axios.get(`${url}/income`);
             const expense = await axios.get(`${url}/expense`);
             setIncomeData(income.data);
             setExpenseData(expense.data);
             setFetchedIncome(income.data);
             setFetchedExpense(expense.data);
         })();
         
     }, [])
      
      

     let filterData = (e) => {
         e.preventDefault();
         
         if (filterPeriod === 'Select' && filterDivision === 'Select' && filterExpenseType === 'Select'
             && filterIncomeType === 'Select' && filterFromDate === '' && filterToDate === "") {
             setIncomeData(fetched_income);
             setExpenseData(fetched_expense);
         }
         else {

            
             
             switch (filterPeriod) {
    
                 case 'Weekly': {
                    let income_info = fetched_income.filter(data => {
                         return (((data.expTime - 43200000) >= weekFirstDayInMilliSeconds) &&
                             ((data.expTime - 43200000) <= weekLastDayInMilliSeconds))
                     }
                    
                     )
                     setIncomeData(income_info);

                    let  expense_info = fetched_expense.filter(data => {
                         return (((data.expTime - 43200000) >= weekFirstDayInMilliSeconds) &&
                             ((data.expTime - 43200000) <= weekLastDayInMilliSeconds))
                     })
                     setExpenseData(expense_info);
                     break;
                 }
                     
                 case 'Monthly': {
                    let income_info = fetched_income.filter(data => {
                         return (((data.expTime - 43200000) >= monthFirstDayInMilliSeconds) &&
                             ((data.expTime - 43200000) <= monthLastDayInMilliSeconds))
                     })
                     setIncomeData(income_info);

                     let expense_info= fetched_expense.filter(data => {
                         return (((data.expTime - 43200000) >= monthFirstDayInMilliSeconds) &&
                             ((data.expTime - 43200000) <= monthLastDayInMilliSeconds))
                     })

                     setExpenseData(expense_info);
                     break;
                 }
                     
                 case 'Yearly': {
                    let income_info= fetched_income.filter(data => {
                         return ((data.expTime - 43200000) >= yearFirstDayInMilliSeconds)
                     })
                     setIncomeData(income_info);

                    let expense_info = fetched_expense.filter(data => {
                         return ((data.expTime - 43200000) >= yearFirstDayInMilliSeconds)
                     })
                     setExpenseData(expense_info);

                     break;
                 }
                     
                 default: {
                     setIncomeData(fetched_income);
                     setExpenseData(fetched_expense);
                     }
                     
                     
             }


             switch (filterDivision) {
                 
                 case 'Personal Expense': {
                    let expense_info = fetched_expense.filter(data => {
                         return (data.Division === 'Personal Expense')
                     }
                     )
                     setExpenseData(expense_info);
                     break;
                 }
                     
                 case 'Official Expense': {
                   let expense_info = fetched_expense.filter(data => {
                         return (data.Division === 'Official Expense')
                     }
                     )
                     setExpenseData(expense_info);
                     break;
                 }
                     
                 default: {
                    setExpenseData(fetched_expense);
                 }
                 
             }


             switch (filterExpenseType) {
                 
                 default: {
                   
                     if (filterExpenseType !== 'Select') {
                        let expense_list = fetched_expense.filter((data) => {
                            return(data.Type === filterExpenseType)
                          })
                          setExpenseData(expense_list);
                    }
                     
                 }
                
                
             }
             
             switch (filterIncomeType) {
                
                 default: {
                    
                     if (filterIncomeType !== 'Select') {
                         let income_list = fetched_income.filter((data) => {
                             return (data.Type === filterIncomeType)
                         })
                         setIncomeData(income_list);
                     }
                 }
               
            }

             
             
             
            if (filterFromDate !== '' && filterToDate !== '')
            {
                let fromDateInMilliSec = new Date(filterFromDate).getTime() - 86400000;
                let toDateInMilliSec = new Date(filterToDate).getTime() -86400000;

                if (fromDateInMilliSec < toDateInMilliSec) {
                    
                  let income_info = fetched_income.filter(data => {
                       return (((data.expTime - 43200000) >= fromDateInMilliSec) &&
                           ((data.expTime - 43200000) <= toDateInMilliSec))
                   }
                  
                    )
                 
                    setIncomeData(income_info);
                    
                   let expense_info = fetched_expense.filter(data => {
                       return (((data.expTime - 43200000) >= fromDateInMilliSec) &&
                           ((data.expTime - 43200000) <= toDateInMilliSec))
                   })
                  
                   setExpenseData(expense_info);
                  
                } else {
                    swal("Error!", "'From' date should be less than 'To' date", "warning");
                }

            } else if (filterFromDate !== '' || filterToDate !== '')
            {
               swal("Error!", "Please provide both 'From' and 'To' dates", "warning");
            } 
             
             
        
         }


       }
    
    return (
        <>
            <div className='dash-div'>
                <h1><i className="bi bi-clipboard-data"></i>Dashboard</h1>
                <div className='card dash-content'>

                    <div className='row'>

                        
                        <div className='row' >
                            
                            
                            <div className='col'>
                            <form onSubmit={filterData}>
                            <div className='row filter-div'>
                                <p>Filter by:</p>
                                <div className='col' style={{border:'2px solid',borderTopLeftRadius:'20px',borderBottomLeftRadius:'20px'}}>
                                <div className='col' style={{borderBottom:'2px solid',paddingBottom:'5%',paddingTop:'3%'}} >
                                <label className='dash-label'>Period:</label>&nbsp;<br></br>
                                    <select value={filterPeriod} onChange={(e)=>{setFilterPeriod(e.target.value)}}>
                                    <option>Select</option>
                                    <option>Weekly</option>
                                    <option>Monthly</option>
                                    <option>Yearly</option>
                                    </select>
                                </div>
                                
                                <div className='col' style={{paddingTop:'5%'}}>
                                <label className='dash-label'>Division:</label>&nbsp;&nbsp;<br></br>
                                <select value={filterDivision} onChange={(e)=>{setFilterDivision(e.target.value)}}>
                                    <option>Select</option>
                                    <option>Personal Expense</option>
                                    <option>Official Expense</option>
                                </select>
                                </div><br></br>

                                <div className='col' style={{borderBottom:'2px solid',paddingBottom:'5%'}}>
                                <label className='dash-label'>Expense Type:</label>&nbsp;&nbsp;<br></br>
                                <select value={filterExpenseType} onChange={(e)=>{setFilterExpenseType(e.target.value)}}>
                                <option>Select</option>
                                        {
                                            Expenses.map((exp)=><option>{exp}</option>)
                                        }
                                </select>
                                </div><br></br>
                                            
                                <div className='col' style={{paddingBottom:'3%'}}>
                                <label className='dash-label'>Income Type:</label>&nbsp;&nbsp;<br></br>
                                <select value={filterIncomeType} onChange={(e)=>{setFilterIncomeType(e.target.value)}}>
                                <option>Select</option>
                                        {
                                            Income.map((exp)=><option>{exp}</option>)
                                        }
                                                </select>
                                </div><br></br>
                                            
                                </div>
                                <div className='col'  style={{border:'2px solid',borderTopRightRadius:'20px',borderBottomRightRadius:'20px'}}>
                                <div>
                                        <div className='col' style={{paddingTop:'3%'}}>
                                        <label className='dash-label'>From:  </label>&nbsp;&nbsp;<br></br>
                                            <input className='date' type='date' value={filterFromDate} onChange={(e)=>{setFilterFromDate(e.target.value)}}></input>
                                    </div><br></br>
                                        <div className='col'>
                                        <label className='dash-label'>To:  </label>&nbsp;&nbsp;&nbsp;<br></br>
                                            <input className='date' type='date' value={filterToDate} onChange={(e)=>{setFilterToDate(e.target.value)}}></input>
                                    </div>
                                            </div><br></br><br></br>
                                            
                                            <div className='d-flex' style={{ width: '100%', justifyContent: 'center' }}> <input type='submit' style={{ borderRadius: '10px', background:'green',color:'white', width:'50%'}} value='Filter' ></input></div>
                                </div>
                                
                             </div>
                                    
                                </form>
                                </div>
                                
                            </div>
                   

                        <div className='row history-container'>
                            
                           
                             <div className='history-div'>
                                 <p className='history'>Income History</p>
                                <div className='inc-hist'>
                                {                                       
                                        income_data.map((data) => {
                                            return (<><HistoryCard details={data} color={'green'} symbol={'+'} />
                                                <br></br></>)
                                          })
                                }
                                </div>
                               
                                        
                               
                      
                            </div>
                            <div className='history-div'>
                        <p className='history'>Expense History</p>
                                <div className='exp-hist'>
                                {                                       
                                        expense_data.map((data) => {
                                            return (<><HistoryCard color={'red'} symbol={'-'} details={data} /><br></br></>)
                                          })
                                }
                                    
                            </div>
                                     
                               
                      
                            </div>
                            
                    </div>

                    </div>
                    
                   
                </div>



           </div> 


        </>
      )
     
}



export default Dashboard;