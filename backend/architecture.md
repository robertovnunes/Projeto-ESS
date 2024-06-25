# Arquitetura de projeto usando repositories

## Estrutura de pastas de um projeto com arquitetura **model-controller-service-repositories**

```
/backend
|_/src	
| | /api
|	|	| /controllers
|	|	| /repositories
|	|	| /models
|	|	| /service
|	| /db
| /tests	
|	| /features
|	| /steps_definitions
|	|	| /controllers
|	|	| /services
```

## api/controllers

A camada de controller é responsável por receber todas as solicitações dos usuários. É aqui que as rotas são definidas e os dados são manipulados antes de serem enviados para a camada de serviços. Esta camada também é responsável por enviar as respostas de volta para o cliente após o processamento.

- Exemplo:
    
    ```jsx
    //equipamentosController
    const equipamentoSNModel = require("../models/equipamentoSNModel");
    const equipamentoPatrimonioModel = require("../models/equipamentoPatrimonioModel");
    const EquipamentosService = require("../services/equipamentosService");
    const shortid = require("shortid");
    
    class EquipamentosController {
      constructor(equipamentosService) {
        this.equipamentosService = equipamentosService;
        this.getAllEquipments = this.getAllEquipments.bind(this);
        this.getEquipmentById = this.getEquipmentById.bind(this);
        this.getEquipmentByPatrimonio = this.getEquipmentByPatrimonio.bind(this);
        this.getEquipmentBySN = this.getEquipmentBySN.bind(this);
        this.createEquipment = this.createEquipment.bind(this);
        this.patchEquipment = this.patchEquipment.bind(this);
        this.deleteEquipment = this.deleteEquipment.bind(this);
      }
    
      async getAllEquipments(req, res) {
        try {
          const equipments = await this.equipamentosService.getAllEquipments();
          console.log(equipments);
          if (equipments === "Nenhum equipamento cadastrado") {
            console.log("GET /equipamentos [404] NOT FOUND");
            return res
              .status(404)
              .send({ message: "Nenhum equipamento cadastrado" });
          }
          console.log("GET /equipamentos [200] OK");
          res.status(200).send(equipments);
        } catch (error) {
          console.log(`GET /equipamentos [500] INTERNAL SERVER ERROR\n ${error}`);
          res.status(500).send({ message: "[500] INTERNAL SERVER ERROR" });
        }
      }
    
      async getEquipmentById(req, res) {
        try {
          const id = req.params.id;
          const equipment = await this.equipamentosService.getEquipmentById(id);
          if (equipment !== "Equipamento nao encontrado") {
            console.log(`GET /equipamentos/:${id} by ID [200] OK`);
            res.status(200).send(equipment);
          } else {
            console.log(`GET /equipamentos/:${id} by ID [404] NOT FOUND`);
            res.status(404).send({ message: "Equipamento nao encontrado" });
          }
        } catch (error) {
          console.log(
            `GET /equipamentos/:${id} [500] INTERNAL SERVER ERROR\n ${error.message}`
          );
          res.status(500).send({ message: "[500] INTERNAL SERVER ERROR" });
        }
      }
    
      async getEquipmentByPatrimonio(req, res) {
        try {
          const patrimonio = req.params.patrimonio;
          const equipment = await this.equipamentosService.getEquipmentByPatrimonio(
            patrimonio
          );
          if (equipment !== "Equipamento nao encontrado") {
            console.log(`GET /equipamentos/patrimonio/:${patrimonio} [200] OK`);
            res.status(200).send(equipment);
          } else {
            console.log(
              `GET /equipamentos/patrimonio/:${patrimonio} [404] NOT FOUND`
            );
            res.status(404).send({ message: "Equipamento nao encontrado" });
          }
        } catch (error) {
          console.log(
            `GET /equipamentos/patrimonio/:${req.params.patrimonio} [500] INTERNAL SERVER ERROR\n ${error.message}`
          );
          res.status(500).send({ message: "[500] INTERNAL SERVER ERROR" });
        }
      }
    
      async getEquipmentBySN(req, res) {
        try {
          const sn = req.params.numero_serie;
          const equipment = await this.equipamentosService.getEquipmentBySerie(sn);
          if (equipment !== "Equipamento nao encontrado") {
            console.log(`GET /equipamentos/:${equipment.numero_serie} [200] OK`);
            res.status(200).send(equipment);
          } else {
            console.log(
              `GET /equipamentos/:${equipment.numero_serie} [404] NOT FOUND`
            );
            res.status(404).send({ message: "Equipamento nao encontrado" });
          }
        } catch (error) {
          console.log(
            `GET /equipamentos/:${equipment.numero_serie} [500] INTERNAL SERVER ERROR\n ${error.message}`
          );
          res.status(500).send({ message: "[500] INTERNAL SERVER ERROR" });
        }
      }
    
      async createEquipment(req, res) {
        try {
          const {
            nome,
            descricao,
            estado_conservacao,
            data_aquisicao,
            valor_estimado,
            identificador,
          } = req.body;
          if (
            !nome ||
            !descricao ||
            !estado_conservacao ||
            !data_aquisicao ||
            !valor_estimado ||
            !identificador.type ||
            !identificador.value
          ) {
            console.log(`POST /equipamentos [400] BAD REQUEST`);
          } else {
            if (identificador.type === "patrimonio") {
              const equipmentExist =
                await this.equipamentosService.getEquipmentByPatrimonio(
                  identificador.value
                );
              if (equipmentExist !== "Equipamento nao encontrado") {
                console.log(`POST /equipamentos [400] BAD REQUEST`);
                res
                  .status(400)
                  .send({
                    message: "Já existe um equipamento com este patrimônio",
                  });
                return;
              } else {
                let newEquipment = new equipamentoPatrimonioModel(
                  nome,
                  descricao,
                  estado_conservacao,
                  data_aquisicao,
                  valor_estimado,
                  identificador.value
                );
                let equipmentCreated =
                  await this.equipamentosService.createEquipmentPatrimonio(
                    newEquipment
                  );
                console.log(`POST /equipamentos [201] CREATED`);
                res.status(201).send(equipmentCreated);
              }
            } else if (identificador.type === "numero_serie") {
              const equipmentExist =
                await this.equipamentosService.getEquipmentBySerie(
                  identificador.value
                );
              if (equipmentExist !== "Equipamento nao encontrado") {
                console.log(`POST /equipamentos [400] BAD REQUEST`);
                res
                  .status(400)
                  .send({
                    message: "Já existe um equipamento com este numero de série",
                  });
                return;
              } else {
                let newEquipment = new equipamentoSNModel(
                  nome,
                  descricao,
                  estado_conservacao,
                  data_aquisicao,
                  valor_estimado,
                  identificador.value
                );
                let equipmentCreated =
                  await this.equipamentosService.createEquipmentSN(newEquipment);
                console.log(`POST /equipamentos [201] CREATED`);
                res.status(201).send(equipmentCreated);
              }
            }
          }
        } catch (error) {
          console.log(
            `POST /equipamentos [500] INTERNAL SERVER ERROR \n ${error.message}`
          );
          res.status(500).send({ message: "[500] INTERNAL SERVER ERROR" });
        }
      }
    
      async patchEquipment(req, res) {
        try {
          let updated = await this.equipamentosService.patchEquipment(
            req.params.id,
            req.body
          );
          if (updated === "Equipamento nao encontrado") {
            console.log(`PATCH /equipamentos/:${req.params.id} [404] NOT FOUND`);
            res.status(404).send({ message: "Equipamento nao encontrado" });
          } else {
            console.log(`PATCH /equipamentos/:${req.params.id} [200] OK`);
            res.status(200).send(updated);
          }
        } catch (error) {
          console.log(
            `PATCH /equipamentos/:${req.params.id} [500] INTERNAL SERVER ERROR\n ${error.message}`
          );
          res.status(500).send({ message: "[500] INTERNAL SERVER ERROR" });
        }
      }
    
      async deleteEquipment(req, res) {
        try {
          const deleted = await this.equipamentosService.deleteEquipment(
            req.params.id
          );
          if (deleted === "Equipamento nao encontrado") {
            console.log(`DELETE /equipamentos/${req.params.id} [404] NOT FOUND`);
            res.status(404).send({ message: "Equipamento nao encontrado" });
          } else {
            console.log(`DELETE /equipamentos/${req.params.id} [200] OK`);
            res.status(200).send(deleted);
          }
        } catch (error) {
          console.log(
            `DELETE /equipamentos/${req.params.id} [500] INTERNAL SERVER ERROR\n ${error.message}`
          );
          res.status(500).send({ message: "[500] INTERNAL SERVER ERROR" });
        }
      }
    }
    
    module.exports = EquipamentosController;
    ```
    

