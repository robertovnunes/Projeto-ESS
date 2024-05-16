const { defineFeature, loadFeature } = require('jest-cucumber');

const feature = loadFeature('./tests/features/recursos/removerRecurso.feature');

defineFeature(feature, test => {

}