import { Worker } from 'worker_threads';
import { LinksDatabase as LinksDB } from './links-db.js';

let MAX_LEVEL = 3;
const db = new LinksDB();

export class WorkerPool {
  constructor(numWorkers) {
    this.numWorkers = numWorkers;
    this.workerScript = './src/services/task.js';
    this.taskQueue = [];
    this.init();
  }

  init() {
    for (let i = 0; i < this.numWorkers; i++) {
      this.runNextTask();
    }
  }

  async runNextTask() {
    if (this.taskQueue.length > 0) {
      const { url, level } = this.taskQueue.shift();

      const worker = new Worker(this.workerScript);
      
      worker.once('message', links => {
        if (level < MAX_LEVEL) {
          for (let link of links) {
            if (!db.hasVisitedUrl(link)) {
              db.addVisitedUrl(link);
              this.run(link, level + 1);
            }
          }
        }

        worker.terminate();
        this.runNextTask();
      });

      worker.once('error', error => {
        console.log(`\n\nError in thread ID ${worker.threadId}`);
        console.error(error);
      });

      console.log(`Created thread ID ${worker.threadId} at level ${level} for: ${url}`);
      worker.postMessage({url: url});
    } else {
      db.saveVisitedUrlsToFile();
    }
  }

  run(url, level = 0) {
    this.taskQueue.push({ url, level });
    this.runNextTask();
  }
}
