import http from 'node:http'

// criando o servidor
const server = http.createServer((req, res) => {
    return res.end('Hello World')
})

//passando a porta
server.listen(3333)