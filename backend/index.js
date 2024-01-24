

const express = require('express');
const mainROutes=require('./routes/route')
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
require('dotenv').config();
const cors= require('cors')
const client=require('./db')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())


app.get('/',()=>{
    console.log("Server Started")
})



// Define a route
app.use('/api', mainROutes);

// Start the server
app.listen(port, () => {
  
    console.log(`Server is running at http://localhost:${port}`);
});
