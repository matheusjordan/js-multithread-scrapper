'use strict';
import {HTMLReader} from "./services/html-reader.js";
import {UrlIndex} from "./services/url-index.js";

const main = async () => {
    // const page = await HTMLReader.read('./tests/campina-grande-example.html');

    const url = 'https://pt.wikipedia.org/wiki/Campina_Grande';
    const links = await search(url);
}

const search = async (url) => {
    const page = await HTMLReader.readFromURL(url);
    const links = HTMLReader.linksExtractor(page);
    // const wikiLinks = HTMLReader.wikipediaLinksFinder(links);

    UrlIndex.indexUrl(url, links);

    console.log(`Para o link: ${url}\nForam encontrados ${links.length} links.\n\n`);


    return links;
}

main();