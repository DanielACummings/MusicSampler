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
function _drawPlaylist() { }

//Public
export default class SongsController {
  constructor() {
    console.log('SongsController');
    store.subscribe("songs", _drawResults)
  }

  /**Takes in the form submission event and sends the query to the service */
  search(e) {
    //NOTE You dont need to change this method
    e.preventDefault();
    try {
      SongService.getMusicByQuery(e.target.query.value);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Takes in a song id and sends it to the service in order to add it to the users playlist
   * @param {string} id
   */
  addSong(id) {
    event.preventDefault()
    let formData = event.target
    let newSong = {
      title: formData.title trackName.value,
      albumArt: formData..value,
      artist: formData..value,
      album: formData..value,
      price: formData..value,
      preview: formData..value,
      _id: formData..value
    }
  }

  /**
   * Takes in a song id to be removed from the users playlist and sends it to the server
   * @param {string} id
   */
  removeSong(id) { }
}
