const crypto = require('crypto');
const fs = require('fs');
require('./child_process_module')
const algorithm = 'aes-256-cbc';
 
const key = crypto.randomBytes(32);
 
const iv = crypto.randomBytes(16);
 
function encrypt(text) {
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'),
    encryptedData: encrypted.toString('hex') };
}
 
var encrypted = encrypt("Hello World!");
 
function decrypt(text) {
    let iv = Buffer.from(text.iv, 'hex');
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
 
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
 
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
 
    return decrypted.toString();
}
 
const decrypted = decrypt(encrypted)

console.log("Encrypted Text: " + encrypted.encryptedData);    
console.log("Decrypted Text: " + decrypted);    

console.log(__dirname)


// const fdata = fs.readFile(`${__dirname}/first_testing_file.js`,'utf-8',(err,data)=>{
//     if(data){
//         console.log('data is ',data);  
//     }

// })


myReadFileFunciton(`${__dirname}/first_testing_file.js`).then(result=>console.log(`The result is`,result)).catch(err=>console.log(`The error is`,err));

function myReadFileFunciton(file){
    return new Promise((resolve,reject)=>{
        try{
            let data = fs.readFileSync(file,'utf8');
            resolve(data)
        }catch(err){
            reject(err)
        }
    })
}

