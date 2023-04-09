import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import router from './routes/route.js';
import cors from 'cors'
import bodyParser from 'body-parser';

dotenv.config()

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URL)
    .then(()=>{console.log("db connected")})
    .catch((err)=>console.log(err))


const app=express();

app.use(cors())
app.use(bodyParser.json({extended:true}))
app.use(bodyParser.urlencoded({extended:true}))

app.use('/',router)
app.listen(8000,()=>{
    console.log("server running")
})