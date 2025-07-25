const express = require("express")
const mongoose = require("mongoose")
const app = express()
const cors = require("cors")

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://djakhadeveloper:5z6OR2y9kdHWZRSW@cluster0.rh6rnzg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Connected to db"))
    .catch((err) => console.log(err))

const todoScheme = new mongoose.Schema({
    text: String
})

const Todo = mongoose.model("Todo", todoScheme)

app.get("/todo", async (req, res) => {
    try {
        let data = await Todo.find()
        res.send(data)
    } catch (err) {
        res.status(500).send(err)
    }
})

app.post("/todo", async (req, res) => {
    try {
        let data = await Todo.create(req.body)
        res.status(201).send(data)
    } catch (err) {
        res.status(400).send(err)
    }
})

app.patch("/todo/:id", async (req, res) => {
    try {
        let newData = req.body
        let data = await Todo.findByIdAndUpdate(req.params.id, newData, { new: true })
        res.send(data)
    } catch (err) {
        res.status(400).send(err)
    }
})

app.delete("/todo/:id", async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id)
        res.send("deleted")
    } catch (err) {
        res.send(err)
    }
})

app.listen(3000, () => console.log("Server started"))