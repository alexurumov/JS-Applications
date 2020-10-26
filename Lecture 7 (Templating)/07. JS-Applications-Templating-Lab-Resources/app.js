let handlebars = require('handlebars');

let template = handlebars.compile('I am {{name}}.');
console.log(template({name: 'Gosho'}));