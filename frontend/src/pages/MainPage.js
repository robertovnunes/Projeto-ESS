// src/pages/MainPage.js

import React, { useState, useEffect } from 'react';
import NavBar from '../components/common/NavBar';
import UserBox from '../components/common/UserBox';
import '../style/MainPage.css';
import util from '../utils/functions';

const MainPage = () => {
  const [showUserBox, setShowUserBox] = useState(false);
  const [bgColor, setBgColor] = useState('#000');

  useEffect(() => {
    setBgColor(util.getRandomColor());
  }, []);

  const toggleUserBox = () => {
    setShowUserBox(!showUserBox);
  };

  return (
    <div className="main-container">
      <NavBar toggleUserBox={toggleUserBox} bgColor={bgColor} />
      <UserBox showUserBox={showUserBox} bgColor={bgColor} />
      <div className="content">
        <div className="card">
          <h2 style={{ marginBottom: '20px' }}>Página Principal</h2>
          <p>Bem-vindo à página principal do site!</p>
          <p>Acho que deve aparecer as reservas do usuário.</p>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
