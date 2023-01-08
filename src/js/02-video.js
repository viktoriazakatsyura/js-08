import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'videoplayer-current-time';
const iframe = document.querySelector('#vimeo-player');

const player = new Vimeo.Player(iframe);

setVideoTime();

player.on('timeupdate', throttle(saveTimeVideo, 1000, { leading: false }));

function saveTimeVideo(info) {
  localStorage.setItem(STORAGE_KEY, info.seconds);
}

function setVideoTime() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    return;
  }
  player.setCurrentTime(localStorage.getItem(STORAGE_KEY));
}
