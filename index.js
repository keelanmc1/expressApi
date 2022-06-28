const express = require('express'); 
const app = express(); 
require('dotenv/config'); 
const mongoose = require('mongoose'); 
const user = require('./routes/Users'); 
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000; 
// Middleware
app.use(bodyParser.json()); 
app.use('/users', user); 

// Database connection
try{
    mongoose.connect(process.env.DB_CONNECTION, () => console.log('connected to database')); 
} catch (err){
    console.log (`Unable to connect to database with following error: ${err}`); 
}

// home route.
app.get('/', (req, res) => {
    res.send("Hello, this is the home page!"); 
}); 

app.listen(PORT, () => console.log(`listening on port ${PORT}`)); 