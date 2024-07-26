import logo from './assets/logo.svg';
import './App.css';
import React from 'react';

import axios from 'axios';
import {ColorProvider} from "./context/userColorContext";
import {RouterProvider} from "react-router-dom";
import router from "./routes/routes";

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
