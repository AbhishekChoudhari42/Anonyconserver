const dotenv = require("dotenv")
dotenv.config();
const express = require('express')
const cors = require('cors')
const cookieSession = require('cookie-session')
const mongoose = require('mongoose')
const helmet = require("helmet")
const morgan = require("morgan")

const app = express()


// connection
async function connect(){
    try{
        await mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true})
        console.log("connected to db")
    }catch(error){
        console.error(error)
    }
}
connect()

mongoose.set('strictQuery', true);

const port = process.env.PORT || 5000
    app.listen(port, () => console.log("💥"))

// middleware
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

app.get('/',(req,res)=>{
    res.render('s')
})
// API routes

const userRouter = require("./routes/user")
app.use("/user",userRouter)

const authRouter = require("./routes/auth");
app.use("/auth",authRouter)




const passportSetup = require('./passport')








