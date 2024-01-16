const jwt = require('jsonwebtoken')

const acces_token = jwt.sign({id: 1}, 'ini_secret')

const resultToken = jwt.verify(acces_token,'ini_secret') 

console.log({resultToken});

console.log(acces_token);


//testing