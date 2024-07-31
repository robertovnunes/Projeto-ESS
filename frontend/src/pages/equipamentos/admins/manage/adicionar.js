import React, {useState, useEffect} from "react";
import {addEquipamento} from "../../../../context/equipamentos/apiService";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import BaseLayout from "../../../../components/common/BaseLayout";
import Modal from '../../../../components/common/Modal'; // Importe o componente Modal
import '../../../../style/container.css'
import '../../styles/form.css';
import Cookie from "js-cookie";


const AdicionarEquipamento = () => {

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

    const [selectedIdentifier, setSelectedIdentifier] = useState('');
    const [selectedText, setSelectedText] = useState('');
    const [isTextFieldDisabled, setIsTextFieldDisabled] = useState(true);
    const [newEquipamento, setNewEquipamento] = useState({
        nome: '',
        descricao: '',
        estado_conservacao: '',
        data_aquisicao: '',
        valor_estimado: ''
    });
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false); // Estado para controlar a exibição do modal

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setNewEquipamento({...newEquipamento, [name]: value});
    };

    const handleSelectChange = (event) => {
        let copy = {...newEquipamento};
        const selectedValue = event.target.options[event.target.selectedIndex].value;
        const selectedText = event.target.options[event.target.selectedIndex].text;
        setSelectedText(selectedText);
        setSelectedIdentifier(selectedValue);
        if(selectedValue === 'patrimonio' && newEquipamento.numero_serie !== undefined) {
            delete copy.numero_serie;
        } else if(selectedValue === 'numero_serie' && newEquipamento.patrimonio !== undefined) {
            delete copy.patrimonio;
        } else { 
            delete copy.patrimonio;
            delete copy.numero_serie;
        }
        if(selectedValue !== '') 
            setNewEquipamento({...copy, [selectedValue]: ''});
        setIsTextFieldDisabled(selectedValue === 'Selecione');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await addEquipamento(newEquipamento);
            setMessage('Cadastro realizado com sucesso');
            setShowModal(true); // Mostrar o modal
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
            <div className='admin-page'>
                <div className="page-container">
                <div className="content-container">
                    <div className="header-container">
                        <button className="back-button" onClick={handleGoBack}>
                            <FontAwesomeIcon icon={faArrowLeft}/>
                        </button>
                        <h2>Adicionar equipamento</h2>
                    </div>
                    <form className="form-adicionar">
                        <div className="form-group">
                            <label>
                                Nome do equipamento:
                            </label>
                            <input type="text" name="nome" 
                                value={newEquipamento.nome} 
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>
                                Descrição:
                            </label>
                            <input type="text" name="descricao" 
                                value={newEquipamento.descricao} 
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>
                                Estado de conservação:
                            </label>
                            <input type="text" name="estado_conservacao" 
                                value={newEquipamento.estado_conservacao} 
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>
                                Data de Aquisição:
                            </label>
                            <input type="text" name="data_aquisicao"
                                value={newEquipamento.data_aquisicao} 
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>
                                Valor estimado:
                            </label>
                            <input type="text" name="valor_estimado"
                                value={newEquipamento.valor_estimado} 
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>
                                Identificador:
                            </label>    
                            <select name="identificador" onChange={handleSelectChange}>
                                <option value="">Selecione</option>
                                <option value="patrimonio">Patrimonio</option>
                                <option value="numero_serie">Numero de série</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>
                                {selectedText && selectedText !== 'selecione' ? selectedText : 'Selecione um identificador'}:
                            </label>
                            <input disabled={isTextFieldDisabled} type="text" name={selectedIdentifier}
                                value={newEquipamento[selectedIdentifier]}
                                id={`${selectedIdentifier}`} onChange={handleInputChange} 
                            />
                        </div>

                        <button type="submit" className="btn-adicionar" onClick={handleSubmit}>Adicionar</button>
                    </form>
                    {showModal && (
                        <Modal
                            message={message}
                            onClose={handleCloseModal}
                        />
                    )}
                </div>
            </div>
            </div>
        </BaseLayout>
    );
}

export default AdicionarEquipamento;