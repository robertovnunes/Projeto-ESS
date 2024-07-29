import React, {useState} from "react";
import {addEquipamento} from "../../../../context/usuarios/apiService";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import BaseLayout from "../../../../components/common/BaseLayout";

const AdicionarEquipamento = () => {

    const [selectedIdentifier, setSelectedIdentifier] = useState('identificador');
    const [isTextFieldDisabled, setIsTextFieldDisabled] = useState(true);
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false); // Estado para controlar a exibição do modal
    const navigate = useNavigate();
    const [newEquipamento, setNewEquipamento] = useState({
        nome: '',
        descricao: '',
        estado_conservacao: '',
        data_aquisicao: '',
        valor_estimado: '',
        patrimonio: '' || null,
        numero_serie: '' || null
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewEquipamento({ ...newEquipamento, [name]: value });
    };

    const handleSelectChange = (event) => {
        const selectedValue = event.target.options[event.target.selectedIndex].text;
        setSelectedIdentifier(selectedValue);
        setIsTextFieldDisabled(selectedValue === '');
    };

    const handleSubmit = async () => {
        try {
            await addEquipamento(newEquipamento);
            setMessage('Cadastro realizado com sucesso');
            setShowModal(true); // Mostrar o modal
            setNewEquipamento({nome:'', descricao:'', estado_conservacao:'', data_aquisicao:'', valor_estimado:''}); // Limpar os campos do formulário
        } catch (error) {
            // Verificar se o erro tem uma resposta e se contém uma mensagem
            const errorMessage = error.response?.data?.message || 'Erro ao adicionar equipamento';
            setMessage(errorMessage); // Mostrar a mensagem do erro retornado pela API
            setShowModal(true); // Mostrar o modal
            console.error('Erro ao adicionar equipamento:', error);
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
                        <form>
                            <label>
                                Nome do equipamento:
                                <input type="text" name="nome"/>
                            </label>
                            <label>
                                Descrição:
                                <input type="text" name="descricao"/>
                            </label>
                            <label>
                                Estado de conservação:
                                <input type="text" name="estado_conservacao"/>
                            </label>
                            <label>
                                Data de Aquisição:
                                <input type="text" name="data_aquisicao"/>
                            </label>
                            <label>
                                Valor estimado:
                                <input type="text" name="valor_estimado"/>
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
                                {selectedIdentifier && selectedIdentifier !== 'Nenhuma' ? selectedIdentifier : 'Selecione um identificador'}:
                                <input disabled={isTextFieldDisabled} type="text" name={selectedIdentifier}
                                       id={`${selectedIdentifier}`}/>
                            </label>
                            <button type="submit" onClick={handleSubmit}>Adicionar</button>
                        </form>
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
}

export default AdicionarEquipamento;