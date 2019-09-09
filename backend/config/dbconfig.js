//-----------Importing required library for the class-----------
/*
    This module is designed to get connection to the database.
*/
const pg = require('pg');
require('dotenv').config();

const config = {
    user : process.env.DB_USER,
    database : process.env.DB_DATABASE,
    password : process.env.DB_PASSWORD,
    port : process.env.DB_PORT
};

/*
    A Pool has to be created to connect with the database.
*/
const con = new pg.Pool(config);

module.exports = con;
