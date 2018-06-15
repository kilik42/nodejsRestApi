const express = require('express')
const app = express()

const morgan = require('morgan')


app.use(morgan('short'))
//get
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
//post



//put



//delete



//localhost:3003
app.listen(3003, ()=> {
  console.log("server is up and listening")
})
