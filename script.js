let apiKey = `AIzaSyBzlcyOrjLwEnxvKDzqolIoMFkY_beQBSg`;
let videoLinkEl = document.getElementById("link")
let wikiFactEl = document.getElementById("wiki")


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


fetch('https://en.wikipedia.org/w/api.php?action=query&prop=pageprops&titles=Finding_Dory&format=json&origin=*')
 .then(function (response) {
   return response.json();
 })
 .then(function (data) {
   console.log(data)
    console.log(data.query.pages)
    console.log(data.query.pages[Object.keys(data.query.pages)[0]].pageprops["wikibase-shortdesc"])
    wikiFactEl.innerHTML = data.query.pages[Object.keys(data.query.pages)[0]].pageprops["wikibase-shortdesc"];
  //  console.log((data.query.pages[239587].pageprops["wikibase-shortdesc"]));
 }); 