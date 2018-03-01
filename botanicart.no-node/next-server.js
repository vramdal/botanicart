// This file doesn't go through babel or webpack transformation.
// Make sure the syntax and sources this file requires are compatible with the current node version you are running
// See https://github.com/zeit/next.js/issues/1245 for discussions on Universal Webpack or universal Babel

// https://github.com/zeit/next.js/#custom-server-and-routing

const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const resolvePage = require ('./PageResolve');

app.prepare().then(() => {
    createServer((req, res) => {


        res.fisk = "torsk";

        // Be sure to pass `true` as the second argument to `url.parse`.
        // This tells it to parse the query portion of the URL.
        const parsedUrl = parse(req.url, true)
        const { pathname, query } = parsedUrl;

        let parts = pathname.substring(1).split("/");
        if (parts.length < 2) { // page
            resolvePage(req).then((pageContent) => {
                console.log("page " + req.url + ": ", pageContent);
                let extendedResponse = Object.assign(res, {resolvedContent: {page: pageContent}});
                app.render(req, extendedResponse, '/default-template', query, {pathname, pageContent});
            });
        } else {
            handle(req, res, parsedUrl);
        }


/*        if (pathname === '/a') {
            app.render(req, res, '/b', query)
        } else if (pathname === '/b') {
            app.render(req, res, '/a', query)
        } else {
            handle(req, res, parsedUrl)
        }*/
    }).listen(3000, err => {
        if (err) throw err
        console.log('> Ready on http://localhost:3000')
    })
})