const http = require('http');

const requestListener = (req, res) => {
    res.setHeader('content-type', 'text/html');
    res.statusCode = 200;

    const { method } = req;

    if (method === 'GET') {
        res.end('<h1>Hello</h1>');
    }

    if (method === 'POST') {
        let body = [];

        req.on('data', (chunk) => {
            body.push(chunk);
        });

        req.on('end', () => {
            body = Buffer.concat(body).toString();
            const { name } = JSON.parse(body);
            res.end(`<h1>Hai, ${name}!</h1>`);
        })
    }

    if (method === 'PUT') {
        res.end('<h1>Bonjour</h1>');
    }

    if (method === 'DELETE') {
        res.end('<h1>Salam</h1>');
    }
};

const server = http.createServer(requestListener);

const port = 3000;
const host = 'localhost';

server.listen(port, host, () => {
    console.log(`Listening on http://${host}:${port}`);
})