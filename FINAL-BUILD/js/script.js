//STUFF TO FIX
// - Win condition check
// - Final window styling
// - Sound effects
// - Break long messages up into smaller messages

localStorage.gameStarted;

var stationX = 84;
var stationY = 70;

function initializeGame() {

  //First time things
  if (localStorage.gameStarted != 1) {
    console.log("Starting new game!");
    localStorage.gameOver = 0;
    localStorage.master = 0;
    localStorage.gameStarted = 1;
    localStorage.localConnect = 0;
    localStorage.progress = 0; //starts at zero, progresses as you play through first phase
    localStorage.buttonsActive = 0;

    //Power
    localStorage.powerCapacity = 13; //%

    //Comms
    localStorage.commsVisited = 0;
    localStorage.firstConnection = 0;
    localStorage.currentFrequency = "XY.123.234";
    localStorage.currentCommsStatus = "Disconnected";

    //Thrusters
    localStorage.firstThruster = 0;
    localStorage.visible = 'OCW station "PGHDD"';
    localStorage.thrusterDone = 0;

    //Radar
    localStorage.firstRadar = 0;
    localStorage.dishDegrees = 24;

    //Weapons
    localStorage.firstWeapons = 0;;
    localStorage.firingBay = "Open";
    localStorage.missilesReady = 0;

    localStorage.docExists = 1;
    localStorage.rotateNum = 0;
    localStorage.etherasDetected = 0;
    localStorage.dishQuestioned = 0;
    localStorage.radarStatus = "Normal"

    //Station orientation
    localStorage.stationX = 84;
    localStorage.stationY = 70;

    //Weapons
    localStorage.weaponsStatus = "Normal";

    //Ejection messages
    localStorage.firstEject = 0;
    localStorage.firstPasscode = 0;
    localStorage.firstCodename = 0;

    localStorage.phase2 = 0;

    localStorage.commsDestroyed = 0;
    localStorage.radarDestroyed = 0;
    localStorage.thrustersDestroyed = 0;
    localStorage.weaponsDestroyed = 0;

    localStorage.chat = "";

    localStorage.firstReadoutShown = 0;
    localStorage.firstLogShown = 0;
    localStorage.messages = "<br>";

    localStorage.flicker = 1; // flicker on

    console.log("Variables initialized");

    makeWindow(introWindow);

  } else { //Subsequent times things
    console.log("Game already started! Loading...");
    loadGame();
  }

  //Every time things
  makeIcon(filesIcon, filesWindow);
  makeIcon(termIcon, termWindow);
  makeIcon(settingsIcon, settingsWindow);
  makeWindow(termWindow);
  makeBackgroundWindow(assistantLog);
  makeBackgroundWindow(readoutWindow);
  termWindow.startTerminal();

  if (localStorage.phase2 == 1){
    $('body').css("background-image", "url('./img/background7.jpg')");
    $('#termWindowBody').css("--color", "pink");
  }
}

function loadGame() {
  if (localStorage.gameStarted == 1) {
    console.log("Loading game...");

    //Chat Things
    $("#chatBody").html(localStorage.chat);
    $("#opt1").html(localStorage.opt1);
    $("#opt2").html(localStorage.opt2);
    document.getElementById("chatBody").scrollTo(0, document.getElementById("chatBody").scrollHeight); //make sure chat is scolled down
    // messA = localStorage.messA; CAN'T SET LOCALSTORAGE AS OBJECTS, STRINGS ONLY

    $("#assistantLogBody").html(localStorage.messages);
    if(localStorage.firstLogShown == 1){
      makeIcon(assistantIcon, assistantLog);
    }

    $("#readoutWindow").html(localStorage.status);
    if (localStorage.firstReadoutShown == 1){
      makeIcon(readoutIcon, readoutWindow);
      makeWindow(readoutWindow);
    }

    if (localStorage.flicker == 0){ //supposed to be off,
      makeBackgroundWindow(settingsWindow);
      toggleFlicker();
    }

    stationX = Number(localStorage.stationX);
    stationY = Number(localStorage.stationY);

    if (localStorage.localConnect == 1 && localStorage.commsDestroyed == 1){
      $('#userStatus').html('USR: Tech535<br>Connected station: STDFST<br>Signal strength: Weak');
    } else if (localStorage.localConnect == 1) {
      $('#userStatus').html('USR: Tech535<br>Connected station: STDFST<br>Signal strength: Strong');
    }

    if (localStorage.phase2 == 0 && localStorage.localConnect == 1){
      $('#chatTopText').html("AI COMMS - ANTNNS");
    }
    if (localStorage.phase2 == 1){
      $('body').css("background-image", "url('./img/background7.jpg')");
      $('#chatTopText').html("AI COMMS - CLGLA");

      $('.stationMessage').css("background-color", "red");
    }

    // makeWindow(assistantLog);
    // makeIcon(assistantIcon, assistantLog); //make sure log icon exists
  } else {
    console.log("Can't load game!");
  }
}

