const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
dotenv.config({ path: path.join(__dirname, '.public.env') });

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const hbs = require('hbs');
const mongoose = require('mongoose');
const logger = require('morgan');

const session = require("express-session");
const MongoStore = require('connect-mongo')(session);
const flash = require("connect-flash");

hbs.registerPartials(path.join(__dirname, '/views/partials'));

mongoose
  .connect(`${process.env.DBURL}`, { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));


hbs.registerHelper('ifUndefined', (value, options) => {
  if (arguments.length < 2)
    throw new Error("Handlebars Helper ifUndefined needs 1 parameter");
  if (typeof value !== undefined) {
    return options.inverse(this);
  } else {
    return options.fn(this);
  }
});


// default value for title local
app.locals.title = 'B!RRA';


// Enable authentication using session + passport
app.use(session({
  secret: 'irongenerator',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))
app.use(flash());
require('./passport')(app);

app.use((req, res, next) => {
  res.locals.user = req.user;
  if(req.user !== undefined && req.user.usertype === "admin") {
    res.locals.admin = true;
    console.log(res.locals.admin);
  }
  next();
})

const index = require('./routes/index');
app.use('/', index);

const authRoutes = require('./routes/auth');
app.use('/', authRoutes);

const profileRoutes = require('./routes/profile');
app.use('/profile', profileRoutes);

const relationRoutes = require('./routes/relations');
app.use('/profile', relationRoutes);

const discoverRoutes = require('./routes/discover');
app.use('/discover', discoverRoutes);

const adminRoutes = require('./routes/admin');
app.use('/admin', adminRoutes);


module.exports = app;
