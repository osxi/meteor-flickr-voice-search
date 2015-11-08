(window.waitForSwiper = function() {
  if (Meteor.Swiper) {
    Meteor.Swiper.init();
  } else {
    Meteor.setTimeout(function() {
      waitForSwiper();
    }, 10);
  }
});
