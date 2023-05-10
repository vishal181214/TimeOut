const express = require('express');
const app = express();
const sendMail = require('./sendMail');

app.get('/',(req,res)=>{
    res.send("Hey! You are On Server");
})

app.get('/sendMail',sendMail)

const start = async () =>{
    try {
        app.listen(3500,()=>{
            console.log("I am running");
        })
    } catch (error) {
        console.log(error);
    }
}

start();