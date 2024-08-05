import React, {useEffect} from 'react';
import Button from '../../../components/common/Button';
import {useNavigate} from 'react-router-dom';
import Cookie from "js-cookie";
import BaseLayout from "../../../components/common/BaseLayout";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import '../../../style/container.css';

const ManageEquipamentos = () => {
    const userType = Cookie.get('userType') || 'Desconhecido';
    const navigate = useNavigate();

    useEffect(() => {
        if (userType === 'Desconhecido') {
            navigate('/login');
        } if (userType !== 'admin') {
            navigate('/mainpage');
        }

    }, [userType, navigate]);

    const HandleNavigation = (path) => {
        const url = `/equipamentos/manage/${path}`;
        navigate(url); // Redireciona para o caminho especificado
    };

    const handleNavigateToSearch = () => {
        navigate('/equipamentos/manage/buscar', { state: { hideRemoveButton: false } });
    };

    return (
        <BaseLayout>
            <div className='admin-page'>
                <div className='content-container'>
                    <div className='header-container'>
                        <button className="back-button" onClick={() => navigate('/equipamentos')}>
                            <FontAwesomeIcon icon={faArrowLeft}/>
                        </button>
                        <h2>Gerenciar Equipamentos</h2>
                    </div>
                    <div className='button-container'>
                        <Button className="adicionar" onClick={() => HandleNavigation('adicionar')} >
                            Adicionar equipamento
                        </Button>
                    </div>
                    <div className='button-container'>
                        <Button className="buscar" onClick={() => handleNavigateToSearch()} >
                            Editar ou remover Equipamento
                        </Button>
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
};

export default ManageEquipamentos;