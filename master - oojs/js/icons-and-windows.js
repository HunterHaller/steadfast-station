//Icon: top, left, imgSrc, label, iconID
//Window: height, width, top, left, name, content, winID

let termIcon = new Icon(650, 50, "trmnl.png", "TRMNL", "termIcon");
let termWindow = new Window(400, 650, 70, 38, "TRMNL", '', "termWindow");

let playerIcon = new Icon(650, 150, "msc.png", "MSC-PLYR", "playerIcon");
let playerWindow = new Window(160, 300, 138, 638, "MSC-PLYR", "<p>This is a new window!  Maybe one day it will play music or something...", "playerWindow");

let introIcon = new Icon( 650, 250, "text.png", "INTRO.TXT", "introIcon");
let introWindow = new Window(600, 300, 50, 1100, "INTRO.TXT", '<h1>Welcome, Technician!</h1><p>If this is your first time out among the stars, we\'re happy to have you! If not, you sure are here again and this file isn\'t for you!</p><p>Assuming you\'re near a BHW station, type <strong>"connect local"</strong> in your TRMNL to start interfacing with the station\'s AI.</p>', "introWindow");
