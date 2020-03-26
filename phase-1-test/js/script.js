var docExists = 1;
var netConnect = 1;
var toggleChatVar = 1; //1 = being shown
var rotateNum = 0;
var etherasDetected = 0;
var dishQuestioned = 0;

//Station orientation
var stationX = 238;
var stationY = 47;

//Suppress default right click for the sake of MY IMMERSION
document.addEventListener('contextmenu', event => event.preventDefault());

//Top Bar Functions
var display = setInterval(function() {
  Time(),
    FicDate();
}, 0);

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
  console.log("Drag function activated for " + elmnt.id + "!");
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
    console.log("Key pressed!");
    e = e || window.event;

    if (e.keyCode == '37'){
      console.log("Left key!");
      stationX = stationX + 1;
      document.getElementById("xDisplay").innerHTML = stationX;
    } else if (e.keyCode == '39'){
      console.log("Right key!");
      stationX = stationX - 1;
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
  document.onkeydown = console.log("beep"); //prevent arrow key presses from changing variables
  orientationWindow.hide(); //close window

  if ((stationX < 160 && stationX > 50) && (stationY < 330 && stationY > 283)){
    setTimeout(sendExtraMessage, 2000, mess14);
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
