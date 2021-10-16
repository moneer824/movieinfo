


const btn = document.getElementById('btn')
var parent = document.getElementById('parent')
var discription = document.getElementById('discription')
btn.addEventListener("click", searchMovies)

async function searchMovies() {
    let inp = document.getElementById('inp').value
    if (inp.length == 0) {
        inp = 'pyaar'

    }
    let res = await fetch(
        `https://www.omdbapi.com/?s=${inp}&apikey=39d0e0e2`,

    );

    let data = await res.json()
    showMovies(data.Search)
}

async function sea(title) {
    parent.innerHTML = null



    let res = await fetch(
        `https://www.omdbapi.com/?t=${title}&apikey=39d0e0e2`,

    );

    let data = await res.json()
    show(data)
}

function show(movies) {
    let div = document.createElement("div")
    let div_img = document.createElement("div")
    let div_title = document.createElement("div")
    let div_info = document.createElement("div")
    let Runtime = document.createElement("div")
    Runtime.innerHTML = `<span>Runtime</span> <p>${movies.Runtime}</p>`

    let imdbRating = document.createElement("div")
    imdbRating.innerHTML = `<span>Rating</span> <p>${movies.imdbRating}</p>`

    let title = document.createElement("h1")
    
    if (Number(movies.imdbRating > 8.5)) {
        title.innerHTML = movies.Title + '<span>Recommended</span>'
    }
    else{
        title.innerText = movies.Title

    }

    let Type = document.createElement("div")
    Type.innerHTML = `<span>Type</span> <p>${movies.Type}</p>`

    let Language = document.createElement("div")
    Language.innerHTML = `<span>Language</span> <p>${movies.Language}</p>`

    let Genre = document.createElement("div")
    Genre.innerHTML = `<span>Genre</span> <p>${movies.Genre}</p>`

    let Released = document.createElement("div")
    Released.innerHTML = `<span>Release Date</span> <P>${movies.Released}</p>`

    let BoxOffice = document.createElement("div")
    BoxOffice.innerHTML = `<span>BoxOffice</span> <p>${movies.BoxOffice}</p>`

    let Country = document.createElement("div")
    Country.innerHTML = `<span>Country</span> <p>${movies.Country}</p>`

    let Plot = document.createElement("div")
    Plot.innerHTML = `<span>Plot</span> <p>${movies.Plot}</p>`

    let Awards = document.createElement("div")
    Awards.innerHTML = `<span>Awards</span> <p>${movies.Awards}</p>`

    let Actors = document.createElement("div")
    Actors.innerHTML = `<span>Actors</span> <p>${movies.Actors}</p>`
    let Director = document.createElement("div")
    Director.innerHTML = `<span>Director: </span> <p>${movies.Director}</p>`
    let Writer = document.createElement("div")
    Writer.innerHTML = `<span>Writer</span> <p>${movies.Writer}</p>`
    let img = document.createElement("img")
    img.src = movies.Poster

    div_title.append(Runtime, imdbRating, Language, Type)
    div_info.append(Genre, Released, BoxOffice, Country, Awards, Actors, Director, Writer, Plot)
    div_img.append(img)
    div.append(div_title, div_img, div_info)
    discription.append(title, div)
    // });
}

function showMovies(data) {

    discription.innerHTML = null
    parent.innerHTML = null
    if (!data) {
        let div = document.createElement("div")
        let div_img = document.createElement("div")
        let img = document.createElement("img")
        img.src = "https://images.pexels.com/photos/1888015/pexels-photo-1888015.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
        let error = document.createElement("p")
        error.innerText = 'Please Enter a Valid Movie Name'
        div_img.append(img)
        div.append(error, div_img)
        parent.append(div)
        document.querySelector("#parent>div").style.width = "40%"
    }
    else {

        data.forEach(function (movies) {
            // console.log(movies.imdbID)
            let div = document.createElement("div")
            let div_img = document.createElement("div")
            let img = document.createElement("img")
            img.src = movies.Poster
            let title = document.createElement("p")
            title.innerText = movies.Title
            let div_detail = document.createElement("div")
            div_detail.setAttribute('class', 'details')
            div_detail.style.display = 'none'
            div.onmouseenter = function () {
                div_detail.style.display = 'flex'

            }
            div.onmouseleave = function () {

                div_detail.style.display = 'none'
            }

            let btn_detail = document.createElement("button")
            btn_detail.innerText = "Open"
            btn_detail.onclick = function () {
                // console.log(title)
                sea(title.innerText)
            }
            let btn_imbd = document.createElement("a")
            btn_imbd.innerText = "Go to Imdb"
            btn_imbd.href = `https://www.imdb.com/title/${movies.imdbID}/`
            // let btn_imbd = document.createElement("button")
            // btn_imbd.innerText = "Go to Imdb"


            div_detail.append(btn_detail)
            div_img.append(img, div_detail)
            div.append(div_img, title)
            parent.append(div)
        });
    }
}

