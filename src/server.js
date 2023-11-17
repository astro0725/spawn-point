// require the necessary modules
const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./routes/index.js");
const helpers = require("./utils/helpers");
const admin = require("firebase-admin");
const firebase = require("../config/firebase.js");
const firebaseui = require("firebaseui");
const views = require("./views");

const seuquelize = require("../config/connection.js");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
// using express-session and connect-session-sequelize to create a session middleware
const app = express();
// sets up the Express.js session and connect it to our Sequelize database
const PORT = process.env.PORT || 3001;
// create a Handlebars.js engine instance with custom helper functions
const hbs = exphbs.create({ helpers });
// creates a session middleware with our certain configurations
const sess = {
  secret: "secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: seuquelize,
  }),
};

// use the session middleware
app.use(session(sess));
// use the Handlebars.js engine instance to render all templates
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
// use the express.static() method to serve the files in the public directory
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public", "index.html")));
// turn on routes
app.use(routes);

// turn on connection to db and server
app.listen(PORT, () => console.log(`Server started at http://localhost:PORT`));
