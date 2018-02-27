// @flow

const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(3000, () => console.log('Example app listening on port 3000!'));

const sanityClient = require('@sanity/client');
const client = sanityClient({
    projectId: 'n74rrj7w',
    dataset: 'production',
    token: '', // or leave blank to be anonymous user
    useCdn: true // `false` if you want to ensure fresh data
});

// *[_type == "meny" && navn == 'Hovedmeny'] {'sider': menypunkter[]->{tittel, 'slug': slug.current, _id, menypunkttekst}}


const menyQuery = '*[_type == "meny" && navn == \'Hovedmeny\'] {\'sider\': menypunkter[]->{tittel, \'slug\': slug.current, _id, menypunkttekst}}';

client.fetch(menyQuery).then(sider => sider.forEach(side => {
    console.log(side);
}));
