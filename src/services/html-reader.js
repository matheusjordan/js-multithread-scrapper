'use strict';
import fs from 'fs/promises';
import {JSDOM as jsdom} from 'jsdom'

export class HTMLReader {
    static async readFromFile(path) {
        try {
            return await fs.readFile(path, 'utf8');
        } catch (error) {
            return new Error(error);
        }
    }

    static async linksExtractor(page) {
        // const dom = (await jsdom.fromFile(page))
        try {
            // const page = dom.window;
            // const html = page.body.innerHTML;
            const html = page;

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