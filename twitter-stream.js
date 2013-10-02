var app = require('http').createServer(handler)
  , url = require("url")
  , path = require("path")
  , io = require('socket.io').listen(app)
  , fs = require('fs'), twitter = require('ntwitter')
  , util = require('util');


// Fill this out.
// Please see link below if you don't know how to get these: https://dev.twitter.com/docs/auth/tokens-devtwittercom
var twit = new twitter({
  consumer_key: '[ENTER CUSUMER KEY]',
  consumer_secret: '[ENTER CUSUMER SECRET KEY]',
  access_token_key: '[ENTER ACCESS TOKEN KEY]',
  access_token_secret: '[ENTER ACCESS TOKEN SECRET KEY]'
});


function handler(request, response) {

  var uri = url.parse(request.url).pathname
    , filename = path.join(process.cwd(), uri);

  path.exists(filename, function(exists) {
    if(!exists) {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found\n");
      response.end();
      return;
    }

    if (fs.statSync(filename).isDirectory()) filename += '/index.html';

    fs.readFile(filename, "binary", function(err, file) {
      if(err) {
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
        return;
      }

      response.writeHead(200);
      response.write(file, "binary");
      response.end();
    });
  });
}

app.listen(3000);


// sockets
io.sockets.on('connection', function(socket) {
  console.log('client connected');

  socket.on('getLiveTweets', function(data){
    console.log('client asking for live tweets for' + data.query);

    var options = { 'track' : data.query };
    twit.stream('statuses/filter', options, function(stream) {

        stream.on('data',function(twitdata){
          socket.emit('twitter',twitdata);
        });

        stream.on('end', function (response) {
          // Handle a disconnection
        });

        stream.on('destroy', function (response) {
          // Handle a 'silent' disconnection from Twitter, no end/error event fired
          socket.emit('twitter-done');
        });

        // Disconnect stream after 10 seconds
        setTimeout(stream.destroy, 10000);
    });

  });

  socket.on('getTweetsBySearch', function(data){
    console.log('client asking for searching tweets for' + data.query);
    twit.search(data.query, { count: 100 }, function(err, twitdata) {
      console.log(err);
      socket.emit('twitter-search',twitdata);
      socket.emit('twitter-done');
    });
  });

});

