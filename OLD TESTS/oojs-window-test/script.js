// console.log("JavaScript active!");

function dragElement(elmnt) {
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

var display = setInterval(function() {Time()}, 0);

function Time() {
  var date = new Date();
  var time = date.toLocaleTimeString();
  document.getElementById("time").innerHTML = time;
}


class Window {
  constructor(height, width, name, content, winID) {
    this.height = height;
    this.width = width;
    this.name = name;
    this.content = content;
    this.winID = winID;
    this.made = 0; //gets set to 1 after being created with makeWindow function
  }

  hide() {
    $("#" + this.winID).css("display", "none");
    console.log("Hiding #" + this.winID + "...");
  }

  show() {
    console.log("Showing #" + this.winID + "...");
    $("#" + this.winID).css("display", "block");
  }
}

var contentHTML = "<h1>I'm a thing!</h1>";

let newThing = new Window(400, 500, "WNDW", "./window-contents/sample.html", "newThing")

function makeWindow(Window) {

  if (Window.made == 1) {
    Window.show();
  } else {
    var newwin = document.createElement('div');
    newwin.id = Window.winID;
    newwin.className = "window";

    var winHeader = document.createElement('div');
    winHeader.id = Window.winID + "Header";
    winHeader.className = "windowHeader";
    winHeader.innerHTML = '<span id = "' + Window.winID + 'Button" class = "dot" onclick = "' + Window.winID + '.hide()"> </span><span class = "banner" > ' + Window.name + ' </span>';

    var winBody = document.createElement('div');
    winBody.id = Window.winID + "Body";
    winBody.className = "content";
    winBody.innerHTML = "<h1>Welcome!</h1><p>Hi, I'm a thing!</p>";
    // $(function() {
    //   $("#" + Window.winID + "Body").load(Window.content);
    // });

    $(function() {
      $("#" + Window.winID + "Body").css("height", Window.height);
      $("#" + Window.winID + "Body").css("width", Window.width);
    });

    Window.made = 1;

    newwin.appendChild(winHeader);
    newwin.appendChild(winBody);
    document.body.appendChild(newwin);

    dragElement(document.getElementById(Window.winID));
  }


}
