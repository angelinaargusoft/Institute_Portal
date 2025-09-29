const express = require('express');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors');

const userApi = require('./features/user/userApi');
const instituteApi = require('./features/institute/instituteApi');
const addressApi = require('./features/address/addressApi');
const userProfileApi = require('./features/userProfiles/userProfileApi');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userApi);
app.use('/api/institutes', instituteApi);
app.use('/api/addresses', addressApi);
app.use('/api/userProfiles', userProfileApi);

app.use(errorHandler);

module.exports = app;