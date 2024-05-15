import http from 'node:http'
import url from 'url'
import { randomUUID }  from 'node:crypto';

// const que salva, temporariamente, os dados da aplicação
const users = []

// criando o servidor
const server = http.createServer((req, res) => {
    const method = req.method
    const parsedUrl = url.parse(req.url, true)
    const { query, pathname } = parsedUrl
    
    if(method === 'GET' && pathname === '/users'){
        return res
            // Com essa função, o valor retornado fica em formato JSON
            .setHeader('Content-type', 'application/json')
            // Transforma um array em JSON
            .end(JSON.stringify(users))
    }
    if(method === 'POST' && pathname === '/users'){
        // Metódo para enviar informações para a memoria
        const name = query.name
        const email = query.email
        const id = randomUUID()
        users.push({
            id,
            name,
            email
        })
        // retorna o status code 201 (created)
        return res.writeHead(201).end()
    }
    if(method === 'PUT' && pathname === '/users'){
        return res.end('Edição de usuários concluída...')
    }
    if(method === 'PATCH' && pathname === '/users'){
        return res.end('Termos editado...')
    }
    if(method === 'DELETE' && pathname === '/users'){
        return res.end('Usuário deletado...')
    }
    //retorna o status code 404 (not found)
    return res.writeHead(404).end()
})

//passando a porta
server.listen(3333)