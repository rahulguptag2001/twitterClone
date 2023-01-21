const express = require('express');
const app = express();
const PORT = 4444;
const path = require('path');
const middleware = require('./middleware');
const bodyParser = require("body-parser");
const mongoose=require('./database');
const session=require('express-session');

app.use(express.urlencoded({ extended: true }))
const server = app.listen(PORT, () => {
    console.log('server started at:' + PORT);
})
//routes
const loginRoute = require('./routes/loginroutes');
const registerRoute = require('./routes/registerroutes');
const { url } = require('inspector');

app.use('/login', loginRoute);
app.use('/register', registerRoute);


app.set("view engine", 'pug');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
    secret:"daru piyo",
    resave:true,
    saveUninitialized:false
}))


app.get('/', middleware.requireLogin, (req, res, next) => {

    let payload = {
        pageTitle: "home"
    }
    res.status(200).render("home", payload);
})