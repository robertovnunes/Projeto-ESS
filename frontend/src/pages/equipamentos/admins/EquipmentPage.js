import React from 'react';
import Button from '../../../components/common/Button';

const mainEquipamentos = () => {

    const consultarEquipamentos = () => {
        console.log('Consultar equipamentos');
    }

    const consultarReserva = () => {
        console.log('Consultar reserva de equipamento');
    };

    function loadPage() {
        return undefined;
    }

    return (
        <div className='container'>
            <div className='menu-equipamentos'>
                <Button className='btn-consultar' onClick={consultarEquipamentos()}>
                    Consultar equipamentos
                </Button>
                <Button className='btn-manage' onClick={loadPage()}>
                    Gerenciar equipamentos
                </Button>
                <Button className='btn-reservar' onClick={consultarReserva()}>
                    Consultar/cancelar reserva de equipamento
                </Button>
                <Button className="btn-manutencao" onClick={loadPage()}>
                    Solicitar manutenção de equipamento
                </Button>
            </div>
            <div className='content'>

            </div>
        </div>
    );
}

export default mainEquipamentos;