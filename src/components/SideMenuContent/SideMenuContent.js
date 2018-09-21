import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/NRLogo.png';
import './SideMenuContent.css';

const renderUserDetails = user => {
  if (user) {
    return (
      <div className="user-detail">
        <label>Logged in as:</label>
        <div>
          {user.firstName} {user.lastName}
        </div>
        <div>{user.email}</div>
      </div>
    );
  }
  return <div className="user-detail" />;
};

const SideMenuContent = props => (
  <div className="SideMenuContent">
    <div className="flex-container">
      <div className="menu-top">
        <img src={logo} alt="logo" />
        {renderUserDetails(props.user)}
      </div>
      <Link to="/" className="menu-item" onClick={() => props.setMenuOpen(false)}>
        <i className="fa fa-circle" />Page 1
      </Link>
      <Link to="/page2" className="menu-item" onClick={() => props.setMenuOpen(false)}>
        <i className="fa fa-circle" />Page 2
      </Link>
      <div className="app-version">v0.1.0.</div>
    </div>
  </div>
);

export default SideMenuContent;
