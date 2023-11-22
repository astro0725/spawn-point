const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const express = require("express");
const exphbs = require("express-handlebars");
const hbs = exphbs.create({ defaultLayout: "main" });
const routes = require("./routes/index");
// TODO: Initialize firebase
// Create an express application with port number from environment variable or default 3001
const PORT = process.env.PORT || 3001;
// Configure Handlebars as the view engine
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
// serve the files out of ./public as our main files
app.use(express.static("public"));
// use the body parser middleware to parse the body of incoming requests
app.use(bodyParser.json());
// use the cookie parser middleware to parse cookies
app.use(cookieParser());
// use routes to serve window locations
app.use('/', routes)
// partial registration
hbs.handlebars.registerPartial('header', './views/partials/header.handlebars');
hbs.handlebars.registerPartial('createPost', './views/partials/createPost.handlebars');
hbs.handlebars.registerPartial('search', './views/partials/search.handlebars');
// start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
