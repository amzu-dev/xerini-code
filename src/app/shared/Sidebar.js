import React from 'react';
import { Link, useHistory, withRouter } from 'react-router-dom';
import { Dropdown, Button } from 'react-bootstrap';
import { Trans } from 'react-i18next';
import { LOGOUT, useStore } from '../../store';

function Sidebar (props){
  const {state, dispatch} = useStore();
  const history = useHistory();
    const signOut=()=> {
      dispatch({type: LOGOUT});
    }

    const isPathActive=(path)=> {
      return props.location.pathname.startsWith(path);
    }
  

    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <div className="text-center sidebar-brand-wrapper d-flex align-items-center">
          <a className="sidebar-brand brand-logo" href="/dashboard"><img style={{filter:'invert(100%)'}} src={require("../../assets/images/xerini.svg")} alt="logo" /></a>
          <a className="sidebar-brand brand-logo-mini pt-3" href="index.html"><img src={require("../../assets/images/logo-mini.svg" )} alt="logo" /></a>
        </div>
        <ul className="nav">
          <li className="nav-item nav-profile not-navigation-link">
            <div className="nav-link">
              <Dropdown>
                <Dropdown.Toggle className="nav-link user-switch-dropdown-toggler p-0 toggle-arrow-hide bg-transparent border-0 w-100">
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="profile-image">
                    <img className="img-xs rounded-circle" src={ require("../../assets/images/faces-clipart/pic-4.png")} alt="profile" />
                      <div className="dot-indicator bg-success"></div>
                    </div>
                    <div className="text-wrapper">
                      <p className="profile-name">{state.first_name} {state.other_name}</p>
                      <p className="designation">Super user</p>
                    </div>
                    
                  </div>
                </Dropdown.Toggle>
              </Dropdown>
            </div>
          </li>
      
          <li className={ isPathActive('/dashboard') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/dashboard">
              <i className="mdi mdi-television menu-icon"></i>
              <span className="menu-title"><Trans>Dashboard</Trans></span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className={isPathActive('/profile') ? 'nav-link active' : 'nav-link'} to="/profile">Profile</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/" onClick={()=>dispatch({type: LOGOUT})}>Logout</Link>
          </li>
        </ul>
      </nav>
    );

}

export default withRouter(Sidebar);