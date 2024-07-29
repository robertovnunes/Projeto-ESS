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
    };

    const handleSelectChange = (event) => {
        const selectedValue = event.target.options[event.target.selectedIndex].text;
        setSelectedIdentifier(selectedValue);
        setIsTextFieldDisabled(selectedValue === 'Selecione');
    };

    const handleSubmit = async () => {
        try {
            setNewEquipamento({equipamento});
            await addEquipamento(newEquipamento);
            setMessage('Cadastro realizado com sucesso');
            setShowModal(true); // Mostrar o modal
            setIdentificador(null);
            setNewEquipamento(null);
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
            <EquipamentoForm />
        </BaseLayout>
    );
}

export default AdicionarEquipamento;