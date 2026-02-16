const app = require('./src/app')
const database = require('./src/config/database')

database()

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})