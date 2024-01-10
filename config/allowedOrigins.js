//The list of allowed origins we have put in seperate file because we are going to use it in middleware also but we want to update it in only one place so we have allowedOrigins formerly called whiteList
const allowedOrigins = [
    'https://www.google.com',
    'http://127.0.0.1:5500',
    'http://localhost:3500'
];

module.exports = allowedOrigins;