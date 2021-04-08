const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// routes 
app.use('/api/admin', require('./api/admin/admin.route'));
app.use('/api/auth', require('./api/auth/auth.route'));
app.use('/api/request', require('./api/request/request.route'));
app.use('/api/utils', require('./api/utils/utils.route'));

app.listen(process.env.PORT || 3001, () => {
    console.log(`server running...`)
});