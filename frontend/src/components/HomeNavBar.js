import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const navStyle = {
    position: 'fixed',
    top: 0,
    width: '100%',
    backgroundColor: '#DB1E2F',
    color: 'white',
    padding: '14px 0',
    textAlign: 'right',
    zIndex: 1000
  };

  const ulStyle = {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
  };

  const liStyle = {
    display: 'inline',
    marginRight: '20px'
  };

  const linkStyle = {
    color: '#fff',
    textDecoration: 'none'
  };

  return (
    <nav style={navStyle}>
      <ul style={ulStyle}>
        <li style={liStyle}>
          <Link to="/login" style={linkStyle}>Login</Link>
        </li>
        {/* Adicione mais links conforme necessário */}
      </ul>
    </nav>
  );
};

export default Navbar;