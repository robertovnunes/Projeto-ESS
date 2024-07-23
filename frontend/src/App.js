import logo from './assets/logo.svg';
import './App.css';
import { Link } from 'react-router-dom';
import Navbar from "./components/navbar/navbar";


import React from "react";
import {Button} from "@mui/base/Button";

function App() {
    return (
        <div className="App">
            <Navbar/>
        </div>
    );
}

export default App;
