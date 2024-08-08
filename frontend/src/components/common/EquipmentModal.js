    import React, { useEffect, useState } from 'react';
    import Modal from 'react-modal';
    import '../../style/EquipmentModal.css';
    import Button from "./Button";
    import SimNaoModal from "./simNao_Modal";
    import {deleteEquipamento, fetchEquipamento, patchEquipamento} from "../../context/equipamentos/apiService";
    import { format, parseISO } from 'date-fns';

    const EquipmentModal = ({ isOpen, onRequestClose, equipmentID, showActions, onEquipmentAction }) => {

        const [isNotEditing, setIsNotEditing] = useState(true);
        const [equipamento, setEquipamento] = useState({});
        const [formData, setFormData] = useState({});
        const [message, setMessage] = useState('');
        const [showDeleteModal, setShowDeleteModal] = useState(false);
        const [showSubmitModal, setShowSubmitModal] = useState(false);

        const SubmitModal = SimNaoModal;
        const DeleteModal = SimNaoModal;

        const updateEquipment = (data) => {
            setEquipamento(data);
            setFormData(data);
        };

        useEffect(() => {
            const getEquipamento = async () => {
                if (equipmentID) {
                    try {
                        const response = await fetchEquipamento(equipmentID);
                        if(response) {
                            updateEquipment(response); // Atualiza formData com os dados do equipamento
                        }
                    } catch (error) {
                        console.error('Erro ao buscar equipamento:', error);
                    }
                }
            };
            getEquipamento().then();
        }, [equipmentID]); // Executa apenas quando equipmentID muda

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        };

        const handleSubmit = () => {
            setMessage('Deseja salvar as alterações?');
            setShowSubmitModal(true);
        };

        const confirmSubmit = async (e) => {
            e.preventDefault();
            try {
                await patchEquipamento(equipmentID, formData);
                const response = await fetchEquipamento(equipmentID);
                updateEquipment(response);
                setShowSubmitModal(false);
                setIsNotEditing(true);
                onEquipmentAction('update', true);
            } catch (error) {
                onEquipmentAction('update', false);
                console.error('Erro ao salvar equipamento:', error);
            }
        };

        const handleDelete = async () => {
            setMessage('Deseja remover o equipamento?');
            setShowDeleteModal(true);
        };

        const confirmDelete = async () => {
            try {
                await deleteEquipamento(equipmentID);
                setShowDeleteModal(false);
                onEquipmentAction('delete', true);
                onRequestClose();
            } catch (error) {
                onEquipmentAction('delete', false);
                console.error('Erro ao deletar equipamento:', error);
                onRequestClose();
            }

        };

        if (!equipmentID) return null;

        return (
            <div>
                <Modal appElement={document.getElementById('root')}
                    isOpen={isOpen} onRequestClose={onRequestClose}
                   contentLabel={`${equipamento.id} Details`}
                   style={{
                       overlay: {
                           backgroundColor: 'rgba(0, 0, 0, 0.75)', // Cor do fundo quando o modal estiver aberto
                           zIndex: 1000 // Certifique-se de que o modal tem um z-index alto
                       },
                       content: {
                           top: '50%',
                           left: '50%',
                           right: 'auto',
                           bottom: 'auto',
                           marginRight: '-50%',
                           transform: 'translate(-50%, -50%)',
                       }
                   }}>
                    <button className="close-button" onClick={onRequestClose}>&times;</button>
                    <h2>Detalhes do equipamento: {`${equipamento.nome}`}</h2>
                    <form className="form-adicionar">
                        <div className="form-group">
                            <label>
                                Nome do equipamento:
                            </label>
                            <input
                                type="text"
                                name="nome"
                                disabled={isNotEditing}
                                value={formData.nome || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>
                                Descrição:
                            </label>
                            <input
                                type="text"
                                name="descricao"
                                disabled={isNotEditing}
                                value={formData.descricao || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>
                                Status:
                            </label>
                            <input
                                type="text"
                                name="status"
                                disabled={isNotEditing}
                                value={formData.status || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>
                                Estado de conservação:
                            </label>
                            <input
                                type="text"
                                name="estado_conservacao"
                                disabled={isNotEditing}
                                value={formData.estado_conservacao || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>
                                Data de Aquisição:
                            </label>
                            <input
                                type="text"
                                name="data_aquisicao"
                                disabled={true}
                                value={formData.data_aquisicao || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>
                                Valor estimado:
                            </label>
                            <input
                                type="text"
                                name="valor_estimado"
                                disabled={isNotEditing}
                                value={formData.valor_estimado || ''}
                                onChange={handleChange}
                            />
                        </div>
                        {formData.patrimonio ? (
                            <div className="form-group">
                                <label>Patrimônio:</label>
                                <p>{formData.patrimonio || ''}</p>
                            </div>
                        ) : (
                            <div className="form-group">
                                <label>Número de Série:</label>
                                <p>{formData.numero_serie || ''}</p>
                            </div>
                        )}
                        {showActions && (
                            <>
                                <Button
                                    onClick={() => {setIsNotEditing(!isNotEditing)}}>
                                    {!isNotEditing ? 'Cancelar' : 'Editar'}
                                </Button>
                                {!isNotEditing && <Button onClick={handleSubmit}>Salvar</Button>}
                                <Button onClick={handleDelete}>Delete</Button>
                            </>
                        )}
                    </form>
                    {showDeleteModal && (
                        <DeleteModal
                            message={message}
                            onConfirm={ confirmDelete }
                            onCancel={() => setShowDeleteModal(false)}
                        />
                    )}
                    {showSubmitModal && (
                        <SubmitModal
                            message={message}
                            onConfirm={ confirmSubmit }
                            onCancel={() => setShowSubmitModal(false)}
                        />
                    )}
                </Modal>
            </div>
        );
    };

    export default EquipmentModal;
