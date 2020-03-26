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
    var progress = 4; //starts at zero, progresses as you play through first phase
    //Progress is set to max for debugging purposes

    //Power
    var powerCapacity = 13;

    //Comms
    var commsVisited = 0;
    var firstConnection = 0;
    var currentFrequency = "XY.123.234";
    var currentCommsStatus = "Disconnected";

    //Thrusters
    var visible = "None"

    //Radar
    var dishDegrees = 24;

    //Weapons
    var firingBay = "Open";
    var missilesReady = 0;


    //SEQUENCE:
    // POWER
    // COMMS
    // THRUSTERS
    // RADAR
    // WEAPONS

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
              localConnect = 1;
            } else if (localConnect == 1) {
              this.error("Already connected!");
            }
          } else {
            this.error("I wouldn't want to connect to " + dest + " if I were you (it doesn't exist)");
          }
        },
        hack: function(thing) {
          if (thing == "mainframe") {
            this.echo("You're in! 0w0");
          } else if (thing == "butt") {
            this.echo("0_0");
          }
        },
        commit: function(thing) {
          if (thing == "die") {
            while (1 == 1) {
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
        systems: function() {
          this.echo("AVAILABLE SYSTEMS:")
          this.echo("+ power");
          if (progress > 0) {
            this.echo("+ comms");
          }
          if (progress > 1) {
            this.echo("+ weapons");
          }
          if (progress > 2) {
            this.echo("+ radar");
          }
          if (progress > 3) {
            this.echo("+ thrusters");
          }
          if (progress < 4) {
            this.echo("\nPerform more maintenance to access more systems!");
          }
        },
        "?": function() { //list available commands
          this.echo("\nTRMNL is a command input point that allows you, the Technician, to input \ncommands relating to your ship as well as interfacing with nearby OCW \nstations. You can use it to give commands relating to the computing device \nitself, perform actions on nearby stations, and more!\n");
          this.echo("AVAILABLE COMMANDS:");
          this.echo("- systems: Lists all available systems that can be worked on");
          this.echo("- connect [thing]: Connect to thing");
          this.echo("- disconnect [thing]: Disconnect from thing");
          this.echo("- ?: You know what this does, silly! Its info changes when working with different systems though, so try it in other areas!");
          this.echo("- clear: Clears the TRMNL screen");
        },
        power: function() {
          this.push(function(cmd) {
            if (cmd == "status") {
              this.echo("--------------------");
              this.echo("Station power capacity: " + powerCapacity + "%");
              this.echo("--------------------");
            } //end of status
            else if (cmd.includes('charge')) {
              if (powerCapacity == 100) {
                this.error("Station battery already full!");
              } else {
                var newCharge = cmd.replace('charge', ''); //isolate new info
                if (newCharge.includes('BAT-7425')) {
                  this.echo("Charging station battery from auxiliary power...");
                  setTimeout(this.echo, 1000, "Finished charging.");
                  powerCapacity = 100;
                  progress = 1;
                  setTimeout(sendExtraMessage, 2000, mess8);
                  setTimeout(makeWindow, 5000, assistHint2);
                } else {
                  this.echo("Battery not found!");
                }
              }
            } //end of charge
            else if (cmd == "back") {
              this.pop();
            } //end of back
            else if (cmd == "?") {
              this.echo("AVAILABLE COMMANDS:");
              this.echo("- back: Move back up to home directory")
              this.echo("- clear: Clears the TRMNL screen");
              this.echo("- status: Display status of the connected station's main battery")
              this.echo("- charge [battery]: Charges the connected station's main battery via \ndocked ship's auxiliary battery, where [battery] is the serial number of the \naux battery.  This number can usually be found inside the ship's data logs.")
            } //end of ?
            else {
              this.error("Command invalid");
            } //end of else
          }, {
            prompt: 'power> ',
            name: 'power'
          });
        }, //end of power definition
        comms: function() {
          if (progress < 1) {
            this.error("Comms inaccessible, power too low!");
          } else {
            if (commsVisited == 0) {
              setTimeout(makeWindow, 200, assistHint3);
              commsVisited = 1;
            }
            this.push(function(cmd) {
              if (cmd == 'back') {
                this.pop();
              } else if (cmd == 'status') {
                this.echo("--------------------");
                this.echo("Comms Status: " + currentCommsStatus);
                this.echo("Current broadcasting frequency: " + currentFrequency);
                this.echo("Current receiving frequency: CW.499.289");
                this.echo("--------------------");
              } else if (cmd == 'frequencies') {
                this.echo("Currently found frequencies:");
                this.echo("+ OCW Station HDSTRNG: CW.520.678");
                this.echo("+ OCW Station PGHDD: CW.238.030");
                this.echo("+ Revulend HQ Tower: RT.421.890");
              } else if (cmd == 'status') {
                this.echo("--------------------");
                this.echo("Rotation: " + dishDegrees + " degrees");
                this.echo("Functions: Normal");
                this.echo("--------------------");
              } else if (cmd.includes('attune')) {
                console.log("Attuning input " + cmd);
                var newFreq = cmd.replace('attune', '');
                if (!newFreq) {
                  this.error("Please supply a frequency!");
                } else {
                  console.log("newFreq = " + newFreq);
                  if (newFreq.charAt(0) == " ") {
                    console.log("Input was " + newFreq);
                    newFreq = newFreq.substr(1);
                    console.log("...now " + newFreq);
                  }
                  this.echo("Station now broadcasting to frequency " + newFreq);
                  currentFrequency = newFreq;
                  if (currentFrequency == "RT.421.890") {
                    currentCommsStatus = "Connected to Revulend Tower";
                    if (firstConnection == 0) {
                      //First time successful,
                      setTimeout(messageStep, 2000, mess10, mess11, mess9);
                      firstConnection = 1; //stop from sending this message more than once
                      progress = 2;
                    }
                  } else if (currentFrequency == "CW.520.678") {
                    currentCommsStatus = 'Connected to OCW station "HDSTRNG"';
                  } else if (currentFrequency == "CW.238.030") {
                    currentCommsStatus = 'Connected to OCW station "PGHDD"';
                  }
                }
              } else if (cmd == '?') {
                this.echo("AVAILABLE COMMANDS:");
                this.echo("- back: Move back up to home directory")
                this.echo("- clear: Clears the TRMNL screen");
                this.echo("- status: Display status of the comms system");
                this.echo("- frequencies: List all available frequencies");
                this.echo("- attune [frequency]: Attunes the station to listen in on the specified \nfrequency.  If no frequency is specified, one will be asked for.")
              } else {
                this.error("Command invalid!");
              }
            }, {
              prompt: 'comms> ',
              name: 'comms'
            });
          }
        }, //end of comms definition
        thrusters: function() {
          if (progress < 2) {
            this.error("Thrusters inaccessible, must be able to alert tower or other station \nof movement!");
          } else {
            this.push(function(cmd) {
              if (cmd == 'back') {
                this.pop(); //pop back up
              } else if (cmd == '?') { //offer helpful advice
                this.echo("AVAILABLE COMMANDS:");
                this.echo("- back: Move back up to home directory")
                this.echo("- clear: Clears the TRMNL screen");
                this.echo("- status: Display status of station orientation")
                this.echo("- orient: Begin station orientation process")
              } else if (cmd == 'status') {
                this.echo("--------------------");
                this.echo("Station orientation: X." + stationX + " Y." + stationY);
                this.echo("Objects in view: " + visible);
                this.echo("Functions: Normal");
                this.echo("--------------------");
              } else if (cmd == 'orient') {
                this.echo("Beginning orientation process...");
                makeWindow(orientationWindow);
                orientStation(stationX, stationY);
              } else {
                this.error("Command invalid!");
              }
            }, {
              prompt: 'thrusters> ',
              name: 'thrusters'
            });
          }
        }, //end of thrusters
        radar: function() {
          if (progress < 3) {
            this.error("Radar inaccessible, no objects in view!");
          } else {
            this.push(function(cmd) {
              if (cmd == 'back') {
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
                if (etherasDetected == 0) {
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
              } else if (cmd.includes('rotate')) { //FIX THIS FUNCTION!  ACCEPTS SINGLE ARGUMENT INPUTS WHEN IT SHOULD NOT, E.G. "ROTATE128" AND BREAKS THE FLOW
                var newDegrees = cmd.replace('rotate', '');
                if (!newDegrees) {
                  this.error("Please supply a degree to rotate to!");
                } else {
                  console.log("newDegrees = " + newDegrees);
                  if (newDegrees.charAt(0) == " ") { //remove leading space if present
                    console.log("Input was " + newDegrees);
                    newDegrees = newDegrees.substr(1);
                    console.log("...now " + newDegrees);
                  }
                  if (newDegrees != dishDegrees) { //new angle
                    this.echo("Rotating dish to " + newDegrees + " degrees...");
                    dishDegrees = newDegrees;
                    if (dishDegrees == "128" && dishQuestioned == 0) {
                      setTimeout(messageStep, 1300, mess9, mess10, mess11); //REDO THESE
                      setTimeout(makeWindow, 4000, assistHint3); //AND THESE
                      dishQuestioned = 1;
                    }
                  } else { //number already present
                    this.error("Dish already at that angle!");
                  }
                }
              } else if (cmd == 'status') {
                this.echo("--------------------");
                this.echo("Rotation: " + dishDegrees + " degrees");
                this.echo("Functions: Normal");
                this.echo("--------------------");
              } else {
                this.error("Command invalid!");
              }
            }, {
              prompt: 'radar> ',
              name: 'radar'
            });
          }
        }, //end of radar
        weapons: function() {
          if (progress < 4) {
            this.error("Weapons inaccessible, need radar to aim!");
          } else {
            this.push(function(cmd) {
              if (cmd == 'back') {
                this.pop();
                if (progress == 5){
                  //Send final set of messges for phase 1 and initiate deletion of ANTNNS
                }
              } else if (cmd == '?') {
                this.echo("AVAILABLE COMMANDS:");
                this.echo("- back: Move back up to home directory")
                this.echo("- clear: Clears the TRMNL screen");
                this.echo("- status: Display status of radar dish")
                this.echo("- recharge [plasma cells]: Recharges station weapon systems from supplied cells as designated, where [plasma cells] is the serial number of the cells being drawn from.")
              } else if (cmd == 'status') {
                this.echo("--------------------");
                this.echo("Anti-Air Plasma Missiles Ready: " + missilesReady);
                this.echo("Firing Bay: " + firingBay);
                this.echo("Functions: Normal");
                this.echo("--------------------");
              } else if (cmd.includes("recharge")){
                if (missilesReady == 10) {
                  this.error("Missiles already charged!");//if things have already been charged up, no need to charge again
                } else if (firingBay == "Open"){
                  this.error("Firing bay open!  Please close before recharging!");
                } else{
                  var newCharge = cmd.replace("recharge", '');
                  if (!newCharge){
                    this.error("Please supply a plasma cell to recharge from!");
                  } else {
                    console.log("newDegrees = " + newCharge);
                    if (newCharge.charAt(0) == " ") { //remove leading space if present
                      console.log("Input was " + newCharge);
                      newCharge = newCharge.substr(1);
                      console.log("...now " + newCharge);
                    }
                    if (newCharge == "PLSMA-2923"){
                      this.echo("Charging station weapon systems...");
                      setTimeout(this.echo, 1000, "Readying plasma missiles...");
                      setTimeout(this.echo, 3000, "Done")
                      missilesReady = 10;
                      progress = 5;
                    } else{
                      this.error("Unknown plasma cell!");
                    }
                  }
                }
              } else if (cmd == "bay"){
                if (firingBay == "Closed"){
                  firingBay = "Open";
                  this.echo("Opening firing bay doors...");
                } else if (firingBay == "Open"){
                  this.echo("Closing firing bay doors...");
                  firingBay = "Closed";
                }
              } else {
                this.error("Command invalid!");
              }
            }, {
              prompt: 'weapons> ',
              name: 'weapons'
            });
          }
        }, //end of weapons
        ejectAI: function(){
          this.error("ATTENTION: Ejecting an OCW station's AI without due cause is+\npunishable by punishments ranging from termination to city expulsion.\nPlease by certain you are prepared for this action.");
          this.error("Verify Technician passcode, or enter 'back' to exit process:")
          this.push(function(passcode){
            if (passcode == "passcode"){
              this.echo("Passcode accepted");
              this.echo("Ejection process started. Please verify final information for ejection...");
              this.echo("Enter target AI codename (case-sensitive): ");
              this.push(function(codename){
                if (codename == "ANTNNS"){
                  this.echo("Name found and accepted.");
                  this.echo("By ejecting this OCW station's resident AI you agree that it has been\ndetermined to be corrupted, lacking in moral judgement, or otherwise incapable of overseeing the station in a safe manner. If found to be in error, you will\nbe subject to termination or further consequences.");
                  this.error("Eject?");
                  this.push(function(decision){
                    if (decision == "eject"){
                      this.clear();
                      this.echo("Compiling AI files into ejectable drive...");
                      setTimeout(this.echo, 2000, "Uninstalling AI connections...");
                      setTimeout(this.echo, 4000, "Making final checks...");
                      setTimeout(this.echo, 8000, "Ejecting AI disc...");
                      setTimeout(this.echo, 10000, "Ejection process finished.  Resetting system...");
                      setTimeout(this.reset, 15000);
                    } else if (decision == "back"){
                      this.pop();
                    }
                  }, {
                    prompt: "" ,
                    name: "decision"
                  })
                  // this.reset();
                } else if (codename == "back") {
                  this.pop();
                } else {
                  this.error("Name not found!");
                }
              }, {
                prompt: "codename>>> ",
                name: "codename"
              });
            } else if (passcode == "back") {
              this.echo("Ejection process aborted, exiting")
              this.pop();
            } else {
              this.error("Passcode not recognized, exiting");
              this.pop();
            }
          }, {
            prompt: 'passcode>> ',
            name: 'passcode'
          });
        }
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
