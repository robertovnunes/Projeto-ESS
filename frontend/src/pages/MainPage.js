import React, { useEffect, useState } from 'react';
import '../style/MainPage.css'; // Importe o arquivo CSS

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const MainPage = () => {
  const [bgColor, setBgColor] = useState('#000');

  useEffect(() => {
    setBgColor(getRandomColor());
  }, []);

  // Supondo que o nome do usuário seja 'Juliana Silva'
  const userName = 'Juliana Silva';
  const initial = userName.charAt(0).toUpperCase();

  return (
    <div className="main-container">
      <div className="navbar">
        <div className="left-icon">
          <img src="https://lh4.googleusercontent.com/UWBMt17Qkq10a7DcQ1lxWGriFmMY1ZHUiNDHoYcenrPcOFPdjbBwbM94TW_mF21UIqq3x_rbHm1SeSadxggm56w=w16383" alt="Ícone Esquerdo" />
        </div>
        <div className="user-icon" style={{ backgroundColor: bgColor }}>
          {initial}
        </div>
      </div>
      <div className="content">
        <div className="card">
          <h2 style={{ marginBottom: '20px' }}>Página Principal</h2>
          <p>Bem-vindo à página principal do site!</p>
          <p>Aqui você pode colocar o conteúdo que desejar para os usuários logados.</p>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
