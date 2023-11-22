// Initialize Firebase with the provided configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiZF1VwaJ8d18jp6nJtC2AQnboz1AerYg",
  authDomain: "pixel-pals-fdb7e.firebaseapp.com",
  databaseURL: "https://pixel-pals-fdb7e-default-rtdb.firebaseio.com",
  projectId: "pixel-pals-fdb7e",
  storageBucket: "pixel-pals-fdb7e.appspot.com",
  messagingSenderId: "308630756272",
  appId: "1:308630756272:web:1f7f9e0703c0803b449475",
  measurementId: "G-X42F0TX02X",
};

firebase.initializeApp(firebaseConfig);

// Set the persistence to "none"
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

// Add an event listener to the DOMContentLoaded event
window.addEventListener("DOMContentLoaded", async () => {
  // Get the login form element
  const loginForm = document.getElementById("login");

  console.log("logged in");

  // Define an async function to handle the form submission
  const handleLogin = async (event) => {
    event.preventDefault();

    // Get the login and password values from the form
    const login = event.target.login.value;
    const password = event.target.password.value;

    try {
      // Sign in the user with the provided login and password
      const { user } = await firebase
        .auth()
        .signInWithEmailAndPassword(login, password);

      // Get the user's ID token
      const idToken = await user.getIdToken();

      // Send the ID token to the server for session login
      await fetch("/sessionLogin", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "CSRF-Token": Cookies.get("XSRF-TOKEN"),
        },
        body: JSON.stringify({ idToken }),
      });

      // Sign out the user
      await firebase.auth().signOut();

      // Redirect the user to the profile page
      window.location.assign("/profile");
    } catch (error) {
      // Handle any errors that occur during the authentication process
      console.error(error);
    }
  };

  // Add a submit event listener to the login form
  loginForm.addEventListener("submit", handleLogin);
});
