Meteor.methods({
  flickrTagSearch(tag) {
    let { apiUrl, apiKey, method } = ApiSettings;

    let url = `${apiUrl}/?method=${method}&api_key=${apiKey}&tags=${tag}` +
        `&format=json&nojsoncallback=1`;

    return HTTP.get(url);
  }
});
