const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config();

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/tasks',require('./routes/tasks'))

mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log('connection successful'))
    .catch((error)=>console.log(error))


const PORT = process.env.PORT
app.listen(PORT,()=>console.log(`server is running on port ${PORT}`))

module.exports = app