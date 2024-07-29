import React, {useState} from "react";
import {addEquipamento} from "../../../../context/equipamentos/apiService";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import BaseLayout from "../../../../components/common/BaseLayout";
import Modal from '../../../../components/common/Modal'; // Importe o componente Modal
import '../../../../style/container.css'


const AdicionarEquipamento = () => {

    const [selectedIdentifier, setSelectedIdentifier] = useState('');
    const [isTextFieldDisabled, setIsTextFieldDisabled] = useState(true);
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false); // Estado para controlar a exibição do modal
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewEquipamento({ ...newEquipamento, [name]: value });
    };

    const handleInputIdentifierChange = (event) => {
        const { name, value } = event.target;
        setIdentificador({ campo: name, value: value });
        setNewEquipamento({    
            nome: '',
            descricao: '',
            estado_conservacao: '',
            data_aquisicao: '',
            valor_estimado: '',
            [identificador.campo]: [identificador.value]
        });
        console.log(newEquipamento);
    };

    const handleSelectChange = (event) => {
        const selectedValue = event.target.options[event.target.selectedIndex].text;
        setSelectedIdentifier(selectedValue);
        setIsTextFieldDisabled(selectedValue === 'Selecione');
    };

    const handleSubmit = async () => {
        try {
            await addEquipamento(newEquipamento);
            setMessage('Cadastro realizado com sucesso');
            setShowModal(true); // Mostrar o modal
            setIdentificador({
                campo: '_',
                value: ''
            });
            setNewEquipamento({
                nome:'', 
                descricao:'', 
                estado_conservacao:'', 
                data_aquisicao:'', 
                valor_estimado:'', 
                [identificador.campo]: [identificador.value]
            }); // Limpar os campos do formulário
        } catch (error) {
            // Verificar se o erro tem uma resposta e se contém uma mensagem
            const errorMessage = error.response?.data?.message || 'Erro ao adicionar equipamento';
            setMessage(errorMessage); // Mostrar a mensagem do erro retornado pela API
            setShowModal(true); // Mostrar o modal
            console.error(message, error);
        }
    };

    const handleGoBack = () => {
        navigate(-1); // Navegar para a página anterior
    };

    const handleCloseModal = () => {
        setShowModal(false); // Fechar o modal
    };

    return (
        <BaseLayout>
            <div className="page-container">
                <div className="content-container">
                    <div className="header-container">
                        <button className="back-button" onClick={handleGoBack}>
                            <FontAwesomeIcon icon={faArrowLeft}/>
                        </button>
                        <h2>Adicionar equipamento</h2>
                    </div>
                    <div>
                        <form className="form-adicionar">
                            <label>
                                Nome do equipamento:
                                <input type="text" name="nome" value={newEquipamento.nome} onChange={handleInputChange}/>
                            </label>
                            <label>
                                Descrição:
                                <input type="text" name="descricao" value={newEquipamento.descricao} onChange={handleInputChange}/>
                            </label>
                            <label>
                                Estado de conservação:
                                <input type="text" name="estado_conservacao" value={newEquipamento.estado_conservacao} onChange={handleInputChange}/>
                            </label>
                            <label>
                                Data de Aquisição:
                                <input type="text" name="data_aquisicao" value={newEquipamento.data_aquisicao} onChange={handleInputChange}/>
                            </label>
                            <label>
                                Valor estimado:
                                <input type="text" name="valor_estimado" value={newEquipamento.valor_estimado} onChange={handleInputChange}/>
                            </label>
                            <label>
                                Identificador:
                                <select name="identificador" onChange={handleSelectChange}>
                                    <option value="">Selecione</option>
                                    <option value="patrimonio">Patrimonio</option>
                                    <option value="numero_serie">Numero de série</option>
                                </select>
                            </label>
                            <label>
                                {selectedIdentifier && selectedIdentifier !== 'Selecione' ? selectedIdentifier : 'Selecione um identificador'}:
                                <input disabled={isTextFieldDisabled} type="text" name={selectedIdentifier}
                                       id={`${selectedIdentifier}`} value={newEquipamento[selectedIdentifier]} onChange={handleInputIdentifierChange}/>
                            </label>
                            <button type="submit" onClick={handleSubmit}>Adicionar</button>
                        </form>
                    </div>
                    {showModal && (
                        <Modal
                            message={message}
                            onClose={handleCloseModal}
                        />
                    )}
                </div>
            </div>
        </BaseLayout>
    );
}

export default AdicionarEquipamento;