Template.body.helpers({
  term() {
    return Session.get('term') || `Say "show me <whatever>"`;
  }
});
