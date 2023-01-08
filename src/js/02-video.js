import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

// const STORAGE_KEY = 'videoplayer-current-time';
const iframe = document.querySelector('iframe');

const player = new Player(iframe);

// setVideoTime();

player.on('timeupdate', throttle(setVideoTime, 1000));

function setVideoTime({ seconds }) {
  localStorage.setItem('videoplayer-current-time(|)', seconds);
}
player.setCurrentTime(localStorage.getItem('videoplayer-current-time(|)') || 0);

// function setVideoTime() {
//   if (!localStorage.getItem(STORAGE_KEY)) {
//     return;
//   }

// }
