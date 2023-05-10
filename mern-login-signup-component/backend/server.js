const express = require('express')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require("path");
const port = 4550;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "..", "public")));
app.set("view engine", "ejs");

// render the ejs views
app.set("views", path.join(__dirname, "views"));

app.get('/', (req, res) => {
    let username = req.cookies.username;

    return res.render("home",{
        username,
    })
    // res.send('welcome to a simple HTTP cookie server');
});

app.get("/login", (req, res) => {
    // check if there is a msg query
    let bad_auth = req.query.msg ? true : false;
  
    // if there exists, send the error.
    if (bad_auth) {
      return res.render("login", {
        error: "Invalid username or password",
      });
    } else {
      // else just render the login
      return res.render("login");
    }
});

app.get("/welcome", (req, res) => {
    // get the username
    let username = req.cookies.username;
  
    // render welcome page
    return res.render("welcome", {
      username,
    });
});
  
app.post("/process_login", (req, res) => {
    // get the data
    console.log(req.body);
    let { username, password } = req.body;
  
    // fake test data
    
     const uname= "Bob";
     const pass="123456";
    
  
    // basic check
    if (
      username === uname &&
      password === pass
    ) {
      // saving the data to the cookies
      res.cookie("username", username);
      // redirect
      return res.redirect("/welcome");
    } else {
      // redirect with a fail msg
      return res.redirect("/login?msg=fail");
    }
});

app.post("/processlogin", (req, res) => {
    // get the data
    console.log(req.body);
    let { username, password } = req.body;
  
    // fake test data
    
     const uname= "Bob";
     const pass="123456";
    
  
    // basic check
    if (
      username === uname &&
      password === pass
    ) {
      // saving the data to the cookies
      res.cookie("username", username);
      // redirect
     res.send("true")
    } else {
      // redirect with a fail msg
      return res.redirect("/login?msg=fail");
    }
});

app.get("/logout", (req, res) => {
    // clear the cookie
    res.clearCookie("username");
    // redirect to login
    return res.redirect("/login");
});

// my follow code

app.get('/setcookie', (req,res)=>{
    let ts = Date.now();
    let date_time = new Date(ts);
    let date = date_time.getDate();
    let month = date_time.getMonth() + 1;
    let year = date_time.getFullYear();

    res.cookie(`Cookie token name`,`encrypted cookie string value`,{
        maxAge: 5000,
        expires: new Date(date+'-'+month+'-'+year),
        secure: true,
        httpOnly: true,
        sameSite: 'lax'
    });
    res.send(`Cookie have been saved sucessfully`);
})

app.get('/deletecookie', (req, res) => {
    //show the saved cookies
    res.clearCookie()
    res.send('Cookie has been deleted successfully');
});


// get the cookie incoming request
app.get('/getcookie', (req, res) => {
    //show the saved cookies
    console.log(req.cookies)
    res.send(req.cookies);
});

app.listen(port,()=>{
    console.log(`Server Started ${port}`);
})
