import axios from "axios";
import { useState } from "react";
import swal from 'sweetalert';
import Modal from 'react-modal';
import EditData from "./EditData";

const url = 'https://money-manager-backend-srvr.herokuapp.com';


function HistoryCard(props) {

    const [modalIsOpen, setIsOpen] = useState(false);
    
    function openModal() {
        setIsOpen(true);
      }
      function closeModal() {
        setIsOpen(false);
    }
    
    const CustomStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: '5%',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
    };

//     function handleEdit() {
       
       


//    }
    
    // deleting the data
    function handleDelete(details) {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this data!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then(async(willDelete) => {
              if (willDelete) {
                  if (!details.Division) {
                      await axios.delete(`${url}/income_dashboard/${details._id}`);
                  } else {
                      await axios.delete(`${url}/expense_dashboard/${details._id}`);
                  }
                  
                  swal("Done! Your data has been deleted!", {
                    icon: "success",
                  }).then(() => {
                    window.location.reload(false);
                  })
                  
            } 
          });
       
   }

    return (
        
        <>
            
            <div className='card history-content' style={{'background':'#ECEFF1'}}>
                <div className='row' style={{ padding: '3%', 'padding-bottom':'0%'}}>
                                        <div  className='col'>
                        <h2 style={{ 'color': `${props.color}` }}>Rs.{ props.symbol}{props.details.Amount.replace(/\B(?=(\d{3})+(?!\d))/g, ",") }</h2>
                                        </div>
                                        <div  className='col'>
                        <h4 style={{ color: 'brown' }}> Date: </h4>
                        <h5 style={{ color: 'black' }}>{`${props.details.Day}(${props.details.Time})`}</h5>
                                        </div>
                                        <hr style={{color:'black'}}></hr>
                                    </div>
                                    <div className='row'>
                                        <div className='row'>
                                             {
                                               (()=>{if(props.details.Division)
                                                   return (
                                                    <div>
                                                    <h6 style={{color:'brown'}}>Division</h6>
                                                    <h4 style={{ color: 'black' }}>{ props.details.Division}</h4>
                                                    </div>
                                                   )})()
            
                                                }
                                            <div>
                                                <h6 style={{color:'brown'}}>Type</h6>
                                                <h4 style={{ color: 'black' }}>{ props.details.Type}</h4>
                                            </div>
                                        </div>
                    
                                        <div className='row'>
                                        <h6 style={{ color: 'brown' }}>Description</h6>
                                         <div className='dscrptn'>
                                         <h4 style={{ color: 'black' }}>{ props.details.Description}</h4>
                                        </div>
                                            
                                        </div>
                                        <div className='col d-flex'>
                        <i className="bi bi-pencil-square edit-btn" hidden={props.details.expTime <= Date.now()} onClick={openModal}></i>&nbsp;&nbsp;
                        <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={closeModal}
                            style={CustomStyles}
                        >
            
                            <i className="bi bi-x-circle-fill close-btn" onClick={closeModal}></i>
                               <div className='Edit-modal'>
                                <EditData details={props.details} modal_close={closeModal }/>
                                </div>
                                
                        </Modal>
                                            <i className="bi bi-trash del-btn" onClick={(e) => { handleDelete(props.details) }}></i>
                                        </div>
                    
                                        </div>
                                    

                        </div>
            
        </>

    )


}


export default HistoryCard;