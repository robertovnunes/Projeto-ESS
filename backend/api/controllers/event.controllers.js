const fs = require('fs');
const path = require('path');


const getAllEventsJson = (req,res) => {
    try{ 
        const data = JSON.parse(fs.readFileSync(path.resolve("../api/mock/eventos.json"),'utf-8'))
        if(!data){
            console.log("Empty");
            return res.status(200).json({})
        }
        return res.status(200).json(data);
    }catch(error){
        console.log("Error in getAll",error.message);
        res.status(500).json({
            error: "Internal Server Error"
        })
    }

}

const eventSignUpJson = async(req, res) => {
    try{
        const {eventName,description,responsibleTeacher,eventDateAndTime} = req.body;
        const missingInfo = !eventName || !responsibleTeacher || !eventDateAndTime;
        if(missingInfo){
            console.log("Informações obrigatórias não preenchidas");
            return res.status(400).json({
                error: "Informações obrigatórias não preenchidas"
            })
        }
        let data = JSON.parse(fs.readFileSync(path.resolve("/home/mariana/Documents/Projeto-ESS/backend/api/models/eventos.json"),'utf-8'));
        const eventExists = data.some(element => 
            element.eventName === eventName && 
            element.eventDateAndTime === eventDateAndTime 
        );
        if(eventExists){
            console.log("Event already exists");
            return res.status(400).json({
                error: "Event already exists"
            })
        };
        let getID = data.length + 1;
        if(description === undefined) {
            const newEvent = {
                eventName,
                id: getID,
                description: "",
                responsIbleTeacher,
                eventDateAndTime,
            }
            data.push(newEvent);
            console.log("Evento cadastrado com sucesso");
            res.status(201).json(newEvent);
        } else{
            const newEvent = {
                eventName,
                id: getID,
                description,
                responsibleTeacher,
                eventDateAndTime
            }
            data.push(newEvent);
            console.log("Evento cadastrado com sucesso");
            res.status(201).json(newEvent);

        }
        fs.writeFileSync(path.resolve("/home/mariana/Documents/Projeto-ESS/backend/api/models/eventos.json"),JSON.stringify(data,null,2));
       

        
    }catch(error){
        console.log("Error in signUp:",error.message);
        res.status(500).json({
            error: "Internal Server Error"
        })
    }


}
const deleteEventJson = (req, res) => {
    const eventsPath = path.resolve("/home/mariana/Documents/Projeto-ESS/backend/api/models/eventos.json");
    try {
        const { id } = req.params;
        const idConverted = Number(id);
        let data = JSON.parse(fs.readFileSync(eventsPath ,'utf-8'));
        const eventIndex = data.findIndex(element => element.id === idConverted);
        if (eventIndex === -1) {
            console.log("Event Not Found");
            return res.status(404).json({ error: "Event Not Found" });
        }
        data.splice(eventIndex, 1);
        data.forEach((event, index) => {
            event.id = index + 1; // Ajusta o id para começar de 1
        });
        console.log("Evento removido com sucesso");
        res.status(200).json({ message: "Evento removido com sucesso" });
        fs.writeFileSync(eventsPath, JSON.stringify(data, null, 2));

    } catch (error) {
        console.log("Error in deleteEvent:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
const updateEventJson = async (req, res) => {
    const eventsPath = path.resolve("/home/mariana/Documents/Projeto-ESS/backend/api/models/eventos.json");
    try {
        const { id } = req.params;
        const idConverted = Number(id);
        const {eventName,description,responsibleTeacher,eventDateAndTime} = req.body;
        let data = JSON.parse(fs.readFileSync(eventsPath, 'utf-8'));
        const eventIndex = data.findIndex(element => element.id === idConverted);

        if (eventIndex === -1) {
            console.log("Event Not Found");
            return res.status(404).json({ error: "Event Not Found" });
        }

        data[eventIndex] = {
            ...data[eventIndex],
            eventName: eventName || data[eventIndex].eventName,
            description: description || data[eventIndex].description,
            responsibleTeacher: responsibleTeacher || data[eventIndex].responsibleTeacher,
            eventDateAndTime: eventDateAndTime || data[eventIndex].eventDateAndTime
        };

        console.log("Salvo com Sucesso!");
        res.status(200).json(data[eventIndex]);
        fs.writeFileSync(eventsPath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.log("Error in updateEvent:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {getAllEventsJson,eventSignUpJson,deleteEventJson,updateEventJson};