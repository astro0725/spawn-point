import Handlebars from 'handlebars';
import mainLayout from './views/layouts/main.handlebars';
import headerPartial from './views/partials/header.handlebars';
import sidebarPartial from './views/partials/sidebar.handlebars';
import personalPostsPartial from './views/partials/personalPosts.handlebars';
import postPartial from './views/partials/post.handlebars';
import footerPartial from './views/partials/footer.handlebars';
import createPostLayout from './views/createPost.handlebars';
import homepageLayout from './views/homepage.handlebars';
import "./style.css";
import {
  hideLoginError,
  showLoginState,
  showLoginForm,
  showApp,
  showLoginError,
  btnLogin,
  btnSignup,
  btnLogout,
} from "./ui";

import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  connectAuthEmulator,
} from "firebase/auth";

const firebaseApp = {
  apiKey: "AIzaSyCiZF1VwaJ8d18jp6nJtC2AQnboz1AerYg",
  authDomain: "pixel-pals-fdb7e.firebaseapp.com",
  projectId: "pixel-pals-fdb7e",
  storageBucket: "pixel-pals-fdb7e.appspot.com",
  messagingSenderId: "308630756272",
  appId: "1:308630756272:web:1f7f9e0703c0803b449475",
  measurementId: "G-X42F0TX02X",
};
initializeApp(firebaseApp);
const auth = getAuth(firebaseApp);


// Login using email/password
const loginEmailPassword = async () => {
  const loginEmail = txtEmail.value;
  const loginPassword = txtPassword.value;

  try {
    await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
  } catch (error) {
    console.log(`There was an error: ${error}`);
    showLoginError(error);
  }
};

// Create new account using email/password
const createAccount = async () => {
  const email = txtEmail.value;
  const password = txtPassword.value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(`There was an error: ${error}`);
    showLoginError(error);
  }
};

// Monitor auth state
const monitorAuthState = async () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user);
      showApp();
      showLoginState(user);

      hideLoginError();
      hideLinkError();
    } else {
      showLoginForm();
      lblAuthState.innerHTML = `You're not logged in.`;
    }
  });
};

// Log out
const logout = async () => {
  await signOut(auth);
};

btnLogin.addEventListener("click", loginEmailPassword);
btnSignup.addEventListener("click", createAccount);
btnLogout.addEventListener("click", logout);

connectAuthEmulator(auth, "http://localhost:3001");

monitorAuthState();

Handlebars.registerPartial('header', headerPartial);
Handlebars.registerPartial('footer', footerPartial);
Handlebars.registerPartial('sidebar', sidebarPartial);
Handlebars.registerPartial('post', postPartial);
Handlebars.registerPartial('personalPosts', personalPostsPartial);

// ! example of how to utilize hbs files for the application
async function fetchPosts() {
  try {
      const response = await fetch('./routes/posts'); 
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return await response.json();
  } catch (error) {
      console.error('Unable to fetch posts:', error);
  }
}

async function FRHomepage(user) {
  const posts = await fetchPosts();
  renderPage(user, posts);
}

function renderPage(user, posts) {
  const template = Handlebars.compile(homepageLayout);
  const html = template({ user: user, posts: posts });
  document.body.innerHTML = html;
}

onAuthStateChanged(auth, async (user) => {
  if (user) {
      const posts = await fetchPosts();
      renderPage(user, posts);
  } else {
      // Handle unauthenticated state
      // You might want to render a different page or show a login form
  }
});