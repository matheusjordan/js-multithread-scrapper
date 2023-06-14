export class LinksDatabase {
    constructor() {
        if (!LinksDatabase.instance) {
          this.visitedUrls = new Set();
          LinksDatabase.instance = this;
        }
        return LinksDatabase.instance;
      }
    
      addVisitedUrl(url) {
        this.visitedUrls.add(url);
      }
    
      hasVisitedUrl(url) {
        return this.visitedUrls.has(url);
      }
}
