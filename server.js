const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const bodyParser = require("body-parser");
const express = require("express");
const exphbs = require('express-handlebars'); 
const hbs = exphbs.create({ defaultLayout: 'main' });
const admin = require("firebase-admin");
// const ejs = require('ejs');

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pixel-pals-fdb7e-default-rtdb.firebaseio.com",
});

// Create a CSRF middleware that will add a CSRF token to all requests
const csrfMiddleware = csrf({ cookie: true });

// Create an express application with port number from environment variable or default 3001
const PORT = process.env.PORT || 3001;
const app = express();

// use ejs as the view engine
// app.engine("html", require("ejs").renderFile);
// Configure Handlebars as the view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
// serve the files out of ./public as our main files
app.use(express.static("public"));

// use the body parser middleware to parse the body of incoming requests
app.use(bodyParser.json());
// use the cookie parser middleware to parse cookies
app.use(cookieParser());
// use the CSRF middleware to add CSRF tokens to requests
app.use(csrfMiddleware);

// routing middleware that directs all requests to the appropriate route
// middleware to generate cookie with XSRF token
// next() is called to continue to the next middleware
app.all("*", (req, res, next) => {
  res.cookie("XSRF-TOKEN", req.csrfToken());
  next();
});
// // login route that renders the login page
// app.get("/login", (req, res) => {
//   res.render("login.html");
// });
// // signup route that renders the signup page
// app.get("/signup", (req, res) => {
//   res.render("signup.html");
// });
// // profile route that renders the profile page
// app.get("/profile", (req, res) => {
//   res.render("profile.html");
// });
// index route that renders the index.html page
// app.get("/", (req, res) => {
//   res.render("index.html");
// });
app.get('/', (req, res) => {
  res.render('feed'); 
});
// partial registration
hbs.handlebars.registerPartial('header', './views/partials/header.handlebars');
// start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
