const API_Key = "7a0b3d4c31e1b9bbd953754f3ee78c11";
const API_URL = "http://api.themoviedb.org/3/discover/movie?&api_key=";
const IMG_URL = "http://image.tmdb.org/t/p/w500";
const trending_URL = "https://api.themoviedb.org/3/trending/movie/day?&api_key=";

const youtube_URL="https://www.youtube.com/watch?v=";



let poupolar = document.getElementById("poupolar");trailer
let trending = document.getElementById("trending");
// let trailer = document.getElementById("trailer");


const getFilm = async () => {
    try {
        const response = await fetch(`${API_URL}${API_Key}`);
        const rowData = await response.json();
        let data = rowData.results;
        showMovies(data, poupolar);
    } catch (error) {
        console.log("there is an error");
    }

};



const trendingFilm = async () => {
    try {
        const response = await fetch(`${trending_URL}${API_Key}`);
        const rowData = await response.json();
        let data = rowData.results;
        // console.log(data);

        
        





        showMovies(data, trending);
    } catch (error) {
        console.log("there is an error");
    }

};


const trailerFilm = async () => {
    try {


        let video_id = data[1].id;
        const trailer = await fetch(`https://api.themoviedb.org/3/movie/${video_id}/videos?&api_key=${API_Key}`);
        const trailerData = await trailer.json();
        
        // console.log(trailerData);
    

        const response = await fetch(`${trailer_URL}${API_Key}`);
        const rowData = await response.json();
        let data = rowData.results;
        // console.log(data);
        showMovies(data, trailer);
    } catch (error) {
        console.log("there is an error");
    }

};



async function showMovies(movies, parentElement) {
    let keyArr = [];

    movies.forEach(async(movie) => {
        let movieEle = document.createElement("div");
        movieEle.classList.add("col");
        movieEle.innerHTML = `
        <div class="card bg-dark border-0 mt-2">
          <img src="${IMG_URL+movie.poster_path}" class="card-img-top movie-img" alt="...">
          <div class="card-body border-0">
            <h6 class="card-title text-light">${movie.original_title}</h6>
          </div>
        </div>
        `;
        parentElement.appendChild(movieEle);

        let video_id = movie.id;
        const trailer = await fetch(`https://api.themoviedb.org/3/movie/${video_id}/videos?&api_key=${API_Key}`);
        const trailerData = await trailer.json();
        const key = trailerData.results[0].key;
        
    });
};


getFilm();


trendingFilm();

// trailerFilm();