import express from 'express'
import {searchDB, insertDB} from '../database/dbUser.js'

const app = express()
// Middleware para analisar o corpo das requisições como JSON
app.use(express.json())

try{
    app.get('/users', async(req, res) => {
        try{
            const users = await searchDB()
            return res
                .setHeader('content-type', 'application/json')
                .end(JSON.stringify(users))
        }catch(err){
            res.writeHead(500).end(err)
        }
    })
    app.post('/users', async(req, res) => {
        const { name, email} = req.query

        try{
            await insertDB(name, email)
            res.writeHead(201).end('Cadastro realizado com sucesso!')
        }catch(err){
            res.writeHead(500).end(err)
        }

    })
    // configuração de porta
    const PORT = process.env.PORT || 3333
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`)
    })
}catch(err){
    console.log(err)
}