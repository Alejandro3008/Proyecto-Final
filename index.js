const express = require('express');
const app = express();

app.get('/' ,(req,resp,next) =>{
    resp.status(404);
    resp.send('Bienvenido');
})

app.listen(3000, ()=>{
    console.log('Server is running...');
})