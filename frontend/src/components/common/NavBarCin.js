import React from 'react';
import { Link } from 'react-router-dom'; // Importar o componente Link
import Cookie from 'js-cookie';
import '../../style/NavBarCin.css';
import logo from '../../assets/CIn_logo.png'; // Importe a imagem

const NavBarCin = ({ toggleUserBox, bgColor }) => {
  const initial = Cookie.get('nome')?.charAt(0).toUpperCase() || 'U';

  return (
    <nav className="navbar-cin">
        <div className="navbar-content-cin">
            <img src={logo} alt="Logo" className="logo-image-cin"/>
            <span className="website-name">Reservas CIn</span>
            <ul className="navbar-list-cin">
                <li className="navbar-item-cin"><a href="#home" className="navbar-link"><i className="fas fa-home"></i> Home</a></li>
                <li className="navbar-item-cin"><a href="#services" className="navbar-link"><i className="fas fa-user"></i> Perfil</a></li>
                <li className="navbar-item-cin"><a href="/disciplines" className="navbar-link"><i className="fas fa-book"></i> Disciplinas</a></li>
                <li className="navbar-item-cin"><a href="/events" className="navbar-link"><i className="fas fa-calendar"></i> Eventos</a></li>
            </ul>
        </div>
      </nav>
  );
};

export default NavBarCin;
