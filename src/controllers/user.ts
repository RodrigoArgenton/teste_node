// import { userModel } from "../models/userModel";
import { Request, Response } from "express";
import getUsersDB from "../database/db";

export async function getUsers(req:Request, res:Response):Promise<Response>{
    try{
        const users = await getUsersDB();
        return res.status(200).json(users);
    }catch(err){
        console.log(err)
        return res.status(500).send('Erro ao obter usuários')
    }
};