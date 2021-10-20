// * ---------- Dependencies ----------
const express = require('express');
const morgan = require('morgan');
const app = express();

// * ---------- Routes ----------
const data = require('./routes/data')
const user = require('./routes/user')

// * ---------- Middleware ----------
const auth = require('./middleware/authorization')
const cors = require('./middleware/cors')
const index = require('./middleware/index')
const notFound = require('./middleware/notFound')

app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',index)
app.use('/user',user)
app.use(auth)
app.use('/employee',data)
app.use(notFound)
app.listen(3000, ()=>{
    console.log('Server is running...');
})