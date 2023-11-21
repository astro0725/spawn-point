// firebase config
document.addEventListener("DOMContentLoaded", function () {
  const firebaseConfig = {
    apiKey: "AIzaSyCiZF1VwaJ8d18jp6nJtC2AQnboz1AerYg",
    authDomain: "pixel-pals-fdb7e.firebaseapp.com",
    projectId: "pixel-pals-fdb7e",
    storageBucket: "pixel-pals-fdb7e.appspot.com",
    messagingSenderId: "308630756272",
    appId: "1:308630756272:web:1f7f9e0703c0803b449475",
  };

  // initiializes firebase
  firebaseConfig.initializeApp(firebaseConfig);
  // function to follow user
  async function followUser(username) {
    try {
      // gets user from firebase auth
      const user = firebase.auth().currentUser;
      // checks if user is singed in
      if (!user) {
        throw new Error("User not signed");
      }
      // get user's following list
      let following = user.displayName ? user.displayName.split(",") : [];

      // check if user is already following
      if (following.includes(username)) {
        console.log("You are already following this user!");
        return;
      }
      // add username to list
      following.push(username);
      // preps data for PUT request to update user profile
      const response = await fetch("fetchRouteNeeded", {
        method: "POST",
        headers: {
          "Content-Type": "route",
        },
        body: JSON.stringify({
          // gets ID token for auth
          idToken: await user.getIdToken(),
          // updates displayName with new following list
          displayName: following.join(","),
          // Ensure a new ID token is returned
          returnSecureToken: true,
        }),
      });

      // parse the respone JSON
      const data = await response.json();

      // checks if request was successful
      if (!response.ok) {
        throw new Error("Failed to update user profile: ${data.error.message}");
      }
      console.log("User has been followed successfully!");
    } catch (error) {
      // handles if error
      console.error("Error following user:", error);
    }
  }

  // attaches event listener to follow button
  const followButton = document.getElementById("followButton");
  followButton.addEventListener("click", function () {
    // prompts user to enter username that they want to follow
    const userToFollow = document.getElementById("usename").innerText;
    // call followUser funct with username
    followUser(userToFollow);
  });
});
