import { Worker } from 'node:worker_threads';
import {LinksDatabase} from '../services/links-db.js';

let MAX_LEVEL = 3;
let COUNT_LINKS = 0;


export const run = async (url) => {
    let level = 0;

    /* Q5 criar uma nova thread para link encontrado */
    const thread = new Worker('./src/services/task.js');
        
    thread.once("message", (links) => {
        if (level < MAX_LEVEL) {
            for (let link of links) {
                COUNT_LINKS++;

                if (COUNT_LINKS < 5) {
                    run(link);
                }
            }
            level++;
        } else  {
            COUNT_LINKS = 0;
        }
        console.log(`Finalizado thread de ID ${thread.threadId} no nível ${level}`);
    });

    thread.on("error", err => {
        console.log(`\n\nErro na thread de ID ${thread.threadId}`);
        console.error(err);
    });

    console.log(`\nCriado thread de ID ${thread.threadId}`);
    thread.postMessage({url: url, threadId: thread.threadId});
}