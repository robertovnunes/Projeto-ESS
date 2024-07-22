import React from 'react';
import { Link } from 'react-router-dom'; // Importar o componente Link
import Cookie from 'js-cookie';
import '../../style/NavBar.css';
import logo from '../../assets/CIn_logo.png'; // Importe a imagem

const NavBar = ({ toggleUserBox, bgColor }) => {
  const initial = Cookie.get('nome')?.charAt(0).toUpperCase() || 'U';

  return (
    <div className="navbar">
      <Link to="/mainpage" className="left-icon-link"> {/* Link para a página principal */}
        <div className="left-icon">
          <img src={logo} alt="Ícone Esquerdo" /> {/* Use a imagem importada */}
          <span className="reservas-cin">Reservas Cin</span>
        </div>
      </Link>
      <div className="user-icon" style={{ backgroundColor: bgColor }} onClick={toggleUserBox}>
        {initial}
      </div>
    </div>
  );
};

export default NavBar;
