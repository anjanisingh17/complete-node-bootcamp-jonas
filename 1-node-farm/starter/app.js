const fs = require('fs');
const http = require('http');
var  url = require('url');




console.log(__dirname)

let replaceTemplate = (template,el)=>{

    let output = template.replace(/{%productName%}/g,el.productName);
    output = output.replace(/{%quantity%}/g,el.quantity)
    output = output.replace(/{%price%}/g,el.price)
    output = output.replace(/{%description%}/g,el.description)
    output = output.replace(/{%id%}/g,el.id)
    
    if(el.organic === true){
        isOrganic = ''; 
        organicValalue =  'organic';
    }else{
        isOrganic = 'not-organic';
        organicValalue = ''
    }

    output = output.replace(/{%isOrganic%}/g,isOrganic);     
    output = output.replace(/{%isOrganic_value%}/g,organicValalue);     
         
    
    return output;

}

let overview = fs.readFileSync(`${__dirname}/templates/overview.html`,'utf-8');
// console.log('overview',overview);

let cardshtml = fs.readFileSync(`${__dirname}/templates/cards.html`,'utf-8');
// console.log('overview',cardshtml);

let product_template = fs.readFileSync(`${__dirname}/templates/product.html`,'utf-8');
console.log('overview',product_template);



let Dataobj = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8')

Dataobj = JSON.parse(Dataobj)
const server = http.createServer((req,res)=>{

    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;

    // console.log('pathname >>>>',url_parts);
    // console.log('query >>>>',query);
    
    if(req.url == '/'){ 

      let template_result =  Dataobj.map((el)=>replaceTemplate(cardshtml,el));
        output = template_result.join('');
        output = overview.replace('{%cardshtml%}',output);
        // console.log('Dynamic template result >>>',template_result);
        // res.end('The response');
        // output = overview.replace('{%productName%}','testing');
        res.writeHead(200,{'Content-type':'text/html'})
        res.end(output);
        // console.log("the dta is ", output);        
    }
    else if(url_parts.pathname == '/product'){
           product = Dataobj[query.id];
        // res.end(query.id)

           output = replaceTemplate(product_template,product);
        //    output = output.replace('{%cardshtml%}',product)
            res.end(output)
    }

})                                                                      

server.listen(8080,'127.0.0.1',()=>{
    console.log(`Your app is listening at port 8080`);
})