const fs = require("fs");

const {compile} = require("handlebars");
const marked = require("marked");
const fm = require("yaml-front-matter");

let template = compile(fs.readFileSync("page.handlebars").toString());

// prepare the output folder
fs.rmdirSync("output", {recursive: true, force: true});
fs.mkdirSync("output");

// get a list of article files (*.md)

let articleFiles = fs.readdirSync("articles")
    .filter( filename => filename.match(/.*\.md/) );
console.log(articleFiles);

// read article files
let articleContents = articleFiles.map( filename => {
    let articleData = fs.readFileSync(`articles/${filename}`);
    let article = fm.loadFront(articleData);
    article.filename = filename;

    return article;
});

// process articles

articleContents.sort((a, b) => {
    let dateA = a.date; //Date.parse(a.attributes.date);
    let dateB = b.date; //Date.parse(b.attributes.date);

    if (dateA < dateB) {
      return -1;
    }
    if (dateB < dateA) {
      return 1;
    }
    // a must be equal to b
    return 0;
}).reverse();
