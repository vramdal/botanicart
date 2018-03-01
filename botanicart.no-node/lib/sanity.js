var sanityClient = require('@sanity/client');

var configuredClient = sanityClient({
// Find your project ID and dataset in `sanity.json` in your studio project
    projectId: 'n74rrj7w',
    dataset: 'production',
    useCdn: true
    // useCdn == true gives fast, cheap responses using a globally distributed cache.
    // Set this to false if your application require the freshest possible
    // data always (potentially slightly slower and a bit more expensive).
});

module.exports = configuredClient;