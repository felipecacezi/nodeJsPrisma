const express = require('express')
const app =  express()

const userRoutes = require('../routes/userRoutes')

app.use(express.json())

app.use('/usuario', userRoutes)

app.listen(3000,function(){
    console.log('Server is running')
})