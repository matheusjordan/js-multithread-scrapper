import { Worker } from 'node:worker_threads';

const pool = new Array(4);
const allWorkers = new Array();

export const run = (links) => {
    for (let link of links) {
        const thread = createThread(link);

        thread.once("message", (link) => {
            
        });
        thread.on("error", err => console.error(error));

        thread.postMessage(link);
        console.log(`Criado thread de ID ${thread.threadId} para o link "${link}"`)
    } 
    
}

const createThread = (link) => {
    const thread = new Worker('./src/services/task.js', {env: { LINK: link }});
    return thread;
}