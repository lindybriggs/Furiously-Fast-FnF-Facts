let apiKey = `AIzaSyBzlcyOrjLwEnxvKDzqolIoMFkY_beQBSg`;
let videoLinkEl = document.getElementById("link")
let wikiFactEl = document.getElementById("wiki")
let searchButton = document.querySelector("#search")
let userInput = document.getElementById("select1")
let movieTitle = document.getElementById("movietitle");


userInput.value = localStorage.getItem("history")

function button() {
    localStorage.setItem("history",userInput.value)
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${userInput.value}&type=video&videoCaption=closedCaption&key=${apiKey}`)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        let videoLink = "https://www.youtube.com/watch?v=" + data.items[0].id.videoId;
        videoLinkEl.innerHTML = videoLink;
        videoLinkEl.setAttribute("href", videoLink)
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