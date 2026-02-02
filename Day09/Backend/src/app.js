const express = require("express")
const noteModel = require("./models/notemodel")
const app = express();
const cors = require("cors")

app.use(cors())
app.use(express.json())
app.use(express.static("./public"))

app.post("/notes", async (req, res) => {
    const {title, description} = req.body

    const note = await noteModel.create({
        title, description
    })
    res.status(201).json({
        message: "note created successfully",
        note
    })
})

app.get("/notes", async (req, res) => {
    const notes = await noteModel.find()

    res.status(200).json({
        message: "note fetched successfully",
        notes
    })
})

app.delete("/notes/:id", async (req, res) => {
   const id = req.params.id

   await noteModel.findByIdAndDelete(id)

   res.status(204).json({
     message: "note deleted successfully"
   })

})

app.patch("/notes/:id", async (req, res) => {
    const id = req.params.id
    const {description} = req.body

    await noteModel.findByIdAndUpdate(id, {description})

    res.status(200).json({
        message: "note updated successfully"
    })

})

app.use('*name', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "/public/index.html"))
})

///Sheriyans coding school/Backend/Day09/Backend/public/index.html -- we can use this instead of __dirname

module.exports = app