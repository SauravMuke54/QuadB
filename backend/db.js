const {  Client } = require('pg');
require('dotenv').config()
// Configure the connection


const config = {
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.DB_PORT, // Default PostgreSQL port
};

const client = new Client(config);

client.connect().then(()=>{
    console.log("DB Connected")
}).catch((err)=>{
    console.log("Error in connecting DB",err)
});

module.exports=client
