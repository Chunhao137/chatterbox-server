/* Import node's http module: */
var express = require('express');
//var _ = require('underscore');
var cors = require('cors')
//var handleRequest = require('./request-handler.js').handler;
var port = 3000;
var app = express();

var storage =[]; 


/* Every server needs to listen on a port with a unique number. The
 * standard port for HTTP servers is port 80, but that port is
 * normally already claimed by another server and/or not accessible
 * so we'll use a higher port number that is not likely to be taken: */

/* For now, since you're running this server on your local machine,
 * we'll have it listen on the IP address 127.0.0.1, which is a
 * special address that always refers to localhost. */
var ip = "127.0.0.1";


// var addHeaders = function(req,res,next){
// 	//attach headers to res
// 	next();

// app.all('*',function(req,res){
// 	 res.setHeader('Content-Type','application/json');
//      res.setHeader('Access-Control-Allow-Origin','*');
//      next()
// })
app.use(cors());
// }

app.get('/classes/messages', function(req,res){
	   var obj = JSON.stringify({
        "results": storage
    });

    res.end(obj);

});

app.post('/classes/messages',function(req,res){
	  //res.send(200)
	
	   req.on('data',function(data){
	   	console.log(data.toString())
       storage.push(JSON.parse(data)) 
     });
	 

});

app.options('*', function(req,res){
	   res.send(200);
})

/* We use node's http module to create a server. Note, we called it 'server', but
we could have called it anything (myServer, blahblah, etc.). The function we pass it (handleRequest)
will, unsurprisingly, handle all incoming requests. (ps: 'handleRequest' is in the 'request-handler' file).
Lastly, we tell the server we made to listen on the given port and IP. */
//http.createServer(app).listen(port);
app.listen(port)
console.log("Listening on http://" + ip + ":" + port);


/* To start this server, run:
     node basic-server.js
 *  on the command line.

 * To connect to the server, load http://127.0.0.1:8080 in your web
 * browser.

 * server.listen() will continue running as long as there is the
 * possibility of serving more requests. To stop your server, hit
 * Ctrl-C on the command line. */
