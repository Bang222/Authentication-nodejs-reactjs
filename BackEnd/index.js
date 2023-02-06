const express = require('express')
const cors = require('cors');
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const mongoose = require("mongoose");
const morgan = require("morgan");
dotenv.config();
mongoose.set('strictQuery', false);

const Authenticationroute = require("./Routes/auth")
const Userrouter = require("./Routes/Users")

const app = express();

app.use(morgan("common"))
mongoose.connect(process.env.URL_DATABASE,()=>{
console.log("Connect Database Done!!!")
})

app.use(cors());
app.use(cookieParser());
app.use(express.json());
//
///////////////Router-----------------------
app.use("/auth",Authenticationroute)
app.use("/user",Userrouter)


//---------------------------------------------------
app.listen(8000,()=>{
    console.log(("server is running"));
})

/// Authentication
// Authorization (Chuc nang phan quyen)
