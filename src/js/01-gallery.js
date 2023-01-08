import { galleryItems } from './gallery-items.js';

import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');
const createGalleryEl = createGallery(galleryItems);
galleryContainer.innerHTML = createGalleryEl;

galleryContainer.addEventListener('click', event => {
  event.preventDefault();

  let gallery = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
  gallery.on('show.simplelightbox', function () {
    console.log(gallery);
  });
});

function createGallery(items) {
  return items
    .map(
      ({ preview, original, description }) =>
        `<a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>`
    )
    .join('');
}

galleryContainer.addEventListener('click', onModalClick);

function onModalClick(event) {
  event.preventDefault();
  if (!event.target.classList.contains('gallery__image')) {
    return;
  }
  window.addEventListener('keydown', event => {
    if (event.code === 'Escape') {
      instance.close();
    }
  });
}
