const express =require ('express')
const testroutes=require('./routes/testRoutes')
const authroutes=require('./routes/authRoutes')
const inventoryroutes=require('./routes/inventoryRoutes')
const dotenv=require('dotenv')
const colors=require('colors')
const morgan = require('morgan')
const cors=require('cors')
const connectDB=require('./config/db')
dotenv.config()
// connect database
connectDB()
// rest object
const app=express();

// middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
// routes
app.use('/api/v1/test',testroutes)
app.use('/api/v1/auth',authroutes)
app.use('/api/v1/inventory',inventoryroutes)
const PORT=process.env.PORT || 8888;
 
app.listen(PORT,()=>{
console.log(`Server Running In ${process.env.DEV_MODE} Mode On Port ${PORT}`.bgBlue.white)
})