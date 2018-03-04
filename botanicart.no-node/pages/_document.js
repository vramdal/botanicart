import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'

//noinspection JSUnusedGlobalSymbols
export default class MyDocument extends Document {
    static getInitialProps({ renderPage }) {
       const { html, head, errorHtml, chunks } = renderPage();
        const styles = flush();
        return { html, head, errorHtml, chunks, styles }
    }

    render() {
        return (
            <html>
            <Head>
                <style>{`body { margin: 0 } /* custom! */`}</style>
            </Head>
            <body className={this.props.__NEXT_DATA__.props.bodyClass}>
            {this.props.customValue}
            <Main />
            <NextScript />
            </body>
            </html>
        )
    }
}