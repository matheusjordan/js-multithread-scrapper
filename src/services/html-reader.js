'use strict';
import fs from 'fs/promises';
import {JSDOM as jsdom} from 'jsdom'

export class HTMLReader {
    /* Q1: método/função que lê o conteúdo HTML de uma URL */
    static async readFromFile(path) {
        try {
            
            return await fs.readFile(path, 'utf8');
        } catch (error) {
            return new Error(error);
        }
    }

    static async readFromURL(url) {
        try {
            const loadedPage = await jsdom.fromURL(url, {
                userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36'
            });

            return loadedPage.serialize()

        } catch (error) {
            return new Error(error);
        }
    }

    /* Q3: método/função que extrai todos os links de uma página HTML */
    static linksExtractor(page) {
        try {
            const html = page;

            /* Q2: expressão regular para identificar links */
            const regex = new RegExp(/href="(https?:\/\/[^"]*)"/g);

            const links = [];

            let match;
            while ((match = regex.exec(html)) !== null) {
                links.push(match[1]);
            }

            return links;

        } catch (error) {
            return new Error(error);
        }
    }
}