import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/group_button.css';
import Cookie from 'js-cookie';
//import NavBarCin from '../../components/common/NavBarCin'
//import NavUserBar from '../../components/common/NavUserBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import BaseLayout from '../../components/common/BaseLayout';


const DisciplinePage = () => {
  const userType = Cookie.get('userType') || 'Desconhecido';
  const navigate = useNavigate();

  useEffect(() => {
    if (userType === 'Desconhecido') {
      navigate('/login');
    }
  }, [navigate]);

  const handleCreateDisciplineClick = () => {
    navigate('/create-discipline');
  };

  const handleEditDisciplineClick = () => {
    navigate('/disciplines-list');
  };

  const handleViewDisciplinesClick = () => {
    navigate('/discipline-view');
  };

  const handleGoBack = () => {
    navigate('/mainpage'); // Navegar para a página anterior
  };

  return (
    <BaseLayout>
    <div className="page-container">
        <div className="content-container">
            <html>
            <head>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"/>
            </head>
            <body>
                <button className="back-button" onClick={handleGoBack}>
                <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <h1>Disciplinas</h1>
                <div className="button-group">
                {userType === 'professor' || userType === 'admin' ? (
                    <>
                    <button className="group-button" onClick={handleCreateDisciplineClick}>
                        Cadastrar Nova Disciplina
                    </button>
                    <button className="group-button" onClick={handleEditDisciplineClick}>
                        Editar Disciplina Existente
                    </button>
                    </>
                ) : null}
                <button className="group-button" onClick={handleViewDisciplinesClick}>
                    Ver Disciplinas
                </button>
                </div>
            </body>
            </html>  
        </div>
    </div>
    </BaseLayout>
  );
};

export default DisciplinePage;