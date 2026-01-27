require("dotenv").config()
const app = require("./src/app")
const mongoose = require("mongoose")

function dataBase() {
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("connected to database")
})
.catch((err) => {
   console.log("database err: ", err);
   
})

}

dataBase()

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`);
})