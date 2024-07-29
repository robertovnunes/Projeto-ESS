import React, {useEffect} from 'react';
import Button from '../../../components/common/Button';
import {useNavigate} from "react-router-dom";
import Cookie from "js-cookie";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import '../../../style/container.css';

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
    };

    const handleHomeNavigation = () => {
        navigate('/mainpage'); // Redireciona para a página principal
    };

    return (
        <div className='admin-page'>
            <div className='content-container'>
                <div className='header-container'>
                    <button className="back-button" onClick={() => handleHomeNavigation()}>
                        <FontAwesomeIcon icon={faArrowLeft}/>
                    </button>
                    <h2>Equipamentos (Administrador)</h2>
                </div>
                <div className='button-container'>
                    <Button className='btn-consultar' onClick={() => loadPage('/equipamentos/search')}>
                        Consultar equipamentos
                    </Button>
                    <Button className='btn-manage' onClick={() => loadPage('/equipamentos/manage')}>
                        Gerenciar equipamentos
                    </Button>
                    <Button className='btn-reservar' onClick={() => loadPage('/reservas/equipamentos')}>
                        Consultar/cancelar reserva de equipamento
                    </Button>
                    <Button className="btn-manutencao" onClick={console.log('maintenance')}>
                        Solicitar manutenção de equipamento
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default MainEquipamentos;