function resetGame() {
  localStorage.gameStarted = 0;
  location.reload();
}

var saveGame = setInterval(function() {
  // console.log("Saving game...");

  //Chat things
  localStorage.chat = $("#chatBody").html();
  localStorage.opt1 = $("#opt1").html();
  localStorage.opt2 = $("#opt2").html();

  //Status Things
  localStorage.status = $("#readoutWindow").html();

  //Message Things
  localStorage.messages = $("#assistantLogBody").html();

  //Thrusters things
  localStorage.stationX = stationX.toString();
  localStorage.stationY = stationY.toString();

  //Readout update
  var updateReadout = setInterval(function() {
    document.getElementById("powerReadout").innerHTML = localStorage.powerCapacity + "%";
    document.getElementById("commsReadout").innerHTML = localStorage.currentCommsStatus;
    document.getElementById("thrustersReadout").innerHTML = localStorage.visible + " in sight";
    document.getElementById("radarReadout").innerHTML = "Rotated to " + localStorage.dishDegrees + " degrees";
    document.getElementById("weaponsReadout").innerHTML = localStorage.missilesReady + " missiles ready";

    if (localStorage.powerCapacity < 100) {
      $("#powerReadout").css("color", "orange");
    } else {
      $("#powerReadout").css("color", "green");
    }

    if (localStorage.currentCommsStatus == "Connected to Revulend Tower") {
      $("#commsReadout").css("color", "green");
    } else if (localStorage.commsDestroyed == 1) {
      $("#commsReadout").css("color", "red");
      $("#commsReadout").html("CATASTROPHIC FAILURE");
    } else {
      $("#commsReadout").css("color", "orange");
    }

    if (localStorage.visible == "Etheras") {
      $("#thrustersReadout").css("color", "green");
    } else if (localStorage.visible == "No objects") {
      $("#thrustersReadout").css("color", "red");
    } else {
      $("#thrustersReadout").css("color", "orange");
    }

    if (localStorage.dishDegrees == "128" && localStorage.radarDestroyed == 0) {
      $("#radarReadout").css("color", "green");
    } else if (localStorage.radarDestroyed == 1) {
      $("#radarReadout").css("color", "red");
      $("#radarReadout").html("CATASTROPHIC FAILURE");
    } else {
      $("#radarReadout").css("color", "orange");
    }

    if (localStorage.missilesReady == "10") {
      $("#weaponsReadout").css("color", "green");
    } else if (localStorage.weaponsStatus == "CATASTROPHIC FAILURE") {
      $("#weaponsReadout").css("color", "red");
      $("#weaponsReadout").html("CATASTROPHIC FAILURE");
    } else {
      $("#weaponsReadout").css("color", "orange");
    }
  }, 400);
}, 1000);

// Top Bar Functions
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
  if (chatHeight > "40px") { //is open
    $("#chatBox").css("height", "40px");
    console.log("Closing...");
  } else if (chatHeight < "500px") { //is closed or closing
    $("#chatBox").css("height", "500px");
    console.log("Opening...");
  }
}

//Audio Functions

// function stationAudio(){
//   document.getElementById("stationAudio").play();
// }

function chimeAudio(){
  document.getElementById("chimeAudio").play();
}

function messageReceiveAudio() {
  document.getElementById("messageReceive").play();
}

function messageSendAudio() {
  document.getElementById("messageSend").play();
}

function ejectAudio() {
  document.getElementById("ejectAudio").play();
}

function bayAudio(){
  document.getElementById("bayAudio").play();
}

function dishAudio(){
  document.getElementById("dishAudio").play();
}

function dishBreakAudio(){
  document.getElementById("dishBreakAudio").play();
}

function explosionAudio(){
  document.getElementById("explosionAudio").play();
}

