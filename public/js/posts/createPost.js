// function to handle the submission of a new post
async function submitPost(event) {
    event.preventDefault(); 
        const user = await getCurrentUser(); 
    
        if (!user) {
        alert('You must be logged in to create a post.');
        return;
        }

        const postText = document.getElementById('postText').value;
        // Create an object containing post data
        const postData = {
        userId: user.uid,
        content: postText
        };

        // Send a POST request to create the new post
        fetch('/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(postData)
        })
        .then(response => response.json())
        .then(data => {
        console.log(data);
        toggleModal('createPostModal'); 
        })
        .catch((error) => {
        console.error('Error:', error);
        });
    }

    // Function to get the current user's authentication status
    // TODO: update for firebase user ID
    function getCurrentUser() {
        return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
            user.getIdToken().then(function(token) {
                resolve({ uid: user.uid, token: token });
            });
            } else {
            resolve(null);
            }
        });
        });
}
// add an event listener to the form submission
document.getElementById('postForm').addEventListener('submit', submitPost);