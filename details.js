import showGenresMovies from "./home.js";
import showSearchMovies from "./home.js";

showSearchMovies()
showGenresMovies();

const API_Key = "7a0b3d4c31e1b9bbd953754f3ee78c11";
const title = document.getElementById("title");
const overview = document.getElementById("overview");
const imgMovie = document.getElementById("imgMovie");
const bannerMovie = document.getElementById("banner_movie");
const banner = document.getElementById("banner");
const info = document.getElementById("info");
const IMG_URL = "http://image.tmdb.org/t/p/w500";



async function getMovieDetails(id) {
  if (!id) {
    return;
  }
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?&&api_key=${API_Key}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("try again");
  }
}
async function displayMovieDetails() {
  const searchParams = new URLSearchParams(window.location.search);
  const pokemonName = searchParams.get("id");
  const data = await getMovieDetails(pokemonName);
  title.textContent = data.title;
  overview.textContent = data.overview;
  imgMovie.src = IMG_URL + data.poster_path;
  let movieTime = data.runtime / 60;
  let jenresOpjects = data.genres;
  let jenres = [];
  jenresOpjects.forEach(el => {
    jenres.push(el.name);
  });

  info.innerHTML = `
    R <span>|</span> ${parseFloat(movieTime).toFixed(2)} h<span>|</span> ${jenres.join(" , ")} 
    <span>|</span> ${data.release_date} 
    `;
  console.log(data);
}

displayMovieDetails();