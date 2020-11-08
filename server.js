const express = require('express');
const app = express();


//Connect Database
const connectDB = require('./config/db') 
connectDB();

//Initialise middleware, this is to accept the use of json
app.use(express.json({extended: false}))

app.get('/', (req, res)=>{
    res.json({msg: "Welcome to contact keeper"})
});

//Define the routes
app.use('/api/users', require('./Routes/users'));
app.use('/api/auth', require('./Routes/auth'));
app.use('/api/contacts', require('./Routes/contacts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Served from port ${PORT}`)
})