const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify')

const replaceTemplate = require('./modules/replaceTemplate.js');

///////// server /////////

const tempOverview = fs.readFileSync(`${__dirname}/templates/overview.html`,'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/product.html`,'utf-8');


const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {

  const { query, pathname} = url.parse(req.url, true);
  
  // Overview page //
  if(pathname === '/' || pathname === '/overview'){
    res.writeHead(200, {'Content-type': 'text/html'});

    const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
    const output = tempOverview.replace('{%PRODUCT_CARD%}', cardsHtml);

    res.end(output)
  
  // Product page //
  }else if(pathname === '/product'){
    res.writeHead(200, {'Content-type': 'text/html'});
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output)
  
  // API //
  }else if (pathname === '/api'){
      res.writeHead(200, {'Content-type': 'application/json'});
      res.end(data);
  
  // Not found //
    }else{
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-header': 'YALLA MACCABI'

    })
    res.end('<h1>PAGE NOT FOUND!</h1>')
  }
  
});

server.listen(8000, '127.0.0.1', () =>{
    console.log('Listen on port 8000');
    
} )









///////////////////////////////////
///// files

// const readIn = fs.readFileSync('./txt/input.txt', 'utf-8')
// console.log(readIn);

// const readOut = `this what i now about avokado ${readIn}`;
// fs.writeFileSync('./txt/output.txt', readOut);
// console.log('file wirtten');
