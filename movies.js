var timerId;
let mov = document.getElementById("movies")
let trend = document.getElementById("trend")
let next = document.getElementById("next")
var c = 1
async function searchMovies(movie_name) {
    try {


        let res = await fetch(
            // `https://www.omdbapi.com/?s=${movie_name}&apikey=39d0e0e2`,
            `https://api.themoviedb.org/3/search/movie?api_key=cd62bbe4e53a5038024d8cd788f6541b&language=en-US&query=${movie_name}&page=1&include_adult=true`

        );
        let data = await res.json();
        // console.log(data)
        return data.results
        // appendMovies(data.Search)
    } catch (e) {
        console.log(e)
    }
}


function appendMovies(movies) {
    console.log(movies)
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
        // img.src = movies.Poster
        img.src = `https://image.tmdb.org/t/p/w500/${movies.poster_path}`

        div.onclick = function () {
            // localStorage.setItem('Title', JSON.stringify(movies.Title))
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

    console.log(name)
    let res = await searchMovies(name)
    // console.log(res)
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

// console.log(fetch("https://api.themoviedb.org/3/trending/all/day?api_key=cd62bbe4e53a5038024d8cd788f6541b"))


async function trendingMovies() {

    

    let res = await fetch(
        // `https://api.themoviedb.org/3/movie/popular?api_key=cd62bbe4e53a5038024d8cd788f6541b&language=en-US&page=${c}`
        `https://api.themoviedb.org/3/movie/popular?api_key=cd62bbe4e53a5038024d8cd788f6541b&language=en-US&page=${c}`

    );
    let data = await res.json();
    console.log(data.results)
    // return data.Search
    trending(data.results)


}

trendingMovies()

function trending(movies) {
    movies.forEach(function (movies) {

        let div = document.createElement("div")
        let div_img = document.createElement("div")
        let div_title = document.createElement("div")
        let img = document.createElement("img")
        img.src = `https://image.tmdb.org/t/p/w500/${movies.poster_path}`
        let original_title = document.createElement("p")
        original_title.innerText = movies.original_title;

        div.onclick = function () {
            localStorage.setItem('Title', JSON.stringify(movies))
            window.location.href = "search.html"
        }

        div_img.append(img)
        div_title.append(original_title)
        div.append(div_img, div_title)

        trend.append(div)

    });

}

next.onclick = function () {
    c++
    console.log(c)
    trendingMovies()
}