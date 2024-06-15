const fs = require('fs');
const path = require('path');

const oldEventsPath = path.resolve(__dirname, '../../api/mock/oldEvents.json');
const newEventsPath = path.resolve(__dirname, '../../api/mock/eventos.json');

const readOldEvents = () => {
    try{
        const data = fs.readFileSync(oldEquipmentsPath, 'utf8');
        return JSON.parse(data).equipamentos;
    } catch (error) {
        console.error('Erro ao ler o arquivo JSON', error);
        return [];
    }
}
const readNewEvents= () => {
    try{
        const data = fs.readFileSync(newEquipmentsPath, 'utf8')
        return JSON.parse(data).equipamentos;
    } catch (error) {
        console.error('Erro ao ler o arquivo JSON', error);
        return [];
    }
}
const getFirstEvent = () => {
    try{
        const events = fs.readFileSync(newEventsPath, 'utf8');
        return JSON.parse(events).eventos[0];
    } catch(error){
        console.error('Erro ao ler o arquivo JSON', error);
        return [];
    }
}

module.exports = {readOldEvents, readNewEvents,getFirstEvent};