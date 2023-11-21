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

  // initialize firebase
  firebaseConfig.initializeApp(firebaseConfig);

  // function to unfollow user
  async function unfollowUser(username) {
    try {
      // gets user from firebase auth
      const user = firebase.auth().currentUser;
      // checks if user is signed in
      if (!user) {
        throw new Error("User not signed in!");
      }
      // gets user following list
      let following = user.displayName ? user.displayName.split(",") : [];
      // checks if user is already following
      if (!following.includes(username)) {
        console.log("You are not following this user!");
        return;
      }

      // preps data for PUT request to update user profile
      const response = await fetch("fetchRouteNeeded", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          //gets ID token for auth
          idToken: await user.getIdToken(),
          // updates displayName with new following list
          displayName: following.join(","),
          // ensure that a new id token is returned
          returnSecureToken: true,
        }),
      });

      // parse response JSON
      const data = await response.json();

      // checks if request was successful
      if (!response.ok) {
        throw new Error(`Failed to update user profile: ${data.error.message}`);
      }
      console.log("User has been unfollowed successfully!");
    } catch (error) {
      // handles errors
      console.error("Error unfollowing user:", error);
    }
  }

  // attaches event listenter to unfollow button
  const unfollowButton = document.getElementById("unfollowButton");
  unfollowButton.addEventListener("click", function () {
    // gets username from the profile
    const userToUnfollow = document.getElementById("username").innerText;
    // call unfollowUser funct with username
    unfollowUser(userToUnfollow);
  });
});
