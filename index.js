const express      = require('express');
const cookieParser = require('cookie-parser');

const API = require('./server/api/index');
const LONG_POLL = require('./server/LongPoll/index');

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use('/', LONG_POLL);
app.use('/api', API);


app.listen(3000);