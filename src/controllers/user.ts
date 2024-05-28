// import { userModel } from "../models/userModel";
import { Request, Response } from "express";
import { getUsersDB, postUsersDB } from "../database/db";

export async function getUsers(req:Request, res:Response):Promise<Response>{
    try{
        const users = await getUsersDB();
        return res.status(200).json(users);
    }catch(err){
        console.log(err)
        return res.status(500).send('Erro ao obter usuários')
    }
};

export async function postUsers(req:Request, res:Response):Promise<Response>{
    try {
        const name = req.body.name;
        const email = req.body.email;
        const users = await postUsersDB(name, email)
        return res.status(201).send('Cadastro criado!')
    } catch (err) {
        console.log(err)
        return res.status(500).send('Erros ao criar cadastro...')
    }
}