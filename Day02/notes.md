Backend Development – Day 02  
Topic: 
Program server to response to users.
Deploy server

## Creating a Basic Server Response
We can send a simple response like **Hello World** using Express.

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get() → Handles GET requests
/ → Root route
req → Request object (sent by user)
res → Response object (sent by server)
res.send() → Sends data to the client

->User sends request to /
->Server receives the request
->Server sends response → Hello World
->Response is displayed in the browser

Nodemon - 
Nodemon automatically restarts the server when file changes occur.
-> npx nodemon file-name

## Deploy server
A backend server can be deployed using platforms like:
Render, Railway, Cyclic

Note: Vercel is mainly used for serverless APIs, not traditional servers.