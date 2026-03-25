import app from './src/app.js'
import "dotenv/config"
import dbconnect from './src/config/dbconnect.js'

dbconnect()

app.listen(process.env.PORT, () => {
    console.log("server is listening on port 3000")
})