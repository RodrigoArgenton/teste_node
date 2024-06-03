import { MongoClient } from "mongodb"
import dotenv from "dotenv"

dotenv.config()

const URL = process.env.URL
const client = new MongoClient(String(URL))

//coneão com o db
async function connectDB() {
    try {
        await client.connect()
        const database = client.db('database')
        const collection = database.collection('users')
        if(!collection){
            throw new Error('A coleção não foi encontrada')
        }
        return(collection)
    } catch (err) {
        console.log(err)
        throw new Error('Erro ao conectar no banco de dados')
    }
}
//listagem de usuários
export async function getUsersDB(filter: any = {}) {
    const collection = await connectDB()
    if(!filter){
        const allUsers = await collection.find().toArray()
        return allUsers
    }else{
        const allUsers = await collection.find(filter).toArray()
        return allUsers
    }
    
}
//postagem de novos usuários
export async function postUsersDB(name:string, email:string) {
    try {
        const collection = await connectDB()
        const data = {
            name,
            email
        }
        await collection.insertOne(data)
    } catch (err) {
        console.log(err)
    }
}