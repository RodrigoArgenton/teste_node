import http from 'node:http'

// criando o servidor
const server = http.createServer((req, res) => {
    const { method, url } = req

    if(method === 'GET' && url === '/users'){
        return res.end('Lista de usuários...')
    }
    if(method === 'POST' && url === '/users'){
        return res.end('Criação de usuário...')
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
    return res.end('Hello World')
})

//passando a porta
server.listen(3333)