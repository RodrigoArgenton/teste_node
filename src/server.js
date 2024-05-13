import http from 'node:http'

// const que salva, temporariamente, os dados da aplicação
const users = []

// criando o servidor
const server = http.createServer((req, res) => {
    const { method, url } = req

    if(method === 'GET' && url === '/users'){
        return res
            // Com essa função, o valor retornado fica em formato JSON
            .setHeader('Content-type', 'application/json')
            // Transforma um array em JSON
            .end(JSON.stringify(users))
    }
    if(method === 'POST' && url === '/users'){
        // Metódo para enviar informações para a memoria
        users.push({
            id: 1,
            nome: 'Rodrigo Argenton Barbosa',
            email: 'rodrigolk4321@gmail.com',
        })
        // retorna o status code 201 (created)
        return res.writeHead(201).end()
    }
    if(method === 'PUT' && url === '/users'){
        return res.end('Edição de usuários concluída...')
    }
    if(method === 'PATCH' && url === '/users'){
        return res.end('Termos editado...')
    }
    if(method === 'DELETE' && url === '/users'){
        return res.end('Usuário deletado...')
    }
    //retorna o status code 404 (not found)
    return res.writeHead(404).end()
})

//passando a porta
server.listen(3333)