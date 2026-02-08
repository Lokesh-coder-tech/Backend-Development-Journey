const mongoose = require('mongoose')
require('dotenv').config()

function database() {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('database is connected');
    })
}
module.exports = database