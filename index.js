const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config();
const app = express();
const PORT = process.env.PORT;
const mongoURI = process.env.MONGOURI;
const route = require('./Routes/route.js')
const cookieParser = require("cookie-parser");


app.use(cookieParser());
app.use(express.json());
app.use(route);




mongoose.connect(mongoURI,{
    dbName:"auth_api"
}).then(()=>console.log("MongoDB connected"))

app.listen(PORT,()=>{
    console.log(`Server listening on ${PORT} `)
})
