const config = require("./config/config");
const app = require('./app');
const db = require('./config/db');
let server;

db.sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        server = app.listen(config.port, () => {
            console.log(`Listening to port ${config.port}`);
        });
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
});

