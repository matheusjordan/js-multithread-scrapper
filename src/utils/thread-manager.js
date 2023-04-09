import { Worker } from 'node:worker_threads';

export const run = (links) => {

    /* Q5 criar uma nova thread para link encontrado */
    for (let link of links) {
        const thread = new Worker('./src/services/task.js');

        thread.once("message", (link) => {
            
            thread.postMessage(true)
            console.log(`\n\nFinalizado thread de ID ${thread.threadId}\n\n`);
        });

        thread.on("error", err => {
            console.log(`\n\nErro na thread de ID ${thread.threadId}\n\n`);
            console.error(err);
        });

        console.log(`\nCriado thread de ID ${thread.threadId} para o link: ${link}\n`);
        thread.postMessage({url: process.env?.LINK, threadId: thread.threadId});

    } 
}