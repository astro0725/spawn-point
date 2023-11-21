var firebaseConfig = {
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

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

document.getElementById("signup").addEventListener("submit", async (event) => {
  event.preventDefault();
  const login = event.target.login.value;
  const password = event.target.password.value;

  try {
    const { user } = await firebase
      .auth()
      .createUserWithEmailAndPassword(login, password);
    const idToken = await user.getIdToken();
    await fetch("/sessionLogin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "CSRF-Token": Cookies.get("XSRF-TOKEN"),
      },
      body: JSON.stringify({ idToken }),
    });
    await firebase.auth().signOut();
    window.location.assign("/profile");
  } catch (error) {
    console.error(error);
  }
});
