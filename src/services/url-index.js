export class UrlIndex {
    static links = new Map();

    static indexUrl(url, data) {

        const alreadyIndexed = this.links.has(url);

        if (!alreadyIndexed && data) {
            this.links.set(url, data);
        }
    }

    static getIndexedUrls(url) {
        let links;
        if (url) {
            links = this.links.get(url);
        } else {
            links = this.links.keys();
        }

        return links;
    }
}