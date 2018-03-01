const sanity = require('./lib/sanity');

const { parse } = require('url');

const pageQuery = `*[_type=="side" && slug.current == $slug] {
    'slug': slug.current, tittel, tekst
}`;

async function resolvePage(req) {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    let slug = /\/(.*)/.exec(pathname)[1];

    return await sanity.fetch(pageQuery, {slug});
}

module.exports = resolvePage;
