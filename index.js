const express = require('express')

//get routes to the variable
const router = require('./src/routes')

const app = express()

const port = 5000

//take data from input user
app.use(express.json())

//add endpoint grouping and router
app.use('/api/v1', router)


app.listen(port, () => {
    console.log(`Listening on port ${port}!`)
})