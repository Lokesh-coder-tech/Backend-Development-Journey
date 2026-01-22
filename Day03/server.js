const noway = require("express");

const app = noway();

app.use(noway.json());

const notes = []

app.post("/notes", (req, res) => {
    console.log(req.body);
    notes.push(req.body)
    res.send("notes created")
})
app.get("/notes", (req, res)=> {
    res.send(notes)
})


app.listen(3000, () => {
    console.log("server is running on port 3000");
    
})