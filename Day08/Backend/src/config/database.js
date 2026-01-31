const mongoose = require("mongoose");
require("dotenv").config()

function database() {
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Database connected");
})
}

module.exports = database