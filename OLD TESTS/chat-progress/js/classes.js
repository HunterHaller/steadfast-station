class Window { //includes terminal code!
  constructor(height, width, top, left, name, content, winID) {
    this.height = height;
    this.width = width;
    this.top = top;
    this.left = left;
    this.name = name;
    this.content = content;
    this.winID = winID;
    this.made = 0; //gets set to 1 after being created with makeWindow function
  }

  hide() {
    $("#" + this.winID).css("display", "none");
    console.log("Hiding #" + this.winID + "...");
  };

  show() {
    console.log("Showing #" + this.winID + "...");
    $("#" + this.winID).css("display", "block");
  };

  startTerminal() {

    var localConnect = 0;

    console.log("Terminal started!");
    $('#termWindowBody').terminal({
        echo: function(arg1) {
          if (arg1 == "clear") {
            this.error("Fool!  You've triggered my trap card!");
            //this.clear();
          } else {
            this.echo(arg1);
          }
        },
        disconnect: function(dest) {
          if (dest == "local") {
            if (localConnect == 0) {
              this.echo("Already disconnected!");
            } else if (localConnect == 1) {
              this.error("Can't disconnect right now!");
            }
          } else {
            this.error("Disconnect from what now?");
          }
        },
        connect: function(dest) {
          if (dest == "local") {
            if (localConnect == 0) {
              this.echo("Succesfully connected to local station!");
              setTimeout(messageStep, 2000, mess1, mess2, mess3);
              setTimeout(makeWindow, 3000, assistHint1);
              localConnect = 1;
            } else if (localConnect == 1) {
              this.error("Already connected!");
            }
          } else {
            this.error("I wouldn't want to connect to " + dest + " if I were you (it doesn't exist)");
          }
        },
        hack: function(thing){
          if (thing == "mainframe"){
            this.echo("You're in! 0w0");
          } else if (thing == "butt"){
            this.echo("0_0");
          }

        },
        commit: function(thing){
          if (thing == "die"){
            while (1 == 1){
              console.log("YOU BE DYIN");
            }
          }
        },
        hello: function() {
          this.echo("Hi there!\nFor a real conversation, you should find an Artificial Intelligence \nor another person!");
        },
        Hello: function() {
          this.echo("Hi there!\nFor a real conversation, you should find an Artificial Intelligence \nor another person!");
        },
        ls: function() {
          this.echo("dish\nthrusters\nweapons\n");
          this.echo("stuff.txt\nhelp.txt")
          // if (test == 1) {
          //   this.echo("test.exe");
          // }
        },
        "?": function() { //list available commands
          this.echo("\nTRMNL is a command input point that allows you, the Technician, to input \ncommands relating to your ship as well as interfacing with nearby BHW \nstations. You can use it to give commands relating to the computing device \nitself, look through and manipulate files in the storage or your ship or \nnearby stations, and more!\n");
          this.echo("AVAILABLE COMMANDS:");
          this.echo("- ls: List all systems and files in current directory");
          this.echo("- connect [thing]: Connect to thing");
          this.echo("- disconnect [thing]: Disconnect from thing");
          this.echo("- help [command]: Display info on how to use a command (context specific)");
          this.echo("- ?: You know what this does, silly!");
          this.echo("- clear: Clears the TRMNL screen");
        },
        help: function(topic) {
          if (topic == "disconnect") {
            this.echo("'disconnect' has a couple of available options.  You can follow the command \nwith 'local' if you want to disconnect from a nearby BHW station, or you can \ntype 'Net' to disconnect from the Interstellar Network.  \nAlso note that the reverse of these operations is possible with the \n'connect' command.")
          } else if (topic == "ls") {
            this.echo("'ls' lists ")
          }
        },
        dish: function() {
          this.push(function(cmd) {
            console.log("Working with commands cmd = " + cmd);
            if (cmd == 'ls') {
              this.echo('No systems!');
            } else if (cmd == 'back') {
              this.pop();
            } else if (cmd == '?') {
              this.echo("AVAILABLE COMMANDS:");
              this.echo("- back: Move back up to home directory")
              this.echo("- clear: Clears the TRMNL screen");
              this.echo("- detect angle [thing]: Where thing is a quadrant of space or a spatial \nlandmark, gives the appropriate angle of thing in degrees.  Useful for \npositioning radar dish. (Don't specify a thing to get a list of \navaiable objects!)")
              this.echo("- rotate [#]: Rotates the radar dish to the specified number in degrees")
              this.echo("- status: Display status of radar dish")
            } else if (cmd == 'detect angle') {
              this.echo("Please specify an object!");
              this.echo("Available objects include:\n- Etheras (world station)\n- Alpha Quadrant\n- Beta Quadant\n- Gamme Quadrant\n- Delta Quadrant")
            } else if (cmd == 'detect angle Etheras') {
              if (etherasDetected == 0){
                etherasDetected = 1;
                makeWindow(assistHint2);
              }
              this.echo("128 degrees");
            } else if (cmd == 'detect angle Alpha Quadrant') {
              this.echo("4 degrees");
            } else if (cmd == 'detect angle Beta Quadrant') {
              this.echo("24 degrees");
            } else if (cmd == 'detect angle Gamma Quadrant') {
              this.echo("258 degrees (out of range)");
            } else if (cmd == 'detect angle Delta Quadrant') {
              this.echo("301 degrees (out of range)");
            } else if (cmd.includes('rotate')) {
              var newDegrees = cmd.replace('rotate ', '');
              if (newDegrees != dishDegrees){ //new angle
                this.echo("Rotating dish to " + newDegrees + " degrees...");
                dishDegrees = newDegrees;
                if (dishDegrees == "128" && dishQuestioned == 0){
                  setTimeout(messageStep, 1300, mess9, mess10, mess11);
                  setTimeout(makeWindow, 4000, assistHint3);
                  dishQuestioned = 1;
                }
              } else{ //number already present
                this.error("Dish already at that angle!");
              }
            } else if (cmd == 'status') {
              this.echo("--------------------");
              this.echo("Rotation: " + dishDegrees + " degrees");
              this.echo("Functions: Normal");
              this.echo("--------------------");
            }else {
              this.error("Command invalid!");
            }
          }, {
            prompt: 'dish> ',
            name: 'logs'
          });
        } //end of CD definition
      }, //end of terminal functions,
      { //start of terminal options
        prompt: '> ',
        greetings: "Welcome to your TRMNL!\n(Type '?' for a list of available commands at any time)\n",
        exceptionHandler: function(exception) {
          this.echo("Sorry, there was an error with that command!")
        },
        name: "TRMNL"
      });
  }; //only to be used by the specific terminal window, and would only be opened in that window regardless
}

class Icon {
  constructor(top, left, imgSrc, label, iconID) {
    this.top = top;
    this.left = left;
    this.imgSrc = imgSrc;
    this.label = label;
    this.iconID = iconID;
  }
}

class Message {
  constructor(sender, message, preview, messID) {
    this.sender = sender;
    this.message = message;
    this.preview = preview;
    this.messID = messID;
    this.timeStamp = new Date();
  }
}
