const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static('./public'))

app.use(morgan('short'))

app.post('/user_create', (req, res)=> {

  console.log("tyring to create a new user")
  console.log("how do we get the form data?")

console.log("first name: "+ req.body.create_first_name)
 const firstName = req.body.create_first_name
 const lastName = req.body.create_last_name

const queryString = "INSERT INTO users (first_name, last_name) VALUES (?,?)"
getConnection().query(queryString, [firstName, lastName], (err, results, fields)=>{
  if (err){
    console.log("Failed to insert new user: "+ err)
    res.sendStatus(500)
    return
  }
  console.log("Inserted a new user with id: "+ results.insertedId);
  res.end()
})
  res.end()

})

function getConnection(){
  return mysql.createConnection({
    host:'localhost',
    user: 'root',
    database: 'users'
  })
}


app.get('/user/:id', (req, res)=>{
  console.log("fetching user with id: "+ req.params.id)
  const connection = getConnection()


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

//start refactor
const router = require('./routes/user.js')


//router.get('/foo', )

app.use(router)






//localhost:3003
app.listen(3003, ()=> {
  console.log("server is up and listening")
})
