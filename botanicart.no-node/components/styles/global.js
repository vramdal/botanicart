import css from 'styled-jsx/css'

//language=CSS
export default css`

    body {
        font-family: Tangerine, Verdana, Tahoma, cursive;
        margin: 0;
        padding: 0;
        text-align: center;
        background: #fbeed5 url('static/whitey-bakgrunn.png') repeat;
    }

    body.frontpage, body.has-article {
        background: url(bilder/caprifol-bakgrunn.png), url(bilder/rognebaer-bakgrunn.png), url(bilder/whitey-bakgrunn.png);
        min-height: 750px;
        background-repeat: no-repeat, no-repeat, repeat;
        background-position: 80% 50px, 20% 100px, left top;
    }

    ul.menu li a, ul.menu li a:visited, .image-frame a {
        color: black;
        text-decoration: none;
    }

    @font-face {
        font-family: 'Tangerine';
        src: url('static/tangerine_regular-webfont.eot');
        src: url('static/tangerine_regular-webfont.eot?#iefix') format('embedded-opentype'),
        url('static/tangerine_regular-webfont.woff') format('woff'),
        url('static/tangerine_regular-webfont.ttf') format('truetype'),
        url('static/tangerine_regular-webfont.svg#tangerineregular') format('svg');
        font-weight: normal;
        font-style: normal;
    }
    
    @font-face {
        font-family: 'Tangerine';
        src: url('static/tangerine_bold-webfont.eot');
        src: url('static/tangerine_bold-webfont.eot?#iefix') format('embedded-opentype'),
        url('static/tangerine_bold-webfont.woff') format('woff'),
        url('static/tangerine_bold-webfont.ttf') format('truetype'),
        url('static/tangerine_bold-webfont.svg#tangerineregular') format('svg');
        font-weight: bold;
        font-style: normal;
    }

    @font-face {
        font-family: 'Aaargh';
        src: url('static/aaargh-webfont.eot');
        src: url('static/aaargh-webfont.eot?#iefix') format('embedded-opentype'),
        url('static/aaargh-webfont.woff') format('woff'),
        url('static/aaargh-webfont.ttf') format('truetype'),
        url('static/aaargh-webfont.svg#aaarghnormal') format('svg');
        font-weight: normal;
        font-style: normal;
    }

    @font-face {
        font-family: 'HarabaraHand';
        src: url('static/harabarahand-webfont.eot');
        src: url('static/harabarahand-webfont.eot?#iefix') format('embedded-opentype'),
        url('static/harabarahand-webfont.woff') format('woff'),
        url('static/harabarahand-webfont.ttf') format('truetype'),
        url('static/harabarahand-webfont.svg#harabarahanditalic') format('svg');
        font-weight: normal;
        font-style: normal;
    }
)
`