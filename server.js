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
// // TODO: read docs on firebase analytics
// const analytics = getAnalytics(firebase);
// Configure Handlebars as the view engine
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
// serve the files out of ./public as our main files
app.use(express.static("public"));
// use the body parser middleware to parse the body of incoming requests
app.use(bodyParser.json());
// use the cookie parser middleware to parse cookies
app.use(cookieParser());
// use routes to serve window locations (ref is called here so that its called after the initialization of firebase)
const routes = require("./routes/index");
app.use('/', routes)
// partial registration
hbs.handlebars.registerPartial('leftSidebar', './views/partials/sidebars/leftMenu.handlebars');
hbs.handlebars.registerPartial('rightSidebar', './views/partials/sidebars/rightMenu.handlebars');
hbs.handlebars.registerPartial('showcase', './views/partials/profile/gameShowcase.handlebars');
hbs.handlebars.registerPartial('links', './views/partials/profile/links.handlebars');
hbs.handlebars.registerPartial('profileHeader', './views/partials/profile/profileHeader.handlebars');
hbs.handlebars.registerPartial('createPost', './views/partials/createPost.handlebars');
hbs.handlebars.registerPartial('post', './views/partials/post.handlebars');
hbs.handlebars.registerPartial('searchbar', './views/partials/searchbar.handlebars');

// start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
