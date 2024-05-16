const {defineFeature, loadFeature} = require('jest-cucumber');

const feature = loadFeature('./tests/features/recursos/listarRecurso.feature');

defineFeature(feature, test => {

});