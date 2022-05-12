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
        const newOrganization =  await pool.query( "INSERT INTO org (name) VALUES ($1) RETURNING *", [name])
        res.json(newOrganization.rows[0])
        
    } catch (error) {
        console.error(err.message)
    }
})

// get all organizations
app.get('/orgs', async (req, res) => {
    try {
        const allOrganizations = await pool.query("SELECT * FROM org")
        res.json(allOrganizations.rows)
    } catch (err) {
        console.error(err.message)
    }
})

// get only one organization
app.get('/orgs/:id', async (req, res) => {
    console.log(req.params)
    const { id } = req.params
    try {
        const organization = await pool.query("SELECT * FROM org WHERE org_id = $1", [id]) 
        res.json(organization.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

// delete an org
app.delete('/orgs/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deleteOrganization = await pool.query("DELETE FROM org WHERE org_id = $1", [id])
        res.json('The organization was deleted')
    } catch (err) {
        console.error(err.message)
    }
})

// update an organization
app.put('/orgs/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { name } = req.body 
        const updateOrganization = await pool.query("UPDATE org SET name = $1 WHERE org_id = $2", [name, id])
        res.json('The organization name was updated')
    } catch (err) {
        console.error(err.message)
    }
})

app.listen(PORT,()=>{
    console.log(`App is listening on port ${PORT}`)
})