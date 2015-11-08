if (Meteor.isClient) {
  Template.body.helpers({
    term() {
      return Session.get('term') || 'meteor-flicker-voice-search';
    }
  });

  Template.App.helpers({
    searching() {
      return !!Session.get('searching') && !!!Session.get('photos');
    }
  });

  Template.Photos.onRendered(() => {
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
}

if (Meteor.isServer) {
  GlobalAssets = Assets;

  ApiSettings = {
    apiUrl: 'https://api.flickr.com/services/rest',
    apiKey: process.env.FLICKR_API_KEY,
    method: 'flickr.photos.search'
  };

  Meteor.methods({
    flickrTagSearch(tag) {
      let { apiUrl, apiKey, method } = ApiSettings;

      let url = `${apiUrl}/?method=${method}&api_key=${apiKey}&tags=${tag}` +
                `&format=json&nojsoncallback=1`;

      return HTTP.get(url);
    }
  });
}
