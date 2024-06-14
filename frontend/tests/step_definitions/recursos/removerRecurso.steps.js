const { defineFeature, loadFeature } = require('jest-cucumber');

const feature = loadFeature('./tests/features/recursos/removerEquipamentos.feature');

defineFeature(feature, test => {

});