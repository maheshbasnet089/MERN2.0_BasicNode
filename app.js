const express = require('express')
const app =  express()

const connectToDatabase = require('./database')
const Book = require('./model/bookModel')


 // Alternative 
//  const app = require('express')()


app.use(express.json())


connectToDatabase()


app.get("/",(req,res)=>{
 
    res.status(200).json({
        message : "Success"
    })
})

// create book
app.post("/book",async(req,res)=>{

   const {bookName,bookPrice,isbnNumber,authorName,publishedAt,publication} = req.body
   await Book.create({
        bookName,
        bookPrice,
        isbnNumber,
        authorName,
        publishedAt,
        publication
       })
   res.status(201).json({
    message : "Book Created Successfully"
   })
})

// all read
app.get("/book",async (req,res)=>{
    const books = await Book.find() // return array ma garxa 
    res.status(200).json({
        message : "Books fetched successfully",
        data : books
    })
})

// single read
app.get("/book/:id",async(req,res)=>{
    const id = req.params.id
   const book = await Book.findById(id) // return object garxa
   if(!book) {
    res.status(404).json({
        message : "Nothing found"
    })
   }else{
    res.status(200).json({
        message : "Single Book Fetched Successfully",
        data : book
    })
   }
   
    
})

app.listen(3000,()=>{
    console.log("Nodejs server has started at port 3000")
})

