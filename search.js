
let data_title = JSON.parse(localStorage.getItem('Title'))

var timerId;
let mov = document.getElementById("movies")
let trailer = document.getElementById("trailer")
async function searchMoviesTrailer(movie_id) {
    try {
        let res = await fetch(
            `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=cd62bbe4e53a5038024d8cd788f6541b&language=en-US`
        );
        let data = await res.json();
        appendTrailer(data.results)
    } catch (e) {
        console.log(e)
    }
}
async function searchMovies(movie_name) {
    try {


        let res = await fetch(
            // `https://www.omdbapi.com/?s=${movie_name}&apikey=39d0e0e2`,
            `https://api.themoviedb.org/3/search/movie?api_key=cd62bbe4e53a5038024d8cd788f6541b&language=en-US&query=${movie_name}&page=1&include_adult=true`

        );
        let data = await res.json();
        return data.results
    } catch (e) {
        console.log(e)
    }
}


function appendMovies(movies) {
    if (movies === undefined) {
        return false
    }
    mov.innerHTML = null

    let minimise = document.createElement("button")
    minimise.innerText = "X";
    minimise.onclick = function () {
        mov.style.display = 'none'
    }
    mov.append(minimise)
    movies.forEach(function (movies) {

        let div = document.createElement("div")
        let div_img = document.createElement("div")
        let div_title = document.createElement("div")
        let img = document.createElement("img")
        let Title = document.createElement("p")
        Title.innerText = movies.original_title;
        img.src = `https://image.tmdb.org/t/p/w500/${movies.poster_path}`

        div.onclick = function () {
            localStorage.setItem('Title', JSON.stringify(movies))
            window.location.href = "search.html"
        }

        div_img.append(img)
        div_title.append(Title)
        div.append(div_img, div_title)

        mov.append(div)

    });

}

// searchMovies('avengers')

async function main() {
    let name = document.getElementById('inp').value
    if (name.length < 3) {
        mov.style.display = 'none'
        return false
    }

    let res = await searchMovies(name)
    mov.style.display = 'block'
    appendMovies(res)

}

function debounce(func, delay) {
    if (timerId) {
        clearTimeout(timerId)
    }

    timerId = setTimeout(function () {
        func();
    }, delay)
}
// searchMovies('avengers')

async function main() {
    let name = document.getElementById('inp').value
    if (name.length < 3) {

        return false
    }

    let res = await searchMovies(name)
    mov.style.display = 'block'
    appendMovies(res)

}

function debounce(func, delay) {
    if (timerId) {
        clearTimeout(timerId)
    }

    timerId = setTimeout(function () {
        func();
    }, delay)
}


// box

function show(movies) {

    let div = document.createElement("div")
    let div_img = document.createElement("div")
    let div_title = document.createElement("div")
    let div_info = document.createElement("div")
    let Runtime = document.createElement("div")
    Runtime.innerHTML = `<span>Runtime</span> <p>${movies.Runtime}</p>`

    let imdbRating = document.createElement("div")
    imdbRating.innerHTML = `<span>Rating</span> <p>${movies.vote_average}</p>`

    let title = document.createElement("h1")

    if (Number(movies.imdbRating > 8.5)) {
        title.innerHTML = movies.original_title + '<span>Recommended</span>'
    }
    else {
        title.innerText = movies.original_title

    }

    let Type = document.createElement("div")
    Type.innerHTML = `<span>Type</span> <p>${movies.Type}</p>`

    let Language = document.createElement("div")
    Language.innerHTML = `<span>Language</span> <p>${movies.original_language}</p>`

    // let Genre = document.createElement("div")
    // Genre.innerHTML = `<span>Genre</span> <p>${movies.Genre}</p>`

    let Released = document.createElement("div")
    Released.innerHTML = `<span>Release Date</span> <P>${movies.release_date}</p>`

    // let BoxOffice = document.createElement("div")
    // BoxOffice.innerHTML = `<span>BoxOffice</span> <p>${movies.BoxOffice}</p>`

    // let Country = document.createElement("div")
    // Country.innerHTML = `<span>Country</span> <p>${movies.Country}</p>`

    let Plot = document.createElement("div")
    Plot.innerHTML = `<span>Plot</span> <p>${movies.overview}</p>`

    // let Awards = document.createElement("div")
    // Awards.innerHTML = `<span>Awards</span> <p>${movies.Awards}</p>`

    // let Actors = document.createElement("div")
    // Actors.innerHTML = `<span>Actors</span> <p>${movies.Actors}</p>`
    // let Director = document.createElement("div")
    // Director.innerHTML = `<span>Director: </span> <p>${movies.Director}</p>`
    // let Writer = document.createElement("div")
    // Writer.innerHTML = `<span>Writer</span> <p>${movies.Writer}</p>`
    let img = document.createElement("img")
    img.src = `https://image.tmdb.org/t/p/w500/${movies.poster_path}`

    div_title.append(imdbRating, Language)
    div_info.append(Released, Plot)
    div_img.append(img)
    div.append(div_title, div_img, div_info)
    discription.append(title, div)
    searchMoviesTrailer(movies.id)
}
function appendTrailer(trailers) {
    trailers.forEach(movie => {
        console.log(movie)

        if ( movie.type == "Trailer") {
            let div = document.createElement("div")
            let div_trailer = document.createElement("div")
            let name = document.createElement("h1")
            name.innerText = movie.name
            div_trailer.innerHTML = `<iframe width="1280" height="720" src="https://www.youtube.com/embed/${movie.key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`

            div.append(name, div_trailer)
            trailer.append(div)
        }
    })


}
show(data_title)