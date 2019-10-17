const express = require("express")
const bodyParser = require("body-parser")

const app = express()
app.use(bodyParser.json())

let users = [
  {
    _id: 1571125835129,
    fname: "hafiz",
    lname: "Joundy Syafie",
    age: 19
  },
  {
    _id: 1571125836650,
    fname: "Amin",
    lname: "Udin",
    age: 19
  }
]


//create delay with setTimeout
const delay = (delay) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, delay)
  })
}

const fetchUser = async (_, res) => {
  await delay(100)
  res.send(users)
}

const createUser = async (req, res) => {
  const user = {
    _id: new Date().getTime(),
    ...req.body
  }

  users.push(user)

  await delay(200)
  res.send({
    _id: user._id
  })
}

const updateUserById = async (req, res) => {
  const userId = req.params.userId
  const findIndex = users.findIndex(user => user._id == userId)

  users[findIndex] = {
    _id: users[findIndex]._id,
    ...req.body
  } 

  await delay(150)
  res.send(users[findIndex])
}

const deleteUserById = async (req, res) => {
  const userId = req.params.userId
  const findIndex = users.findIndex(user => user._id == userId)

  //remove user from array
  users.splice(findIndex, 1)

  await delay(150)
  res.send({
    _id: parseInt(userId)
  })
}

app.get("/users", fetchUser)
app.post("/users", createUser)
app.put("/users/:userId", updateUserById)
app.delete("/users/:userId", deleteUserById)

app.listen(3000, () => {
  console.log("running...")
})