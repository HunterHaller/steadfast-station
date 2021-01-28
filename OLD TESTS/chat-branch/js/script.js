var docExists = 1;
var netConnect = 1;
var chatToggle = 1; //1 = being shown

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
function sendMessage(Message) {
  console.log("Sending message from " + Message.sender + "...");

  var newMess = document.createElement('div');
  console.log("")
  newMess.id = Message.messID;
  var newText = document.createElement('p');
  newText.innerHTML = Message.message;
  newText.className = "noselect"

  if (Message.sender == "Technician"){
    newMess.className = "message techMessage";
  } else (newMess.className = "message stationMessage");

  newMess.appendChild(newText);

  document.getElementById("chatBody").appendChild(newMess);
  document.getElementById("chatBody").scrollTo(0, document.getElementById("chatBody").scrollHeight);

  $("#" + Message.messID).css("display", "none"); //prep for fade in
  $("#" + Message.messID).fadeIn(); //window comes in all pretty like
  $("#" + Message.messID).css("display", "block");
  $("#" + Message.messID).removeAttr('id');
}

function toggleChat(){
  $("#chatBottom").toggle();
  $("#chatBody").toggle();

  if (chatToggle == 1){
    $("#chatBox").css("height", 40);
    chatToggle = 0;
  } else{
    $("#chatBox").css("height", 500);
    chatToggle = 1;
  }

}
