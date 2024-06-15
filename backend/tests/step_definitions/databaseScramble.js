const fs = require('fs');
const path = require('path');

const oldEventsPath = path.resolve(__dirname, '../../api/mock/oldEvents.json');
const newEventsPath = path.resolve(__dirname, '/home/mariana/Documents/Projeto-ESS/backend/api/mock/newEvents.json');

const readOldEvents = () => {
    try{
        const data = fs.readFileSync(oldEventsPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Erro ao ler o arquivo JSON', error);
        return [];
    }
}
const readNewEvents= () => {
    try{
        const data = fs.readFileSync(newEventsPath, 'utf8')
        return JSON.parse(data);
    } catch (error) {
        console.error('Erro ao ler o arquivo JSON', error);
        return [];
    }
}
const getFirstEvent = () => {
    try{
        const events = fs.readFileSync(newEventsPath, 'utf8');
        return JSON.parse(events)[0];
    } catch(error){
        console.error('Erro ao ler o arquivo JSON', error);
        return [];
    }
}
const getSecondEvent = () => {
    try{
        const events = fs.readFileSync(newEventsPath, 'utf8');
        return JSON.parse(events)[1];
    } catch(error){
        console.error('Erro ao ler o arquivo JSON', error);
        return [];
    }
}

module.exports = {readOldEvents, readNewEvents,getFirstEvent,getSecondEvent};