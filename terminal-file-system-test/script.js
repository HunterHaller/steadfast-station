  var docExists = 1;
  var netConnect = 1;

  dragElement(document.getElementById("termWindow"));

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

  //Simulated Document States
  var test = 1;

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
        pwd: function() {
          this.echo("cmp/home");
        },
        disconnect: function(dest) {
          if (dest == "net" || dest == "Net") {
            if (netConnect == 1) {
              this.echo('Succesfully disconnected from Network');
              document.getElementById("netIcon").src = "img/net2.png";
              netConnect = 0;
            } else if (netConnect == 0) {
              this.error('Already disconnected!');
            }
          } else if (dest == "local") {
            this.echo("Succesfully disconnected from local station!");
          } else if (dest == "help"){
            this.echo("'disconnect' has a couple of available options.  You can follow the command \nwith 'local' if you want to disconnect from a nearby BHW station, or you can \ntype 'Net' to disconnect from the Interstellar Network.  \nAlso note that the reverse of these operations is possible with the \n'connect' command.")
          }else{
            this.error("Disconnect from what now?");
          }
        },
        connect: function(dest) {
          if (dest == "net" || dest == "Net") {
            if (netConnect == 0) {
              this.echo('Succesfully connected to Network');
              document.getElementById("netIcon").src = "img/net2.png";
              netConnect = 1;
            } else if (netConnect == 1) {
              this.error('Already connected!');
            }
          } else if (dest == "local") {
            this.echo("Succesfully connected to local station!");
          } else if (dest == "help"){
            this.echo("'connect' has a couple of available options.  You can follow the command \nwith 'local' if you want to connect locally to a nearby BHW station, or you \ncan type 'Net' to connect to the Interstellar Network.  \nAlso note that the reverse of these operations is possible with the \n'disconnect' command.")
          }else{
            this.error("I wouldn't want to connect to " + dest + " if I were you (it doesn't exist  )");
          }
        },
        hello: function() {
          this.echo("Hi there! \nFor a real conversation, you should find an Artificial Intelligence \nor another person!");
        },
        ls: function() {
          this.echo("logs\nassets");
          this.echo("stuff.txt\nhelp.txt")
          if (test == 1) {
            this.echo("test.exe");
          }
        },
        rm: function(arg1) {
          this.echo("Removing " + arg1);
          if (arg1 == "test") {
            test = 0;
          }
        },
        "?": function() {
          this.echo("\nTRMNL is a command input point that allows you, the Technician, to input \ncommands relating to your ship as well as interfacing with nearby BHW \nstations. You can use it to give commands relating to the computing device \nitself, look through and manipulate files in the storage or your ship or \nnearby stations, and more!\n");
        },
        help: function() {
          this.echo("AVAILABLE COMMANDS:");
          this.echo("- pwd: Print present working directory");
          this.echo("- ls: List all directories and files in current directory");
          this.echo("- connect: Connect to the Net");
          this.echo("- disconnect: Disconnect from the Net");
          this.echo("- loc: Print current physical location");
          this.echo("- cd [directory]: Move into the specified directory");
          this.echo("- rm [file]: Remove a file");
          this.echo("- help: You know what this does, silly!");
          this.echo("- ?: Displays general info on TRMNL and it's purposes");
          this.echo("- clear: Clears the TRMNL screen");
        },
        loc: function() {
          this.echo("Currently docked with BHW Station 5392, ID: STDFST");
        },
        cd: function(location) {
          if (location == 'logs') {
            this.push(function(cmd) {
              if (cmd == 'ls') {
                this.echo('2_4_2146_log.txt\n2_5_2146_log.txt');
                if (test == 1) {
                  this.echo("test.txt");
                }
              } else if (cmd == 'cd ..') {
                this.pop();
              } else if (cmd == 'help') {
                this.echo("AVAILABLE COMMANDS:");
                this.echo("- pwd: Print present working directory");
                this.echo("- ls: List all directories and files in current directory");
                this.echo("- connect: Connect to the Net");
                this.echo("- disconnect: Disconnect from the Net");
                this.echo("- cd [directory]: Move into the specified directory");
                this.echo("- rm [file]: Remove a file");
                this.echo("- help: You know what this does, silly!");
                this.echo("- clear: Clears the TRMNL screen");
              } else if (cmd == 'rm test.txt') {
                test = 0;
              } else {
                this.error("Command '" + cmd + "' Not Found!");
              }
            }, {
              prompt: 'home/logs>>> ',
              name: 'logs'
            });
          } else {
            this.error("Sorry, I don't see that here!");
          } //end of if location == logs
        } //end of CD definition
      }, //end of terminal functions,
      { //start of terminal options
        prompt: 'home>>> ',
        greetings: "Welcome to your TRMNL!\n(Type 'help' for a list of available commands at any time)\n",
        exceptionHandler: function(exception) {
          this.echo("Sorry, there was an error with that command!")
        },
        name: "TRMNL"
      });
  });
