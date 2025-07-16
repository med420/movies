const API_KEY = 'your_omdb_api_key'; // 🔑 Inscris-toi sur https://www.omdbapi.com/ pour une clé gratuite

document.getElementById('search').addEventListener('input', async function () {
  const query = this.value.trim();
  const moviesDiv = document.getElementById('movies');
  moviesDiv.innerHTML = '';

  if (query.length < 3) return;

  const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
  const data = await res.json();

  if (data.Search) {
    data.Search.forEach(movie => {
      const card = document.createElement('div');
      card.className = 'card';

      card.innerHTML = `
        <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300'}" alt="${movie.Title}">
        <div class="card-content">
          <h3>${movie.Title} (${movie.Year})</h3>
        </div>
      `;
      moviesDiv.appendChild(card);
    });
  } else {
    moviesDiv.innerHTML = `<p>Aucun film trouvé pour "${query}".</p>`;
  }
});
