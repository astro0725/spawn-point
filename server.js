const firebase = require('firebase/app');
const  getAnalytics = require("firebase/analytics");
const auth = require('firebase/auth');
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const express = require("express");
const exphbs = require("express-handlebars");
const hbs = exphbs.create({ defaultLayout: "main" });

const app = express();
// Create an express application with port number from environment variable or default 3001
const PORT = process.env.PORT || 3001;
// initialize firebase
const firebaseConfig = {
  apiKey: "AIzaSyDGkVjngegwg6kZi9L4lgWcko6gh04VEHY",
  authDomain: "spawnpoint-d6d36.firebaseapp.com",
  projectId: "spawnpoint-d6d36",
  storageBucket: "spawnpoint-d6d36.appspot.com",
  messagingSenderId: "262097616343",
  appId: "1:262097616343:web:ead2c6f79613b498991f92",
  measurementId: "G-MG5JNJ31R4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// TODO: read docs on firebase analytics
const analytics = getAnalytics(firebase);
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
const routes = require("./routes/index");
app.use('/', routes)
// partial registration
hbs.handlebars.registerPartial('header', './views/partials/header.handlebars');
hbs.handlebars.registerPartial('sidebar', './views/partials/sidebar.handlebars');
// start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
