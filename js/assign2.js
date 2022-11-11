
const playlist = [{
   "song_id": 1170,
   "title": "Dangerous Woman",
   "year": 2016,
   "artist": {
      "id": 11,
      "name": "Ariana Grande"
   },
   "genre": {
      "id": 110,
      "name": "dance pop"
   },
   "details": {
      "duration": 236,
      "bpm": 134,
      "popularity": 72,
      "loudness": -5
   },
   "analytics": {
      "energy": 60,
      "danceability": 66,
      "liveness": 36,
      "valence": 29,
      "acousticness": 5,
      "speechiness": 4
   }
},
{
   "song_id": 1171,
   "title": "Sorry",
   "year": 2016,
   "artist": {
      "id": 17,
      "name": "Beyoncé"
   },
   "genre": {
      "id": 110,
      "name": "dance pop"
   },
   "details": {
      "duration": 233,
      "bpm": 130,
      "popularity": 72,
      "loudness": -7
   },
   "analytics": {
      "energy": 60,
      "danceability": 78,
      "liveness": 25,
      "valence": 36,
      "acousticness": 0,
      "speechiness": 5
   }
}


]
/* url of song api --- https versions hopefully a little later this semester */
const api = 'http://www.randyconnolly.com/funwebdev/3rd/api/music/songs-nested.php';


/* note: you may get a CORS error if you try fetching this locally (i.e., directly from a
   local file). To work correctly, this needs to be tested on a local web server.  
   Some possibilities: if using Visual Code, use Live Server extension; if Brackets,
   use built-in Live Preview.
*/
fetch(api)
   .then(resp => resp.json())
   .then(data =>{
         localStorage.setItem("key", JSON.stringify(data))
   })

let songs = JSON.parse(localStorage.getItem("key"))
loadTable('songs')
const browser = document.querySelector("#browseSongsView")
const singleSongView = document.querySelector("#singleSongView")
const closeBtn = document.querySelector("#close")
const playlistBtn = document.querySelector("#playlistBtn")
const playlistView = document.querySelector("#playlistView")

const sortTitle = document.querySelector("#sortIconTitle")

sortTitle.addEventListener("click", sortTitleHandler)
function sortTitleHandler(){
   songs.sort(function(a,b){
      if(a.title < b.title){
         return -1;
      }
      if(a.title > b.title){
         return 1;
      }
      return 0;
   })
   const tBody = document.querySelector(".songTable tbody")
   tBody.innerHTML = "";
   loadTable('songs')
}

const sortArtist = document.querySelector("#sortIconArtist");

sortArtist.addEventListener("click",sortArtistHandler)
function sortArtistHandler(){
   songs.sort(function(a,b){
      if(a.artist.name < b.artist.name){
         return -1;
      }
      if(a.artist.name > b.artist.name){
         return 1;
      }
      return 0;
   })
   const tBody = document.querySelector(".songTable tbody")
   tBody.innerHTML = "";
   loadTable('songs')
}

const sortPop = document.querySelector("#sortIconPop")
sortPop.addEventListener("click", sortPopHandler)

function sortPopHandler(){
   songs.sort(function(a,b){
      return a.details.popularity-b.details.popularity;
   })
   const tBody = document.querySelector(".songTable tbody")
   tBody.innerHTML = "";
   loadTable('songs')
}


const sortGenre = document.querySelector("#sortIconGenre")
sortGenre.addEventListener("click", sortGenreHandler)

function sortGenreHandler(){
   songs.sort(function(a,b){
      if(a.genre.name < b.genre.name){
         return -1;
      }
      if(a.genre.name > b.genre.name){
         return 1;
      }
      return 0;
   })
   const tBody = document.querySelector(".songTable tbody")
   tBody.innerHTML = "";
   loadTable('songs')
}


const sortYear = document.querySelector("#sortIconYear")
sortYear.addEventListener("click", sortYearHandler)
function sortYearHandler(){
   songs.sort(function(a,b){
      return a.year-b.year;
   })
   const tBody = document.querySelector(".songTable tbody")
   tBody.innerHTML = "";
   loadTable('songs')
}




