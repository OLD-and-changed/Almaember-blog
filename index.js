const fs = require("fs");
const path = require("path");

const {compile} = require("handlebars");
const marked = require("marked");
const fm = require("yaml-front-matter");

let template = compile(fs.readFileSync("page.handlebars").toString());

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

// generate article files

articleContents.forEach(article => {
    let articleDate = article.date;
    let articleText = article.__content;

    let articleUrl = 
        `${articleDate.getFullYear()}/${articleDate.getMonth() + 1}/${path.parse(article.filename).name}.html`;
    let articleHTML = marked(articleText);

    let templateParameters = {
        article: {
            title: article.title,
            content: articleHTML,
            date: `${articleDate.getFullYear()}-${articleDate.getMonth() + 1}-${articleDate.getDay()}`
        }
    };

    let filename = path.join("output", articleUrl);

    fs.mkdirSync(path.dirname(filename), {recursive: true});
    fs.writeFileSync(filename, template(templateParameters));
});

// finish by copying static files

fs.copyFileSync("blog.css", "output/blog.css"); // css file

