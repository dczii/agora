import React from "react";
import { Menu as Nav, Icon, Button } from "element-react";
import { NavLink } from 'react-router-dom';

const Navbar = ({ user, signOut }) => (
  <Nav mode='horizontal' theme='dark' defaultActive='1'>
    <div className="nav-container">
      {/* App Title  */}
      <Nav.Item index='1'>
        <NavLink to='/' className='nav-link'>
          <span className='app-title'>
            <img src='https://icon.now.sh/account_balance/f90' alt='App icon' className='app-icon'/>
            Amplify Agora
          </span>
        </NavLink>
      </Nav.Item>

      {/* Navbar items */}
      <div className="nav-items">
        <Nav.Item index='2'>
          <span className="app-user">Hello, { user.username  }</span>
        </Nav.Item>
        <Nav.Item index='3'>
          <NavLink to='/profile' className='nav-link'>
            <Icon name='setting'/>
            Profile
          </NavLink>
        </Nav.Item>
        <Nav.Item index='4'>
          <Button type='warning' onClick={signOut}>Sign Out</Button>
        </Nav.Item>

      </div>
    </div>
  </Nav>
);


export default Navbar;
