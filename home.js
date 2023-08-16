const API_Key = "7a0b3d4c31e1b9bbd953754f3ee78c11";
const API_URL = "http://api.themoviedb.org/3/discover/movie?&api_key=";
const IMG_URL = "http://image.tmdb.org/t/p/w500";
const trending_URL = "https://api.themoviedb.org/3/trending/movie/day?&api_key=";
const youtube_URL = "https://www.youtube.com/watch?v=";
const genresList_URL = "https://api.themoviedb.org/3/genre/movie/list?&?&api_key=";
let search_URL = `https://api.themoviedb.org/3/search/collection?&api_key=${API_Key}&query=`;


let poupolar = document.getElementById("poupolar");
let trending = document.getElementById("trending");
let genresList = document.getElementById("genres-list");
let home = document.getElementById("home");
let slider = document.getElementById("slider");

home.href = window.location.href;
// let trailer = document.getElementById("trailer");

// function to get poupolar movies
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

// function to get trending movies
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


// function to show movies, we call it in Poupolar and Trending functions 
async function showMovies(movies, parentElement) {
    movies.forEach(async (movie) => {
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
        parentElement.appendChild(movieEle);
    });
};




// this script of code deal with search operation.
let search = document.getElementById("search");
let searchInput = document.getElementById("searchInput");
let searchList = document.getElementById("searchList");
search.addEventListener("click", (e) => {
    let searchKeyWord = searchInput.value;
    e.preventDefault();
    const q = async () => {
        try {
            const collection = await fetch(`${search_URL}${searchKeyWord}`);
            const collectionData = await collection.json();
            let data = collectionData.results;
            showSearchMovies(data, searchList);
        } catch (error) {
            console.log("there is an error");
        }
    };
    q();
});

search.addEventListener("mouseover", (e) => {
    searchInput.style.width = "200px";
    searchInput.style.transition = "2s";

})
search.addEventListener("mouseleave", (e) => {
    searchInput.style.width = "0px";
})


async function showSearchMovies(movies, parentElement) {

    movies.forEach(async (movie) => {
        let movieEle = document.createElement("div");
        movieEle.classList.add("col");
        movieEle.innerHTML = `
        <li><a class="dropdown-item" href="#">${movie.name}</a></li>
        <li><hr class="dropdown-divider"></li>

        `;
        movieEle.addEventListener("click", () => {
            window.location.href = `details.html?id=${movie.id}`;
        });
        parentElement.appendChild(movieEle);

    });
};


// Genres function to get Genres list 

async function showGenresMovies(genres, parentElement) {
    genres.forEach(async (genre) => {
        let movieEle = document.createElement("div");
        movieEle.classList.add("col");
        movieEle.innerHTML = `
        <li><a class="dropdown-item text-light" href="#">${genre.name}</a></li>
        <li><hr class="dropdown-divider"></li>
        `;
        movieEle.addEventListener("click", () => {
            window.location.href = `movies.html?id=${genre.id}&name=${genre.name}`;
        });
        parentElement.appendChild(movieEle);
    });
};
const getGenresList = async () => {
    try {
        const genres = await fetch(`${genresList_URL}${API_Key}`);
        const genresData = await genres.json();
        let data = genresData.genres;
        showGenresMovies(data, genresList);
    } catch (error) {
        console.log("there is an error");
    }
};







const topRatedList = async () => {
    try {
        const top = await fetch(`https://api.themoviedb.org/3/movie/top_rated?&api_key=${API_Key}`);
        const topData = await top.json();
        let data = topData.results;
        showTopRatedMovies(data);
    } catch (error) {
        console.log("there is an error");
    }
};


async function showTopRatedMovies(movies) {

    try {
        for (let i = 0; i < 5; i++) {
            let element = movies[i];
            let newElment = document.createElement("div");
            newElment.classList.add("myslide");
            newElment.classList.add("fade");

            newElment.innerHTML = `
                <div class="txt">
                    <h1>${element.title}</h1>
                    <p>A team of friends return to Jumanji<br> to rescue one of their own but discover that</p>
                    <a href="/Movie-Poster.html"> <button class="learn-more"
                        style="margin-top: 5%; background-color: #030f17c9; border-radius: 30px;">
                        <span class="circle" aria-hidden="true">
                        <span class="icon arrow"></span>
                        </span>
                        <span class="button-text">View</span>
                    </button></a>
                </div>
                <img src="${IMG_URL}${element.backdrop_path}" alt="" style="width: 100%; height: 100%;">
            `;
        };
        slider.appendChild(newElment);

    } catch (error) {
        return error;
    }





};














const myslide = document.querySelectorAll('.myslide'),
    dot = document.querySelectorAll('.dot');
let counter = 1;
slidefun(counter);

let timer = setInterval(autoSlide, 8000);
function autoSlide() {
    counter += 1;
    slidefun(counter);
}
function plusSlides(n) {
    counter += n;
    slidefun(counter);
    resetTimer();
}
function currentSlide(n) {
    counter = n;
    slidefun(counter);
    resetTimer();
}
function resetTimer() {
    clearInterval(timer);
    timer = setInterval(autoSlide, 8000);
}

function slidefun(n) {
    try {
        let i;
        for (i = 0; i < myslide.length; i++) {
            myslide[i].style.display = "none";
        }
        for (i = 0; i < dot.length; i++) {
            dot[i].className = dot[i].className.replace(' active', '');
        }
        if (n > myslide.length) {
            counter = 1;
        }
        if (n < 1) {
            counter = myslide.length;
        }
        myslide[counter - 1].style.display = "block";
        dot[counter - 1].className += " active";
    } catch (error) {
        return error;
    }


}







topRatedList();




getFilm();
trendingFilm();


getGenresList();

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
export default showGenresMovies;

export { showSearchMovies };
