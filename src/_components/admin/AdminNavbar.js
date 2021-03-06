import React from 'react';
import '../styles/admin/AdminNavbar.css';
import { Link, withRouter } from 'react-router-dom';
import Logout from '../common/Logout';
import { connect } from 'react-redux';

const AdminNavbar = (props) =>  {
    return(
        <div className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between">
            <div className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div><Link className="navbar-brand" to="/admin">Panda Diary <br></br>Management System</Link></div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-item nav-link" to="/admin/user">
                            User Management
                        </Link>
                        <Link className="nav-item nav-link" to="/admin/diary">
                            Diary Management 
                        </Link>  
                        <Link className="nav-item nav-link" to="/admin/report">
                            Reports
                        </Link>   
                    </div>
                </div>
            </div>
            {
                props.user? <Logout /> : <div></div>
            }
        </div>
    );
}

const mapStateToProps = (state) => {
    return{
        user: state.authentication.user
    }
}

export default withRouter(connect(mapStateToProps)(AdminNavbar));