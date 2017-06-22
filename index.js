//Setup environment variables
require('dotenv').config();

//Create general variables
let ENV = process.env;

let ID = 0;
let MIN = 60000;
let HOUR = 60 * MIN;

let express = require('express');
let app = express();
let http = require('http').Server(app);

let io = require('socket.io')(http);

//Middleware
app.use(express.static(__dirname + '/public'));

//Widget engines
let ClockEngine = require('./src/components/clock/clock-engine.js');
let NewsEngine = require('./src/components/news/news-engine.js');
let RecipeEngine = require('./src/components/recipe/recipe-engine.js');
let RedditEngine = require('./src/components/reddit/reddit-engine.js');
let GifEngine = require('./src/components/gif/gif-engine.js');

//See if a user connects
io.on('connection', function(socket){
  console.log('User: Connected');

  let c1 = new ClockEngine({
    id: ID++,
    updatable: true,
    delta: MIN/2,
    socket: socket
  });
  c1.start();

  let n1 = new NewsEngine({
    id: ID++,
    updatable: true,
    delta: 5*MIN,
    socket: socket
  });
  n1.start();

  let r1 = new RecipeEngine({
    id: ID++,
    updatable: true,
    delta: HOUR/2,
    socket: socket
  });
  r1.start();

  let rd = new RedditEngine({
    id: ID++,
    updatable: true,
    interactive: true,
    delta: 5*MIN,
    socket: socket
  });
  rd.start();

  let gf = new GifEngine({
    id: ID++,
    updatable: true,
    interactive: true,
    delta: 0,
    socket: socket
  });
  gf.start();

  //Save user information on signout
  socket.on('disconnect', function(){
    console.log(`User: Disconnected`);

    c1.stop();
    delete c1;

    n1.stop();
    delete n1;

    r1.stop();
    delete r1;

    rd.stop();
    delete rd;
  });
});

//Start express server
http.listen(ENV.PORT, function(){
  console.log(`App running on port ${ENV.PORT}`);
});
