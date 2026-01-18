Backend Development – Day 01  
Topic: Origin -  Packages & Server  

## How to Run Code Outside the Browser
We use **Node.js** to run JavaScript code outside the browser.
->index.js → file name
->Command is run in the terminal

## What are Packages?
Packages are pre-written code created by other developers and made public so anyone can use them in their applications.
->Saves time
->Avoids writing everything from scratch
Used in almost every backend project
👉 All packages are available on npmjs.com


## How to Use Packages
Install the package:
->npm install package-name

Import the package:
->const pkg = require("package-name");

->Use (call) the package in your code.

## What is a Server?
A server is a machine (computer) that has:
Processor
RAM
Storage
Operating System

This machine runs a program that:
Receives requests from users
Processes them
Sends responses back

👉 In simple words:
Server = machine + program that gives response to user requests

## Creating a Node.js Application

Initialize a Node.js project:
->npm init -y
This creates a package.json file.

Express.js
Express.js is a Node.js framework used to create servers easily.

Install Express:
->npm install express

## Basic Server Setup:
const express = require("express"); // import express

const app = express(); // create server

app.listen(3000); // start server on port 3000