// adapter
export default class Song {
  constructor(data) {
    this.title = data.trackName || data.title;
    this.albumArt =
      data.albumArt || data.artworkUrl100.replace(/100x100/g, "300x300");
    this.artist = data.artistName || data.artist;
    this.album = data.collectionName || data.album;
    this.price = data.trackPrice || data.price;
    this.preview = data.previewUrl || data.preview;
    this._id = data.trackId || data._id;
  }
  get Template() {
    return /*html*/ `
      <div class="col-12">
      <div class="card m-3">
      <div class="card-body">
      <h5 class="card-title">${this.title}</h5>
      <p class="card-text">Artist: ${this.artist}<br> Collection: ${this.album}<br> price: $${this.price}</p>
      <button class="btn btn-warning add-btn" onclick="app.songsController.addSong('${this._id}')">+</button>
      <button class= "btn-warning" onclick="app.songsController.playSong('${this._id}')">Play</button>
      </div>
      </div>
      </div>`
  }
  get playlistTemplate() {
    return /*html*/`
      <div class="col-12">
      <div class="card m-3">
      <div class="card-body">
      <h5 class="card-title">${this.title}</h5>
      <p class="card-text">Artist: ${this.artist}<br> Collection: ${this.album}<br> price: $${this.price}<br></p>
      <button class= "btn-warning" onclick="app.songsController.playSaved('${this._id}')">Play</button>
      <button class="btn btn-danger" onclick="app.songsController.removeSong('${this._id}')">Delete</button>
      </div>
      </div>
      </div>`
  }

  get nowPlayingTemplate() {
    return /*html*/ `
    <div class="col-12">
    <div class="card m-3">
    <img class="card-img-top" src="${this.albumArt}" alt="Card image cap">
    <div class="card-body">
    <h5 class="card-title">${this.title}</h5>
    <p class="card-text">Artist: ${this.artist}<br> Collection: ${this.album}<br></p>
    <audio id="player" controls autoplay src="${this.preview}"></audio>
    </div>
    </div>
    </div>`
  }
}
