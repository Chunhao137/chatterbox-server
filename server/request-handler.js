var storage = [];
var messageStorage = [];

var handleRequest = function(request, response) {
  /* the 'request' argument comes from nodes http module. It includes info about the
  request - such as what URL the browser is requesting. */

  /* Documentation for both request and response can be found at
   * http://nodemanual.org/0.8.14/nodejs_ref_guide/http.html */

  console.log("Serving request type " + request.method + " for url " + request.url);

  var statusCode = 200;

  /* Without this line, this server wouldn't work. See the note
   * below about CORS. */
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "text/plain";

  if(request.url === '/classes/messages'){
    messages(request,response,headers);
  }

  if(request.url.match(/\/classes\/room[0-9]*\/?/)){
    room(request,response,headers);
  }else{

    statusCode = 200;
    /* .writeHead() tells our server what HTTP status code to send back */
    response.writeHead(statusCode, headers);

    /* Make sure to always call response.end() - Node will not send
     * anything back to the client until you do. The string you pass to
     * response.end() will be the body of the response - i.e. what shows
     * up in the browser.*/

    response.end("Request failed");
  }
};


var messages = function(request,response,headers){

  if(request.method === "GET"){
    response.writeHead(200,headers);
    var obj = JSON.stringify({
        "results": messageStorage
    });

    response.end(obj);
  }
  if(request.method === "POST"){
     var tempStore = "";
     request.on('data',function(data){
       tempStore += data; 
     });
     request.on('end',function(){
        messageStorage.push(JSON.parse(tempStore))
     });
     response.writeHead(201, headers);
     response.end("posted"); 
  }
  if(request.method === "OPTIONS"){
    response.writeHead(200, headers);
     response.end("posted");

  }

};

var room = function(request,response,headers){

  if(request.method === "GET"){
    response.writeHead(200,headers);
    //response.write();
    var obj = JSON.stringify({
      "results": messageStorage
    });
    response.end(obj);
  }
  if(request.method === "POST"){
    var tempStore = "";
    request.on('data', function(data){
      tempStore += data;
    });
    request.on('end', function(){
      storage.push(JSON.parse(tempStore));
    });
    response.writeHead(201,headers);
    response.end("posted");
  }
   if(request.method === "OPTIONS"){
    response.writeHead(200, headers);
     response.end("posted");
  }

};

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept, X-Parse-Application-Id, X-Parse-REST-API-Key",
  "access-control-max-age": 10 // Seconds.

};


exports.handler = handleRequest;
