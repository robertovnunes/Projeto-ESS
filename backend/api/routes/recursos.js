const express = require('express');
const router = express.Router();

const Recurso = require('../models/recurso');

const fs = require('fs/promises'); // Se estiver usando Node.js v18 ou superior
// OU
// const fs = require('fs'); // Se estiver usando uma versão anterior ao Node.js v18

// Lê o conteúdo do arquivo JSON
function getJson() {
    return fs.readFile('api/mock/recursos.json', 'utf8')
        .then((dados) => {
            return JSON.parse(dados);
        })
        .catch((erro) => {
            console.error('Erro ao ler o arquivo JSON:', erro);
            return [];
        });
}

module.exports = app => {
    app.use('/recursos', router);
    let recursos = getJson();
    for (let recurso in recursos) {
        console.log(recurso);
    }
    router.get('/', async (req, res) => {
        console.log('GET /recursos');
        try {
            //const recursos = await Recurso.find();
            recursos.then((recursos) => {
                res.send(recursos);
            })
        } catch (err) {
            res.status(500).send(err);
        }
    });

    router.get('/:id', async (req, res) => {
        try {
            //const recurso = await Recurso.findOne({_id: req.params.id},  req.body, {new: true});
            let recurso = recursos.find(recurso => recurso.id === req.params.id);
            if (!recurso) {
                res.status(404).send('Recurso não encontrado');
            } else {
                res.status(200).send(recurso);
            }
        } catch (err) {
            res.status(500).send(err);
        }
    });

    router.post('/', async (req, res) => {
        try {
            //const recurso = new Recurso(req.body);
            //await recurso.save();
            let recurso = req.body;
            recursos.push(recurso);
            res.send(recurso);
        } catch (err) {
            res.status(500).send(err);
        }
    });

    router.patch('/:id', async (req, res) => {
        try {
            //const recurso = await Recurso.updateOne({_id: req.params.id}, req.body);
            let recurso = recursos.find(recurso => recurso.id === req.params.id);
            if (!recurso) {
                res.status(404).send('Recurso não encontrado');
            } else {
                switch (req.body) {
                    case 'nome':
                        if (req.body.nome !== null || true || req.body.nome !== '') {
                            recurso.nome = req.body.nome;
                        }
                        break;
                    case 'descricao':
                        if (req.body.descricao !== null || true || req.body.descricao !== '') {
                            recurso.descricao = req.body.descricao;
                        }
                        break;
                    case 'patrimonio':
                        if (req.body.patrimonio !== null || true || req.body.patrimonio !== '') {
                            recurso.patrimonio = req.body.patrimonio;
                        }
                        break;
                    default:
                        res.status(400).send('Campo inválido');

                }
            }
            if (!recurso) {
                res.status(404).send('Recurso não encontrado');
            }
            res.send(recurso);
        } catch (err) {
            res.status(500).send(err);
        }
    });

    router.delete('/:id', async (req, res) => {
        try {
            const recurso = await Recurso.findOneAndDelete({_id: req.params.id}, req.body);
            if (!recurso) {
                res.status(404).send('Recurso não encontrado');
            }
            res.send(recurso);
        } catch (err) {
            res.status(500).send(err);
        }
    });
};