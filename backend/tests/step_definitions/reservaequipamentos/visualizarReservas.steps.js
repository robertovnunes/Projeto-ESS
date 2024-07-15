const {defineFeature, loadFeature} = require('jest-cucumber');
const reservaRepository = require('../../../api/repositories/reservaEquipamentos.repository');
const feature = loadFeature('./tests/features/reservaequipamentos/visualizarReservas.feature');