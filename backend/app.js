//--------------- Required Libraries of the Class -------------
const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const cors = require('cors');
    require('dotenv').config();
var port = process.env.APP_PORT || 8080;
//--------------- Routes of the project -----------------------
const routes = require('./routes/app_routes');

//--------------- BodyParser ----------------------------------
app.use(bodyparser.json());

//--------------- Access Control Allow Origin -----------------
app.use(cors());

app.get('/',function(req,res){
    res.send('App is Running');
});

app.use(routes);
app.use('/api',routes);

//--------------- Server --------------------------------------

app.listen(port);
console.log("Server running in port : " + port);

