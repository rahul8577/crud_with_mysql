const express=require("express");
const fileUpload = require('express-fileupload');
const app = express();

app.use(fileUpload())

app.listen(3000);

app.use(express.json());
app.use(express.urlencoded({extended: true  }));

app.set('view engine','ejs');
app.use(express.static('public'));

const routes=require('./route/route');
app.use(routes);