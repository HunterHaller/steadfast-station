var progress = 5; //starts at zero, progresses as you play through first phase
//Progress is set to max for debugging purposes

var buttonsActive = 0;

//Power
var powerCapacity = 13;

//Comms
var commsVisited = 0;
var firstConnection = 0;
var currentFrequency = "XY.123.234";
var currentCommsStatus = "Disconnected";

//Thrusters
var firstThruster = 0;
var visible = 'OCW station "PGHDD"';
var thrusterDone = 0;

//Radar
var firstRadar = 0;
var dishDegrees = 24;

//Weapons
var firstWeapons = 0;;
var firingBay = "Open";
var missilesReady = 0;

var docExists = 1;
var toggleChatVar = 1; //1 = being shown
var rotateNum = 0;
var etherasDetected = 0;
var dishQuestioned = 0;
var radarStatus = "Normal"

//Station orientation
var stationX = 84;
var stationY = 70;

//Weapons
var weaponsStatus = "Normal";

//Ejection messages
var firstEject = 0;
var firstPasscode = 0;
var firstCodename = 0;

var phase2 = 0;

var commsDestroyed = 0;
// var thrustersDestroyed = 0;
var radarDestroyed = 0;
var weaponsDestroyed = 0;

// var sentMessages = [];

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
  var chatHeight = $("#chatBox").css("height");
  if (chatHeight == "500px") { //is open
    $("#chatBox").css("height", "40px");
  } else if (chatHeight < "500px"){ //is closed or closing
    $("#chatBox").css("height", "500px");
  }
}

//Audio Functions

function messageReceiveAudio() {
  document.getElementById("messageReceive").play();
}

function messageSendAudio() {
  document.getElementById("messageSend").play();
}

function ejectAudio(){
  document.getElementById("ejectAudio").play();
}

//Orientation functions
function orientStation(x, y) {
  document.getElementById("xDisplay").innerHTML = x;
  document.getElementById("yDisplay").innerHTML = y;

  document.onkeydown = checkKey;

  var updateOrient = setInterval(function(){
    $("#visibleList").html(visible);

    if ((stationX < 160 && stationX > 120) && (stationY < 310 && stationY > 295)) {
      visible = "Etheras";
    } else if ((stationX < 350 && stationX > 310) && (stationY < 210 && stationY > 190)) {
      visible = 'OCW station "HDSTRNG"';
    } else if ((stationX < 100 && stationX > 50) && (stationY < 74 && stationY > 24)) {
      visible = 'OCW station "PGHDD"';
    } else{
      visible = "No objects";
    }
  }, 10);

  function checkKey(e) { //arrow keys to orient station
    // console.log("Key pressed!");
    e = e || window.event;

    if (e.keyCode == '37') {
      console.log("Left key!");
      if (stationX != 0){
        stationX = stationX - 1;
      }
      document.getElementById("xDisplay").innerHTML = stationX;
    } else if (e.keyCode == '39') {
      console.log("Right key!");
      if (stationX != 360){
        stationX = stationX + 1;
      }
      document.getElementById("xDisplay").innerHTML = stationX;
    } else if (e.keyCode == '38') {
      console.log("Up key!");
      if (stationY != 360){
        stationY = stationY + 1;
      }
      document.getElementById("yDisplay").innerHTML = stationY;
    } else if (e.keyCode == '40') {
      console.log("Down key!");
      if (stationX != 0){
        stationY = stationY - 1;
      }
      document.getElementById("yDisplay").innerHTML = stationY;
    }
  }
}

function stopOrientation() {
  document.onkeydown = console.log("Stopped"); //prevent arrow key presses from changing variables
  orientationWindow.hide(); //close window
  if (visible == "Etheras" && thrusterDone == 0) {
    setTimeout(sendExtraMessage, 2000, messA10);
    setTimeout(messageStep, 5000, messT5, messT6, messA11);
    progress = 3;
    thrusterDone = 1;
  }
}

//Toggles
function toggleFlicker() {
  console.log("Toggling flicker effect!");
  $('#toggleFlickerButton').toggleClass('buttonOff');
  $('#toggleFlickerButton').toggleClass('buttonOn');
  $('body').toggleClass('crt');
  $('body').toggleClass('crtPause');
}

function toggleStatus(){
  var statusHeight = $('#userStatus').css('height');
  // console.log('toggling status!');
  if (statusHeight == ('30px')){
    $('#userStatus').css('height','auto');
    // console.log("opening status!");
  } else{
    $('#userStatus').css('height','30px');
    // console.log("closing status!");
  }
}

//Phase changes
function phase2Transition(){
  $('#overlay').fadeIn(1);
  setTimeout(overlayFadeOut, 2000);
  $('body').css("background-image", "url('../img/background7.jpg')");
  $('#chatTopText').html("AI COMMS - CLGLA");
  $('#chatBody').html("");

  setTimeout(sendExtraMessage, 8000, messC1);
  $('.stationMessage').css("background-color", "red");
  $('#termWindowBody').css("--color", "red");

  phase2 = 1;
}

function overlayFadeOut(){
  $('#overlay').fadeOut(4000);
}
