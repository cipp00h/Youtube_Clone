class VideoPlayer {
  constructor(videoId) {
    this.video = document.getElementById(videoId);

    const time = localStorage.getItem(videoId + "Time");
    const volume = localStorage.getItem(videoId + "Volume");
    window.beforeunload = () => this.saveState();

    if (time) {
      this.video.currentTime = Number(time);
    }
    if (volume) {
      this.video.volume = Number(volume);
    }

    this.video.ontimeupdate = () => this.saveCurrentTime();
  }

  saveCurrentTime() {
    localStorage.setItem(this.video.id + "Time", this.video.currentTime);
  }

  saveVolume() {
    localStorage.setItem(this.video.id + "Volume", this.video.volume);
  }

  saveState() {
    this.saveCurrentTime();
    this.saveVolume();
  }
}

const player = new VideoPlayer("vo1");
