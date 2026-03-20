# Middleware in Backend (Complete Beginner Guide)

# Introduction

When a user sends a request to a server, the request doesn’t directly go to the final route.

👉 It passes through multiple layers — these layers are called Middleware.

# What is Middleware?

👉 Middleware is a function that runs between the request and the response cycle.

Client → Request → Middleware → Server Logic → Response → Client
🧠 Simple Definition

Middleware is a function that processes a request before sending a response.

# Why Middleware is Used?

Middleware is used to:

✅ Modify request or response

✅ Execute code before route handler

✅ Handle authentication

✅ Log requests (like Morgan)

✅ Handle errors

✅ Parse data (JSON, form data)

# Real-Life Analogy

👉 Think of middleware like a security checkpoint at an airport:

You (request) want to board a flight (server)

Security checks (middleware) verify you

Then you proceed further

# Middleware in Express.js

In Express.js, middleware is widely used.

Basic Example:
```const express = require("express");
const app = express();

// Middleware
app.use((req, res, next) => {
console.log("Middleware executed");
next(); // pass control to next
});

app.get("/", (req, res) => {
res.send("Hello World");
});

app.listen(3000);
```

# How Middleware Works

Request comes from client

Middleware runs

# Middleware can:

Modify request/response

Stop request

Pass to next middleware

Final route sends response

⚠️ Important Concept: next()

👉 next() is very important.

It passes control to the next middleware

If not called → request gets stuck ❌
```
app.use((req, res, next) => {
console.log("Step 1");
next(); // moves to next middleware
});
```

# Types of Middleware

## 1. Application-Level Middleware

 Applied globally using app.use()

```
app.use((req, res, next) => {
console.log("Runs on every request");
next();
}); 
```
## 2. Route-Level Middleware

 Applied to specific routes
```
app.get("/about", (req, res, next) => {
console.log("Route middleware");
next();
}, (req, res) => {
res.send("About Page");
}); 
```
## 3. Built-in Middleware

 Provided by Express
```
app.use(express.json());
```

👉 Used for parsing JSON data

## 4. Third-Party Middleware

 External packages like:

 Morgan (logging)

 CORS

 Helmet

## 5. Error-Handling Middleware

Used to handle errors
```
app.use((err, req, res, next) => {
res.status(500).send("Something broke!");
});
🔥 Real-World Example
app.use((req, res, next) => {
console.log(`Request made to ${req.url}`);
next();
});

app.get("/login", (req, res) => {
res.send("Login Page");
});
```

Output:

 Request made to /login

# What Happens Without Middleware?

 No request logging

 No authentication

 No validation

 Hard to manage code

# Best Practices

 Always call next() (unless sending response)

 Keep middleware small and focused

 Use separate files for large apps

 Order matters (top → bottom execution)

# Summary

 Middleware = function between request & response

 Used for processing requests

 Improves code structure & scalability

 Essential for real-world backend apps

# One-Line Definition

 Middleware is a function that runs before the final request handler to process or control the request.

# Bonus Tip

 If you master middleware, you unlock:

 Authentication systems 🔐

 Clean architecture 🧠

 Scalable backend apps 🚀
