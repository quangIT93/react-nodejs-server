const express = require('express');

const cors = require('cors');

const morgan = require('morgan');
// ket noi voi routes
const route = require('./routes');

require('dotenv').config();
//connect Database
const DB = require('./connectDb');
DB.connectDB();

const app = express();
// chuyen doi json
app.use(express.json());
app.use(cors());

// create logger when http request
app.use(morgan('common'));

route(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
