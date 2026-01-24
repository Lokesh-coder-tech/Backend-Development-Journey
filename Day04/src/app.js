const express = require("express");

const app = express();

app.use(express.json()) // it is a kind of middlware we will study it on later

const notes = []

app.post("/notes", (req, res) => {
    console.log(req.body)
    notes.push(req.body)
    res.send("notes created")
})
app.get("/notes", (req, res) => {
    res.send(notes)
})

app.delete("/notes/:index", (req, res) => {
    delete notes[req.params.index] 

    res.send("note delete successfully")
})

app.patch("/notes/:index", (req, res) => {
    notes[req.params.index].description = req.body.description

    res.send("notes update successfully")
})

module.exports = app