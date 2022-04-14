// Delcaring Variables.
let apiKey = `AIzaSyBzlcyOrjLwEnxvKDzqolIoMFkY_beQBSg`;
let apiKeyOmdb = `664ace4d`;
let videoLinkEl = document.getElementById("link")
let wikiFactEl = document.getElementById("wiki")
let searchButton = document.querySelector("#search")
let embeddedVideo = document.querySelector(".video1")
let userInput = document.getElementById("select1")
let movieTitle = document.getElementById("movietitle");
let infoCard = document.querySelector("#card")
let plotEl = document.querySelector("#plot")
// Event listener for the search button.
searchButton.addEventListener("click", button)

// Getting local storage.
userInput.value = localStorage.getItem("history")

// Running function on page load.
button();

// Button function - fetching data from APIs.
function button() {
    localStorage.setItem("history", userInput.value)
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${userInput.value}&type=video&videoCaption=closedCaption&key=${apiKey}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let videoLink = "https://www.youtube.com/watch?v=" + data.items[0].id.videoId;
            let videoLink2 = data.items[0].id.videoId
            // videoLinkEl.innerHTML = videoLink;   <-- link display, debating to add or not.
            //     videoLinkEl.setAttribute("href", videoLink)

            embedLink(videoLink2);
        });

    fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=pageprops&titles=${userInput.value}&format=json&origin=*`)
        .then(function (response) {
            return response.json();
        })

        .then(function (data) {
            console.log(data.query.pages[Object.keys(data.query.pages)[0]])
            movieTitle.innerHTML = data.query.pages[Object.keys(data.query.pages)[0]].title;
            console.log(data.query.pages[Object.keys(data.query.pages)[0]].pageprops["wikibase-shortdesc"])
            wikiFactEl.innerHTML = data.query.pages[Object.keys(data.query.pages)[0]].pageprops["wikibase-shortdesc"];

        });
    let omdbMovie = document.querySelector("select option:checked").dataset.movie

    fetch(`http://www.omdbapi.com/?i=${omdbMovie}&apikey=${apiKeyOmdb}`)
        .then(function (response) {
            return response.json();
        })

        .then(function (data) {
            console.log(omdbMovie)
            console.log(data.Plot);
            plotEl.innerHTML = data.Plot;
        });
}


// Function to load embedded video.
function embedLink(videoLink2) {
    let videoDisplayed = document.getElementById("videodiv");
    console.log(videoLink2)

    videoDisplayed.innerHTML = `
    <iframe class="video1 col-12 col-lg-10 col-md-12 mb-5 mt-2" width="" height="375" src="https://www.youtube.com/embed/${videoLink2}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `
    infoCard.appendChild(videoDisplayed);
}