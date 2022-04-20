const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const create_table = `CREATE TABLE IF NOT EXISTS people(id int not null auto_increment, name varchar(255), primary key(id))`
connection.query(create_table)

const insert = `INSERT INTO people(name) values('Cássio')`
connection.query(insert)

connection.query('SELECT name FROM people', function(err, rows, fields){
    if(err) throw err

    let people = rows.map(function(e){
        return e.name
    }).join('<br>')

    connection.end()

    let title = '<h1>Full Cycle Rocks!</h1>'
    let page = title+people

    app.get('/', function(req, res) {
      res.send(page)
    })
})


app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})