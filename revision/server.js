const app = require('./src/app')
const database = require('./src/config/database')

database()

app.listen(3000, () => {
    console.log("server is listening onp port 3000");
    
})