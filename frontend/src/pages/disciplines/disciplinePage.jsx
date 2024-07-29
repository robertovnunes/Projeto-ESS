import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//import '../../style/disciplines/disciplinesPage.css';
import Cookie from 'js-cookie';
import NavBarCin from '../../components/common/NavBarCin'
import NavUserBar from '../../components/common/NavUserBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';



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
    navigate('/'); // Navegar para a página anterior
  };

  return (
    <html>
    <head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"/>
    </head>
    <body>
      <NavUserBar />
      <div className="discipline-page-container">
        <button className="back-button-red" onClick={handleGoBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <h1>Disciplinas</h1>
        <div className="button-group">
          {userType === 'professor' || userType === 'admin' ? (
            <>
              <button className="discipline-button" onClick={handleCreateDisciplineClick}>
                Cadastrar Nova Disciplina
              </button>
              <button className="discipline-button" onClick={handleEditDisciplineClick}>
                Editar Disciplina Existente
              </button>
            </>
          ) : null}
          <button className="discipline-button" onClick={handleViewDisciplinesClick}>
            Ver Disciplinas
          </button>
        </div>
      </div>
    </body>
    </html>
  );
};

export default DisciplinePage;