import { parentPort } from 'node:worker_threads';

parentPort.once('message', (link) => {
    console.log(`Procurando urls no link: ${link}`);

    parentPort.postMessage(link)
})