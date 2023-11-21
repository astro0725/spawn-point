document.getElementById('searchButton').addEventListener('click', function(event) {
    event.preventDefault();
    var modal = document.getElementById('searchModal');
    modal.classList.remove('hidden');
    loadInitialData();
});

function loadInitialData() {
    fetch('/searchPopulate')
        .then(response => response.json())
        .then(data => {
            document.getElementById('searchResults').innerHTML = renderResults(data);
        })
        .catch(error => console.error('Error fetching initial data:', error));
}

document.getElementById('searchSubmit').addEventListener('click', function(event) {
    event.preventDefault();
    var searchTerm = document.getElementById('searchInput').value;
    fetch('/search?term=' + encodeURIComponent(searchTerm))
        .then(response => response.json())
        .then(data => {
            document.getElementById('searchResults').innerHTML = renderResults(data);
        })
        .catch(error => console.error('Error:', error));
});

function renderResults(data) {
    return data.map(result => `<div>${result.name}</div>`).join('');
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        var modal = document.getElementById('searchModal');
        if (modal) {
            modal.classList.add('hidden');
            window.location.href = '/';
        }
    }
});