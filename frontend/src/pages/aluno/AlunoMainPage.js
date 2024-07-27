// src/pages/StudentPage.js

import React from 'react';
import Button from "../../components/common/Button";

const StudentPage = () => {

    const consultarEquipamentos = () => {
        console.log('Consultar equipamentos');
    }
    return (
        <div className="student-page">
          <h2>Bem-vindo, Aluno!</h2>
          <p>Conteúdo específico para alunos.</p>
            <Button className='btn-consultar' onClick={consultarEquipamentos()}>
                Equipamentos e Reservas
            </Button>
        </div>
    );
};

export default StudentPage;
