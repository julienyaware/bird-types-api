const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./db')
const PORT = 3000

app.use(express.json())
app.use(cors())

app.post('/orgs', async(req,res)=>{
    try {
        console.log(req.body)
        const { name } = req.body
        const newOrganization =  await pool.query(
        //  INSERT INTO org (name) VALUES ($1) RETURNING  
        )
        
    } catch (error) {
        
    }
})

app.listen(PORT,()=>{
    console.log(`App is listening on port ${PORT}`)
})