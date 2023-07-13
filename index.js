const express = require('express')
const app = express()
const {userRouter} = require('./routes/user.router')
const {empRouter} = require('./routes/employee.router')
const {connection} = require('./db')
const cors = require('cors')
app.use(express.json())
app.use(cors())


app.get('/',(req,res) => {
    res.send("Home Page")
})

app.use('/user',userRouter)
app.use('/employee',empRouter)

app.listen(process.env.PORT,async() => {
    try{
    await connection
    console.log('connected to db')
    }
    catch(err){
        console.log(err)
    }
    console.log("Running at port 9090")
})