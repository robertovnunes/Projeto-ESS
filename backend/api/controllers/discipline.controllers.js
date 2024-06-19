const fs = require('fs');
const path = require('path');
const dateRegex = /^\d{2}\/\d{2}\/\d{4} a \d{2}\/\d{2}\/\d{4} \d{2}:\d{2} (AM|PM)( (MON|TUE|WED|THU|FRI|SAT|SUN)){0,3}$/;


const isValidDateFormat = (dateStr) => {
    return dateRegex.test(dateStr);
};
const getDisciplinebyID = (req,res) => {
    try{
        const id = req.params.id;
        const data = JSON.parse(fs.readFileSync(path.resolve("/home/mariana/Documents/Projeto-ESS/backend/db/disciplines.json"),'utf-8'));
        const discipline = data.find(element => element.disciplineID === id);
        if(!discipline){
            console.log("Discipline not found");
            return res.status(404).json({
                error: "Discipline not found"
            })
        }
        console.log("Discipline found");
        let length = discipline.salas.length;
        if(length === 0){
            console.log("Discipline has no salas");
        return res.status(400).json({error: "Discipline has no salas"});
        }
        return res.status(200).json(discipline.salas);
    }catch(error){
        console.log("Error in getDisciplineById",error.message);
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}


exports.disciplinesSignUpJson = async(req, res) => {
    try{
        const {nome,disciplineID,responsibleTeacher,horario,description,disciplineCurso,disciplinePeriodo} = req.body;
        // Checks if any of the required fields are missing
        const missingInfo = !nome || !responsibleTeacher || !horario || !disciplineID;
        //If any of the required fields are missing, error message
        if(missingInfo){
            console.log("Informações obrigatórias não preenchidas");
            return res.status(400).json({
                error: "Informações obrigatórias não preenchidas"
            })
        }
        let data = JSON.parse(fs.readFileSync(path.resolve("/home/mariana/Documents/Projeto-ESS/backend/db/disciplines.json"),'utf-8'));
        // Checks if discipline exists with boolean variable
        const disciplineExists = data.some(element => 
            element.nome === nome && 
            element.disciplineID === disciplineID
        );
        if(!isValidDateFormat(horario)){
            console.log("Formato de data inválido");
            return res.status(400).json({
                error: "Formato de data inválido. Use o formato DD-MM-AAAA hh:mm AM/PM"
            });
        }
        //If it does, error message
        if(disciplineExists){
            console.log("Discipline already exists");
            return res.status(400).json({
                error: "Discipline already exists"
            })
        };
        let salas = [];
        // Build new discipline object
        const newDiscipline = {
            nome,
            disciplineID,
            responsibleTeacher,
            salas,
            horario,
            description,
            disciplineCurso,
            disciplinePeriodo
        };
        //Treat missings fields
        if(description === undefined ) newDiscipline.description = "";
        else newDiscipline.description = description;
        if(disciplineCurso === undefined ) newDiscipline.disciplineCurso = "";
        else newDiscipline.disciplineCurso = disciplineCurso;
        if(disciplinePeriodo === undefined ) newDiscipline.disciplinePeriodo = "";
        else newDiscipline.disciplinePeriodo = disciplinePeriodo;
        //Save new discipline in the data array
        data.push(newDiscipline);
        console.log("Disciplina cadastrada com sucesso");
        res.status(201).json(newDiscipline);
        fs.writeFileSync(path.resolve("/home/mariana/Documents/Projeto-ESS/backend/db/disciplines.json"),JSON.stringify(data,null,2));
    }catch(error){
        console.log("Error in signUp:",error.message);
        res.status(500).json({
            error: "Internal Server Error"
        })
    }


}
exports.deleteDisciplineJson = (req, res) => {
    const disciplinesPath = path.resolve("/home/mariana/Documents/Projeto-ESS/backend/db/disciplines.json");
    try {
        const { id } = req.params;
        let data = JSON.parse(fs.readFileSync(disciplinesPath, 'utf-8'));
        const disciplineIndex = data.findIndex(element => element.disciplineID === id);
        if (disciplineIndex === -1) {
            console.log("Discipline Not Found");
            return res.status(404).json({ error: "Discipline Not Found" });
        }
        data.splice(disciplineIndex, 1);
        console.log("Disciplina removida com sucesso");
        res.status(200).json({ message: "Disciplina removida com sucesso" });
        fs.writeFileSync(disciplinesPath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.log("Error in deleteDiscipline:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.updateDisciplineJson = async (req, res) => {
    const disciplinesPath = path.resolve("/home/mariana/Documents/Projeto-ESS/backend/db/disciplines.json");
    try {
        const { id } = req.params;
        const {nome,disciplineID,responsibleTeacher,horario,description,disciplineCurso,disciplinePeriodo} = req.body;
        let data = JSON.parse(fs.readFileSync(disciplinesPath, 'utf-8'));
        const disciplineIndex = data.findIndex(element => element.disciplineID === id);

        if (disciplineIndex === -1) {
            console.log("Discipline Not Found");
            return res.status(404).json({ error: "Discipline Not Found" });
        }
        if(!isValidDateFormat(horario) && horario !== undefined){
            console.log("Formato de data inválido");
            return res.status(400).json({
                error: "Formato de data inválido. Use o formato DD-MM-AAAA hh:mm AM/PM"
            });
        }
        data[disciplineIndex] = {
            ...data[disciplineIndex],
            nome: nome || data[disciplineIndex].nome,
            disciplineID: disciplineID || data[disciplineIndex].disciplineID,
            responsibleTeacher: responsibleTeacher || data[disciplineIndex].responsibleTeacher,
            horario: horario || data[disciplineIndex].horario,
            description: description || data[disciplineIndex].description,
            disciplineCurso: disciplineCurso || data[disciplineIndex].disciplineCurso,
            disciplinePeriodo: disciplinePeriodo || data[disciplineIndex].disciplinePeriodo
        };

        console.log("Salvo com Sucesso!");
        res.status(200).json(data[disciplineIndex]);
        fs.writeFileSync(disciplinesPath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.log("Error in updateDiscipline:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

