import fs from 'fs';

export class LinksDatabase {
  constructor() {
    if (!LinksDatabase.instance) {
      this.visitedUrls = new Set();
      LinksDatabase.instance = this;
      this.loadVisitedUrlsFromFile('src/db/visitedUrls.json');
    }
    return LinksDatabase.instance;
  }
    
  addVisitedUrl(url) {
    this.visitedUrls.add(url);
  }

  hasVisitedUrl(url) {
    return this.visitedUrls.has(url);
  }

  saveVisitedUrlsToFile() {
    const jsonData = JSON.stringify(Array.from(this.visitedUrls));
    fs.writeFileSync('src/db/visitedUrls.json', jsonData, 'utf8');
  }

  loadVisitedUrlsFromFile(filePath) {
    if (fs.existsSync(filePath)) {
      const jsonData = fs.readFileSync(filePath, 'utf8');
      const urlArray = JSON.parse(jsonData);
      this.visitedUrls = new Set(urlArray);
    }
  }
}
