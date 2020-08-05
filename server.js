const express = require('express');
const app = express();
const path =require('path')
const indexRouter = require('./routes/index')
const userRouter =require('./routes/users');
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layout/layout');
app.use('/',indexRouter)
app.use('/users', userRouter)
app.use(express.static('public'))


const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>console.log('Connected...'))