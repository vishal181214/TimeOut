import express from 'express';
import cors from 'cors';
import userInfo from './Model/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import './connection.js';
import session from 'express-session';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true }));


app.use(session({
    secret: 'qwertyuiop',
    resave: false,
    saveUninitialized: false,
    cookie:{
        httpOnly: false,
        secure: false,
        maxAge: 20000
    }
}))

app.post('/signup', async(req,res)=>{
    const result = await userInfo.findOne({ email:req.body.email });

    if(result) {
        res.status(409).send("Email already exist");
    }
    else {
        const newUser = new userInfo({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
      });
      const user = await newUser.save();
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: jwt.sign({ user }, "my_encryption_text_key",{ expiresIn: '30s' }),
      });
    }
})

app.post("/login", async (req, res) => {
    console.log(req.body);
    console.log(req.body.email,req.body.password);
    if (req.body.password && req.body.email) {
      let user = await userInfo.findOne({ email: req.body.email });
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: jwt.sign({ user }, "my_encryption_text_key",{ expiresIn: '30s' }),
          });
          return;
        }else({ message: "Wrong Password" })
      }
    } else {
      res.status(401).send({ message: "You Missed SomeThing" });
    }
  });

app.listen(5320,()=>{
    console.log("Server Started");
})