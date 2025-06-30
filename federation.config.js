const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({
  name: 'movie-ticket-host',
  shared: {
    // ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
    ...shareAll({ singleton: true, strictVersion: false, requiredVersion: 'auto' })
  },
  remotes: {
    movieapp: "https://movieapp-mfe.netlify.app/remoteEntry.js",
    ticketapp: "https://ticketapp-mfe.netlify.app/remoteEntry.js"
  },

  skip: [
    'rxjs/ajax',
    'rxjs/fetch',
    'rxjs/testing',
    'rxjs/webSocket',
    // Add further packages you don't need at runtime
  ],

  // Please read our FAQ about sharing libs:
  // https://shorturl.at/jmzH0

  features: {
    // New feature for more performance and avoiding
    // issues with node libs. Comment this out to
    // get the traditional behavior:
    // ignoreUnusedDeps: true
  }
  
});
