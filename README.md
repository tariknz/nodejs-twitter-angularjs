Setup
=====

1. Install NodeJS (if you don't have it)

	nodejs.org

2. Install the required modules in npm

    npm install ntwitter

    npm install socket.io

3. Add your Twitter APP keys in twitter-stream.js here:

    var twit = new twitter({
      consumer_key: '[ENTER CUSUMER KEY]',
      consumer_secret: '[ENTER CUSUMER SECRET KEY]',
      access_token_key: '[ENTER ACCESS TOKEN KEY]',
      access_token_secret: '[ENTER ACCESS TOKEN SECRET KEY]'
    });

Please see link below if you don't know how to get these: https://dev.twitter.com/docs/auth/tokens-devtwittercom

Run
===

If you are using windows, just run the batch file. Else:

### Windows

    node twitter-stream.js

### Linux

    nodejs twitter-stream.js


The default URL should be http://localhost:3000/


Screenshot
==========

![Alt text](http://i.imgur.com/NDxCLlU.png)
