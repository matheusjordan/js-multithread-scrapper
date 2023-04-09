import {HTMLReader} from '../services/html-reader.js'
import {UrlIndex} from "../services/url-index.js";
import {parentPort} from 'node:worker_threads';

/*Q4 Usar uma tread para ler oa página html e buscar os links */
parentPort.once('message', async (link) => {
    console.log(`Iniciado busca de links na página: ${link}`);

    const links = await search(link)

    parentPort.postMessage(links)
});

const search = async (url) => {
    const page = await HTMLReader.readFromURL(url);
    const links = HTMLReader.linksExtractor(page);

    UrlIndex.indexUrl(url, links);

    console.log(`\n\nPara o link: ${url}\nForam encontrados ${links.length} links.\n\n`);
}