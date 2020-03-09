//Message: sender, message, preview, id

let messA = new Message; //left option
let messB = new Message; //right option

let blankMess = new Message("none", "", "", "");

//Intro messages
let mess1 = new Message("Technician", "Hello!", "Hello!", "t1");
let mess2 = new Message("Technician", "Who are you?", "Who are you?", "t2");
let mess3 = new Message("AI", "Welcome, Technician!", "", "a1");

//2 - "Hello!"
let mess4 = new Message("Technician", "Just here for maintenance.", "Just maintenance.", "t3");
let mess5 = new Message("Technician", "", "", "t4")
let mess6 = new Message("AI", "Yes, hello!  How can I help you?", "", "a2");

//3 - "Who are you?"
let mess7 = new Message("AI", "I'm the AI running the station you just docked with.  Welcome!  Just here for routine maintenance, I assume?  Let me know if you need anything!", "", "a3");

//4 - "Just here for maintenance."
let mess8 = new Message("AI", "Understood!  Let me know if you need anything in particular, I'm always here!", "", "a4");

//Point dish at Etheras
let mess9 = new Message("Technician", "My Assistant told me to do it.", "Not my idea!", "t5");
let mess10 = new Message("Technician", "It's fine, I have this under control.", "No worries.", "t6");
let mess11 = new Message("AI", "Hey, um, why did you just point my radar dish at Etheras?  It's supposed to be pointed out at space to watch for asteroids and stuff...", "", "a5");

//Message Delivery and Changing

var buttonsActive = 0;

function sendMessage(Message) {

  if (buttonsActive == 1) {

    var newMess = document.createElement('div');
    newMess.id = Message.messID;
    var newText = document.createElement('p');
    newText.innerHTML = Message.message;
    newText.className = "noselect"

    if (Message.sender == "Technician") {
      newMess.className = "message techMessage";
      messageSendAudio(); //play sound
      buttonsActive = 0; //disable buttons after posting
    } else{
      (newMess.className = "message stationMessage");
    }

    newMess.appendChild(newText);

    document.getElementById("chatBody").appendChild(newMess);
    document.getElementById("chatBody").scrollTo(0, document.getElementById("chatBody").scrollHeight);

    $("#" + Message.messID).css("display", "none"); //prep for fade in
    $("#" + Message.messID).fadeIn(); //window comes in all pretty like
    $("#" + Message.messID).css("display", "block");
    $("#" + Message.messID).removeAttr('id');

    //Progress Tracking, at least for now
    //Depending on which message was just sent, choose which branch to continue on to
    if (Message.messID == "t1") { //Hello!
      setTimeout(messageStep, 2000, mess4, mess5, mess6);
    } else if (Message.messID == "t2") { //Who are you?
      setTimeout(messageStep, 2000, mess4, mess5, mess7);
    } else if (Message.messID == "t3"){ //Maintenance
      setTimeout(messageStep, 1500, blankMess, blankMess, mess8);
    }

    //remove prompt text while waiting for new dialogue
    document.getElementById("optTextA").innerHTML = "";
    document.getElementById("optTextB").innerHTML = "";
  }
}

function messageStep(a, b, c) {
  //a, b, and c are all message objects, like those above
  //a and b are always player messages
  //c is always an AI message

  if (toggleChatVar == 0) {
    console.log("Chat is closed, opening...");
    toggleChat();
  }

  buttonsActive = 1;

  console.log("Sending message with id " + c.messID);
  messageReceiveAudio(); //play sound
  sendMessage(c); //send first AI message to respond to
  if (b.sender != "none"){
    messA = a;
    messB = b;
    document.getElementById("optTextA").innerHTML = a.preview;
    document.getElementById("optTextB").innerHTML = b.preview;
  } else{
    buttonsActive = 0;
    messA = blankMess;
    messB = blankMess;
  }

} //sends an AI message, populates the message options with text and changes what messages they send
