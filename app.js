const express = require('express')
const app =  express()
const fs = require('fs')
const connectToDatabase = require('./database')
const Book = require('./model/bookModel')
// multerconfig imports
const {multer,storage} = require("./middleware/multerConfig")
const upload = multer({storage : storage})
 // Alternative 
//  const app = require('express')()

// cors package 
const cors = require('cors')


app.use(cors({
    origin : "*"
}))

app.use(express.json())


connectToDatabase()


app.get("/",(req,res)=>{
 
    res.status(200).json({
        message : "Success"
    })
})

// create book
app.post("/book",upload.single("image") ,async(req,res)=>{

    let fileName ;
    if(!req.file){
        fileName = "https://cdn.vectorstock.com/i/preview-1x/77/30/default-avatar-profile-icon-grey-photo-placeholder-vector-17317730.jpg"
    }else{
       fileName = "http://localhost:3000/" + req.file.filename
    }
   const {bookName,bookPrice,isbnNumber,authorName,publishedAt,publication} = req.body
   await Book.create({
        bookName,
        bookPrice,
        isbnNumber,
        authorName,
        publishedAt,
        publication,
        imageUrl : fileName
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

//delete operation 
app.delete("/book/:id",async(req,res)=>{
    const id = req.params.id
   await Book.findByIdAndDelete(id)
   res.status(200).json({
        message : "Book Deleted Successfully"
   })
})

// update operation 
app.patch("/book/:id",upload.single('image'), async (req,res)=>{
    const id = req.params.id // kun book update garney id ho yo
    const {bookName,bookPrice,authorName,publishedAt,publication,isbnNumber} = req.body
    const oldDatas = await Book.findById(id)
    let fileName;
    if(req.file){
        
        const oldImagePath = oldDatas.imageUrl
        console.log(oldImagePath)
        const localHostUrlLength = "http://localhost:3000/".length
        const newOldImagePath = oldImagePath.slice(localHostUrlLength)
        console.log(newOldImagePath)
        fs.unlink(`storage/${newOldImagePath}`,(err)=>{
            if(err){
                console.log(err)
            }else{
                console.log("File Deleted Successfully")
            }
        })
        fileName = "http://localhost:3000/" + req.file.filename
    }
    await Book.findByIdAndUpdate(id,{
        bookName : bookName,
        bookPrice : bookPrice,
        authorName : authorName,
        publication : publication,
        publishedAt : publishedAt,
        isbnNumber : isbnNumber,
        imageUrl : fileName
    })
    res.status(200).json({
        message : "Book Updated Successfully"
    })
})

app.use(express.static("./storage/"))

app.listen(3000,()=>{
    console.log("Nodejs server has started at port 3000")
})

