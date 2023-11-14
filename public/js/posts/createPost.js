async function submitPost(event) {
    event.preventDefault(); 
        const user = await getCurrentUser(); 
    
        if (!user) {
        alert('You must be logged in to create a post.');
        return;
        }
    
        const postText = document.getElementById('postText').value;
        
        const postData = {
        userId: user.uid,
        content: postText
        };

        fetch('/api/posts', {
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
document.getElementById('postForm').addEventListener('submit', submitPost);