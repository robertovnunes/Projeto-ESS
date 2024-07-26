// src/contexts/ColorContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import util from '../utils/functions';

const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
  const [bgColor, setBgColor] = useState('#000');

  const updateColor = () => {
    setBgColor(util.getRandomColor());
  };

  // Atualize a cor quando o componente é montado
  useEffect(() => {
    updateColor();
  }, []);

  return (
    <ColorContext.Provider value={{ bgColor, updateColor }}>
      {children}
    </ColorContext.Provider>
  );
};

export const useColor = () => useContext(ColorContext);
