const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json())
app.use(cookieParser());
app.use(session({
    secret: 'secret',  // a secret key used to encrypt the session cookie
    resave: false,  // there is no-modification so it should false
    saveUninitialized: false, // to increase the performance
    cookie: {
        secure: false,  // we are not using https
        maxAge: 1000 * 60 * 60 *24 // one day valid cookie
    } // set the session cookie properties
}))

const user = 'qwerty';
const pass = '12345';

app.post('/login',async(req,res)=>{
    console.log(req.body.username);
    if(req.body.username === user && req.body.password === pass){
        req.session.username = user;
        console.log(req.session.username);
        res.send("true");
    }
    else{
        res.send({message:"Invalid User"})
    }
})

app.get('/logout',(req,res)=>{
    res.send("false");
})

app.get('/checkuser',(req,res)=>{
    req.session.username = user
    if(req.session.username){
        return res.json({valid:'true', username:req.session.username});
    }
    else{
        return res.json({valid:'false'});
    }
})


app.listen(6432,()=>{
    console.log("Server started");
})