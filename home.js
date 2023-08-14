const API_Key = "7a0b3d4c31e1b9bbd953754f3ee78c11";
const API_URL = "http://api.themoviedb.org/3/discover/movie?&api_key=";
const IMG_URL = "http://image.tmdb.org/t/p/w500";
const trending_URL = "https://api.themoviedb.org/3/trending/movie/day?&api_key=";
const youtube_URL = "https://www.youtube.com/watch?v=";


let search_URL = `https://api.themoviedb.org/3/search/collection?&api_key=${API_Key}&query=`


let poupolar = document.getElementById("poupolar");
let trending = document.getElementById("trending");



let trailer = document.getElementById("trailer");


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
        showMovies(data, trending);
    } catch (error) {
        console.log("there is an error");
    }
};






let search = document.getElementById("search");
let searchInput = document.getElementById("searchInput");
let searchList = document.getElementById("searchList");

let q;
search.addEventListener("click", (e)=>{
    let searchKeyWord = searchInput.value;

    e.preventDefault();
    const q = async () => {
        try {
            const collection = await fetch(`${search_URL}${searchKeyWord}`);
            const collectionData = await collection.json();
            let data = collectionData.results;
            console.log(data);
            showSearchMovies(data, searchList);
        } catch (error) {
            console.log("there is an error");
        }
    };
    q();
});





async function showMovies(movies, parentElement) {

    movies.forEach(async (movie) => {
        let movieEle = document.createElement("div");
        movieEle.classList.add("col");
        movieEle.innerHTML = `
        <div class="card bg-dark border-0 mt-4">
          <img id ="movieImg" src="${IMG_URL + movie.poster_path}" class="card-img-top movie-img" alt="...">
          <div class="card-body border-0 m-2  p-0">
            <h6 class="card-title ">${movie.title}</h6>
          </div>
        </div>
        `;
        parentElement.appendChild(movieEle);

    });
};

async function showSearchMovies(movies, parentElement) {

    movies.forEach(async (movie) => {
        let movieEle = document.createElement("div");
        movieEle.classList.add("col");
        movieEle.innerHTML = `
       
            <li class="list-group-item">${movie.name}</li>
        `;
        parentElement.appendChild(movieEle);

    });
};


getFilm();


trendingFilm();


















// trailerFilm();

     // let video_id = movie.id;
        // const trailer = await fetch(`https://api.themoviedb.org/3/movie/${video_id}/videos?&api_key=${API_Key}`);
        // const trailerData = await trailer.json();
        // const key = trailerData.results[0].key;


        // let movieImage = document.getElementById("movieImg");

        // movieEle.addEventListener("mouseover", (e) => {
        //     movieEle.innerHTML = `
        //     <div class="card bg-dark border-0 mt-4">
        //     <div class="embed-responsive embed-responsive-1by1">
        //     <iframe class="embed-responsive-item" src="${youtube_URL}${key}" allowfullscreen></iframe>
        //     </div>
        //     </div>

        //   `;

        // }, false);



        // const trailerFilm = async () => {
//     try {
//         let video_id = data[1].id;
//         const trailer = await fetch(`https://api.themoviedb.org/3/movie/${video_id}/videos?&api_key=${API_Key}`);
//         const trailerData = await trailer.json();
//         const response = await fetch(`${trailer_URL}${API_Key}`);
//         const rowData = await response.json();
//         let data = rowData.results;
//         // console.log(data);
//         showMovies(data, trailer);
//     } catch (error) {
//         console.log("there is an error");
//     }

// };
