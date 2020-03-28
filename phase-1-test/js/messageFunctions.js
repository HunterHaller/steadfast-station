function sendExtraMessage(Message) { //for sending extra AI messages only, when they come in groups

  if (toggleChatVar == 0) { //if chat is minimized, open it back up!
    console.log("Chat is closed, opening...");
    toggleChat();
  }

  messageReceiveAudio(); //play sound
  var newMess = document.createElement('div');
  newMess.id = Message.messID;
  var newText = document.createElement('p');
  newText.innerHTML = Message.message;
  newText.className = "noselect";

  if (Message.sender == "Technician") {
    newMess.className = "message techMessage";
    messageSendAudio(); //play sound
    buttonsActive = 0; //disable buttons after posting
  } else if (Message.sender == "AI"){
    messageReceiveAudio(); //play sound
    (newMess.className = "message stationMessage");
  } else {
    (newMess.className = "message assistantChat");
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
    } else if (Message.sender == "AI"){
      messageReceiveAudio(); //play sound
      (newMess.className = "message stationMessage");
    } else {
      (newMess.className = "message assistantChat");
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
      // sentMessages.push("T1", "A2", "A4", "A5");
    } else if (Message.messID == "T2") { //Saying hello
      setTimeout(sendExtraMessage, 2000, messA3);
      setTimeout(sendExtraMessage, 5000, messA4);
      setTimeout(sendExtraMessage, 7500, messA5);
      setTimeout(makeWindow, 10000, assistHint1);

    } else if (Message.messID == "T3") { //How long have you worked here?
      setTimeout(sendExtraMessage, 2000, messA8);
      setTimeout(makeWindow, 5000, assistHint4);
    } else if (Message.messID == "T4") { //Great conversationalist
      setTimeout(sendExtraMessage, 2000, messA9);
      setTimeout(makeWindow, 5000, assistHint4);

    } else if (Message.messID == "T5"){
      setTimeout(sendExtraMessage, 2000, messA12);
      setTimeout(makeWindow, 5000, assistHint6);
    } else if (Message.messID == "T6"){
      setTimeout(sendExtraMessage, 2000, messA13);
      setTimeout(makeWindow, 5000, assistHint6);

    } else if (Message.messID == "T7"){
      setTimeout(sendExtraMessage, 2000, messA15);
      setTimeout(makeWindow, 5000, assistHint8);
    } else if (Message.messID == "T8"){
      setTimeout(sendExtraMessage, 2000, messA16);
      setTimeout(makeWindow, 5000, assistHint8);
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
  } else if (Message.sender == "AI"){
    (newMess.className = "message stationMessage");
  } else {
    (newMess.className = "message assistantChat");
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
