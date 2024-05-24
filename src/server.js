import http from 'node:http'
import { routes } from './routes.js'
import { extractQueryParams } from './utils/extract-query-params.js'

/** 
 * * Query Parameters: URL Stateful => filtros, paginação, não obrigatórios
 *   http://localhost:3333/users?userId=1&name=Nelio :: parâmetros nomeados
 * 
 * * Route Parameters: identicação de recurso
 *   GET http://localhost:3333/users/1
 *   DELETE http://localhost:3333/users/1
 * 
 * * Request Body: Envio de informçaões de um formulário (HTTPs)
 *   POST http://localhost:3333/users/1
 * 
 * * Edição e Remoção
 * */

const server = http.createServer((req, res) => {
    const { method, url} = req

    res.setHeader('Content-type', 'application/json')

    const route = routes.find(route => {
        // return route.method === method && route.path === url
        return route.method === method && route.path.test(url)
    })

    if (route) {
        const routeParams = req.url.match(route.path)

        // console.log(routeParams)
        // console.log(routeParams.groups)

        // const params = { ...routeParams.groups }
        // console.log(params)
        
        // 2::
        // const params = { ...routeParams.groups }
        // console.log(params)
        // { query: '?search=Nelio' }

        // console.log(extractQueryParams(routeParams.groups.query))
        // { search: 'Nelio' }

        // req.params = { ...routeParams.groups }
        const { query, ...params } = routeParams.groups
        req.params = { params }
        req.query = query ? extractQueryParams(query) : {}

        return route.handler(req, res)
    }

    return res.writeHead(404).end()
})

server.listen(3333)