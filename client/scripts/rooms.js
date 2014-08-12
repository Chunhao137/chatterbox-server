var Room = function(server, roomname){
  App.call(this, server);
  this._roomname = roomname;
  console.log("Room constructor: roomname: " + roomname);

}

Room.prototype = Object.create(App.prototype)
Room.prototype.constructor = Room;

Room.prototype.init = function() {
  $("#roomname").text("Current room: " +this._roomname);
    $(".allchats").show();
}
Room.prototype.filter = function(data){

  var results = data["results"];
  console.log("this is results: " + this._roomname)


  //console.log("Room before: " + JSON.stringify(results));

  // then we filter based on room
  var rv = _.filter(results, function(v){
  
    return v.roomname === this._roomname;
  }, this);

 // console.log("Room after: " +JSON.stringify(rv));

  return rv;

}

Room.prototype.assembleMessage = function(message) {

  var rv = {
    username: username,
    text: message,
    roomname: this._roomname
  };

  return rv;
}





