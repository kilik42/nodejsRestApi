const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')

app.use(morgan('combined'))


app.get('/user/:id', (req, res)=>{
  console.log("fetching user with id: "+ req.params.id)
  const connection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    database: ''
  })

  const userId = req.params.id
  const queryString = "SELECT * FROM users WHERE id = ?"
  connection.query(queryString, [userId], (err, rows, fields)=>{
    if (err){
      console.log("failed to queyr fro users: "+ err)
      res.sendStatus(500)

      return
    }
    console.log("i think we fetched users successfully")

    const users = rows.map((row)=> {
      return {firstName: row.first_name, lastName: row.last_name}
    })
    res.json(rows)
  })


  //res.end()
})

app.get("/", (req, res)=>{
  console.log("responding to root route")
  res.send("hello from root")
})

app.get("users", (req, res) =>{

  var user1 = {firstName: "stephen", lastName: "curry"}
  const user2 = {firstName: "kevin", lastName: "durant"}

  res.json([user1, user2])
  res.send("nodemon auto updates when i save this file")
})



//localhost:3003
app.listen(3003, ()=> {
  console.log("server is up and listening")
})
