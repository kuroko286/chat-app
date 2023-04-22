const mongoose = require("mongoose");
const DATABASE_URI = process.env.DATABASE_URI;

const connection = mongoose.createConnection(DATABASE_URI);

module.exports = connection;
