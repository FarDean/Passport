const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path =require('path');
const flash = require('connect-flash');
const session = require('express-session')
const indexRouter = require('./routes/index');
const userRouter =require('./routes/users');
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layout/layout');
app.use(express.urlencoded({extended:false}));
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true,useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to mongoose...')
});
app.use(flash());
app.use((req,res,next)=>{
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
})

app.use('/',indexRouter);
app.use('/users', userRouter);
app.use(express.static('public'));


const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>console.log('Connected...'))