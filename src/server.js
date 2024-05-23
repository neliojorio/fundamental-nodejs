// const http = require('http') // CommonJS => require
import http from 'node:http' // ESModules => import/export  ::  prefix internal modules with "node:"

// `package.json` :: "type": "module",  ...{'commonJS'}


/**
 * routes
 * - criar
 * - listar
 * - editar
 * - remover
 * 
 * http
 * - metodo
 * - url
 * 
 * GET, POST, PUT, PATCH, DELETE
 * 
 * GET => buscar informação
 * POST => criar
 * PUT => editar, atualizar
 * PATCH => atualizar informação especifica
 * DELETE => apagar
 * 
 * posso ter a mesma rota com métodos diferentes
 * GET /users => buscar
 * POST /users => criar
 * 
 * Stateful - estado em memória local
 * Stateless
 * 
 * JSON - JavaSscript Object Notation
 * 
 * Headers (Req/Res) => Metadados
 *  .setHeader('Content-type', 'application/json') :: enviar na resposta
 * ::tb podemos obter o header da requisição
 * 
 * 
 * HTTP status code
 * 
 * Informational responses (100 – 199)
 * Successful responses (200 – 299)
 * Redirection messages (300 – 399)
 * Client error responses (400 – 499)
 * Server error responses (500 – 599)
 */

const users = []

const server = http.createServer((req, res) => {

    const { method, url} = req
    console.log(method, url)

    if (method === 'GET' && url === '/users') {
        // return res.end('Listagem de usuários')
        return res
            .setHeader('Content-type', 'application/json')
            .end(JSON.stringify(users))
    }

    if (method === 'POST' && url === '/users') {
        users.push({
            id: 1,
            name: 'John Doe',
            email: 'johndow@example.com'
        })
        // return res.end('Criação de usuário')
        return res.writeHead(201).end()
    }

    // return res.end('Hello World')
    // return res.end('Hello Ignite')
    return res.writeHead(404).end()
})

server.listen(3333) //localhost:3333

/**
 *  new script in `package.json`
 * 
    "scripts": {
    "dev": "node --watch src/server.js"
  },

  :: npm run dev

 */