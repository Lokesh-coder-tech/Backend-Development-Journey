import app from './src/app.js'
import "dotenv/config"
import dbconnect from './src/config/dbconnect.js'
import './src/queues/item.worker.js';

dbconnect() // Start the worker to process the queue

app.listen(process.env.PORT, () => {
    console.log("server is listening on port 3000")
    console.log("Worker is running and processing the queue...")
})