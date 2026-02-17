const { loadEnvFile } = require('node:process');
loadEnvFile();

const MONGODB_URI = process.env.MONGODB_URI;
const LOCAL_MONGODB_URI = process.env.LOCAL_MONGODB_URI;
  
const PORT = process.env.PORT;

module.exports = { MONGODB_URI, PORT, LOCAL_MONGODB_URI }