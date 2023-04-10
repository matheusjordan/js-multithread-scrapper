import { Worker } from 'node:worker_threads';

export const run = (url) => {

    /* Q5 criar uma nova thread para link encontrado */
    const thread = new Worker('./src/services/task.js');
        
    thread.once("message", (links) => {
        console.log(links);
        console.log(`\n\nFinalizado thread de ID ${thread.threadId}\n\n`);
    });

    thread.on("error", err => {
        console.log(`\n\nErro na thread de ID ${thread.threadId}\n\n`);
        console.error(err);
    });

    console.log(`\nCriado thread de ID ${thread.threadId}\n`);
    thread.postMessage({url: url, threadId: thread.threadId});
}