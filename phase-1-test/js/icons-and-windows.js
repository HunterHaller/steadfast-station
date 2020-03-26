//Icon: top, left, imgSrc, label, iconID
//Window: height, width, top, left, name, content, winID

let termIcon = new Icon(650, 50, "trmnl.png", "TRMNL", "termIcon");
let termWindow = new Window(400, 650, 70, 38, "TRMNL", '', "termWindow");

let playerIcon = new Icon(650, 150, "msc.png", "MSC-PLYR", "playerIcon");
let playerWindow = new Window(160, 300, 138, 638, "MSC-PLYR", "<p>This is a new window!  Maybe one day it will play music or something...</p>", "playerWindow");

let introIcon = new Icon( 650, 250, "text.png", "INTRO.TXT", "introIcon");
let introWindow = new Window(450, 300, 50, 800, "INTRO.TXT", '<h1>Welcome, Technician!</h1><p>If this is your first time out among the stars, we\'re happy to have you! If not, you sure are here again and this file isn\'t for you!</p><p>Assuming you\'re near a OCW station, type <strong>"connect local"</strong> in your TRMNL to start interfacing with the station\'s AI.</p>', "introWindow");

let settingsIcon = new Icon( 650, 350, "gear.png", "STTNGS", "settingsIcon");
let settingsWindow = new Window (400, 400, 180, 300, "STTNGS", "<button id='toggleFlickerButton' class='buttonOff' type='button' onClick='toggleFlicker()'>Flicker Reduction</button>", "settingsWindow");

let assistantIcon = new Icon (650, 430, "text.png", "ASSIST-HINT LOG", "assistantIcon");
let assistantLog = new Window (400, 500, 75, 750, "ASSIST-HINT LOG", '', "assistantLog");

let orientationWindow = new Window (200, 158, 300, 400, "ORNTTN", "<p>X.<span id='xDisplay'></span></p><p>Y.<span id='yDisplay'></span></p><button id='exitButton' onClick='stopOrientation()'>STOP ORIENTATION</button>", "orientationWindow")

let assistHint1 = new Window (330, 400, 245, 552, "ASSIST-HINT", "<p>Hey there!  I'm your virtual Assistant, here to guide you through the task of fixing up this OCW station.  Looks like you'll want to recharge the station's main power core first.  They usually get solar power, but this one's a little low still.  Type 'power' to get started, and of course, use '?' to get extra info on useful commands!</p>", "assistHint1");
let assistHint2 = new Window (340, 400, 245, 552, "ASSIST-HINT", "<p>Great work!  This station will be functional for months to come now.</p><p>If you type 'systems', you'll see a list of other station components you need to attend to.  I'll also throw up a readout that shows which systems are fully functional so you can track your progress!  And of course, I'll still be around to help out when you need me.</p>", "assistHint2");
let assistHint3 = new Window (430, 400, 245, 552, "ASSIST-HINT", "<p>Let's check out the station-to-ground communications system.  Looks like it's a bit out of order, so the station can't currently contact the Rev tower below.  I suspect the last time the station shot something down, the resonant frequencies from the missiles scrambled things.  Again, this has been known to happen sometimes, though it means the station's operative AI was being a bit careless.</p><p>As always, use '?' to useful info, and work towards reaching the tower's frequency!", "assistHint3");
