const express = require('express');
const app = express();
const path = require('path')


//Connect Database
const connectDB = require('./config/db') 
connectDB();

//Initialise middleware, this is to accept the use of json
app.use(express.json({extended: false}));
0
//Define the routes
app.use('/api/users', require('./Routes/users'));
app.use('/api/auth', require('./Routes/auth'));
app.use('/api/contacts', require('./Routes/contacts'));


//Serve static assets in production
if(process.env.NODE_ENV === "production"){
    //Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, "client", "build", "index.html")))
}




const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Served from port ${PORT}`)
})