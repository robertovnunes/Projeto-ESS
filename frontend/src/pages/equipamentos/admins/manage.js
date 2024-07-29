import React, {useEffect} from 'react';
import Button from '../../../components/common/Button';
import {useNavigate} from 'react-router-dom';
import Cookie from "js-cookie";
import BaseLayout from "../../../components/common/BaseLayout";

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

    return (
        <BaseLayout>
            <div className='container'>
                <Button className='btn-adicionar' onClick={() => HandleNavigation('adicionar')}>
                    Adicionar equipamento
                </Button>
            </div>
        </BaseLayout>
    );
};

export default ManageEquipamentos;