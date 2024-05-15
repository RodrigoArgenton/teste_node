import http from 'node:http'
import url from 'url'
import { MongoClient } from 'mongodb';

// conexão com o banco de dados
const uri = 'mongodb+srv://rodrigolk4321:R2RvL2gNAmw4I1uj@users.qzojpzs.mongodb.net/?retryWrites=true&w=majority&appName=users'
const client = new MongoClient(uri)
const database = client.db('database')
const collection = database.collection('users')

// criando o servidor
const server = http.createServer(async(req, res) => {
    const method = req.method
    const parsedUrl = url.parse(req.url, true)
    const { query, pathname } = parsedUrl
    const name = query.name
    const email = query.email
    

    if(method === 'GET' && pathname === '/users'){
        const dados = await searchDB()
        return res
            // Com essa função, o valor retornado fica em formato JSON
            .setHeader('Content-type', 'application/json')
            .end(JSON.stringify(dados))
    }
    if(method === 'POST' && pathname === '/users'){
        //validação de dados enviados
        if(!name || !email){
            return res.writeHead(400).end('Um ou mais campos, não foram preenchidos. Campo obrigatórios: name e email.')
        }
        
        await insertDB(name, email)
        // retorna o status code 201 (created)
        return res.writeHead(201).end('Cadastro realizado com sucesso')
    }
    // if(method === 'PUT' && pathname === '/users'){
    //     return res.end('Edição de usuários concluída...')
    // }
    // if(method === 'PATCH' && pathname === '/users'){
    //     return res.end('Termos editado...')
    // }
    // if(method === 'DELETE' && pathname === '/users'){
    //     return res.end('Usuário deletado...')
    // }
    //retorna o status code 404 (not found)
    return res.writeHead(404).end()
})

async function searchDB (){
    try{
        const result = await collection.find({}).toArray()
        console.log(result)
        return result
    }catch(err){
        console.error('Erro ao buscar dados: ', err)
        throw err
    }
}
async function insertDB(name, email){
    try{
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
//passando a porta
server.listen(3333)