## api/repositories

Em um banco de dados simulado com um arquivo JSON, os repositórios realizam operações CRUD diretamente no arquivo, nossa "fonte verdadeira" de dados. Quando solicitado um item, o controlador delega ao serviço a busca de dados no repositório correspondente. Este lê o arquivo e retorna os dados ao controlador para então enviá-los ao usuário. Similarmente, para criar, atualizar ou deletar um item, o controlador delega a operação ao serviço, que a repassa ao repositório. Assim, as camadas de repositório e serviço abstraem a interação com a fonte de dados, mantendo a lógica de negócios independente de onde e como os dados são armazenados.

- Exemplo
    
    ```jsx
    //equipamentosRepository
    const fs = require('fs');
    const path = require('path');
    
    const shortid = require('shortid');
    const equipamento = require('../models/equipamentoSNModel');
    
    function isJsonEmpty(obj) {
        return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
    }
    
    class EquipamentosRepository {
        constructor(dbPath){
            this.filePath = dbPath || path.join(__dirname, '../../db/equipamentos.json');
            this._readFile(this.filePath).then(r => r);
        }
        async _readFile() {
            const data = await fs.promises.readFile(this.filePath);
            return JSON.parse(data);
        }
    
        async _writeFile(data) {
            await fs.promises.writeFile(this.filePath, JSON.stringify(data, null, 2));
        }
    
        async getAllEquipments() {
            const db = await this._readFile();
            return db.length === 0  ? 'Nenhum equipamento cadastrado' : db;
        }
        async getEquipmentById(id) {
            const db = await this.getAllEquipments();
            let equipamento;
            if (db === 'Nenhum equipamento cadastrado') return 'Equipamento nao encontrado';
            else {
                equipamento = db.find(equipamento => equipamento.id === id)
                return equipamento;
            }
        }
        async getEquipmentByPatrimonio(value) {
            const db = await this.getAllEquipments();
            let equipamento;
            if (db === 'Nenhum equipamento cadastrado') return 'Equipamento nao encontrado';
            else {
                equipamento = db.find(equipamento => equipamento.patrimonio === value)
                return equipamento;
            }
        }
        async getEquipmentBySerie(value) {
            const db = await this.getAllEquipments();
            let equipamento;
            if (db === 'Nenhum equipamento cadastrado') return 'Equipamento nao encontrado';
            else {
                equipamento = db.find(equipamento => equipamento.numero_serie === value)
                return equipamento;
            }
        }
        async createEquipmentPatrimonio(newEquipamento) {
            let db = await this.getAllEquipments();
            if(!isJsonEmpty(db)){
                if(db.find(equipamento => equipamento.patrimonio === newEquipamento.patrimonio)){
                    return 'Patrimonio já existe';
                }
    
                db.push(newEquipamento);
            } else {
                db = [newEquipamento];
    
            }
            await this._writeFile(db);
            return newEquipamento;
        }
    
        async createEquipmentSN(newEquipamento){
            let db = await this.getAllEquipments();
            if(!isJsonEmpty(db)){
                db.forEach(equipamento => {
                    if(equipamento.numero_serie === newEquipamento.numero_serie){
                        return 'Numero de serie já existe';
                    }
                });
                db.push(newEquipamento);
            } else {
                db = [newEquipamento];
            }
            await this._writeFile(db);
            return newEquipamento;
        }
    
        async updateEquipment(id, data) {
            let db = this.getAllEquipments();
            const index = db.findIndex(equipamento => equipamento.id === id);
            if(index === -1) return 'Equipamento nao encontrado';
            db[index] = {...db[index], ...data};
            await this._writeFile(db);
            return db[index];
        }
    
        async deleteEquipment(id) {
            let db = this.getAllEquipments();
            const index = db.findIndex(equipamento => equipamento.id === id);
            if(index === -1) return 'Equipamento nao encontrado';
            const deleted = db.splice(index, 1);
            await this._writeFile(db);
            return deleted;
        }
    
    }
    
    module.exports = EquipamentosRepository;
    ```
    

