import {run} from "./utils/thread-manager.js";

const url = process.argv[2];
if (!url) {
  console.error('Please set an url as argument of this comand');
  process.exit(1);
}

const singleMain = async () => {
    run(url);
}

import { WorkerPool } from './services/worker-pool.js';
const poolMain = async () => {
    const pool = new WorkerPool(8);
    pool.run(url);
}

// singleMain();
poolMain();