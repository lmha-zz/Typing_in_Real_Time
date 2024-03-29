var express = require('express.io');
var path = require('path');
var app = express().http().io();

app.configure(function() {
    app.use(express.cookieParser());
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.static(__dirname, 'public'));
    app.use(express.session({secret: 'monkey'}));
    app.set('view engine', 'ejs');
});

var route = require('./routes/index.js')(app);
app.listen(6789);