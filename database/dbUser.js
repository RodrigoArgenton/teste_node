import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

// Configurar as variáveis de ambiente
dotenv.config()

function connectionDB(){
    try{
        const uri = process.env.URI
        const client = new MongoClient(uri)
        const database = client.db('database')
        const collection = database.collection('users')
        return collection
    }catch(err){
        console.log('Não foi possivel conectar devido ao erro: ', err)
        throw(err)
    }
}
export async function searchDB(){
    try{
        const collection = connectionDB()
        const result = await collection.find({}).toArray()
        return result
    }catch(err){
        console.error('Erro ao buscar dados: ', err)
        throw err
    }
}
export async function insertDB(name, email){
    try{
        const collection = connectionDB()
        const data = {
            name,
            email
        }
        const insertData = await collection.insertOne(data)
    }catch{
        console.error('Erro ao inserir documento:', err)
        throw err
    }
}
