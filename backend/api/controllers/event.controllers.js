import fs from 'fs';
import path from 'path';


export const getAllEventsJson = (req,res) => {
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

export const eventSignUpJson = async(req, res) => {
    try{
        const {eventName,description,responsibleTeacher,eventDateAndTime} = req.body;
        const missingInfo = !eventName || !responsibleTeacher || !eventDateAndTime;
        if(missingInfo){
            console.log("Informações obrigatórias não preenchidas");
            return res.status(400).json({
                error: "Informações obrigatórias não preenchidas"
            })
        }
        let data = JSON.parse(fs.readFileSync(path.resolve("../api/mock/eventos.json"),'utf-8'));
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
        if(description === undefined) {
            const newEvent = {
                eventName,
                description: "",
                responsIbleTeacher,
                eventDateAndTime,
            }
            data.push(newEvent);
            res.status(201).json(newEvent);
        } else{
            const newEvent = {
                eventName,
                description,
                responsibleTeacher,
                eventDateAndTime
            }
            data.push(newEvent);
            res.status(201).json(newEvent);

        }
        fs.writeFileSync(path.resolve("../api/mock/eventos.json"),JSON.stringify(data,null,2));
       

        
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