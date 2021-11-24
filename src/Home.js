import Modal from 'react-modal'
import { useState } from 'react'
import { CustomStyles } from './custStyle'
import { Link } from 'react-router-dom'



function Home() {
    const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

    return (
      <>
        {/* add btn */}
            <div className='col d-flex'>
                
            <div className='content-div'>
                <i className="bi bi-coin main-logo"></i>
                <h1 style={{'padding-left':'3%'}}>"Every time you borrow money, you're robbing your future self" ― Nathan W. Morris</h1>
            </div>
            <div className='home-div'>
                <button type="button" className="btn btn-outline-primary add-btn" onClick={openModal}><i className="bi bi-file-earmark-plus-fill"></i> ADD</button>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                  style={CustomStyles}
                >
       
                <i className="bi bi-x-circle-fill close-btn" onClick={closeModal}></i>
                               <div className='modal-btn-div'>
                                <Link to='/income'><button type="button" className="btn btn-outline-success inc-btn"><i className="bi bi-wallet-fill inc-logo"></i> Income</button></Link><br></br><br></br>
                                <Link to='/expense'><button type="button" className="btn btn-outline-danger exp-btn"><i className="bi bi-cash-stack exp-logo"></i> Expense</button></Link>
                                </div>
                                
                </Modal>
            </div>


            </div>
            
            

        </>
    )
}



export default Home;