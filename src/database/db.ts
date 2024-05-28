import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const URL = process.env.URL;
const client = new MongoClient(String(URL))

async function connectDB() {
    try {
        await client.connect();
        const database = client.db('database');
        const collection = database.collection('users');
        if(!collection){
            throw new Error('A coleção não foi encontrada')
        }
        return(collection)
    } catch (err) {
        console.log(err)
        throw new Error('Erro ao conectar no banco de dados')
    }
}
export default async function getUsers() {
    const collection = await connectDB();
    const allUsers = await collection.find().toArray();
    return allUsers;
}