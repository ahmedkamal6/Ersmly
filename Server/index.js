
const express = require('express') 
const env = require('dotenv')
const cors = require('cors')
const connectToMongoDB = require("./mongoDB/connect")
const postRoutes = require('./Routes/postRoutes')
const ersmlyRoutes = require('./Routes/ersmlyRoutes')
env.config();
const app = express()
const startServer = ()=>{
    try{
        connectToMongoDB(process.env.MONGODB_URL)
        app.listen(8080,()=>console.log('http://localhost:8080/'))
    }
    catch(err){
        console.log(err)
    }
}
startServer()

app.use(cors());
app.use(express.json({limit:'50mb'}))

app.use('/api/v1/post',postRoutes)
app.use('/api/v1/ersmly',ersmlyRoutes)

app.get('/', async(req,res)=>{
    res.send('Hello from backend')
})
