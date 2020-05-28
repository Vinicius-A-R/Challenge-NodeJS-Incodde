const express = require('express');
const routes = require('./routes');
const path = require('path');
const cors = require('cors');

const host = 'http://localhost:';
const port = 5000;
const portDB = 27017;

const app = express();

//local database
const mongoose = require('mongoose');
const uri = `mongodb://localhost:${portDB}/?readPreference=primary&appname=MongoDB%20Compass&ssl=false`;

// error when connect mongodb atlas
// const uri = `mongodb+srv://v-coyote:<Test@123>@v-coyote-apjsd.gcp.mongodb.net/test?retryWrites=true&w=majority`;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

app.use(cors());
routes.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend/')));
app.use(routes);

app.listen(port, () => {
  console.log(`Access server: ${host}${port}/index.html`);
});
