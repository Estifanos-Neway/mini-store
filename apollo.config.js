// apollo.config.js
module.exports = {
    client: {
      service: {
        name: 'mini-store-web',
        // URL to the GraphQL API
        url: 'https://funny-starfish-21.hasura.app/v1/graphql',
      },
      // Files processed by the extension
      includes: [
        'src/**/*.vue',
        'src/**/*.ts',
        'src/**/*.js'
      ],
    },
  }