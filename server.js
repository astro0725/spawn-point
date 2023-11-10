// require the necessary modules
const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const helpers = require("./utils/helpers");
const admin = require("firebase-admin");
const firebase = require("./config/firebase");
const postsRouter = require('./routes/posts');

const seuquelize = require("./config/connection");
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
app.use(express.static(path.join(__dirname, "public")));
// turn on routes
app.use(routes);

app.use(express.json());
app.use('/api', postsRouter);

function isAuthenticated(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  } else {
    return res.status(401).json({ error: 'You must be logged in to create a post.' });
  }
}

router.post('/posts', isAuthenticated, async (req, res) => {
  //tba
});
// turn on connection to db and server
app.listen(PORT, () => console.log(`Server started at http://localhost:PORT`));
