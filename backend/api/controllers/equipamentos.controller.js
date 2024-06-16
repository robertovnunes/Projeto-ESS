const equipamentosModel = require('../models/equipamento.model');

//Documentação da API
/**
 * @swagger
 *  /equipamentos:
 *   get:
 *    tags: [Equipamentos]
 *    description: Retorna todos os equipamentos
 *    responses:
 *     200:
 *      description: Retorna todos os equipamentos
 *      content:
 *       application/json:
 *        schema:
 *         type: array
 *         items:
 *          type: object
 *          properties:
 *           nome:
 *            type: string
 *           descricao:
 *            type: string
 * 
 *          
 * 
*/

exports.getAllEquipments = (req, res) => {
    try{
        const equipments = equipamentosModel.loadDatabase();
        console.log('GET /equipamentos [200] OK');
        res.status(200).send(equipments);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
};

exports.getEquipmentById = (req, res) => {
    try{
        const equipments = equipamentosModel.loadDatabase();
        const id = req.params.id;
        const equipment = equipments.find(equipment => equipment.id === id);
        if(equipment){
            console.log(`GET /equipamentos/:${id} by ID [200] OK`);
            res.status(200).send(equipment);
        } else {
            console.log(`GET /equipamentos/:${id} by ID [404] NOT FOUND`);
            res.status(404).send({message: 'Equipamento não encontrado'});
        }
    } catch (error) {
        console.log(`GET /equipamentos/:${id} [500] INTERNAL SERVER ERROR\n ${error.message}`);
        res.status(500).send({message: '[500] INTERNAL SERVER ERROR'});
    }
};

exports.getEquipmentByPatrimonio = (req, res) => {
    try{
        const equipments = equipamentosModel.loadDatabase();
        const patrimonio = req.params.patrimonio;
        const equipment = equipments.find(equipment => equipment.patrimonio === patrimonio);
        if(equipment){
            console.log(`GET /equipamentos/patrimonio/:${patrimonio} [200] OK`);
            res.status(200).send(equipment);
        } else {
            console.log(`GET /equipamentos/patrimonio/:${patrimonio} [404] NOT FOUND`);
            res.status(404).send({message: 'Equipamento não encontrado'});
        }
    } catch (error) {
        console.log(`GET /equipamentos/patrimonio/:${req.params.patrimonio} [500] INTERNAL SERVER ERROR\n ${error.message}`);
        res.status(500).send({message: '[500] INTERNAL SERVER ERROR'});
    }
};

exports.getEquipmentBySN = (req, res) => {
    try{
        const equipments = equipamentosModel.loadDatabase();
        const equipment = equipments.find(equipment => equipment.numero_serie === req.params.numero_serie);
        if(equipment){
            console.log(`GET /equipamentos/:${equipment.numero_serie} [200] OK`);
            res.status(200).send(equipment);
        } else {
            console.log(`GET /equipamentos/:${equipment.numero_serie} [404] NOT FOUND`);
            res.status(404).send({message: 'Equipamento não encontrado'});
        }
    } catch (error) {
        console.log(`GET /equipamentos/:${equipment.numero_serie} [500] INTERNAL SERVER ERROR\n ${error.message}`);
        res.status(500).send({message: '[500] INTERNAL SERVER ERROR'});
    }
};

exports.createSingleEquipment = (req, res) => {
    try{
        let equipments = equipamentosModel.loadDatabase();
        const {nome, descricao, estado_conservacao, data_aquisicao, valor_estimado, identificador} = req.body;
        if (!nome || !descricao || !estado_conservacao || !data_aquisicao || !valor_estimado || !identificador) {
            console.log(`POST /equipamentos [400] BAD REQUEST`);
            res.status(400).send({message: 'Campos obrigatórios não preenchidos'});
            return;
        } else {
            id = '04'+shortid.generate();
            if(equipments.find(equipment => equipment.id === id)) id = '04'+shortid.generate();
             if(identificador.type === 'patrimonio') {
                newEquipment = {id, nome, descricao, estado_conservacao, data_aquisicao, valor_estimado, patrimonio: identificador.value};
                newEquipment.single = true;
                if (equipments.lenght === 0) {
                    equipments = newEquipment;
                } else {
                    if(equipments.find(equipment => equipment.patrimonio === identificador.value)) {
                        console.log(`POST /equipamentos [400] BAD REQUEST`);
                        res.status(400).send({message: 'Já existe um equipamento com este patrimônio'});
                        return;
                    } else {
                        equipments.push(newEquipment);
                    }
                }
            } else if(identificador.type === 'numero_serie') {
                id = '04'+shortid.generate();
                if(equipments.find(equipment => equipment.id === id)) id = '04'+shortid.generate();
                newEquipments = {id, nome, descricao, estado_conservacao, data_aquisicao, valor_estimado, numero_serie: identificador.value};
                newEquipment.single = true;
                if (equipments.lenght === 0) {
                    equipments = newEquipments;
                } else {
                    if(equipments.find(equipment => equipment.numero_serie === identificador.value)) {
                        console.log(`POST /equipamentos [400] BAD REQUEST`);
                            res.status(400).send({message: 'Já existe um equipamento com este numero de série'});
                            return;
                    } else {
                        equipments.push(newEquipment);
                    }
                }
            }
        }
        equipamentosModel.writeDatabase(equipments);
        console.log(`POST /equipamentos [201] CREATED`);
        res.status(201).send(req.body);
    } catch (error) {
        console.log(`POST /equipamentos [500] INTERNAL SERVER ERROR \n ${error.message}`);
        res.status(500).send({message: '[500] INTERNAL SERVER ERROR'});
    }
};

exports.createMultipleEquipments = (req, res) => {
    try{
        const equipments = equipamentosModel.loadDatabase();
        const {nome, descricao, estado_conservacao, data_aquisicao, valor_total_estimado, quantidade, identificador, equipamentos} = req.body;
        if (!nome || !descricao || !estado_conservacao || !data_aquisicao || !valor_total_estimado || !identificador) {
            console.log(`POST /equipamentos/lote [400] BAD REQUEST`);
            res.status(400).send({message: 'Campos obrigatórios não preenchidos'});
            return;
        } else {
            id = '04'+shortid.generate();
            if(equipments.find(equipment => equipment.id === id)) id = '04'+shortid.generate();
            if(identificador === 'patrimonio') {
                newEquipment = {id, nome, descricao, estado_conservacao, data_aquisicao, quantidade, valor_total_estimado};
                newEquipment.single = false;
                equipments.forEach(equipment => {
                    if(equipment.single === false){
                        equipment.equipamentos.forEach(eq => {
                            if(eq.hasOwnProperty('patrimonio')){
                                equipamentos.forEach(e => {
                                    if(e.patrimonio === eq.patrimonio){
                                        console.log(`POST /equipamentos/lote [400] BAD REQUEST`);
                                        return res.status(400).send({message: 'Já existe um equipamento com este número de série'});
                                    }
                                });
                                
                            }
                        });
                    }
                });
                newEquipment.equipamentos = equipamentos;
                equipments.push(newEquipment);
            } else if(identificador.type === 'numero_serie') {
                id = '04'+shortid.generate();
                if(equipments.find(equipment => equipment.id === id)) id = '04'+shortid.generate();
                newEquipment = {id, nome, descricao, estado_conservacao, data_aquisicao, quantidade, valor_total_estimado};
                newEquipment.single = false;
                equipments.forEach(equipment => {
                    if(equipment.single === false){
                        equipment.equipamentos.forEach(eq => {
                            if(eq.hasOwnProperty('numero_serie')){
                                equipamentos.forEach(e => {
                                    if(e.numero_serie === eq.numero_serie){
                                        console.log(`POST /equipamentos/lote [400] BAD REQUEST`);
                                        return res.status(400).send({message: 'Já existe um equipamento com este número de série'});
                                    }
                                });
                            }
                        });
                    }
                });
                newEquipment.equipamentos = equipamentos;
                equipments.push(newEquipment);
            }
        }
        equipamentosModel.writeDatabase(equipments);
        console.log(`POST /equipamentos/lote [201] CREATED`);
        res.status(201).send(req.body);
    } catch (error) {
        console.log(`POST /equipamentos/lote [500] ${error.message}`);
        res.status(500).send({message: 'INTERNAL SERVER ERROR'});
    }
};

exports.patchEquipment = (req, res) => {
    try{
        const equipments = equipamentosModel.loadDatabase();
        const index = equipments.findIndex(equipment => equipment.id === req.params.id);
        if(index !== -1){
            data = req.body;
            equipments[index] = {...equipments[index], ...data};
            equipamentosModel.writeDatabase(equipments);
            console.log(`PATCH /equipamentos/:${req.params.id} [200] PATCHED`);
            res.status(200).send(equipments[index]);
        } else {
            console.log(`PATCH /equipamentos/:${req.params.id} [404] NOT FOUND`);
            res.status(404).send({message: 'Equipamento não encontrado'});
        }
    } catch (error) {
        console.log(`PATCH /equipamentos/:${req.params.id} [500] INTERNAL SERVER ERROR\n ${error.message}`);
        res.status(500).send({message: '[500] INTERNAL SERVER ERROR'});
    }
};

exports.deleteEquipment = (req, res) => {
    try{
        const equipments = equipamentosModel.loadDatabase();
        const index = equipments.findIndex(equipment => equipment.id === req.params.id);
        if(index !== -1){
            equipments.splice(index, 1);
            equipamentosModel.writeDatabase(equipments);
            console.log(`DELETE /equipamentos/${req.params.id} [204] DELETED`);
            res.status(204).send(equipments);
        } else {
            console.log(`DELETE /equipamentos/${req.params.id} [204] NOT FOUND`);
            res.status(404).send({message: 'Equipamento não encontrado'});
        }
    } catch (error) {
        console.log(`DELETE /equipamentos/${req.params.id} [500] INTERNAL SERVER ERROR\n ${error.message}`);
        res.status(500).send({message: '[500] INTERNAL SERVER ERROR'});
    }
};