import express, {Request, Response} from "express"
import { getUsers, postUsers } from "./controllers/user"


const app = express()

// middleware para processar requisições JSON
app.use(express.json())

app.get('/', getUsers)
app.post('/', postUsers)

app.listen(3333, () =>{
    console.log('Servidor rodando em http://localhost:3333')
})