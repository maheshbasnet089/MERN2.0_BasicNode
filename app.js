const express = require('express')
const app =  express()

 // Alternative 
//  const app = require('express')()




app.get("/",(req,res)=>{
    res.send("bye world ")
})









app.listen(3000,()=>{
    console.log("Nodejs server has started at port 3000")
})

