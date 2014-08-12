
var serverUrl = "http://127.0.0.1:3000/classes/messages"
var username = getUsername();
$(document).ready(function() {


  //console.log(app);


  $(".send").on('click', function() {

    var msg = $(".message").val();
    //console.log("msg: " + msg)


     //console.log(msg);
    app.send(msg);

 })

   $(".create").on('click', function() {

    var roomname = $(".room").val();
    //console.log("room: " +roomname);
    app = new Room(serverUrl, roomname);
    app.init();
    stepFunc();
   });

 $(".allchats").on('click', function() {


    app = new App(serverUrl);
    app.init();
    stepFunc();
   });




    //console.log(message);
    //app.addMessage(message);

    $(".allchats").hide();

  var app = new App(serverUrl);

  var stepFunc = function(){ app.fetch();}

  stepFunc();
  setInterval(stepFunc, 3000);
});
