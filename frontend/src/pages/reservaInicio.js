import React from "react";
import {Button} from '@mui/base/Button';
import { Link } from 'react-router-dom';

const reservainicio = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1>ReservaCIn</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <p>Selecione o tipo de reserva:</p>
                </div>
            </div>
            <Link to="/reservaEquipamento/equipamentos"><Button>Reservas de equipamento</Button></Link>
        </div>
    );
}

export default reservainicio;