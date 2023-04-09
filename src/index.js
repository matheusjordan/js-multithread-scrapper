'use strict';
import {HTMLReader} from "./services/html-reader.js";
import {UrlIndex} from "./services/url-index.js";
import {run} from "./utils/thread-manager.js";

const main = async () => {

    const url = 'https://pt.wikipedia.org/wiki/Campina_Grande';
    const links = await search(url);

    run(links);

}

const search = async (url) => {
    const page = await HTMLReader.readFromURL(url);
    const links = HTMLReader.linksExtractor(page);

    UrlIndex.indexUrl(url, links);

    console.log(`\n\nPara o link: ${url}\nForam encontrados ${links.length} links.\n\n`);

    return links;
}

main();