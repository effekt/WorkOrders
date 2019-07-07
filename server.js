const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const config = require('./core/config.json');
const cors = require('cors');
const morgan = require('morgan');
global.config = Object.assign(process.env.ENV || config.development);
global.config['root'] = __dirname;
global.util = require('./core/util');
require('dotenv').config({ path: '../.env' })

const mongoConnectionString = process.env.MONGO_CONN || "mongodb://localhost:27017/workorders";
mongoose.connect(mongoConnectionString, { useNewUrlParser: true, useFindAndModify: false }, err => {
    console.log(err ? 'Could not connect to MongoDB' : 'Successfully connected to MongoDB');
    require('./core/init')();
});

/**
 * Configure app CORS, BodyParser, Morgan
 */
app.use(cors());
app.use(morgan('short'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}) );

/**
 * Route configuration in ./server/api/index
 */
require('./api')(app);

/**
 * Begin listening for requests
 */
const port = process.env.PORT || global.config.port;
app.listen(port, () => console.log(`Listening on port ${global.config.port}`));