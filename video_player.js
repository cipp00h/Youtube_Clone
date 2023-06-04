class VideoPlayer {
  constructor(videoId) {
    this.video = document.getElementById(videoId);
    this.autoplay = document.getElementById("autoPlay");
    // 자동재생 버튼에 이벤트가 발생하면 비디오 loop값을 변경하고
    // Web LocalStorage에 상태 값을 저장한다.
    this.autoplay.addEventListener("change", (event) => {
      this.video.loop = event.target.checked;
      this.saveAutoPlayStatus();
    });
    // 비디오 플레이가 끝나면 자동재생 여부를 체크한다.
    // 자동재생 체크가 된 경우 영상을 처음부터 다시 재생한다.
    this.video.addEventListener("ended", () => {
      if (this.autoplay.checked) {
        this.video.play();
      }
    });
    // 사용자가 볼륨을 조절할때 마다 값을 저장한다.
    this.video.addEventListener("volumechange", () => this.saveVolume());
    // 비디오 플레이 시간을 저장한다.
    this.video.ontimeupdate = () => this.saveCurrentTime();

    // 페이지가 닫히거나 새로고침 되기전에 현재 생태를 저장한다.
    window.addEventListener("beforeunload", () => this.saveState());
    // Web LocalStorage에 저장된 값을 불러온다.
    this.loadState();
  }

  loadState() {
    const autoPlayStatus = localStorage.getItem(
      this.video.id + "AutoPlayStatus"
    );
    const time = localStorage.getItem(this.video.id + "Time");
    const volume = localStorage.getItem(this.video.id + "Volume");

    this.video.currentTime = time ? Number(time) : 0;
    this.video.volume = volume ? Number(volume) : 1;
    this.video.loop = this.autoplay.checked = autoPlayStatus
      ? JSON.parse(autoPlayStatus)
      : false;
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
    this.saveAutoPlayStatus();
  }
}

const player = new VideoPlayer("videoPlayer");
