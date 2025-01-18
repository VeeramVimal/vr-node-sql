const PORT = 8080;
const DB_NAME = 'digispoc_task';
const DB_HOST = 'localhost';
const USER_NAME = 'root';
const USER_PASS = 'CroggyTech@admin';

module.exports = {
    port: PORT,
    db: {
        DB_NAME: DB_NAME,
        DB_HOST: DB_HOST,
        DB_PORT: 3306,
        DB_USER_NAME: USER_NAME,
        DB_USER_PASS: USER_PASS,
        DB_DIALECT: 'mysql'
    }
};
