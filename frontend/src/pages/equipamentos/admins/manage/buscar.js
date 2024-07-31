import React, {useState, useEffect} from "react";
import { fetchEquipamentos, getEquipamento } from "../../../../context/equipamentos/apiService";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import BaseLayout from "../../../../components/common/BaseLayout";
import Modal from '../../../../components/common/Modal'; // Importe o componente Modal
import '../../../../style/container.css'
import '../../styles/form.css';
import Cookie from "js-cookie";

const BuscarEquipamento = () => {
    
    const userType = Cookie.get('userType') || 'Desconhecido';
    const navigate = useNavigate();
    
    useEffect(() => {
        if (userType === 'Desconhecido') {
            navigate('/login');
        }
        if (userType !== 'admin') {
            navigate('/mainpage');
        }

    }, [userType, navigate]);

    const [equipamentos, setEquipamentos] = useState({});
    const [equipamento, setEquipamento] = useState({});
    const [id, setId] = useState('');
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false); // Estado para controlar a exibição do modal
    
    const handleInputChange = (event) => {
        setId(event.target.value);
    };

    useEffect(() => {
        const getEquipamentos = async () => {
            try {
                const data = await fetchEquipamentos();
                setEquipamentos(data);
            } catch (error) {
                const errorMessage = error.response?.data?.message || 'Erro ao procurar equipamento';
                setMessage(errorMessage); // Mostrar a mensagem do erro retornado pela API
                setShowModal(true); // Mostrar o modal
                console.error(message, error);
            }
        };

        getEquipamentos();
    }, []);

    useEffect(() => {
        const getEquipamento = async () => {
            try {
                const data = await getEquipamento(id);
                setEquipamento(data);
            } catch (error) {
                const errorMessage = error.response?.data?.message || 'Erro ao procurar equipamento';
                setMessage(errorMessage); // Mostrar a mensagem do erro retornado pela API
                setShowModal(true); // Mostrar o modal
                console.error(message, error);
            }
        };

        getEquipamento();
    }, []);

    return (
        <BaseLayout>
            <div className='admin-page'>
                <div className='content-container'>
                    <div className='header-container'>
                        <button className="back-button" onClick={() => navigate('/equipamentos/manage')}>
                            <FontAwesomeIcon icon={faArrowLeft}/>
                        </button>
                        <h2>Buscar Equipamento</h2>
                    </div>
                    <div className='form-container'>
                        <div className='form-content'>
                            <label htmlFor='id'>ID do equipamento:</label>
                            <input
                                type='text'
                                id='id'
                                name='id'
                                value={id}
                                onChange={handleInputChange}
                            />
                            <button onClick={handleGetEquipamento}>Buscar</button>
                        </div>
                        <div className="equipment-list">
                            <ul>
                                {equipamentos.map((equipamento) => (
                                <li key={equipamento.id}>
                                    <strong>Nome:</strong> {equipamento.nome}<br />
                                    <strong>Descrição:</strong> {equipamento.descricao}<br />
                                    <strong>Estado de conservação:</strong> {equipamento.estado_conservacao}<br />
                                    <strong>Data de Aquisição:</strong> {equipamento.data_aquisicao}<br />
                                    <strong>Valor estimado:</strong> {equipamento.valor_estimado}<br />
                                </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
};

export default BuscarEquipamento;