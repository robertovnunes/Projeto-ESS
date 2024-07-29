import React, {useEffect} from 'react';
import Button from '../../../components/common/Button';
import {useNavigate} from "react-router-dom";
import Cookie from "js-cookie";

const MainEquipamentos = () => {

    const userType = Cookie.get('userType') || 'Desconhecido';
    const navigate = useNavigate();

    useEffect(() => {
        if (userType === 'Desconhecido') {
            navigate('/login');
        }

    }, [userType, navigate]);

    const loadPage = (page) => {
        navigate(page);
    }

    const consultarEquipamentos = () => {
        console.log('Consultar equipamentos');
    }

    const consultarReserva = () => {
        console.log('Consultar reserva de equipamento');
    };

    return (
        <div className='container'>
            <div className='menu-equipamentos'>
                <Button className='btn-consultar' onClick={() => consultarEquipamentos()}>
                    Consultar equipamentos
                </Button>
                    <Button className='btn-manage' onClick={() => loadPage('/equipamentos/manage')}>
                        Gerenciar equipamentos
                    </Button>
                <Button className='btn-reservar' onClick={consultarReserva()}>
                    Consultar/cancelar reserva de equipamento
                </Button>
                <Button className="btn-manutencao" onClick={console.log('maintenance')}>
                    Solicitar manutenção de equipamento
                </Button>
            </div>
            <div className='container'>

            </div>
        </div>
    );
}

export default MainEquipamentos;