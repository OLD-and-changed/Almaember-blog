const fs = require("fs");
const path = require("path");

const {compile} = require("handlebars");
const marked = require("marked");
const fm = require("yaml-front-matter");
const minifier = require("html-minifier");
const CleanCSS = require("clean-css");

function minify(html) {
    return minifier.minify(html, {
        collapseWhitespace: true,
        conservativeCollapse: false,
        decodeEntities: true,
        removeComments: true,
        sortAttributes: true,
        sortClassName: true
    });
}

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
    article.url = `${article.date.getFullYear()}/${article.date.getMonth() + 1}/${path.parse(article.filename).name}.html`;

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

    let articleHTML = marked(articleText);

    let templateParameters = {
        article: {
            title: article.title,
            content: articleHTML,
            date: `${articleDate.getFullYear()}-${articleDate.getMonth() + 1}-${articleDate.getDay()}`
        }
    };

    let filename = path.join("output", article.url);

    fs.mkdirSync(path.dirname(filename), {recursive: true});
    fs.writeFileSync(filename, minify(template(templateParameters)));
});


// generate the article list
let articleListPage = "";

articleContents.forEach(article => {
    articleListPage += `## [${article.title}](/${article.url})\n
*Posted on: ${article.date.getFullYear()}-${article.date.getMonth() + 1}-${article.date.getDay()}*\n\n`;
});

fs.writeFileSync("pages/posts.md", articleListPage);

// also generate pages
let pageFiles = fs.readdirSync("pages")
    .filter( filename => filename.match(/.*\.md/) );
console.log(pageFiles);

let pageContents = pageFiles.map( filename => {
    let articleData = fs.readFileSync(`pages/${filename}`);
    let article = fm.loadFront(articleData);
    article.filename = filename;

    return article;
});

pageContents.forEach(article => {
    let articleText = article.__content;

    let articleUrl = 
        `${path.parse(article.filename).name}.html`;
    let articleHTML = marked(articleText);

    let templateParameters = {
        article: {
            title: article.title,
            content: articleHTML,
        }
    };

    let filename = path.join("output", articleUrl);

    fs.mkdirSync(path.dirname(filename), {recursive: true});
    fs.writeFileSync(filename, minify(template(templateParameters)));
});


// get rid of the temprary posts.md
fs.rmSync("pages/posts.md");


// copy and minify the CSS file
let blogCSS = fs.readFileSync("blog.css");
let cleanCSSOptions = {
    level: 2
};
fs.writeFileSync("output/blog.css", new CleanCSS(cleanCSSOptions).minify(blogCSS).styles);