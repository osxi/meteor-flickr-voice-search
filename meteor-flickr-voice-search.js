if (Meteor.isClient) {
  Template.hello.onRendered(() => {
    let commands = {
      'show me *term'(term) {
        console.log('You searched for: ', term);

        Meteor.callPromise('flickrTagSearch', term).then(res => {
          Session.set('photos', res.data.photos.photo);
        }).catch(err => console.log('something went wrong:', err));
      }
    };

    annyang.addCommands(commands);

    annyang.start();
  });

  Template.hello.helpers({
    photos() {
      if (!!!Session.get('photos')) {
        return [];
      }

      return Session.get('photos');
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
      let { apiUrl, apiKey, apiSig, method } = ApiSettings;

      let url = `${apiUrl}/?method=${method}&api_key=${apiKey}&tags=${tag}` +
                `&format=json&nojsoncallback=1`;

      return HTTP.get(url);
    }
  });
}
