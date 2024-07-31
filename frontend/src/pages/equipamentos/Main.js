import React, {useEffect} from 'react';
import BaseLayout from "../../components/common/BaseLayout";
import EquipmentAdmin from "../equipamentos/admins/EquipmentPage";
import EquipmentAluno from "../equipamentos/alunos/EquipmentPage";
import Cookie from "js-cookie";
import {useNavigate} from "react-router-dom";
import './styles/Main.css';



const MainEquipment = () => {
    const userType = Cookie.get('userType') || 'Desconhecido';
    const navigate = useNavigate();

    useEffect(() => {
        if (userType === 'Desconhecido') {
            navigate('/login');
        }

    }, [userType, navigate]);

    let SpecificPage;
    if (userType === 'aluno') {
        SpecificPage = EquipmentAluno;
    } else if (userType === 'admin') {
        SpecificPage = EquipmentAdmin;
    } else {
        SpecificPage = null;
    }

    return (
        <BaseLayout>
            <div className="main-content">
                {SpecificPage && <SpecificPage/>}
            </div>
        </BaseLayout>
    );
};

export default MainEquipment;
