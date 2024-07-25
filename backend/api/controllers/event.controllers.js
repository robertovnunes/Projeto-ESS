const fs = require('fs');
const path = require('path');

const dateRegex = /^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-\d{4} (0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/;

const isValidDateFormat = (dateStr) => {
    return dateRegex.test(dateStr);
};
//console.log("Entrou no event.controllers");

exports.getAllEventsJson = (req,res) => {
    console.log("Entrou no getAllEventsJson");
    try{ 
        const data = JSON.parse(fs.readFileSync(path.resolve("./db/eventos.json"),'utf-8'))
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

exports.eventSignUpJson = async(req, res) => {
    try{
        const {eventName,description,responsibleTeacher,eventDateAndTime} = req.body;
        const missingInfo = !eventName || !responsibleTeacher || !eventDateAndTime;
        if(missingInfo){
            console.log("Informações obrigatórias não preenchidas");
            return res.status(400).json({
                error: "Informações obrigatórias não preenchidas"
            })
        }
        let data = JSON.parse(fs.readFileSync(path.resolve("./db/eventos.json"),'utf-8'));
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
        if(!isValidDateFormat(eventDateAndTime)){
            console.log("Formato de data inválido");
            return res.status(400).json({
                error: "Formato de data inválido. Use o formato DD-MM-AAAA hh:mm AM/PM"
            });
        }
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
        fs.writeFileSync(path.resolve("./db/eventos.json"),JSON.stringify(data,null,2));
       

        
    }catch(error){
        console.log("Error in signUp:",error.message);
        res.status(500).json({
            error: "Internal Server Error"
        })
    }


}
exports.deleteEventJson = (req, res) => {
    const eventsPath = path.resolve("./db/eventos.json");
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
exports.updateEventJson = async (req, res) => {
    const eventsPath = path.resolve("./db/eventos.json");
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
        if(!isValidDateFormat(eventDateAndTime) && eventDateAndTime !== undefined){
            console.log("Formato de data inválido");
            return res.status(400).json({
                error: "Formato de data inválido. Use o formato DD-MM-AAAA hh:mm AM/PM"
            });
        }

        data[eventIndex] = {
            ...data[eventIndex],
            eventName: eventName || data[eventIndex].eventName,
            id: idConverted,
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

