const express = require("express");
const cors = require("cors");
const config = require("./config/config");
const routes = require("./routes");
require('./cron/user.cron');

const app = express();

app.use(cors());
app.options('*', cors);

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use('/api/v1', routes);
app.get((req, res, next) => {
    next( new Error("Not Found"));
});

module.exports = app;