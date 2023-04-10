import { parentPort } from 'node:worker_threads';
import { RunSearch } from './run-search.js';
import { LinksDatabase as LinksDB } from './links-db.js';

/*Q4 Usar uma tread para ler oa página html e buscar os links */
parentPort.once('message', async ({url, threadId}) => {
    console.log(`Iniciado busca de links na página: ${url}`);
    let links;

    if (LinksDB.links.has(url)) {
        links = LinksDB.links[url];
        console.log('JA TEM');
    } else {
        links = await RunSearch.search(url);
        LinksDB.links.add({ url, links });
    }

    parentPort.postMessage(links);
});