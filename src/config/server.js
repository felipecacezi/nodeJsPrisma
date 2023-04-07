const express = require('express')
const app =  express()

const userRoutes = require('../routes/userRoutes')
const postRoutes = require('../routes/postRoutes')

app.use(express.json())

app.use('/usuario', userRoutes)
app.use('/post', postRoutes)

app.listen(3000,function(){
    console.log('Server is running')
})