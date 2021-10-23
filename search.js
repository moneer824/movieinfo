
        let data_title = localStorage.getItem('Title')

        var timerId;
        let mov = document.getElementById("movies")
        async function searchMovies(movie_name) {
            try {


                let res = await fetch(
                    `https://www.omdbapi.com/?s=${movie_name}&apikey=39d0e0e2`,

                );
                let data = await res.json();
                // console.log(data)
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
                    localStorage.setItem('Title', JSON.stringify(movies.Title))
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

        console.log(data_title)

        // box


        async function sea() {
            let res = await fetch(
                `https://www.omdbapi.com/?t=${data_title}&apikey=39d0e0e2`,

            );

            let data = await res.json()
            show(data)
            console.log(data)
        }
        sea()
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
            else {
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
        }