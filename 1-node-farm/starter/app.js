const fs = require('fs');
const http = require('http');

console.log(__dirname)

let replaceTemplate = (template,el)=>{

    let output = template.replace(/{%productName%}/g,el.productName);
    output = output.replace(/{%quantity%}/g,el.quantity)
    output = output.replace(/{%price%}/g,el.price)
              
    
    return output;

}

let overview = fs.readFileSync(`${__dirname}/templates/overview.html`,'utf-8');
// console.log('overview',overview);

let cardshtml = fs.readFileSync(`${__dirname}/templates/cards.html`,'utf-8');
console.log('overview',cardshtml);



let Dataobj = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8')

Dataobj = JSON.parse(Dataobj)
const server = http.createServer((req,res)=>{
    
    if(req.url == '/'){ 


      let template_result =  Dataobj.map((el)=>replaceTemplate(cardshtml,el))

        output = template_result.join('')

        output = overview.replace('{%cardshtml%}',output)


        // console.log('Dynamic template result >>>',template_result);
        // res.end('The response');

        // output = overview.replace('{%productName%}','testing');
        res.writeHead(200,{'Content-type':'text/html'})
        res.end(output);
        // console.log("the dta is ", output)
        
    }
    else if(req.url == '/product'){
        res.end('This is product')
    }

})                                                                      

server.listen(8080,'127.0.0.1',()=>{
    console.log(`Your app is listening at port 8080`);
})