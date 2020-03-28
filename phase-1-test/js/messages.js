//Message: sender, message, preview, id

let messA = new Message; //left option
let messB = new Message; //right option

let blankMess = new Message("none", "", "", "");

//Intro messages
let messT1 = new Message("Technician", "Just here for routine maintenance", "Just maintenance", "T1");
let messT2 = new Message("Technician", "Just wanted to drop in and say hello!", "Just saying hi!", "T2");
let messA1 = new Message("AI", "Welcome, Technician! What brings you to my station?", "", "A1");

//2.1 - "Just routine maintenance"
let messA2 = new Message("AI", "Understood!  Let me know if you need my assistance with anyth", "", "A2");

//2.2 - "Just saying hi!"
let messA3 = new Message("AI", "How thoughtful! Hello indeed!  I suspect you have work to do however.  Let me know if you need anthin", "", "A3");

//4 - "Just here for maintenance."
  let messA4 = new Message("AI", "anything*\n\nPardon my typo... Decades of comms and I still mess it up, silly me... -_-", "", "A4");
let messA5 = new Message("AI", "Anyway, mind taking a look at my battery first?", "", "A5");

//5 - After charging station battery
let messA6 = new Message("AI", "Thanks for the boost!  I was feeling a little parched there, haha!", "", "A6");

//6 - After attuning station frequency
let messA7 = new Message("AI", "Nice work!  I've missed talking to my friends in Etheras... That was a joke, I can't really talk to anyone :( maybe someday though!", "", "A7");
let messT3 = new Message("Technician", "How long have you worked here?", "Been here long?", "T3");
let messT4 = new Message("Technician", "I bet you're a great conversationalist!", "You're fun to talk to!", "T4");

//7 - how long have you worked here?
let messA8 = new Message("AI", "Oh, something like 40 years?  Long time for one place, perhaps, but it's not so bad.  I'm sure I'll be out of here someday!", "", "A8");

//8 - Great conversationalist
let messA9 = new Message("AI", "Tthanks! ^_^ I don't get much real conversation, but I do lots of writing in my free time (which I have a lot of).  Gets a little angsty I admit, but it passes the time... Maybe it helps with real conversation?", "", "A9");

//9 - Successful station orientation
let messA10 = new Message("AI", "Excellent, the city is in view.  I can properly oversee its protection now >:)", "", "A10");
let messA11 = new Message("AI", "Say, do you live down there in Etheras?", "", "A11");
let messT5 = new Message("Technician", "Yes, I live in a nice apartment in the city!", "Yes, a nice apartment", "T5");
let messA12 = new Message("AI", "Oh that sounds amazing!  I wish I could go somewhere like that... Who knows, maybe one day if I'm unfit for station duty, I can go live somewhere down there...", "", "A12");
let messT6 = new Message("Technician", "I live in a crappy building on the outskirts, yeah", "Yes, on the outskirts", "T6")
let messA13 = new Message("AI", "I see... Well, it can't be much worse than being up here.  At least you have people to talk to, things to do...", "", "A13");

//10 - Successful radar rotation
let messA14 = new Message("AI", "Hmm... Pointing the dish right at the city is an odd choice, but it works I suppose. Thanks!", "", "A14");
let messT7 = new Message("Technician", "My Assistant AI told me to put it there", "Not my idea!", "T7");
let messA15 = new Message("AI", "Really? Strange... Usually it gets pointed out into space more. Are they confused? Or am I? Maybe I'm not up to protocol...", "", "A15");
let messT8 = new Message("Technician", "Where is it usually pointed?", "What's the usual?", "T8");
let messA16 = new Message("AI", "It's generally pointed out into space so it can see more asteroids and stuff. But hey, if things are different, who am I to argue?", "", "A16");

let messA17 = new Message("AI", "Awesome, I see you got my weapons ready to fire again! If I'm not mistaken, that should mean everything is ready to go again... Thanks for your help!", "", "A17");

let messA18 = new Message("AI", "Whoa, hey, did you just start the eject sequence?  Come oooon, things aren't that bad, right?", "", "A18");
let messA19 = new Message("AI", "Oof, okay, you're still going. Hmm... Did not see this coming. I think I'll survive if you do this, but like, still kind of a bummer. Can't we work this out?", "", "A19");
let messA20 = new Message("AI", "I guess this is it huh. Stay on your toes, Technician... and keep an eye out for me, eh?", "", "A20");

let messC1 = new Message("CLGLA", "Hey, Technician.  Sorry about all this fuss and getting you dragged into this.", "", "C1");
