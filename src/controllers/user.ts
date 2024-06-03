// import { userModel } from "../models/userModel"
import { Request, Response } from "express"
import { getUsersDB, postUsersDB } from "../database/db"
import validationUser from "../middlewares/validatorUser"


export async function getUsers(req:Request, res:Response):Promise<Response>{
    try{
        const filter = req.params.name
        console.log(filter)
        const users = await getUsersDB(filter)
        return res.status(200).json(users)
    }catch(err){
        console.log(err)
        return res.status(500).send('Erro ao obter usuários')
    }
}

export async function postUsers(req:Request, res:Response):Promise<Response>{
    try {
        const schema = validationUser()
        await schema.validateAsync(req.body, { abortEarly: false}) 
        const { name, email } = req.body
        await postUsersDB(name, email)
        return res.status(201).send('Cadastro criado!')
    } catch (err: any) {
        if (err.isJoi){
            return res.status(400).json({
                error: err.details.map((detail: any) => ({
                    message: detail.message,
                    path: detail.path,
                }))
            })
        }else{
            return res.status(500).json('Erro interno')
        }
    }
}