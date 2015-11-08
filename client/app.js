Template.App.helpers({
  searching() {
    return !!Session.get('searching') && !!!Session.get('photos');
  }
});
