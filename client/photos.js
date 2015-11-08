Template.Photos.onRendered(() => {
  galleryTop = new Swiper('.gallery-top', {
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    spaceBetween: 10,
  });

  galleryThumbs = new Swiper('.gallery-thumbs', {
    spaceBetween: 10,
    centeredSlides: true,
    slidesPerView: 'auto',
    touchRatio: 0.2,
    slideToClickedSlide: true
  });

  galleryTop.params.control = galleryThumbs;

  galleryThumbs.params.control = galleryTop;

  let commands = {
    'show me *term'(term) {
      Session.set({
        term: term,
        photos: null,
        searching: true
      });

      Meteor.callPromise('flickrTagSearch', term)
        .then(res => Session.set('photos', res.data.photos.photo))
        .catch(err => console.log('something went wrong:', err));
    }
  };

  annyang.addCommands(commands);

  annyang.start();
});

Template.Photos.helpers({
  photos() {
    return Session.get('photos') || [];
  }
});
