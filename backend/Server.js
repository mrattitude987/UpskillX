import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import 'dotenv/config'

//Mongo and authmiddleware import---------
import ConnectDB from './config/dbconfig.js'
import authmiddleware from './middleware/authmiddleware.js'

//importRouter------------------------------
import UserRouter from './routes/userroute.js'
import CourseRouter from './routes/courserouter.js'
import EnrollRouter from './routes/EnrollRoute.js'


let app = express()
app.use(cors())
app.use(bodyParser.json())


// mongoconn-------------------------
// mongoose.connect(process.env.MONGODB_URI).then(()=>{
//     console.log('connectes to mongodb.....')
// })
ConnectDB();




//Apis------------------------------
app.get('/',(req, res)=>{
    res.json('wlc to Apis.........')
})
 
app.use('/api/user', UserRouter)
app.use('/api/course',authmiddleware, CourseRouter)
app.use('/api/Enroll', authmiddleware, EnrollRouter)
// app.use('/api/course',CourseRouter)






//Listening--------------------------
app.listen(process.env.PORT, ()=>{
    console.log(`server is run on........${process.env.PORT}`)
})