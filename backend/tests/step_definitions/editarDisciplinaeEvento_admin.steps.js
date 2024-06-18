// const supertest = require('supertest');
// const index = require('/home/mariana/Documents/Projeto-ESS/backend/conf/index.js');
// const { defineFeature, loadFeature } = require('jest-cucumber');
// const database = require('./databaseScramble');
// //const { response } = require('express');
// const request = supertest(index);

// const feature = loadFeature('/home/mariana/Documents/Projeto-ESS/backend/tests/features/professor/deletarDisciplinaeEvento.feature');

// const disciplineExists = (disciplineList, name, disciplineID) => {
//     let found = false;
//     disciplineList.forEach(discipline => {
//         if(discipline.nome === name && discipline.disciplineID === disciplineID) {
//             found = true;
//         }
//     });
//     return found;
// }
// const eventExists = (eventsList, name, eventID) => {
//     let found = false;
//     eventsList.forEach(event => {
//         if(event.eventName === name && event.id === eventID) {
//             found = true;
//         }
//     });
//     return found;
// }
// const infoSavedDisciplines = (disciplinesList, name, ID, newDiscipline) => {
//     let equal = false;
//     disciplinesList.forEach(disc => {
//         if(disc.nome === newDiscipline.nome && disc.description == newDiscipline.description && disc.disciplineID === newDiscipline.disciplineID && disc.responsibleTeacher === newDiscipline.responsibleTeacher && disc.horario === newDiscipline.horario && disc.disciplineCurso === newDiscipline.disciplineCurso && disc.disciplinePeriodo === newDiscipline.disciplinePeriodo) {
//             equal = true;
//         }
//     });
//     return equal;
// }
// const infoSavedEvents = (eventsList, name, time, newEvent) => {
//     let equal = false;
//     eventsList.forEach(event => {
//         if(event.eventName === name && event.description === newEvent.description && event.responsibleTeacher === newEvent.responsibleTeacher && event.eventDateAndTime === time) {
//             equal = true;
//         }
//     });
//     return equal;
// }