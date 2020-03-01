class Window {
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

  startTerminal  () {
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
      }, //end of terminal functions,
      { //start of terminal options
        prompt: 'home> ',
        greetings: "Welcome to your Terminal!\n",
        exceptionHandler: function(exception) {
          this.echo("Sorry, there was an error with that command!")
        },
        name: "TRMNL"
      });
  }; //only to be used by the specific terminal window, and would only be opened in that window regardless
}

class Icon {
  constructor(top, left, imgSrc, label, iconID){
    this.top = top;
    this.left = left;
    this.imgSrc = imgSrc;
    this.label = label;
    this.iconID = iconID;
  }
}
