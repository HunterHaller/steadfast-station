//Terminal Functions
$(function() {
      console.log("Terminal started!");
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