## api/service

A camada de serviço no backend atua como um intermediário entre a camada de controle e a camada de repositório. Ela é responsável por executar a lógica de negócios, processar dados recebidos do controlador e formatá-los conforme necessário antes de passá-los para a camada de repositório para interação com a fonte de dados. Da mesma forma, ela também processa os dados recebidos da camada de repositório antes de enviá-los de volta ao controlador. Esta camada ajuda a manter a separação de responsabilidades no código, tornando-o mais organizado e gerenciável.

- Exemplo
    
    ```jsx
    //equipamentosService.js
    const EquipamentoRepository = require('../repositories/equipamentosRepository');
    
    class EquipamentosService {
        constructor(equipamentoRepository){
            this.equipamentoRepository = equipamentoRepository;
        }
    
        getAllEquipments() {
            let equipamentos = this.equipamentoRepository.getAllEquipments();
            return equipamentos
        }
    
        getEquipmentById(id) {
            let equipamento = this.equipamentoRepository.getEquipmentById(id);
            return equipamento;
        }
    
        getEquipmentByPatrimonio(value) {
            let equipamento = this.equipamentoRepository.getEquipmentByPatrimonio(value);
            return equipamento;
        }
    
        getEquipmentBySerie(value) {
            let equipamento = this.equipamentoRepository.getEquipmentBySerie(value);
            return equipamento;
        }
    
        createEquipmentPatrimonio(newEquipamento) {
            return this.equipamentoRepository.createEquipmentPatrimonio(newEquipamento);
        }
    
        createEquipmentSN(newEquipamento) {
            return this.equipamentoRepository.createEquipmentSN(newEquipamento);
        }
    
        patchEquipment(id, newEquipamento) {
            return this.equipamentoRepository.patchEquipment(id, newEquipamento);
        }
    
        deleteEquipment(id) {
            return this.equipamentoRepository.deleteEquipment(id);
        }
    }
    
    module.exports = EquipamentosService;
    ```
    

## api/models

A camada models é onde os dados e as regras do negócio ficam na aplicação. Ele diz como os dados serão guardados e quais ações podem ser feitas com eles. Os modelos são como "planos" para os objetos que a aplicação vai criar e usar. Eles também podem ter regras de validação, relações entre diferentes tipos de dados (como "um usuário tem muitos posts") e outras regras específicas da aplicação. Na estrutura model-controller-service-repositories, o modelo trabalha com o repositório para fazer operações de criação, leitura, atualização e deleção no banco de dados.

- Exemplo
    
    ```jsx
    //EquipamentoPatrimonioModel.js
    const shortid = require('shortid');
    
    class equipamento extends BaseModel{
        constructor(nome, descricao, estado_conservacao, data_aquisicao, valor_estimado, patrimonio) {
            this.id = '04'+shortid.generate();
            this.nome = nome;
            this.descricao = descricao;
            this.estado_conservacao = estado_conservacao;
            this.data_aquisicao = data_aquisicao;
            this.valor_estimado = valor_estimado;
            this.patrimonio = patrimonio;
            this.reservas = [];
            this.manutencao = [];
        }
    }
    
    module.exports = equipamento;
    ```