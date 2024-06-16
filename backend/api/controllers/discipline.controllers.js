const fs = require('fs');
const path = require('path');

const getDisciplinebyID = (req,res) => {
    try{
        const id = req.params.id;
        const data = JSON.parse(fs.readFileSync(path.resolve("/home/mariana/Documents/Projeto-ESS/backend/api/mock/disciplines.json"),'utf-8'));
        const discipline = data.find(element => element.id === id);
        if(!discipline){
            console.log("Discipline not found");
            return res.status(404).json({
                error: "Discipline not found"
            })
        }
        console.log("Discipline found");
        return res.status(200).json(discipline);
    }catch(error){
        console.log("Error in getDisciplineById",error.message);
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}


const disciplinesSignUpJson = async(req, res) => {
    try{
        const {nome,id,responsibleTeacher,horario,description,disciplineCurso,disciplinePeriodo} = req.body;
        // Checks if any of the required fields are missing
        const missingInfo = !nome || !responsibleTeacher || !horario || !id;
        //If any of the required fields are missing, error message
        if(missingInfo){
            console.log("Informações obrigatórias não preenchidas");
            return res.status(400).json({
                error: "Informações obrigatórias não preenchidas"
            })
        }
        let data = JSON.parse(fs.readFileSync(path.resolve("/home/mariana/Documents/Projeto-ESS/backend/api/mock/disciplines.json"),'utf-8'));
        // Checks if discipline exists with boolean variable
        const disciplineExists = data.some(element => 
            element.nome === nome && 
            element.id === id
        );
        //If it does, error message
        if(disciplineExists){
            console.log("Discipline already exists");
            return res.status(400).json({
                error: "Discipline already exists"
            })
        };
        // Build new discipline object
        const newDiscipline = {
            nome,
            id,
            responsibleTeacher,
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
        fs.writeFileSync(path.resolve("/home/mariana/Documents/Projeto-ESS/backend/api/mock/disciplines.json"),JSON.stringify(data,null,2));
    }catch(error){
        console.log("Error in signUp:",error.message);
        res.status(500).json({
            error: "Internal Server Error"
        })
    }


}
// export const loginJson = async(req, res) => {
//     try{
//         const {username,password} = req.body;
//         let data = JSON.parse(fs.readFileSync(path.resolve("./samples/users.json"),'utf-8'));
//         let user = data.find(({username}) => username === req.body.username);
//         const isPasswordCorrect = await bcrypt.compare(password,user.password);

//         if(!user || !isPasswordCorrect){
//             console.log("Invalid credentials");
//             return res.status(400).json({
//                 error: "Invalid credentials"
//             })
//         }
//         generateTokenAndSetCookie(user.id,res);
//         res.status(200).json({
//             id: user.id,
//             username,
//             fullName: user.fullName,
//             gender: user.gender
//         });
        
//     }catch(error){
//         console.log("Error in signUp:",error.message);
//         res.status(500).json({
//             error: "Internal Server Error"
//         })
//     }


// }
// export const logoutJson = (req, res) => {
//     try{
//         res.cookie("jwt","",{maxAge: 0});
//         res.status(200).json({
//             message: "User logged out"
//         })

        
//     }catch(error){
//         console.log("Error in signUp:",error.message);
//         res.status(500).json({
//             error: "Internal Server Error"
//         })
//     }


// }

module.exports = {getDisciplinebyID,disciplinesSignUpJson};