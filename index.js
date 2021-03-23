const fs = require("fs");

const {compileFile} = require("handlebars");

let template = compileFile("page.handlebars");

// prepare the output folder