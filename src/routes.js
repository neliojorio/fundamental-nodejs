import { Database } from "./database.js"
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from "./utils/build-route-path.js"

const database = new Database

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/users'),
        handler: (req, res) => {

            // console.log(req.query)
            // { search: 'Nelio', page: '2' }
            const { search } = req.query

            // const users = database.select('users', {
            //     name: search,
            //     email: search,
            // })

            const users = database.select('users', search ? {
                name: search,
                email: search,
            } : null)

            return res.end(JSON.stringify(users))
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/users'),
        handler: async (req, res) => {

            //* streams */
            const buffers = []
            for await (const chunk of req) {
                buffers.push(chunk)
            }
            const body = JSON.parse(Buffer.concat(buffers).toString())
            // console.log(body.name) 
            // console.log(body) 
            //* end streams

            const { name, email } = body

            const user = {
                // id: 1,
                id: randomUUID(),
                name,
                email,
            }

            database.insert('users', user)

            return res.writeHead(201).end()
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/users/:id'),
        handler: async (req, res) => {
            const { id } = req.params

            //* streams */
            const buffers = []
            for await (const chunk of req) {
                buffers.push(chunk)
            }
            const body = JSON.parse(Buffer.concat(buffers).toString())
            // console.log(body.name) 
            // console.log(body) 
            //* end streams

            const { name, email } = body

            database.update('users', id, {
                name,
                email,
            })

            // return res.end()
            return res.writeHead(204).end()
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/users/:id'),
        handler: (req, res) => {
            // console.log(req.params)

            const { id } = req.params
            database.delete('users', id)

            // return res.end()
            return res.writeHead(204).end()
        }
    }
]