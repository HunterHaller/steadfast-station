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
  document.body.appendChild(newIcon);

  console.log("Making icon with parentWindow = " + Window.winID); //parentWindow can be seen here...

  $("#" + Icon.iconID).dblclick(function(){
    console.log("making window " + Window.winID)
    makeWindow(Window);
  });
}

function makeWindow(Window) {

  console.log("Making window: " + Window.winID);

  if (Window.made == 1) {
    Window.show();
  } else {
    var newwin = document.createElement('div');
    newwin.id = Window.winID;
    newwin.className = "window";

    var winHeader = document.createElement('div');
    winHeader.id = Window.winID + "Header";
    winHeader.className = "windowHeader";
    winHeader.innerHTML = '<span id = "' + Window.winID + 'Button" class = "dot" onclick = "' + Window.winID + '.hide()"> </span><span class="noselect" class = "banner" > ' + Window.name + ' </span>';

    var winBody = document.createElement('div');
    winBody.id = Window.winID + "Body";
    winBody.className = "content";
    winBody.innerHTML = Window.content;
    // $(function() {
    //   $("#" + Window.winID + "Body").load(Window.content);
    // });

    $(function() { //Applies css from object info
      $("#" + Window.winID + "Body").css("height", Window.height);
      $("#" + Window.winID + "Body").css("width", Window.width);
      $("#" + Window.winID).css("top", Window.top);
      $("#" + Window.winID).css("left", Window.left);
    });

    Window.made = 1; //Ensures that window is not created twice by clicking its icon

    newwin.appendChild(winHeader);
    newwin.appendChild(winBody);
    document.body.appendChild(newwin);

    dragElement(document.getElementById(Window.winID));
  }
}