//Orientation functions
function orientStation(x, y) {
  document.getElementById("xDisplay").innerHTML = x;
  document.getElementById("yDisplay").innerHTML = y;

  document.onkeydown = checkKey;

  var updateOrient = setInterval(function() {
    $("#visibleList").html(localStorage.visible);

    if ((stationX < 160 && stationX >= 120) && (stationY <= 310 && stationY >= 295)) {
      localStorage.visible = "Etheras";
    } else if ((stationX < 350 && stationX >= 310) && (stationY <= 210 && stationY >= 190)) {
      localStorage.visible = 'OCW station "HDSTRNG"';
    } else if ((stationX < 100 && stationX >= 50) && (stationY <= 74 && stationY >= 24)) {
      localStorage.visible = 'OCW station "PGHDD"';
    } else {
      localStorage.visible = "No objects";
    }
  }, 10);

  function checkKey(e) { //arrow keys to orient station
    // console.log("Key pressed!");
    e = e || window.event;

    if (e.keyCode == '37') {
      console.log("Left key!");
      if (stationX != 0) {
        stationX = stationX - 1;
      }
      document.getElementById("xDisplay").innerHTML = stationX;
    } else if (e.keyCode == '39') {
      console.log("Right key!");
      if (stationX != 360) {
        stationX = stationX + 1;
      }
      document.getElementById("xDisplay").innerHTML = stationX;
    } else if (e.keyCode == '38') {
      console.log("Up key!");
      if (stationY != 360) {
        stationY = stationY + 1;
      }
      document.getElementById("yDisplay").innerHTML = stationY;
    } else if (e.keyCode == '40') {
      console.log("Down key!");
      if (stationY != 0) {
        stationY = stationY - 1;
      }
      document.getElementById("yDisplay").innerHTML = stationY;
    }
  }
}

function stopOrientation() {
  document.onkeydown = console.log("Stopped"); //prevent arrow key presses from changing variables
  orientationWindow.hide(); //close window
  updateOrient = 0;
  if (localStorage.visible == "Etheras" && localStorage.thrusterDone == 0) {
    setTimeout(sendExtraMessage, 2000, messA10);
    setTimeout(messageStep, 5000, messT5, messT6, messA11);
    localStorage.progress = 3;
    localStorage.thrusterDone = 1;
  } else if (localStorage.visible == "No objects" && localStorage.phase2 == 1 && localStorage.thrustersDestroyed == 0) {
    setTimeout(sendExtraMessage, 2000, messC12);
    setTimeout(sendExtraMessage, 8000, messC13);
    setTimeout(sendExtraMessage, 14000, messC14);
    setTimeout(sendExtraMessage, 19000, messC145);
    setTimeout(sendExtraMessage, 24000, messC15);
    setTimeout(sendExtraMessage, 29000, messC155);
    setTimeout(sendExtraMessage, 34000, messC16);
    setTimeout(sendExtraMessage, 39000, messC165);
    localStorage.thrustersDestroyed = 1;
  }
}

//Toggles
function toggleFlicker() {
  console.log("Toggling flicker effect!");
  $('#toggleFlickerButton').toggleClass('buttonOff');
  $('#toggleFlickerButton').toggleClass('buttonOn');
  $('body').toggleClass('crt');
  $('body').toggleClass('crtPause');
  if (localStorage.flicker == 0){
    localStorage.flicker = 1;
  } else{
    localStorage.flicker = 0;
  }
}

function toggleStatus() {
  var statusHeight = $('#userStatus').css('height');
  // console.log('toggling status!');
  if (statusHeight == ('30px')) {
    $('#userStatus').css('height', 'auto');
    // console.log("opening status!");
  } else {
    $('#userStatus').css('height', '30px');
    // console.log("closing status!");
  }
}

function glowOn(){
  $("#assistantIconImg").addClass("glowIcon");
  setTimeout(glowOff, 4500);
}

function glowOff(){
  $("#assistantIconImg").removeClass("glowIcon");
}

//Phase changes
function phase2Transition() {
  $('#overlay').fadeIn(1);
  setTimeout(overlayFadeOut, 2000);
  $('body').css("background-image", "url('./img/background7.jpg')");
  $('#chatTopText').html("AI COMMS - CLGLA");
  $('#chatBody').html("");

  $('.stationMessage').css("background-color", "red");
  $('#termWindowBody').css("--color", "pink");

  setTimeout(messageStep, 8000, messT9, messT10, messC1);

  localStorage.phase2 = 1;
}

function overlayFadeOut() {
  $('#overlay').fadeOut(4000);
}

var didYouWin = setInterval(function(){
  if (localStorage.gameOver == 0 && localStorage.commsDestroyed == 1 && localStorage.thrustersDestroyed == 1 && localStorage.radarDestroyed == 1 && localStorage.weaponsDestroyed == 1){
    console.log("Starting win scenario!");
    localStorage.gameOver = 1;
    setTimeout(sendExtraMessage, 3000, messC21);
    setTimeout(sendExtraMessage, 6000, messC22);
    setTimeout(sendExtraMessage, 11000, messC23);
    setTimeout(sendExtraMessage, 16000, messC24);
    setTimeout(sendExtraMessage, 21000, messC25);
    setTimeout(sendExtraMessage, 26000, messC26);
    setTimeout(sendExtraMessage, 31000, messC27);
    setTimeout(makeWindow, 36000, assistantFinal);
  }
}, 1000);

//RE-ENABLE THIS FOR LAUNCH!
window.onbeforeunload = function() {
  return "If any messages need to be sent or received, they will be lost when you come back!  Be sure all messages are finished before leaving.";
};
