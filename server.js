const express = require('express')

const app = express()

const port = process.env.port || 5000

app.listen(port,'10.192.3.137', () => console.log(`Listening port ${port}`))

app.get('/expess_backend', (req, res) => {
  res.send({express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT'})
})

app.get ('/', (req,res) => {
  res.sendFile('dist/index.html', {root: __dirname })
})

app.get('/main.js', (req, res) => {
  res.sendFile('dist/main.js', {root: __dirname})
})
