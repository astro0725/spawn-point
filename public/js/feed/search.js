document.getElementById('searchButton').addEventListener('click', function(event) {
    event.preventDefault();
    var modal = document.getElementById('searchModal');
    modal.classList.remove('hidden');
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        var modal = document.getElementById('searchModal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }
});