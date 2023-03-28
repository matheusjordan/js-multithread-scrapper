'use strict';
import fs from 'fs/promises';

export class HTMLReader {
    static async readFromFile(path) {
        try {
            return await fs.readFile(path, 'utf8');
        } catch (error) {
            return new Error();
        }
    }
}