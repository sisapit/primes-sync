var http = require('http'); var url = require('url');

http.createServer(function handler(req, res) {

    // -- Event "request" handler

    // Emitted each time there is a request. Note that there may be multiple requests per connection (in the case 
    // of keep-alive connections). request is an instance of http.IncomingMessage and response is an instance of 
    // http.ServerResponse.

    var q = url.parse(req.url, true);
    var max = q.query.max;
    if (! max) {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end("Argument 'max' not found!");
    } else {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        var primes = 0;
        for (var candidate = 2; candidate < max; candidate++) {
            var isPrime = true;
            for (var c = 2; c < candidate; ++c) {
                if (candidate % c === 0) {
                    isPrime = false;
                    break;
                }
            }
            if (isPrime) {
                primes++;
            }
        }
        res.end(primes + " primes found between 0 and " + max);
    }
}).listen(8080, '127.0.0.1', function() {

    // -- Event "listening" handler

    console.log('Server listening on 127.0.0.1:8080...');

    console.log('Example 1: http://127.0.0.1:8080');
    console.log('Example 2: http://127.0.0.1:8080?max=100');
    console.log('Example 3: http://127.0.0.1:8080?max=10000');
    console.log('Example 4: http://127.0.0.1:8080?max=1000000');
    console.log('Example 5: http://127.0.0.1:8080?max=100');
    console.log('Example 6: http://127.0.0.1:8080?max=100');
    console.log('Example 7: http://127.0.0.1:8080?max=100');
});

console.log('Starting server...');
