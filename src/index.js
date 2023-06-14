import {run} from "./utils/thread-manager.js";
import {RunSearch} from './services/run-search.js'
import {LinksDatabase} from './services/links-db.js';

const main = async () => {
    run('https://pt.wikipedia.org/wiki/Campina_Grande');
}

main();