const http = require('http');

const requestListener = (req, res) => {
    res.setHeader('content-type', 'text/html');

    res.statusCode = 200;
    res.end('<h1>Hello World!</h1>');
};

const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';

server.listen(port, host, () => {
    console.log(`Listening on http://${host}:${port}`);
})