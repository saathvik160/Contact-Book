import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div>
        <ul className="navbar">
          <li className="left"><h3 className="header">My Contact Book</h3></li>
          <li className="nav"><NavLink to="/add">Add New Contact</NavLink></li>
          <li className="nav"><NavLink to="/" activeClassName="active">View All Contacts</NavLink></li>
        </ul>
      </div>
    );
  }
}

export default Header;
