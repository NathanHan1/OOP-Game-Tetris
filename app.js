var express = require('express');
var app = express();


app.use(express.static('./www'));


app.listen(9100, function(err) {
    console.log('成功');
});