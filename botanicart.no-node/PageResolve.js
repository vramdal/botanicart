const sanity = require('./lib/sanity');

const { parse } = require('url');

const pageQuery = `*[_type=="side" && slug.current == $slug][0] {'slug': slug.current, tittel, sidetype, tekst[]{..., 'bilder': bilder[]->{...}}}`;

async function resolvePage(req) {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    let slug = /\/(.*)/.exec(pathname)[1];

    //sanity.listen(pageQuery, {slug}).subscribe(page => console.log("page updated = ", page));

    return await sanity.fetch(pageQuery, {slug});

}

module.exports = resolvePage;
