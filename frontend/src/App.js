import logo from './assets/logo.svg';
import './App.css';
import React from 'react';

import {ColorProvider} from "./context/userColorContext";
import {RouterProvider} from "react-router-dom";
import router from "./routes/routes";

import axios from 'axios';

// Defina a URL base para todas as requisições Axios
axios.defaults.baseURL = 'http://localhost:3001';

function App() {
    return (
        <div className="App">
            <ColorProvider>
                <RouterProvider router={router} />
            </ColorProvider>
        </div>
    );
}

export default App;
