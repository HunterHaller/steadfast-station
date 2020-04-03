function makeIcon(Icon, Window){

  var newIcon = document.createElement('div');
  newIcon.id = Icon.iconID;
  newIcon.className = "icon noselect";

  var newIconImg = document.createElement('img');
  newIconImg.src = "img/" + Icon.imgSrc;
  newIconImg.id = Icon.iconID + "Img";
  newIconImg.className = "iconImg";

  var newIconLabel = document.createElement('p');
  newIconLabel.id = Icon.iconID + "Text";
  newIconLabel.className = "iconText";
  newIconLabel.innerHTML = "\n" + Icon.label;

  $(function() { //Applies css from object info
    $("#" + Icon.iconID).css("top", Icon.top);
    $("#" + Icon.iconID).css("left", Icon.left);
  });

  newIcon.appendChild(newIconImg);
  newIcon.appendChild(newIconLabel);

  // document.getElementById("#allContainer").appendChild(newIcon);
  $('#allContainer').append(newIcon);


  // console.log("Making icon with parentWindow = " + Window.winID); //parentWindow can be seen here...

  $("#" + Icon.iconID).dblclick(function(){
    // console.log("making window " + Window.winID)
    makeWindow(Window);
  });

  dragElement(document.getElementById(Icon.iconID));
}

function makeWindow(Window) {

  if (Window.made == 1) {
    // console.log("Showing window: " + Window.winID);
    Window.show();
  } else {
    // console.log("Making window: " + Window.winID);
    var newwin = document.createElement('div');
    newwin.id = Window.winID;
    newwin.className = "window";

    var winHeader = document.createElement('div');
    winHeader.id = Window.winID + "Header";
    winHeader.className = "windowHeader";
    winHeader.innerHTML = '<span id = "' + Window.winID + 'Button" class = "dot" onclick = "' + Window.winID + '.hide()"> </span><span class="noselect banner" > ' + Window.name + ' </span>';

    var winBody = document.createElement('div');
    winBody.id = Window.winID + "Body";
    winBody.className = "content";
    winBody.innerHTML = Window.content;

    if (Window.name == "ASSIST-HINT"){ //if assistantMessage,
      console.log("Sending assistant message...");
      if (localStorage.firstLogShown == 0){
        console.log("Showing log for the first time...");
        assistantLog.show();
        makeIcon(assistantIcon, assistantLog);
        localStorage.firstLogShown = 1;
      }
      newwin.className = "window assistantMessage";
      var newLog = document.createElement("div");
      newLog.innerHTML = "<hr>" + Window.content;

      var date = new Date();
      var time = date.toLocaleTimeString();
      var logTime = document.createElement('span');
      logTime.innerHTML = time;

      $('#assistantLogBody').prepend(newLog);
      $('#assistantLogBody').prepend(logTime);

      // assistantLogBody.appendChild(newLog);
      // assistantLogBody.appendChild(logTime);
    }
    // $(function() {
    //   $("#" + Window.winID + "Body").load(Window.content);
    // });

    $(function() { //Applies css from object info
      $("#" + Window.winID + "Body").css("height", Window.height);
      $("#" + Window.winID + "Body").css("width", Window.width);
      $("#" + Window.winID).css("top", Window.top);
      $("#" + Window.winID).css("left", Window.left);
      $("#" + Window.winID).css("display", "none"); //prep for fade in
      $("#" + Window.winID).fadeIn(); //window comes in all pretty like
    });

    Window.made = 1; //Ensures that window is not created twice by clicking its icon

    newwin.appendChild(winHeader);
    newwin.appendChild(winBody);
    // document.body.appendChild(newwin);

    $('#allContainer').append(newwin);

    dragElement(document.getElementById(Window.winID));
  }
}

function makeBackgroundWindow(Window){
  if (Window.made == 1) {
    console.log("Window " + Window.winID + " already made!");
    // Window.show();
  } else {
    // console.log("Making window: " + Window.winID);
    var newwin = document.createElement('div');
    newwin.id = Window.winID;
    newwin.className = "window";

    var winHeader = document.createElement('div');
    winHeader.id = Window.winID + "Header";
    winHeader.className = "windowHeader";
    winHeader.innerHTML = '<span id = "' + Window.winID + 'Button" class = "dot" onclick = "' + Window.winID + '.hide()"> </span><span class="noselect banner" > ' + Window.name + ' </span>';

    var winBody = document.createElement('div');
    winBody.id = Window.winID + "Body";
    winBody.className = "content";
    if (Window.winID == "assistantLog"){
      winBody.innerHTML = localStorage.messages;
    } else {
      winBody.innerHTML = Window.content;
    }

    $(function() { //Applies css from object info
      $("#" + Window.winID + "Body").css("height", Window.height);
      $("#" + Window.winID + "Body").css("width", Window.width);
      $("#" + Window.winID).css("top", Window.top);
      $("#" + Window.winID).css("left", Window.left);
      $("#" + Window.winID).css("display", "none"); //stay faded out!
    });

    Window.made = 1; //Ensures that window is not created twice by clicking its icon

    newwin.appendChild(winHeader);
    newwin.appendChild(winBody);
    // document.body.appendChild(newwin);

    $('#allContainer').append(newwin);

    dragElement(document.getElementById(Window.winID));
  }
}
