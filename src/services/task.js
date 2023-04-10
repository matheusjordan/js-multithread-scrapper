import { parentPort } from 'node:worker_threads';
import { RunSearch } from './run-search.js'

/*Q4 Usar uma tread para ler oa página html e buscar os links */
parentPort.once('message', async ({url, threadId}) => {
    console.log(`Iniciado busca de links na página: ${url}`);

    const links = await RunSearch.search(url);

    parentPort.postMessage(links)
});