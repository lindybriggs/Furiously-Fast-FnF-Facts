let apiKey = `AIzaSyBzlcyOrjLwEnxvKDzqolIoMFkY_beQBSg`;
let videoLinkEl = document.getElementById("link")


fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=YouTube+Data+API&type=video&videoCaption=closedCaption&key=${apiKey}`)
 .then(function (response) {
   return response.json();
 })
 .then(function (data) {
    let videoLink = "https://www.youtube.com/watch?v=" + data.items[0].id.videoId;
    videoLinkEl.innerHTML = videoLink;
    videoLinkEl.setAttribute("href",videoLink)
   console.log((videoLink));
 });