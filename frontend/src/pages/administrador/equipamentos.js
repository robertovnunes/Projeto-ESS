// src/pages/EquipmentPage.js

import React from 'react';
import '../../style/admin/equipamentos.css'; // Adicione o CSS correspondente
import MainEquipments from '../../pages/equipamentos/Main';

const EquipmentPage = () => {

    return (
        <div>
            <MainEquipments role="admin" />
        </div>
    );
};

export default EquipmentPage;
