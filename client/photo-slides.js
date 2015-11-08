Template.PhotoSlides.onRendered(() => {
  if (!!window.galleryTop && !!window.galleryThumbs) {
    galleryTop.update(true);
    galleryThumbs.update(true);
  }
});
