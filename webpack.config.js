const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  remotes: {
    "mfeAuth": "http://localhost:4201/remoteEntry.js",
    "mfeCourses": "http://localhost:4202/remoteEntry.js",
    "mfeAdmin": "http://localhost:4203/remoteEntry.js",
    "mfeCompany": "http://localhost:4204/remoteEntry.js",
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
