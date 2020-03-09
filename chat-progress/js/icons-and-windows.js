//Icon: top, left, imgSrc, label, iconID
//Window: height, width, top, left, name, content, winID

let termIcon = new Icon(650, 50, "trmnl.png", "TRMNL", "termIcon");
let termWindow = new Window(400, 650, 70, 38, "TRMNL", '', "termWindow");

let playerIcon = new Icon(650, 150, "msc.png", "MSC-PLYR", "playerIcon");
let playerWindow = new Window(160, 300, 138, 638, "MSC-PLYR", "<p>This is a new window!  Maybe one day it will play music or something...", "playerWindow");

let introIcon = new Icon( 650, 250, "text.png", "INTRO.TXT", "introIcon");
let introWindow = new Window(450, 300, 50, 800, "INTRO.TXT", '<h1>Welcome, Technician!</h1><p>If this is your first time out among the stars, we\'re happy to have you! If not, you sure are here again and this file isn\'t for you!</p><p>Assuming you\'re near a WSD station, type <strong>"connect local"</strong> in your TRMNL to start interfacing with the station\'s AI.</p>', "introWindow");

let assistHint1 = new Window (200, 400, 150, 300, "ASSIST-HINT", "<p>Hello, I'm your virtual Assistant!  I recommend you take a look at the <strong>radar dish</strong> first.  Seems a little wonky to me.  (You can type 'dish' to get started there!)</p>", "assistHint1");
let assistHint2 = new Window (200, 400, 150, 300, "ASSIST-HINT", "<p>Looks like the dish isn't pointing to Etheras like it's supposed to.  You should probably rotate the dish so it is!</p>", "assistHint2");
let assistHint3 = new Window (200, 400, 150, 300, "ASSIST-HINT", "<p>Oh no, it seems the AI on this station is... a little screwy.  I don't think it can give you accurate information anymore.  We'll have to be extra careful.</p>", "assistHint3");
