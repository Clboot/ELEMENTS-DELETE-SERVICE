const { Client } = require('pg')
require("dotenv").config()

let client = {}

function connect () {
    client = new Client({
        host: "localhost",
        port: 5432,
        database: "cl_boot_db",
        user: "postgres",
        password: "postgres"
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
