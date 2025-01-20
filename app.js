const express = require('express');
const path = require('path');
const app = express();
const db = require("./config/mongoose-connection");
require('dotenv').config();
const expressSession = require("express-session");
const flash = require("connect-flash");
const bookturf =require('./routes/bookturfRouter')
const loginRouter = require('./routes/loginRouter');
const contactRouter = require('./routes/contactRouter');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
}));
app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

console.log(process.env.EXPRESS_SESSION_SECRET);
app.use('/bookturf',bookturf);
app.use('/admin',loginRouter);
app.use('/contact',contactRouter);

app.get('/',(req,res)=>{
    res.render("index");
})

app.get('/slot',(req,res)=>{
    res.render("slot")
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
