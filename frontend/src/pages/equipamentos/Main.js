import React from 'react';
import Button from '../../components/common/Button';
import BaseLayout from "../../components/common/BaseLayout";


const mainEquipamentos = () => {

    const consultarEquipamentos = () => {
        console.log('Consultar equipamentos');
    }
    const criarReserva = () => {
        console.log('Criar reserva de equipamento');
    };

    const consultarReserva = () => {
        console.log('Consultar reserva de equipamento');
    };

    return (
        <BaseLayout>
            <div className='container'>
                <div className='menu-equipamentos'>
                    <div className='btn-consultar'>
                        <Button className='btn-consultar' onClick={consultarEquipamentos()}>
                            Consultar equipamentos
                        </Button>
                        <Button className='btn-reservar' onClick={criarReserva()}>
                            Criar uma reserva de equipamento
                        </Button>
                        <Button className='btn-reservar' onClick={consultarReserva()}>
                            Consultar/cancelar reserva de equipamento
                        </Button>
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
};

export default mainEquipamentos;