import React from 'react';
import Button from '../../components/common/Button';


const mainEquipamentos = () => {

    const consultarEquipamentos = () => {
        console.log('Consultar equipamentos');
    };
    
    return (
        <div className='container'>
            <div className='btn-consultar'>
                <Button className='btn-consultar' onClick={ consultarEquipamentos() }>
                    Consultar equipamentos
                </Button>
            </div>
        </div>
    );
};

export default mainEquipamentos;