var progress = 5; //starts at zero, progresses as you play through first phase
//Progress is set to max for debugging purposes

//Power
var powerCapacity = 13;

//Comms
var commsVisited = 0;
var firstConnection = 0;
var currentFrequency = "XY.123.234";
var currentCommsStatus = "Disconnected";

//Thrusters
var visible = "No objects";

//Radar
var dishDegrees = 24;

//Weapons
var firingBay = "Open";
var missilesReady = 0;

var docExists = 1;
var toggleChatVar = 1; //1 = being shown
var rotateNum = 0;
var etherasDetected = 0;
var dishQuestioned = 0;

//Station orientation
var stationX = 238;
var stationY = 47;

var sentMessages = [];

//Suppress default right click for the sake of MY IMMERSION
// document.addEventListener('contextmenu', event => event.preventDefault());

// function loadGame() {
//   console.log("Loading game save...");
//   sendSilentMessage(messT1);
//   for (i = 0; i < sentMessages.length; i++) {
//     console.log("Adding message mess" + sentMessages[i]);
//     sendSilentMessage("mess" + sentMessages[i]);
//   }
// }

//Top Bar Functions
var display = setInterval(function() {
  Time(),
    FicDate();
}, 100);

function FicDate() {
  var dateObj = new Date();
  var month = dateObj.getUTCMonth() + 1;
  var day = dateObj.getUTCDate();

  document.getElementById("date").innerHTML = month + "-" + day + "-2146";
}

function Time() {
  var date = new Date();
  var time = date.toLocaleTimeString();
  document.getElementById("time").innerHTML = time;
  document.getElementById("powerReadout").innerHTML = powerCapacity + "%";
  document.getElementById("commsReadout").innerHTML = currentCommsStatus;
  document.getElementById("thrustersReadout").innerHTML = visible + " in sight";
  document.getElementById("radarReadout").innerHTML = "Rotated to " + dishDegrees + " degrees";
  document.getElementById("weaponsReadout").innerHTML = missilesReady + " missiles ready";

  if (powerCapacity < 100){
    $("#powerReadout").css("color", "red");
  } else {
    $("#powerReadout").css("color", "green");
  }

  if (currentCommsStatus == "Connected to Revulend Tower"){
    $("#commsReadout").css("color", "green");
  } else{
    $("#commsReadout").css("color", "red");
  }

  if (visible == "No objects"){
    $("#thrustersReadout").css("color", "red");
  } else if (visible == "Etheras"){
    $("#thrustersReadout").css("color", "green");
  }

  if (dishDegrees == "128"){
    $("#radarReadout").css("color", "green");
  } else {
    $("#radarReadout").css("color", "red");
  }

  if (missilesReady == "10"){
    $("#weaponsReadout").css("color", "green");
  } else {
    $("#weaponsReadout").css("color", "red");
  }
}

//Window Functions
function dragElement(elmnt) {
  // console.log("Drag function activated for " + elmnt.id + "!");
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(elmnt.id + "Header")) {
    document.getElementById(elmnt.id + "Header").onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

//Chat Functions
function toggleChat() {
  if (toggleChatVar == 1) { //is open
    $("#chatBox").css("height", 40);
    toggleChatVar = 0; //make closed
  } else { //is closed
    $("#chatBox").css("height", 500);
    toggleChatVar = 1; //make open
  }



}

//Audio Functions

function messageReceiveAudio() {
  document.getElementById("messageReceive").play();
}

function messageSendAudio() {
  document.getElementById("messageSend").play();
}

//Orientation functions
function orientStation(x, y){
  document.getElementById("xDisplay").innerHTML = x;
  document.getElementById("yDisplay").innerHTML = y;

  document.onkeydown = checkKey;

  function checkKey(e){ //arrow keys to orient station
    // console.log("Key pressed!");
    e = e || window.event;

    if (e.keyCode == '37'){
      console.log("Left key!");
      stationX = stationX - 1;
      document.getElementById("xDisplay").innerHTML = stationX;
    } else if (e.keyCode == '39'){
      console.log("Right key!");
      stationX = stationX + 1;
      document.getElementById("xDisplay").innerHTML = stationX;
    } else if (e.keyCode == '38'){
      console.log("Up key!");
      stationY = stationY + 1;
      document.getElementById("yDisplay").innerHTML = stationY;
    } else if (e.keyCode == '40'){
      console.log("Down key!");
      stationY = stationY - 1;
      document.getElementById("yDisplay").innerHTML = stationY;
    }
  }
}

function stopOrientation(){
  document.onkeydown = console.log("Stopped"); //prevent arrow key presses from changing variables
  orientationWindow.hide(); //close window

  if ((stationX < 160 && stationX > 50) && (stationY < 330 && stationY > 283)){
    // setTimeout(sendExtraMessage, 2000, mess14);
    visible = "Etheras";
  }


}

//Toggle
function toggleFlicker(){
  console.log("Toggling flicker effect!");
  $('#toggleFlickerButton').toggleClass('buttonOff');
  $('#toggleFlickerButton').toggleClass('buttonOn');
  $('body').toggleClass('crt');
  $('body').toggleClass('crtPause');
}
