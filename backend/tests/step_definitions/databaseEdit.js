const fs = require('fs');
const path = require('path');

const oldEventsPath = path.resolve(__dirname, '../../api/mock/oldEvents.json');
const newEventsPath = path.resolve(__dirname, '/home/mariana/Documents/Projeto-ESS/backend/api/mock/newEvents.json');
const databaseEvents = path.resolve(__dirname, '/home/mariana/Documents/Projeto-ESS/backend/db/eventos.json');

const databaseDisciplines = path.resolve(__dirname, '/home/mariana/Documents/Projeto-ESS/backend/db/disciplines.json');
const oldDisciplinesPath = path.resolve(__dirname, '/home/mariana/Documents/Projeto-ESS/backend/api/mock/oldDisciplines.json');
const newDisciplinesPath = path.resolve(__dirname, '/home/mariana/Documents/Projeto-ESS/backend/api/mock/newDisciplines.json');

const setupForTestEvents = () => {
    try{
        let data = fs.readFileSync(databaseEvents, 'utf8');
        data.slice(0,-2);
        console.log(data);
        fs.writeFileSync(databaseEvents, data);
    }catch(error){
        console.error('Erro ao manipular o arquivo JSON', error);
    }
    
}
const setupForTestDisciplines = () => {
    try{
        let data = fs.readFileSync(databaseDisciplines, 'utf8');
        data.slice(0,-1);
        fs.writeFileSync(databaseDisciplines, data);
    }catch(error){
        console.error('Erro ao manipular o arquivo JSON', error);
    }
    
}
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
const readOldDisciplines = () => {
    try{
        const data = fs.readFileSync(oldDisciplinesPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Erro ao ler o arquivo JSON', error);
        return [];
    }
}
const readNewDisciplines= () => {
    try{
        const data = fs.readFileSync(newDisciplinesPath, 'utf8')
        return JSON.parse(data);
    }
    catch (error) {
        console.error('Erro ao ler o arquivo JSON', error);
        return [];
    }
}


module.exports = {readOldEvents, readNewEvents,getFirstEvent,getSecondEvent,readOldDisciplines,readNewDisciplines,setupForTestDisciplines,setupForTestEvents};