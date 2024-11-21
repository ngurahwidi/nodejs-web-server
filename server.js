const http = require('http');

const requestListener = (req, res) => {
    res.setHeader('content-type', 'application/json');
    res.setHeader('Powered-By', 'Node.js')

    const { method, url } = req;

    if (url === '/') {
        if (method === 'GET') {
            res.statusCode = 200;
            res.end(JSON.stringify({
                message: 'Ini adalah homepage'
            }));
        } else {
            res.statusCode = 400;
            res.end(JSON.stringify({
                message: `Halaman ini tidak dapat diakses dengan ${method} request`
            }));
        }
    } else if (url === '/about') {
        if (method === 'GET') {
            res.statusCode = 200;
            res.end(JSON.stringify({
                message: 'Ini adalah about page'
            }));
        } else if (method === 'POST') {
            let body = [];

            req.on('data', (chunk) => {
                body.push(chunk);
            });

            req.on('end', () => {
                body = Buffer.concat(body).toString();
                const { name } = JSON.parse(body);
                res.statusCode = 200;
                res.end(JSON.stringify({
                    message: `Halo, ${name}, ini adalah halaman about!`
                }));
            })
        } else {
            res.statusCode = 400;
            res.end(JSON.stringify({
                message: `Halaman tidak dapat diakses dengan ${method} request!`
            }));
        }

    } else {
        res.statusCode = 404;
        res.end(JSON.stringify({
            message: 'Halaman tidak ditemukan',
        }))
    }
};

const server = http.createServer(requestListener);

const port = 3000;
const host = 'localhost';

server.listen(port, host, () => {
    console.log(`Listening on http://${host}:${port}`);
})