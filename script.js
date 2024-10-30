// Hent skjemaet og listene
const form = document.getElementById('addMovieForm');
const seenList = document.getElementById('seenList');
const toWatchList = document.getElementById('toWatchList');
const ratingModal = document.getElementById('ratingModal');
const closeModal = document.getElementsByClassName('close')[0];
const submitRatingButton = document.getElementById('submitRating');
let currentMovieItem = null;  // Lagrer det nåværende elementet som skal flyttes

// Funksjon for å håndtere form-submission
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Forhindre siden i å refreshe

    // Hent verdier fra skjemaet
    const title = document.getElementById('title').value;
    const poster = document.getElementById('poster').value;
    const rating = document.getElementById('rating').value;
    const status = document.getElementById('status').value;

    // Lag en ny "movie-item"
    const movieItem = document.createElement('div');
    movieItem.classList.add('movie-item');

    const moviePoster = document.createElement('img');
    moviePoster.src = poster;
    moviePoster.alt = title;

    const movieInfo = document.createElement('div');
    movieInfo.classList.add('movie-info');

    const movieTitle = document.createElement('h3');
    movieTitle.textContent = title;

    movieInfo.appendChild(movieTitle);

    if (status === 'seen') {
        const movieRating = document.createElement('p');
        movieRating.textContent = `Min rating: ${'⭐'.repeat(rating)}${'☆'.repeat(5 - rating)}`;
        movieInfo.appendChild(movieRating);
        seenList.appendChild(movieItem);  // Legg til i "Sett"-lista
    } else {
        // Hvis det er "Planlagt å se", legg til en knapp for å flytte til "Sett"
        const moveButton = document.createElement('button');
        moveButton.textContent = "Flytt til Sett";
        moveButton.addEventListener('click', () => {
            currentMovieItem = movieItem;  // Lagre det gjeldende elementet som skal flyttes
            ratingModal.style.display = 'block';  // Vis modal for å legge til rating
        });
        movieInfo.appendChild(moveButton);
        toWatchList.appendChild(movieItem);  // Legg til i "Planlagt å se"-lista
    }

    movieItem.appendChild(moviePoster);
    movieItem.appendChild(movieInfo);

    // Nullstill skjemaet
    form.reset();
});

// Når brukeren lukker modalen
closeModal.onclick = function() {
    ratingModal.style.display = "none";
};

// Når brukeren klikker utenfor modalen, lukk den
window.onclick = function(event) {
    if (event.target === ratingModal) {
        ratingModal.style.display = "none";
    }
};

// Når brukeren gir en rating og flytter filmen til "Sett"-lista
submitRatingButton.addEventListener('click', function() {
    const ratingInput = document.getElementById('ratingInput').value;

    // Oppdater movieItem med rating
    const movieRating = document.createElement('p');
    movieRating.textContent = `Min rating: ${'⭐'.repeat(ratingInput)}${'☆'.repeat(5 - ratingInput)}`;

    // Fjern knappen for å flytte
    const moveButton = currentMovieItem.querySelector('button');
    moveButton.remove();

    // Legg til rating og flytt elementet til "Sett"-lista
    const movieInfo = currentMovieItem.querySelector('.movie-info');
    movieInfo.appendChild(movieRating);
    seenList.appendChild(currentMovieItem);

    // Skjul modal
    ratingModal.style.display = 'none';
});
