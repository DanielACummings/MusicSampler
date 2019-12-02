import store from "../store.js";
import SongService from "../Services/SongsService.js";

//Private
/**Draws the Search results to the page */
function _drawResults() {
  let template = ''
  let results = store.State.songs
  results.forEach(song => template += song.Template)
  document.querySelector("#songs").innerHTML = template
}
/**Draws the Users saved songs to the page */
function _drawPlaylist() {
  let template = ''
  let mySongs = store.State.playlist
  mySongs.forEach(song => template += song.playlistTemplate)
  document.querySelector("#playlist").innerHTML = template
}

function _showLoading() {
  document.querySelector("#songs").innerHTML = "<div><p>loading...</p></div>"
}
// function _drawNowPlaying() {
//   let template = ''
//   let activeSong =
//     mySongs.forEach(song => template += song.playlistTemplate)
//   document.querySelector("#playlist").innerHTML = template

//   let template = song.nowPlayingTemplate
//   document.querySelector("#now-playing").innerHTML = template
// }

function onlyPlayOneIn(container) {
  container.addEventListener("play", function (event) {
    let audio_elements = container.getElementsByTagName("audio")
    for (let i = 0; i < audio_elements.length; i++) {
      let audio_element = audio_elements[i];
      if (audio_element !== event.target) {
        audio_element.pause();
      }
    }
  }, true);
}

document.addEventListener("DOMContentLoaded", function () {
  onlyPlayOneIn(document.body);
});

//Public
export default class SongsController {
  constructor() {
    console.log('SongsController');
    store.subscribe("songs", _drawResults)
    store.subscribe("playlist", _drawPlaylist)
  }

  /**Takes in the form submission event and sends the query to the service */
  search(e) {
    //NOTE You dont need to change this method
    e.preventDefault();
    _showLoading()
    try {
      SongService.getMusicByQuery(e.target.query.value);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * find & play a song by its id
   * @param {string} id 
   */
  playSong(id) {
    let song = store.State.songs.find(s => s._id == id)
    document.getElementById("now-playing").innerHTML = song.nowPlayingTemplate
  }
  /**
   * Takes in a song id and sends it to the service in order to add it to the users playlist
   * @param {string} id
   */
  addSong(id) {
    event.preventDefault()
    SongService.addSong(id)
  }


  /**
   * Takes in a song id to be removed from the users playlist and sends it to the server
   * @param {string} id
   */
  removeSong(id) {
    console.log('removeSongController');
    SongService.removeSong(id)
  }
}
