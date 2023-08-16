import showGenresMovies from "./home.js";
import showSearchMovies from "./home.js";

showSearchMovies()
showGenresMovies();

const API_Key = "7a0b3d4c31e1b9bbd953754f3ee78c11";
const genres_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_Key}&with_genres=`;
let genreMovies = document.getElementById("genres-movies");
const IMG_URL = "http://image.tmdb.org/t/p/w500";
const title = document.getElementById("title");

async function getGenresCollection(id) {
    if (!id) {
        return;
    }
    try {
        const response = await fetch(`${genres_URL}${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("try again");
    }
}

async function displayMovieDetails() {
    const searchParams = new URLSearchParams(window.location.search);
    const genreId = searchParams.get("id");
    const genreName = searchParams.get("name");

    const rowData = await getGenresCollection(genreId);
    let data = rowData.results;

    data.forEach(async (movie) => {
        title.textContent = `${genreName}`;
        let movieEle = document.createElement("div");
        movieEle.classList.add("col");
        movieEle.innerHTML = `
    <div class="card bg-dark border-0 mt-4">
      <img id ="movieImg" src="${IMG_URL + movie.poster_path}" class="card-img-top movie-img" alt="...">
      <div class="card-body border-0 text-center p-0">
        <h6 class="card-title">${movie.title}</h6>
        <span class="card-title small">${movie.release_date}</span>

      </div>
    </div>
    `;
        movieEle.addEventListener("click", () => {
            window.location.href = `details.html?id=${movie.id}`;
        });
        genreMovies.appendChild(movieEle);
    });




    //   info.innerHTML = `
    //     R <span>|</span> ${parseFloat(movieTime).toFixed(2)} h<span>|</span> ${jenres.join(" , ")} 
    //     <span>|</span> ${data.release_date} 
    //     `;
    //   console.log(data);
}

displayMovieDetails();