var timerId;
let mov = document.getElementById("movies")
async function searchMovies(movie_name) {
    try {


        let res = await fetch(
            `https://www.omdbapi.com/?s=${movie_name}&apikey=39d0e0e2`,

        );
        let data = await res.json();
        console.log(data)
        return data.Search
        // appendMovies(data.Search)
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
        Title.innerText = movies.Title;
        img.src = movies.Poster
        
        div.onclick = function () {
            localStorage.setItem('Title',JSON.stringify(movies.Title))
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
    console.log(res)
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
