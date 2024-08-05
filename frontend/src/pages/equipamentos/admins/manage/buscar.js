import React, { useState, useEffect } from "react";
import {deleteEquipamento, fetchEquipamentos} from "../../../../context/equipamentos/apiService";
import {useLocation, useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import BaseLayout from "../../../../components/common/BaseLayout";
import EquipmentModal from "../../../../components/common/EquipmentModal";
import '../../../../style/container.css';
import Cookie from "js-cookie";
import SimNaoModal from "../../../../components/common/simNao_Modal";

const BuscarEquipamento = () => {


    const userType = Cookie.get('userType') || 'Desconhecido';
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (userType === 'Desconhecido') {
            navigate('/login');
        }
        if (userType !== 'admin') {
            navigate('/mainpage');
        }
    }, [userType, navigate]);

    const [equipamentoID, setEquipamentoID] = useState(null);
    const [selectedField, setSelectedField] = useState('nome');
    const [selectedFieldText, setSelectedFieldText] = useState('Nome');
    const [equipamentos, setEquipamentos] = useState([]);
    const [nome, setNome] = useState('');
    const [message, setMessage] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [filteredEquipamentos, setFilteredEquipamentos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [patrimonio, setPatrimonio] = useState('');
    const [numero_serie, setNumero_serie] = useState('');

    useEffect(() => {
        const getEquipamentos = async () => {
            try {
                const data = await fetchEquipamentos();
                setEquipamentos(data);
            } catch (error) {
                const errorMessage = error.response?.data?.message || 'Erro ao procurar equipamento';
                setMessage(errorMessage);
                console.error(message, error);
            }
        };
        getEquipamentos().then();
    }, [message]);

    useEffect(() => {
        let filtered;
        if (nome) {
            filtered = equipamentos.filter((equipment) => equipment.nome.toLowerCase().includes(nome.toLowerCase()));
        } else if (patrimonio) {
            filtered = equipamentos.filter((equipment) => equipment.patrimonio ?
                equipment.patrimonio.toLowerCase().includes(patrimonio.toLowerCase()) :
                false);
        } else if (numero_serie) {
            filtered = equipamentos.filter((equipment) => equipment.numero_serie ?
                equipment.numero_serie.toLowerCase().includes(numero_serie.toLowerCase()) :
                false);
        } else {
            filtered = equipamentos;
        }
        setFilteredEquipamentos(filtered);
    }, [nome, patrimonio, numero_serie, selectedField, equipamentos]);

    const handleOpenModal = (id) => {
        setEquipamentoID(id);
        setModalIsOpen(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'nome') {
            setNome(value);
        } else if (name === 'patrimonio') {
            setPatrimonio(value);
        } else if (name === 'numero_serie') {
            setNumero_serie(value);
        }
    }

    const handleSelectChange = (event) => {
        const selectedValue = event.target.options[event.target.selectedIndex].value;
        const selectedText = event.target.options[event.target.selectedIndex].text;
        setSelectedField(selectedValue);
        setSelectedFieldText(selectedText);
    };

    const handleCloseModal = () => {
        setModalIsOpen(false);
    };


    const handleDelete = async (id) => {
        setEquipamentoID(id);
        setMessage('Deseja remover o equipamento?');
        setShowModal(true);
    };

    const confirmDelete = async () => {
        try {
            await deleteEquipamento(equipamentoID);
            setShowModal(false);
        } catch (error) {
            console.error('Erro ao deletar equipamento:', error);
        }
    };

    const shouldShowRemoveButton = !location.state?.hideRemoveButton;
    const shouldShowActions = !location.state?.hideActions;
    return (
        <BaseLayout id="buscar">
            <div className='admin-page'>
                <div className='content-container'>
                    <div className='header-container'>
                        <button className="back-button" onClick={() => navigate(-1)}>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </button>
                        <h2>Buscar Equipamento</h2>
                    </div>
                    <div className='form-container'>
                        <div className='form-content'>
                            <label htmlFor='nome'>{selectedFieldText} do equipamento:</label>
                            <input
                                type='text'
                                id={selectedField}
                                name={selectedField}
                                onChange={handleInputChange}
                            />
                            <label>Selecione:</label>
                            <select id="field" name="field" onChange={handleSelectChange}>
                                <option value='nome'>Nome</option>
                                <option value='patrimonio'>Patrimônio</option>
                                <option value='numero_serie'>Número de série</option>
                            </select>
                        </div>
                        <div className="equipment-list">
                            <h3>Equipamentos</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Descrição</th>
                                    <th>Estado de Conservação</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            {filteredEquipamentos.length === 0 && (
                                <p>Nenhum equipamento encontrado</p>
                            )}
                            <tbody>
                                {filteredEquipamentos.map((equipment) => (
                                    <tr key={equipment.id} className="equipamento-item">
                                        <td className="Nome">{equipment.nome}</td>
                                        <td className="descricao">{equipment.descricao}</td>
                                        <td className="estado">{equipment.estado_conservacao}</td>
                                        <td>
                                            <button className="btn-editar" onClick={() => {
                                                handleOpenModal(equipment.id);
                                            }}>
                                                Ver
                                            </button>
                                            {shouldShowRemoveButton && (
                                                <button className="btn-remover" type="button" onClick={() => {
                                                    handleDelete(equipment.id).then();
                                                }}>
                                                    Remover
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        </div>
                        {showModal && (
                            <SimNaoModal
                                message={message}
                                onConfirm={confirmDelete}
                                onCancel={() => setShowModal(false)}
                            />
                        )}
                        {modalIsOpen && (
                            <EquipmentModal
                                isOpen={modalIsOpen}
                                onRequestClose={handleCloseModal}
                                equipmentID={equipamentoID}
                                hideActions={shouldShowActions}
                            />
                        )}
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
};

export default BuscarEquipamento;
