const {defineFeature, loadFeature} = require('jest-cucumber');

const feature = loadFeature('./tests/features/recursos/adicionarEquipamento.feature');

function pass() {
    return true;
}

defineFeature(feature, test => {
   pass();
});