const creditButton = document.querySelector("#creditButton");
function creditButtonHandler() {
   let myDropdown = document.querySelector("#x  ");
   myDropdown.classList.toggle("dropDown-hidden");
   myDropdown.classList.toggle("dropdown-content")
}

creditButton.addEventListener("click", creditButtonHandler);

const clearButton = document.querySelector("#clearButton");
function clearButtonHandler() {
   const texts = document.querySelectorAll("input[type=text]");
   //clear textboxes here
}

clearButton.addEventListener("click", clearButtonHandler);

const searchButton = document.querySelector("#searchButton");
function searchButtonHandler() {
   alert("Searched!")
}

searchButton.addEventListener("click", searchButtonHandler);

function getTableData(song) {
   const title = document.createElement("td")
   title.setAttribute('id', song.song_id)
   title.setAttribute("data-song", song.song_id)
   title.textContent = song.title


   const artist = document.createElement("td")
   artist.setAttribute('id', song.artist.id)
   artist.setAttribute("data-song", song.song_id)
   artist.textContent = song.artist.name

   const year = document.createElement("td")
   year.setAttribute('id', song.year)
   year.setAttribute("data-song", song.song_id)
   year.textContent = song.year

   const genre = document.createElement("td")
   genre.setAttribute('id', song.genre.id)
   genre.setAttribute("data-song", song.song_id)
   genre.textContent = song.genre.name

   const popularity = document.createElement("td")
   popularity.setAttribute('id', song.details.popularity)
   popularity.setAttribute("data-song", song.song_id)
   popularity.textContent = song.details.popularity

   return { title, artist, year, genre, popularity }
}

function getAddBtn(song) {
   const addBtn = document.createElement("button")
   addBtn.classList.add("btn")
   addBtn.setAttribute('id', song.song_id)
   addBtn.textContent = "Add"

   return addBtn
}

function getRemoveBtn(song) {
   const removeBtn = document.createElement("button")
   removeBtn.classList.add("btn")
   removeBtn.setAttribute('id', song.song_id)
   removeBtn.textContent = "Remove"

   return removeBtn
}


function loadTable(type) {
   if (type == 'songs') {
      const tBody = document.querySelector(".songTable tbody")

      for (let song of songs) {
         const tableData = getTableData(song)
         const addBtn = getAddBtn(song)

         const newRow = document.createElement("tr")
         newRow.setAttribute('id', "tableRow")
         newRow.setAttribute("data-song", song.song_id)

         newRow.appendChild(tableData.title)
         newRow.appendChild(tableData.artist)
         newRow.appendChild(tableData.year)
         newRow.appendChild(tableData.genre)
         newRow.appendChild(tableData.popularity)
         newRow.appendChild(addBtn)

         tBody.appendChild(newRow)
      }

      tBody.addEventListener('click', showSongDetails)
      tBody.addEventListener('click', addToPlaylist)
   } else if (type == 'playlist') {
      const tBody = document.querySelector("#playlistTable .songTable tbody")
      removeAllChildNodes(tBody)
      for (let song of playlist) {
         const tableData = getTableData(song)
         const removeBtn = getRemoveBtn(song)

         const newRow = document.createElement("tr")
         newRow.setAttribute('id', "tableRow")
         

         newRow.appendChild(tableData.title)
         newRow.appendChild(tableData.artist)
         newRow.appendChild(tableData.year)
         newRow.appendChild(tableData.genre)
         newRow.appendChild(tableData.popularity)
         newRow.appendChild(removeBtn)

         tBody.appendChild(newRow)  
      }
      tBody.addEventListener('click', showSongDetails)
      tBody.addEventListener('click', removeFromPlaylist)
   }
}

function getSong(songId) {
   return songs.find(song => song.song_id == songId)
}

function addToPlaylist(e) {
   if(e.target && e.target.nodeName =="BUTTON"){
      const songId = e.target.id
      const song = getSong(songId)
      console.log(songId)
      playlist.push(song)
   }
}

function removeFromPlaylist(e){
   if(e.target && e.target.nodeName =="BUTTON"){
      const songId = e.target.id
      const song = getSong(songId)
      console.log(songId)
      playlist.pop(song)
      loadTable('playlist')
   }
}

