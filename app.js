const express = require('express')
const app =  express()

const connectToDatabase = require('./database')


 // Alternative 
//  const app = require('express')()


connectToDatabase()


app.get("/",(req,res)=>{
 
    res.status(200).json({
        message : "Success"
    })
})





app.listen(3000,()=>{
    console.log("Nodejs server has started at port 3000")
})

