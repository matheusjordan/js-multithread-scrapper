import { Worker } from 'node:worker_threads';
import { LinksDatabase as LinksDB } from '../services/links-db.js';

let MAX_LEVEL = 3;
const db = new LinksDB();

export const run = async (url, level = 0) => {
    db.addVisitedUrl(url);
    const thread = new Worker('./src/services/task.js');
    
    thread.once("message", (links) => {


        /* Q7: Limitar a quantidade de níveis que o seu crawler */
        if (level < MAX_LEVEL) {
            for (let link of links) {


                /* Q6: Usar uma estrutura de dados (set) para evitar visitar uma mesma URL mais de uma vez */
                if (!db.hasVisitedUrl(link)) {

                    /* Q5: criar uma nova thread para link encontrado */
                    run(link, level + 1);
                }
            }
        }
        level++;
    });

    thread.on("error", err => {
        console.log(`\n\nErro na thread de ID ${thread.threadId}`);
        console.error(err);
    });

    console.log(`Criado thread de ID ${thread.threadId} no nível ${level} para: ${url}`);
    thread.postMessage({url: url});
}