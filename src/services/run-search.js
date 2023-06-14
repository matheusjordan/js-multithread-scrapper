import {HTMLReader} from "../services/html-reader.js";

export class RunSearch {
    static async search(url, maxLinks = 3) {
        const page = await HTMLReader.readFromURL(url);
        const links = HTMLReader.linksExtractor(page);
        const domain = this.getDomain(url);

        let filteredLinks = links.filter(l => !l.includes(domain))

        if (filteredLinks.length > maxLinks) {
            filteredLinks = filteredLinks.slice(0, maxLinks);
        }

        return filteredLinks;
    }

    /* Tratamento para não entrar no mesmo domínio */
    static getDomain(url) {
        const domainRegex = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/im;
        const match = url.match(domainRegex);
        let domain = null;

        if (match && match[1]) {
            const secondMatch = match[1].split('.');

            if (secondMatch.length > 2) {
                domain = secondMatch[1];
            } else if (secondMatch.length > 1) {
                domain = secondMatch[0];
            } else {
                domain = match[1];
            }
        }
        return domain;
      }
}