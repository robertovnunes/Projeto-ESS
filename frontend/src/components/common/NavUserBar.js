// src/components/layout/BaseLayout.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookie from 'js-cookie';
// import { useColor } from '../../context/userColorContext'; 
import NavBarCin from './NavBarCin';
// import UserBox from './UserBox';
import '../../style/NavBarCin.css'; 
// import '../../style/UserBox.css';

const NavUserBar = ({ children }) => {
  const [showUserBox, setShowUserBox] = useState(false);
//   const { bgColor } = useColor(); 
  const bgColor = 'blue';
  const userType = Cookie.get('userType') || 'Desconhecido';
  const navigate = useNavigate();

//   useEffect(() => {
//     if (userType === 'Desconhecido') {
//       navigate('/login');
//     }
//   }, [userType, navigate]);

  const toggleUserBox = () => {
    setShowUserBox(!showUserBox);
  };

  return (
    <div className="base-container">
      {/* <UserBox showUserBox={showUserBox} bgColor={bgColor} /> */}
      <NavBarCin toggleUserBox={toggleUserBox} bgColor={bgColor} />
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default NavUserBar;