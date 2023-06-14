import {run} from "./utils/thread-manager.js";


const singleMain = async () => {
    run('https://pt.wikipedia.org/wiki/Campina_Grande');
}

import { WorkerPool } from './services/worker-pool.js';
const poolMain = async () => {
    const pool = new WorkerPool(8);
    pool.run('https://pt.wikipedia.org/wiki/Campina_Grande')
}

// singleMain();
poolMain();