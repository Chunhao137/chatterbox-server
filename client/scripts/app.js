// YOUR CODE HERE:
//http://stackoverflow.com/questions/24816/escaping-html-strings-with-jquery

var getUsername = function() {

  var qs = location.search.slice(1);
  var re = new RegExp("username=(.+)(?:&|$)");
  var myArray = re.exec(qs);
  return (myArray) ? myArray[1] : 'anonymous';
}


var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
};

function escapeHtml(string) {
  return String(string).replace(/[&<>"'\/]/g, function (s) {
    return entityMap[s];
  });
};


var App = function(server){
  this.friends = {charles: true};
  this.server = server;

}

// App.prototype.init = function(){


// }

App.prototype.assembleMessage = function(message) {


  var rv = {
    username: username,
    text: message,
    roomname: ""
  };

  return rv;
}

App.prototype.send = function(messageText){

  var msgObject = this.assembleMessage(messageText)



//console.log("in send: " + JSON.stringify(message));
$.ajax({
  // always use this url
  url: this.server,
  type: 'POST',
  data: JSON.stringify(msgObject),
  contentType: 'application/json',
  success: function (data) {
    console.log('chatterbox: ' + msgObject);
  },
  error: function (data) {
    // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to send message');
  }
 });
}

App.prototype.filter = function(newdata) {

  //console.log("array: " +JSON.stringify(newdata["results"]));

  return newdata["results"];
}

App.prototype.befriend = function(username){

     this.friends[username] = true;

}
App.prototype.fetch = function(){
  var context = this;

  $.ajax({
  // always use this url
  url: this.server,
  type: 'GET',

  contentType: 'application/json',
  success: function (data) {
    //console.log('in fetch: ' + JSON.stringify(context));
    //var filteredData = context.filter(data);
  //    context.display(data['results']);
    console.log(data)

    context.display(JSON.parse(data).results);

  },
  error: function (data) {
   // console.log(data);
    // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to send message');
  }
 });

}

App.prototype.clearMessages = function(){

  $('#chats').html("");
}


App.prototype.display = function(array){
   this.clearMessages();
  var $chats = $('#chats');
  var context = this;
  _.each(array,function(element){
    console.log(element)
    //console.log("element: " + JSON.stringify(element));
    var $chat = $("<p>"+ '<a href="#" class="userName">' +(element.username)+ "</a>"+ " : "+escapeHtml(element.text) + "</p>");
    $chats.append($chat);


    $chat.on('click', '.userName', function(){
      //console.log("hi");
      var x = $(this).text();

      context.befriend(x);
      context.fetch()

 });
    if (context.friends[element.username] !== undefined) {
      $chat.css("font-weight","Bold");
    }
  });
};


// App.prototype.addMessage = function(message){
//    var $chat = $("<chat>" + message.text + "</chat>");
//    //console.log(message);
//    //console.log($("#chats"));

//    $chat.appendTo($("#chats"));
//    //$('#chats').append("<p>" + message.text + "</p>");
//    //console.log($("#chats").children());
//   //console.log(JSON.stringify($chat));
//   //console.log("chats:" + JSON.stringify(x))
// }









