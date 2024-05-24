import fs from 'node:fs/promises'

// console.log(__dirname)
// console.log(__filename)

// type: 'Modules'
// console.log(import.meta.url)

// primeiro parametro funciona como se estivesse na linha de comando:
// exemplo: '../db.json' retorna o caminho na pasta anterior
// { pathname: '/C:/dev/wc/rocketseat/01-fundamentos-nodejs/db.json',   }

const databasePath = new URL('../db.json', import.meta.url)
//console.log(databasePath)

// { users: [...]}
export class Database {
    #database = {} // # = private  property


    constructor() {
        fs.readFile(databasePath, 'utf8').then(data => {
            this.#database = JSON.parse(data)
        })
        .catch(() => {
            this.#persist()
        })
    }

    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }


    // {name: "Nelio", email: "nelio@example"}
    // some()
    // [ [name: "Nelio"], [email: "nelio@example"] ]

    select(table, search) {
        let data = this.#database[table] ?? []

        if (search) {
            data = data.filter(row => {
                return Object.entries(search).some(([key, value]) => {
                    return row[key].toLowerCase().includes(value.toLowerCase())
                })
            })
        }

        return data
    }


    insert(table, data) {
        if (Array.isArray(this.#database[table])) {
            this.#database[table].push(data)
        } else {
            this.#database[table] = [data]
        }

        this.#persist()

        return data

    }

    
    delete(table, id) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id)

        if (rowIndex > -1) {
            this.#database[table].splice(rowIndex, 1)
            this.#persist()
        }
    }


    update(table, id, data) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id)

        if (rowIndex > -1) {
            this.#database[table][rowIndex] = { id, ...data}
            this.#persist()
        }
    }
}