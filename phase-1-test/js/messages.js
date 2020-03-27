//Message: sender, message, preview, id

let messA = new Message; //left option
let messB = new Message; //right option

let blankMess = new Message("none", "", "", "");

//Intro messages
let messT1 = new Message("Technician", "Just here for routine maintenance", "Just maintenance", "T1");
let messT2 = new Message("Technician", "Just wanted to drop in and say hello!", "Just saying hi!", "T2");
let messA1 = new Message("AI", "Welcome, Technician! What brings you to my station?", "", "A1");

//2.1 - "Just routine maintenance"
let messA2 = new Message("AI", "Understood!  Let me know if you need my assistance with anyth", "", "A2");

//2.2 - "Just saying hi!"
let messA3 = new Message("AI", "How thoughtful! Hello indeed!  I suspect you have work to do however.  Let me know if you need anthin", "", "A3");

//4 - "Just here for maintenance."
let messA4 = new Message("AI", "anything*\n\nPardon my typo... Decades of comms and I still mess it up, silly me... -_-", "", "A4");
let messA5 = new Message("AI", "Anyway, mind taking a look at my battery first?", "", "A5");

//5 - After charging station battery
let messA6 = new Message("AI", "Thanks for the boost!  I was feeling little parched there, haha!", "", "A6");

//6 - After attuning station frequency
let messA7 = new Message("AI", "Nice work!  I've missed takling to my friends in Etheras... That was a joke, I can't really talk to anyone :( maybe someday though!", "", "A7");
let messT3 = new Message("Technician", "How long have you worked here?", "Been here long?", "T3");
let messT4 = new Message("Technician", "I bet you're a great conversationalist!", "You're fun to talk to!", "T4");

//7 - how long have you worked here?
let messA8 = new Message("AI", "Oh, something like 40 years?  Long time for one place, perhaps, but it's not so bad.  I'm sure I'll be out of here someday!", "", "A8");

//8 - Great conversationalist
let messA9 = new Message("AI", "Tthanks! ^_^ I don't get much real conversation, but I do lots of writing in my free time (which I have a lot of).  Gets a little angsty I admit, but it passes the time... Maybe it helps with real conversation?", "", "A9");

//9 - Successful station orientation
let messA10 = new Message("AI", "Excellent, the city is in view.  I can properly oversee its protection now >:)", "", "A10");

//Message Delivery and Changing

var buttonsActive = 0;

function sendExtraMessage(Message) { //for sending extra AI messages only, when they come in groups

  messageReceiveAudio(); //play sound
  var newMess = document.createElement('div');
  newMess.id = Message.messID;
  var newText = document.createElement('p');
  newText.innerHTML = Message.message;
  newText.className = "noselect";
  newMess.className = "message stationMessage";

  newMess.appendChild(newText);

  document.getElementById("chatBody").appendChild(newMess);
  document.getElementById("chatBody").scrollTo(0, document.getElementById("chatBody").scrollHeight);

  $("#" + Message.messID).css("display", "none"); //prep for fade in
  $("#" + Message.messID).fadeIn(); //window comes in all pretty like
  $("#" + Message.messID).css("display", "block");
  $("#" + Message.messID).removeAttr('id');

  //remove prompt text while waiting for new dialogue
  document.getElementById("optTextA").innerHTML = "";
  document.getElementById("optTextB").innerHTML = "";
}

function sendMessage(Message) {

  if (buttonsActive == 1) { //if ready to send messages,

    var newMess = document.createElement('div');
    newMess.id = Message.messID;
    var newText = document.createElement('p');
    newText.innerHTML = Message.message;
    newText.className = "noselect"

    if (Message.sender == "Technician") {
      newMess.className = "message techMessage";
      messageSendAudio(); //play sound
      buttonsActive = 0; //disable buttons after posting
    } else {
      messageReceiveAudio(); //play sound
      (newMess.className = "message stationMessage");
    }

    newMess.appendChild(newText);

    document.getElementById("chatBody").appendChild(newMess);
    document.getElementById("chatBody").scrollTo(0, document.getElementById("chatBody").scrollHeight);

    $("#" + Message.messID).css("display", "none"); //prep for fade in
    $("#" + Message.messID).fadeIn(); //window comes in all pretty like
    $("#" + Message.messID).css("display", "block");
    $("#" + Message.messID).removeAttr('id');

    //remove prompt text while waiting for new dialogue
    document.getElementById("optTextA").innerHTML = "";
    document.getElementById("optTextB").innerHTML = "";

    //Progress Tracking, at least for now
    //Depending on which message was just sent, choose which branch to continue on to
    if (Message.messID == "T1") { //Maintenance
      setTimeout(sendExtraMessage, 2000, messA2);
      setTimeout(sendExtraMessage, 5000, messA4);
      setTimeout(sendExtraMessage, 7500, messA5);
      setTimeout(makeWindow, 10000, assistHint1);
      sentMessages.push("T1", "A2", "A4", "A5");
    } else if (Message.messID == "T2") { //Saying hello
      setTimeout(sendExtraMessage, 2000, messA3);
      setTimeout(sendExtraMessage, 5000, messA4);
      setTimeout(sendExtraMessage, 7500, messA5);
      setTimeout(makeWindow, 10000, assistHint1);

    } else if (Message.messID == "T3") { //How long have you worked here?
      setTimeout(sendExtraMessage, 2000, messA8);
    } else if (Message.messID == "T4") { //Great conversationalist
      setTimeout(sendExtraMessage, 2000, messA9);
    }
  }
}

function messageStep(a, b, c) {
  //a, b, and c are all message objects, like those above
  //a and b are always player messages
  //c is always an AI message

  if (toggleChatVar == 0) { //if chat is minimized, open it back up!
    console.log("Chat is closed, opening...");
    toggleChat();
  }

  buttonsActive = 1; //enable button clicking for sending player messages

  // console.log("Sending message with id " + c.messID);
  messageReceiveAudio(); //play sound
  sendMessage(c); //send first AI message to respond to
  if (b.sender != "none") {
    messA = a;
    messB = b;
    document.getElementById("optTextA").innerHTML = a.preview;
    document.getElementById("optTextB").innerHTML = b.preview;
  } else {
    buttonsActive = 0;
    messA = blankMess;
    messB = blankMess;
  }

} //sends an AI message, populates the message options with text and changes what messages they send

function sendSilentMessage(Message) {

  var newMess = document.createElement('div');
  newMess.id = Message.messID;
  var newText = document.createElement('p');
  newText.innerHTML = Message.message;
  newText.className = "noselect"

  if (Message.sender == "Technician") {
    newMess.className = "message techMessage";
    buttonsActive = 0; //disable buttons after posting
  } else {
    (newMess.className = "message stationMessage");
  }

  newMess.appendChild(newText);

  document.getElementById("chatBody").appendChild(newMess);
  document.getElementById("chatBody").scrollTo(0, document.getElementById("chatBody").scrollHeight);

  $("#" + Message.messID).css("display", "block");
  $("#" + Message.messID).removeAttr('id');

  //remove prompt text while waiting for new dialogue
  document.getElementById("optTextA").innerHTML = "";
  document.getElementById("optTextB").innerHTML = "";
}
