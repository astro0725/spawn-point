async function deletePost(postId) {
    if (confirm('Are you sure you want to delete this post?')) {
        fetch(`/delete/${postId}`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    window.location.href = '/'; // Redirect to home
                } else {
                    // Handle error
                    alert('Error deleting post');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}