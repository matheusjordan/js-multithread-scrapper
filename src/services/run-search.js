import {HTMLReader} from "../services/html-reader.js";
import {UrlIndex} from "../services/url-index.js";

export class RunSearch {
    static async search(url) {
        const page = await HTMLReader.readFromURL(url);
        const links = HTMLReader.linksExtractor(page);

        UrlIndex.indexUrl(url, links);

        console.log(`\n\nPara o link: ${url}\nForam encontrados ${links.length} links.\n\n`);
        return links;
    }
}