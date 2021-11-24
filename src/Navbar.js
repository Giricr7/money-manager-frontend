import {Link} from 'react-router-dom'
function navbar() {
    return (
        
        <>
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <Link to='/'className="navbar-brand"><i className="bi bi-cash-coin "></i></Link>
                    <p>Money Manager</p>
                    <form className="d-flex">
                            <Link to='/'><button className="btn btn-outline-primary home-btn" type="submit">Home</button></Link>
                            <Link to='/dashboard'><button className="btn btn-outline-primary home-btn" type="submit">Dashboard</button></Link>
                </form>
             </div>
            </nav>
      
         </>


    )
}


export default navbar