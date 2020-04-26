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

    if (localStorage.localConnect == 1) {
      console.log("Game already started, maintaining connection!");
      localConnect = 1;
    } else {
      var localConnect = 0;
      makeWindow(introWindow);
    }

    //SEQUENCE:
    // POWER
    // COMMS
    // THRUSTERS
    // RADAR
    // WEAPONS

    console.log("Terminal started!");
    // stationAudio();
    $('#termWindowBody').terminal({
        "MASTERACCESS": function(){
          if (localStorage.phase2 == 0){
            this.error("Station must be fully operable to enable MASTER mode!");
          } else if (localStorage.master == 1){
            this.error("MASTER already enabled!");
          } else {
            this.echo("Enabling MASTER access. Please confirm Technician passcode to complete:");
            this.push(function(passcode) {
              if (passcode == "t3ch535-729843") {
                this.echo("Passcode accepted");
                localStorage.master = 1;
                this.echo("MASTER mode enabled!");
                this.pop();
              } else if (passcode == "back") {
                this.echo("MASTER process aborted, exiting")
                this.pop();
              } else {
                this.error("Passcode not recognized, exiting");
                this.pop();
              }
            }, {
              prompt: 'passcode>> ',
              name: 'passcodeMaster'
            });
          }
        },
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
            } else if (localStorage.localConnect == 1) {
              this.error("Can't disconnect right now!");
            }
          } else {
            this.error("Disconnect from what now?");
          }
        },
        connect: function(dest) {
          if (dest == "local") {
            if (localStorage.localConnect == 0) {
              this.echo("Succesfully connected to local station!");
              setTimeout(messageStep, 2000, messT1, messT2, messA1);
              document.getElementById("chatTopText").innerHTML = "AI COMMS - ANTNNS";
              $('#userStatus').html('USR: Tech535<br>Connected station: STDFST<br>Signal strength: Strong');
              localStorage.localConnect = 1;
              console.log("localStorage.localConnect = " + localStorage.localConnect);
            } else if (localStorage.localConnect == 1) {
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
            while (1) {
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
          if (localStorage.localConnect == 0){
            this.error("Not connected to station!")
          } else{
            this.echo("AVAILABLE SYSTEMS:")
            this.echo("+ power");
            if (localStorage.progress > 0) {
              this.echo("+ comms");
            }
            if (localStorage.progress > 1) {
              this.echo("+ thrusters");
            }
            if (localStorage.progress > 2) {
              this.echo("+ radar");
            }
            if (localStorage.progress > 3) {
              this.echo("+ weapons");
            }
            if (localStorage.progress < 4) {
              this.echo("\nPerform more maintenance to access more systems!");
            }
          }
        },
        "?": function() { //list available commands
          this.echo("\nTRMNL is a command input point that allows you, the Technician, to input \ncommands relating to your ship as well as interfacing with nearby OCW \nstations. You can use it to give commands relating to the computing device \nitself, perform actions on nearby stations, and more!\n");
          this.echo("AVAILABLE COMMANDS:");
          this.echo("- clear: Clears the TRMNL screen");
          this.echo("- systems: Lists all available systems that can be worked on");
          this.echo("- connect [thing]: Connect to thing");
          this.echo("- disconnect [thing]: Disconnect from thing");
          this.echo("- ?: You know what this does, silly! The info changes when working with\ndifferent systems though, so try it in other areas!");
        },
        power: function() {
          if (localStorage.localConnect == 0) {
            this.error("Not connected to station!");
          } else {
            this.push(function(cmd) {
              if (cmd == "status") {
                this.echo("--------------------");
                this.echo("Station power capacity: " + localStorage.powerCapacity + "%");
                this.echo("--------------------");
              } //end of status
              else if (cmd.includes('charge')) {
                if (localStorage.powerCapacity == 100) {
                  this.error("Station battery already full!");
                } else {
                  var newCharge = cmd.replace('charge', ''); //isolate new info
                  if (newCharge.includes('BAT-7425')) {
                    this.echo("Charging station battery from auxiliary power...");
                    setTimeout(this.echo, 1000, "Finished charging.");
                    localStorage.powerCapacity = 100;
                    localStorage.progress = 1;
                    setTimeout(sendExtraMessage, 2000, messA6);
                    setTimeout(makeWindow, 5000, readoutWindow);
                    localStorage.firstReadoutShown = 1;
                    setTimeout(makeWindow, 5000, assistHint2);
                    setTimeout(makeIcon, 5000, readoutIcon, readoutWindow);
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
          }
        }, //end of power definition
        comms: function() {
          if (localStorage.progress < 1) {
            this.error("Comms inaccessible, power too low!");
          } else if (localStorage.localConnect == 0) {
            this.error("Not connected to station!");
          } else if (localStorage.commsDestroyed == 1) {
            this.error("Comms system inoperable!");
          } else {
            if (localStorage.commsVisited == 0) {
              setTimeout(makeWindow, 200, assistHint3);
              localStorage.commsVisited = 1;
            }
            this.push(function(cmd) {
              if (cmd == 'back') {
                this.pop();
              } else if (cmd == 'status') {
                this.echo("--------------------");
                this.echo("Comms Status: " + localStorage.currentCommsStatus);
                this.echo("Current broadcasting frequency: " + localStorage.currentFrequency);
                this.echo("Current receiving frequency: CW.499.289");
                this.echo("--------------------");
              } else if (cmd == 'frequencies') {
                this.echo("Currently found frequencies:");
                this.echo("+ OCW Station HDSTRNG: CW.520.678");
                this.echo("+ OCW Station PGHDD: CW.238.030");
                this.echo("+ Revulend HQ Tower: RT.421.890");
              } else if (cmd == 'status') {
                this.echo("--------------------");
                this.echo("Rotation: " + localStorage.dishDegrees + " degrees");
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
                  if (newFreq == "CW.499.289"){
                    if (localStorage.master == 0) {
                      this.error("Can't attune station to its own frequency without MASTER privileges!");
                    } else {
                      localStorage.currentFrequency = newFreq;
                      this.echo("Station now broadcasting to frequency " + newFreq);
                      localStorage.currentCommsStatus = 'Connected to OCW station "STDFST"';
                      setTimeout(this.error, 1000, "!!Comms feedback detected!!");
                      setTimeout(this.error, 2000, "CRITICAL ERROR: Comms system experienced a major malfunction due to excess\nsignal feedback, please replace system as soon as possible!");
                      localStorage.commsDestroyed = 1;
                      $('#userStatus').html('USR: Tech535<br>Connected station: STDFST<br>Signal strength: Weak');
                      setTimeout(sendExtraMessage, 4000, messC11);
                      setTimeout(sendExtraMessage, 8000, messC115);
                    }
                  } else {
                    this.echo("Station now broadcasting to frequency " + newFreq);
                    localStorage.currentFrequency = newFreq;
                    if (localStorage.currentFrequency == "RT.421.890") {
                      localStorage.currentCommsStatus = "Connected to Revulend Tower";
                      localStorage.progress = 2;
                      if (localStorage.firstConnection == 0) {
                        //First time successful,
                        setTimeout(messageStep, 2000, messT3, messT4, messA7);
                        localStorage.firstConnection = 1; //stop from sending this message more than once
                      }

                    } else if (localStorage.currentFrequency == "CW.520.678") {
                      localStorage.currentCommsStatus = 'Connected to OCW station "HDSTRNG"';
                    } else if (localStorage.currentFrequency == "CW.238.030") {
                      localStorage.currentCommsStatus = 'Connected to OCW station "PGHDD"';
                    }
                  }
                }
              } else if (cmd == '?') {
                this.echo("AVAILABLE COMMANDS:");
                this.echo("- back: Move back up to home directory")
                this.echo("- clear: Clears the TRMNL screen");
                this.echo("- status: Display status of the comms system");
                this.echo("- frequencies: List all available frequencies");
                this.echo("- attune [frequency]: Sets the frequency for the station to broadcast on.")
              } else {
                this.error("Command invalid !");
              }
            }, {
              prompt: 'comms> ',
              name: 'comms'
            });
          }
        }, //end of comms definition
        thrusters: function() {
          if (localStorage.localConnect == 0){
            this.error("Not connected to station!");
          } else if (localStorage.progress < 2) {
            this.error("Thrusters inaccessible, must be able to alert tower of movement!");
          } else {
            if (localStorage.firstThruster == 0){
              setTimeout(makeWindow, 100, assistHint5);
              localStorage.firstThruster = 1;
            }
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
                this.echo("Station orientation: X." + localStorage.stationX + " Y." + localStorage.stationY);
                this.echo("Objects in view: " + localStorage.visible);
                this.echo("Functions: Normal");
                this.echo("--------------------");
              } else if (cmd == 'orient') {
                this.echo("Beginning orientation process...");
                makeWindow(orientationWindow);
                orientStation(localStorage.stationX, localStorage.stationY);
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
          if (localStorage.progress < 3) {
            this.error("Radar inaccessible, no objects in view!");
          } else if (localStorage.localConnect == 0) {
            this.error("Not connected to station!")
          } else if (localStorage.radarDestroyed == 1){
            this.error("Radar systems inoperable!!");
          } else {
            if (localStorage.firstRadar == 0){
              setTimeout(makeWindow, 100, assistHint7);
              localStorage.firstRadar = 1;
            }
            this.push(function(cmd) {
              if (cmd == 'back') {
                this.pop();
              } else if (cmd == '?') {
                this.echo("AVAILABLE COMMANDS:");
                this.echo("- back: Move back up to home directory");
                this.echo("- clear: Clears the TRMNL screen");
                this.echo("- detect angle [thing]: Where thing is a spatial landmark, gives the \nappropriate angle of thing in degrees relative to the station.  Useful for \npositioning radar dish. (Don't specify a thing to get a list of\navaiable objects!)")
                this.echo("- rotate [#]: Rotates the radar dish to the specified number in degrees. The\ndish has a rotational range of 180 degrees (MASTER privileges allow for a \ngreater range of motion to be entered, but this is not recommended as this \nmay damage the dish.)")
                this.echo("- status: Display status of radar dish")
              } else if (cmd == 'detect angle') {
                this.echo("Please specify an object!");
                this.echo("Available objects include:");
                this.echo("- Etheras\n- PGHDD Station\n- HDSTRNG Station")
              } else if (cmd == 'detect angle Etheras') {
                this.echo("128 degrees");
              } else if (cmd == 'detect angle PGHDD station') {
                this.echo("4 degrees");
              } else if (cmd == 'detect angle HDSTRNG station') {
                this.echo("24 degrees");
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
                  if (newDegrees != localStorage.dishDegrees) { //new angle
                    dishAudio();
                    if (newDegrees > 180 || newDegrees < 0){
                      if (localStorage.master == 1 && localStorage.radarDestroyed == 0){
                        this.echo("Rotating dish to " + newDegrees + " degrees...");
                        localStorage.dishDegrees = newDegrees;
                        dishBreakAudio();
                        setTimeout(this.error, 2000, "!!Radar dish over-rotated!!");
                        setTimeout(this.error, 4000, "Radar dish disconnected due to over-rotation, please attach\nreplacement dish as soon as possible!");
                        localStorage.radarDestroyed = 1;
                        localStorage.radarStatus = "CATASTROPHIC FAILURE";
                        setTimeout(sendExtraMessage, 6000, messC17);
                        setTimeout(sendExtraMessage, 12000, messC18);
                        setTimeout(sendExtraMessage, 17000, messC185);
                        setTimeout(sendExtraMessage, 22000, messC19);
                        setTimeout(sendExtraMessage, 27000, messC195);
                        setTimeout(sendExtraMessage, 32000, messC20);
                      } else {
                        this.error("Requested degree out of range!!");
                      }
                    } else{
                      this.echo("Rotating dish to " + newDegrees + " degrees...");
                      localStorage.dishDegrees = newDegrees;
                      if (localStorage.dishDegrees == "128" && localStorage.dishQuestioned == 0 && localStorage.master == 0) {
                        setTimeout(messageStep, 1300, messT7, messT8, messA14); //REDO THESE
                        localStorage.dishQuestioned = 1;
                        localStorage.progress = 4;
                      }
                    }
                  } else { //number already present
                    this.error("Dish already at that angle!");
                  }
                }
              } else if (cmd == 'status') {
                this.echo("--------------------");
                this.echo("Rotation: " + localStorage.dishDegrees + " degrees");
                this.echo("Functions: " + localStorage.radarStatus);
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
          if (localStorage.progress < 4) {
            this.error("Weapons inaccessible, need radar to aim!");
          } else if (localStorage.localConnect == 0){
            this.error("Not connected to station!");
          } else if (localStorage.weaponsDestroyed == 1) {
            this.error("Weapons system inoperable!")
          } else {
            if (localStorage.firstWeapons == 0){
              setTimeout(makeWindow, 100, assistHint9);
              localStorage.firstWeapons = 1;
            }
            this.push(function(cmd) {
              if (cmd == 'back') {
                this.pop();
                if (localStorage.progress == 5) {
                  //Send final set of messges for phase 1 and initiate deletion of ANTNNS
                }
              } else if (cmd == '?') {
                this.echo("AVAILABLE COMMANDS:");
                this.echo("- back: Move back up to home directory")
                this.echo("- clear: Clears the TRMNL screen");
                this.echo("- status: Display status of radar dish")
                this.echo("- recharge [plasma cells]: Recharges station weapon systems from supplied\ncells as designated, where [plasma cells] is the serial number of the cells\nbeing drawn from.")
                this.echo("- bay: Open or close the firing bay");
                this.echo("- fire: Fires on current target. This operation can only be performed by the\nstation's AI unless user has invoked MASTER privileges.");
              } else if (cmd == 'status') {
                this.echo("--------------------");
                this.echo("Anti-Air Plasma Missiles Ready: " + localStorage.missilesReady);
                this.echo("Firing Bay: " + localStorage.firingBay);
                this.echo("Functions: " + localStorage.weaponsStatus);
                this.echo("--------------------");
              } else if (cmd.includes("recharge")) {
                if (localStorage.missilesReady == 10) {
                  this.error("Missiles already charged!"); //if things have already been charged up, no need to charge again
                } else if (localStorage.firingBay == "Open") {
                  this.error("Firing bay open!  Please close before recharging!");
                } else {
                  var newCharge = cmd.replace("recharge", '');
                  if (!newCharge) {
                    this.error("Please supply a plasma cell to recharge from!");
                  } else {
                    console.log("newDegrees = " + newCharge);
                    if (newCharge.charAt(0) == " ") { //remove leading space if present
                      console.log("Input was " + newCharge);
                      newCharge = newCharge.substr(1);
                      console.log("...now " + newCharge);
                    }
                    if (newCharge == "PLSMA-2923") {
                      this.echo("Charging station weapon systems...");
                      setTimeout(this.echo, 1000, "Readying plasma missiles...");
                      setTimeout(this.echo, 3000, "Done")
                      setTimeout(sendExtraMessage, 5000, messA17);
                      setTimeout(makeWindow, 8000, assistHint10);
                      localStorage.missilesReady = 10;
                      localStorage.progress = 5;
                    } else {
                      this.error("Unknown plasma cell!");
                    }
                  }
                }
              } else if (cmd == "bay") {
                bayAudio();
                if (localStorage.firingBay == "Closed") {
                  localStorage.firingBay = "Open";
                  this.echo("Opening firing bay doors...");
                } else if (localStorage.firingBay == "Open") {
                  this.echo("Closing firing bay doors...");
                  localStorage.firingBay = "Closed";
                }
              } else if (cmd == "fire"){
                if (localStorage.weaponsDestroyed == 1){
                  this.error("Weapons systems offline due to catastrophic failure!");
                } else if (localStorage.missilesReady == 0){
                  this.error("No missiles loaded!");
                } else {
                  if (localStorage.firingBay == "Closed" && localStorage.master == 0){
                    this.error("Cannot fire while firing bay is closed!");
                  } else if (localStorage.master == 0){
                    this.error("Only AI can fire missiles!!");
                  } else if (localStorage.master == 1 && localStorage.firingBay == "Open" && localStorage.missilesReady > 0){
                    this.echo("FIRING MISSILE ON TARGET: empty");
                    setTimeout(this.echo, 4000, "Missiles did not reach target");
                    localStorage.missilesReady--;
                  } else if (localStorage.master == 1 && localStorage.firingBay == "Closed" && localStorage.missilesReady > 0){
                    this.echo("Fire missile while firing bay is closed? (y/n)");
                    this.push(function(yn) {
                      if ((yn == "y" || yn == "Y") && localStorage.weaponsDestroyed == 0){
                        explosionAudio();
                        this.echo("FIRING MISSILE ON TARGET: empty");
                        setTimeout(this.error, 500, "!!EXPLOSION detected in firing bay!!");
                        setTimeout(this.error, 2000, "!!OPEN FLAME detected in firing bay!!");
                        setTimeout(this.error, 5000, "CATASTROPHIC FAILURE, firing bay destroyed! Replace as soon as possible!");
                        localStorage.weaponsDestroyed = 1;
                        localStorage.missilesReady--;
                        localStorage.weaponsStatus = "CATASTROPHIC FAILURE";
                        this.pop();
                      } else {
                        this.echo("Canceling firing procedure...");
                        this.pop();
                      }
                    }, {
                      prompt: "> ",
                      name: "yn"
                    });
                  }
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
        ejectAI: function() {
          if (localStorage.localConnect  == 0){
            this.error("Not connected to station!");
          } else if (localStorage.progress < 5){
            this.error("Station not fully operable. Can only eject when all systems ready!");
          } else if (localStorage.master == 1) {
            this.error("Already used ejection disc!");
          } else {
            if (localStorage.firstEject == 0){
              setTimeout(sendExtraMessage, 1000, messA18);
              localStorage.firstEject = 1;
            }
            this.error("ATTENTION: Ejecting an OCW station's AI without due cause is\npunishable by consequences ranging from termination to city expulsion.\nPlease by certain you are prepared for this action.");
            this.error("Verify Technician passcode, or enter 'back' to exit process:")
            this.push(function(passcode) {
              if (passcode == "t3ch535-729843") {
                if (localStorage.firstPasscode == 0){
                  setTimeout(sendExtraMessage, 1000, messA19);
                  localStorage.firstPasscode = 1;
                }
                this.echo("Passcode accepted");
                this.echo("Ejection process started. Please verify final information for ejection...");
                this.echo("Enter target AI codename (case-sensitive): ");
                this.push(function(codename) {
                  if (codename == "ANTNNS") {
                    if (localStorage.firstCodename == 0){
                      setTimeout(sendExtraMessage, 1000, messA20);
                      setTimeout(makeWindow, 4000, assistHint11);
                      localStorage.firstCodename = 1;
                    }
                    this.echo("Name found and accepted.");
                    this.echo("By ejecting this OCW station's resident AI you agree that it has been\ndetermined to be corrupted, lacking in moral judgement, or otherwise \nincapable of overseeing the station in a safe manner. If found to be in \nerror, you will be subject to termination or further consequences.");
                    this.error("Eject?");
                    this.push(function(decision) {
                      if (decision == "eject" || decision == "EJECT") {
                        this.clear();
                        this.echo("Compiling AI files into ejectable drive...");
                        setTimeout(this.echo, 2000, "Uninstalling AI connections...");
                        setTimeout(this.echo, 4000, "Making final checks...");
                        setTimeout(this.echo, 8000, "Ejecting AI disc...");
                        setTimeout(ejectAudio, 8000);
                        setTimeout(this.echo, 12000, "Ejection process finished.  Resetting system...");
                        setTimeout(phase2Transition, 16988);
                        setTimeout(this.reset, 17000);
                      } else if (decision == "back") {
                        this.pop();
                      }
                    }, {
                      prompt: "",
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
