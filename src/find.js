import fs from 'fs';

/* Q10: Permitir fazer buscas nas páginas descobertas */
const searchTerm = process.argv[2];
if (!searchTerm) {
  console.error('Please set an search term like "anysitename" as argument of this comand.');
  process.exit(1);
}

const filePath = 'src/db/visitedUrls.json';
if (!fs.existsSync(filePath)) {
  console.error(`The file ${filePath} not found.`);
  process.exit(1);
}
const jsonData = fs.readFileSync(filePath, 'utf8');
const urlArray = JSON.parse(jsonData);

const matchingUrls = urlArray.filter(url => url.includes(searchTerm));

if (matchingUrls.length > 0) {
  console.log('Matched URLs:');
  matchingUrls.forEach(url => console.log(url));
  console.log('\n')
} else {
  console.log('Term not found in URLs list');
}
