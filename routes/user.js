//will contain all of my user related routes
const express = require('express')

const router = express.Router()
router.get('/messages', (req, res)=>{
  console.g("show some messages")
  res.end()
})

app.get("users", (req, res) =>{

  const connection = getConnection()

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
})

module.exports = router
