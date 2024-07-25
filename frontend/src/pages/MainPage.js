// src/pages/MainPage.js

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookie from 'js-cookie';
import StudentPage from './aluno/AlunoMainPage';
import TeacherPage from './professor/ProfessorMainPage';
import AdminPage from './administrador/AdminMainPage';
import BaseLayout from '../components/common/BaseLayout';

const MainPage = () => {
  const userType = Cookie.get('userType') || 'Desconhecido';
  const navigate = useNavigate();

  useEffect(() => {
    if (userType === 'Desconhecido') {
      navigate('/login');
    }
  }, [userType, navigate]);

  let SpecificPage;
  if (userType === 'aluno') {
    SpecificPage = StudentPage;
  } else if (userType === 'professor') {
    SpecificPage = TeacherPage;
  } else if (userType === 'admin') {
    SpecificPage = AdminPage;
  } else {
    SpecificPage = null;
  }

  return (
    <BaseLayout>
      <div className="main-content">
        {SpecificPage && <SpecificPage />}
      </div>
    </BaseLayout>
  );
};

export default MainPage;