function showSongDetails(e) {
   if (e.target && e.target.nodeName == "TD") {

      playlistBtn.classList.add("hide")
      closeBtn.classList.remove("hide")
      browser.classList.add("hide")
      singleSongView.classList.remove("hide")
      

      const songId = e.target.getAttribute("data-song")
      const song = songs.find(song => song.song_id == songId);

      const bpm = document.querySelector("#songInfo ul #bpm")
      bpm.textContent = "bpm: " + song.details.bpm;

      const energy = document.querySelector("#songInfo ul #energy")
      energy.textContent = "energy: " + song.analytics.energy;

      const danceability = document.querySelector("#songInfo ul #danceability")
      danceability.textContent = "danceability: " + song.analytics.danceability;

      const liveness = document.querySelector("#songInfo ul #liveness")
      liveness.textContent = "liveness: " + song.analytics.liveness;

      const valence = document.querySelector("#songInfo ul #valence")
      valence.textContent = "valence: " + song.analytics.valence;

      const acousticness = document.querySelector("#songInfo ul #acousticness")
      acousticness.textContent = "acousticness: " + song.analytics.acousticness;

      const speechiness = document.querySelector("#songInfo ul #speechiness")
      speechiness.textContent = "speechiness: " + song.analytics.speechiness;

      const popularity = document.querySelector("#songInfo ul #popularity")
      popularity.textContent = "popularity: " + song.details.popularity;

      const songInfo = document.querySelector("#songInfo p")
      let songMinutes = song.details.duration / 60;
      songMinutes = Math.floor(songMinutes);
      let songSeconds = song.details.duration % 60;
      songInfo.textContent = `${song.title}, ${song.artist.name}, ${song.artist.id}, ${song.genre.name}, ${song.year}, ${songMinutes} minutes and ${songSeconds} seconds`;

      const radar = document.querySelector("#radarChart")
      radar.innerHTML = "";
      const canvas = document.createElement("canvas")
      canvas.id = "myChart";
      radar.appendChild(canvas);

      const ctx = document.getElementById('myChart').getContext('2d');
      const myChart = new Chart(ctx, {
         type: 'radar',
         data: {
            labels: ['danceability', 'energy', 'speechiness', 'acousticness', 'liveness', 'valence'],
            datasets: [{
                  label: 'Song Statistics',
                  data: [song.analytics.danceability, song.analytics.energy, song.analytics.speechiness, song.analytics.acousticness, song.analytics.liveness, song.analytics.valence],
                  backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                  ],
                  borderColor: [
                     'white'
                  ],
                  borderWidth: 2
            }]
         },
         options: {
            scales: {
                  y: {
                     beginAtZero: true
                  }
            }
         }
      });
   }
}


const closeView = document.querySelector("#close")
closeView.addEventListener('click', showBrowseSongsView)

function showBrowseSongsView() {
   playlistBtn.classList.remove("hide")
   closeBtn.classList.add("hide")
   browser.classList.remove("hide")
   singleSongView.classList.add("hide")
   playlistView.classList.add("hide")
}

const playListBtn = document.querySelector("#playlistBtn")
playListBtn.addEventListener('click', function () {
   
   
   playlistBtn.classList.add("hide")
   closeBtn.classList.remove("hide")
   browser.classList.add("hide")
   playlistView.classList.remove("hide")

   loadTable("playlist")
})

const clearPlaylistBtn = document.querySelector("#clearPlaylist")
clearPlaylistBtn.addEventListener('click', function(){
   while(playlist.length > 0){
      playlist.pop()
   }
   loadTable('playlist')
})

function removeAllChildNodes(parent) {
   while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
   }
}

const radios = document.querySelectorAll('input[type="radio"')
const form = document.querySelector("form")
form.addEventListener('click', function (e){
   if(e.target && e.target.nodeName == "INPUT"){
      for(let radio of radios){
         const textBox = document.querySelector(`input[name="${radio.value}"`)
         if(radio.checked){
            console.log(textBox)
            const disable = textBox.getAttribute("disabled")
            textBox.removeAttribute("disabled")
         } else {
            textBox.setAttribute('disabled',"")
         }
      }
   }

})

