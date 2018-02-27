const sanityClient = require('@sanity/client');
const client = sanityClient({
    projectId: 'botanicart',
    dataset: 'production',
    token: '', // or leave blank to be anonymous user
    useCdn: true // `false` if you want to ensure fresh data
});