const mongoose = require('mongoose')
const ConnectionString = "mongodb+srv://manish:manish@cluster0.3atmlr7.mongodb.net/?retryWrites=true&w=majority"
async function connectToDatabase(){
    await  mongoose.connect(ConnectionString)
    console.log("Connected To DB Successfully")
 }

 module.exports = connectToDatabase