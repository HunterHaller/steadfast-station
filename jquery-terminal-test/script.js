var docExists = 1;
var netConnect = 1;

dragElement(document.getElementById("termWindow"));

//Top Bar Functions
var display = setInterval(function() {
  Time()
}, 0);

function Time() {
  var date = new Date();
  var time = date.toLocaleTimeString();
  document.getElementById("time").innerHTML = time;
}

//Window Functions
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

function closeWindow() {
  var x = document.getElementById("termWindow");
  x.style.display = "none";
  $('#terminal').terminal({
    enabled: false
  });
}

function openWindow() {
  var x = document.getElementById("termWindow");
  x.style.display = "block";
  $('#terminal').terminal({
    enabled: true
  });
}

//Terminal Functions
$(function() {
      $('#terminal').terminal({
          echo: function(arg1) {
            if (arg1 == "clear") {
              this.error("Fool!  You've triggered my trap card!");
              //this.clear();
            } else {
              this.echo(arg1);
            }
          },
          interp: function() {
            this.echo("Interpreter level " + this.level() + "!");
          },
          name: function() {
            this.name();
          },
          disconnect: function() {
            if (netConnect == 1) {
              this.echo('Disconnected from Network');
              document.getElementById("netIcon").src = "img/net4.png";
              netConnect = 0;
            } else if (netConnect == 0) {
              this.error('Already disconnected!');
            }
          },
          connect: function() {
            if (netConnect == 0) {
              this.echo('Succesfully connected to Network');
              document.getElementById("netIcon").src = "img/net2.png";
              netConnect = 1;
            } else if (netConnect == 1) {
              this.error('Already connected!');
            }
          },
          ls: function() {
            this.echo("\nlogs\nassets\n");
          },
          //cd: function(location) {
            //if (location == "logs"){
              //this.push(function(command){

              //})//end up push
            //}//end of if location == logs
          //} //end of CD definition
        },//end of terminal functions,
          {//start of terminal options
            prompt: 'home> ',
            greetings: "Welcome to your Terminal!\n",
            exceptionHandler: function(exception) {
              this.echo("Sorry, there was an error with that command!")
            },
            name: "TRMNL"
          });
      });
