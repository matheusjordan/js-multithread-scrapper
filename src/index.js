'use strict';
import {HTMLReader} from "./services/html-reader.js";

const main = async () => {
    const page = await HTMLReader.readFromFile('./tests/campina-grande-example.html');
}

main();