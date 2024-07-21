import React from 'react';
import Navbar from '../components/HomeNavBar';
import '../style/Home.css'; // Importe o CSS

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div className="content">
        <h1>Bem-vindo!</h1>
      </div>
    </div>
  );
};

export default Home;
