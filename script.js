let apiKey = `AIzaSyBzlcyOrjLwEnxvKDzqolIoMFkY_beQBSg`;
let videoLinkEl = document.getElementById("link")
let wikiFactEl = document.getElementById("wiki")
let searchButton = document.querySelector("#search")
let embeddedVideo = document.querySelector(".video1")
let userInput = document.getElementById("select1")
let movieTitle = document.getElementById("movietitle");
let infoCard = document.querySelector("#card")
searchButton.addEventListener("click", button)


userInput.value = localStorage.getItem("history")

function button() {
    localStorage.setItem("history", userInput.value)
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${userInput.value}&type=video&videoCaption=closedCaption&key=${apiKey}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let videoLink = "https://www.youtube.com/watch?v=" + data.items[0].id.videoId;
            let videoLink2 = data.items[0].id.videoId
            videoLinkEl.innerHTML = videoLink;
            videoLinkEl.setAttribute("href", videoLink)

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
}

function embedLink(videoLink2){
    let videoDisplayed = document.getElementById("videodiv");
    console.log(videoLink2)

    videoDisplayed.innerHTML = `
    <iframe class="video1" width="560" height="315" src="https://www.youtube.com/embed/${videoLink2}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `
    infoCard.appendChild(videoDisplayed);
}