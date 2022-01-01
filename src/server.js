// Import Express.js
import express from 'express'
import bodyParser from 'body-parser'
import mysql from 'mysql2'
import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: 'applicationStrings.env'})

var conn = mysql.createConnection({
    host : process.env.DB_HOST || 'localhost',
    port : process.env.DB_PORT,
    user : process.env.DB_USER || 'root',
    password : process.env.DB_PASS,
    database : process.env.DB_NAME,
});

conn.connect();

// This variable defines the port of your computer where the API will be available
const PORT = 3000

// This variable instantiate the Express.js library
const app = express()

app.use(bodyParser.json())

// The code below starts the API with these parameters:
// 1 - The PORT where your API will be available
// 2 - The callback function (function to call) when your API is ready
app.listen(PORT, () =>
    console.log(`The SQL wrapper API started running on: http://localhost:${PORT}.`)
)

app.post('/getQueryResponse', (request, response) => {
    // The string we want to display on http://localhost:3000
    console.log(request.body);
    const sqlQuery = request.body.query
    conn.query(sqlQuery, function(error, results){
        if ( error ){
            response.status(400).send('Error in database operation');
        } else {
            response.status(200).send(results);
        }
    });
})