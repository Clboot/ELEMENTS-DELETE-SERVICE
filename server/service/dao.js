const { Client } = require('pg')
require("dotenv").config()

let client = {}

function connect () {
    client = new Client({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DATABASE,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    })
    client.connect((error) => {
        if (error) {
            throw error
        }
    })
}

function query (query, values, resultCallback) {
    client.query(query, values, (error, result) => {
        if (error) {
            throw error
        }
        resultCallback(result)
    })
}

function disconnect () {
    client.end()
}

module.exports = {
    connect: connect,
    disconnect: disconnect,
    query: query
}
