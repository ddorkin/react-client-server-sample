const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
global.storage = require('./storage');
const handlers = require('./handlers');

require('console-stamp')(console, '[yyyy-mm-dd HH:MM:ss]');

process.on('uncaughtException', function (e) {
    console.log(e.stack || e);
    process.exit(1);
});


const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/init', handlers.init);
app.post('/add', handlers.add);
app.put('/remove', handlers.remove);

app.listen(5000);
console.info("Server started on port 5000")