class VideoPlayer {
  constructor(videoId) {
    this.video = document.getElementById(videoId);
    this.autoplay = document.getElementById("autoPlay");
    // 자동재생 버튼에 이벤트가 발생하면 비디오 loop값을 변경하고
    // Web LocalStorage에 상태 값을 저장한다.
    this.autoplay.addEventListener("change", (event) => {
      if (event.target.checked) {
        this.video.loop = true;
      } else {
        this.video.loop = false;
      }
      this.saveAutoPlayStatus();
    });
    // 비디오 플레이가 끝나면 자동재생 여부를 체크한다.
    // 자동재생 체크가 된 경우 영상을 처음부터 다시 재생한다.
    this.video.addEventListener("ended", () => {
      if (this.autoplay.checked) {
        this.video.play();
      }
    });

    const autoPlayStatus = localStorage.getItem(videoId + "AutoPlayStatus");
    const time = localStorage.getItem(videoId + "Time");
    const volume = localStorage.getItem(videoId + "Volume");
    // 페이지가 닫히거나 새로고침 되기전에 현재 생태를 저장한다.
    window.beforeunload = () => this.saveState();

    if (time) {
      this.video.currentTime = Number(time);
    }
    if (volume) {
      this.video.volume = Number(volume);
    }
    if (autoPlayStatus) {
      this.video.loop = JSON.parse(autoPlayStatus);
      this.autoplay.checked = JSON.parse(autoPlayStatus);
    }

    this.video.ontimeupdate = () => this.saveCurrentTime();
    this.video.loop = () => this.saveAutoPlayStatus();
  }

  saveCurrentTime() {
    localStorage.setItem(this.video.id + "Time", this.video.currentTime);
  }

  saveVolume() {
    localStorage.setItem(this.video.id + "Volume", this.video.volume);
  }
  saveAutoPlayStatus() {
    localStorage.setItem(this.video.id + "AutoPlayStatus", this.video.loop);
  }

  saveState() {
    this.saveCurrentTime();
    this.saveVolume();
    this.saveAutoPlayStatus();
  }
}

const player = new VideoPlayer("vo1");
