// "http://www.omdbapi.com/?i=tt3896198&apikey=39d0e0e2"


const btn = document.getElementById('btn')
var parent = document.getElementById('parent')
btn.addEventListener("click", searchMovies)

async function searchMovies() {
    let inp = document.getElementById('inp').value
    let res = await fetch(
        `http://www.omdbapi.com/?s=${inp}&apikey=39d0e0e2`
    );
    let data = await res.json()
    showMovies(data.Search)
}
searchMovies()
function showMovies(data) {

    data.forEach(function (movies) {
        console.log(movies)
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
        let year = document.createElement("p")
        year.innerText = "Released Date " + movies.Year
        let type = document.createElement("p")
        type.innerText = "Category " + movies.Type
        let btn_detail = document.createElement("button")
        btn_detail.innerText = "Add To Watchlist"


        div_detail.append(year, type,btn_detail)
        div_img.append(img, div_detail)
        div.append(div_img, title)
        parent.append(div)
    });
}

