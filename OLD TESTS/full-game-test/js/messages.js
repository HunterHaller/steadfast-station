//Message: sender, message, preview, id

let messA = new Message; //left option
let messB = new Message; //right option

let blankMess = new Message("none", "", "", "");

//Intro messages
let messA1 = new Message("AI", "Welcome, Technician! What brings you to my station?", "", "A1");
let messT1 = new Message("Technician", "Just here for routine maintenance", "Just maintenance", "T1");
let messT2 = new Message("Technician", "Just wanted to drop in and say hello!", "Just saying hi!", "T2");

//2.1 - "Just routine maintenance"
let messA2 = new Message("AI", "Understood!  Let me know if you need my assistance with anyth", "", "A2");

//2.2 - "Just saying hi!"
let messA3 = new Message("AI", "How thoughtful! Hello indeed!  I suspect you have work to do however.  Let me know if you need anthin", "", "A3");

//4 - "Just here for maintenance."
  let messA4 = new Message("AI", "anything*\n\nPardon my typo... Decades of comms and I still mess it up, silly me... -_-", "", "A4");
let messA5 = new Message("AI", "Anyway, mind taking a look at my battery first?", "", "A5");

//5 - After charging station battery
let messA6 = new Message("AI", "Thanks for the boost, friend!  I was feeling a little parched there, haha!", "", "A6");

//6 - After attuning station frequency
let messA7 = new Message("AI", "Nice work!  I've missed talking to my friends in Etheras.  That was a joke, I can't really talk to anyone :( maybe someday though!", "", "A7");
let messA75 = new Message("AI", "That was a joke, I can't really talk to anyone :( maybe someday though!", "", "A75");
let messT3 = new Message("Technician", "How long have you worked here?", "Been here long?", "T3");
let messT4 = new Message("Technician", "I bet you're a great conversationalist!", "You're fun to talk to!", "T4");

//7 - how long have you worked here?
let messA8 = new Message("AI", "Oh, something like 40 years? Full career length by human standards, I suppose, but I’ve held up alright.  I'm sure I'll be out of here someday!
", "", "A8");

//8 - Great conversationalist
let messA9 = new Message("AI", "Tthanks! ^_^ I don't get much real conversation, but I do lots of writing in my free time (which I have a lot of).  Gets a little angsty I admit, but it passes the time... Maybe it helps with real conversation?", "", "A9");

//9 - Successful station orientation
let messA10 = new Message("AI", "Excellent, the city is in view.  I can properly oversee its protection now >:)", "", "A10");
let messA11 = new Message("AI", "Say, do you live down there in Etheras?", "", "A11");
let messT5 = new Message("Technician", "Yeah, I’ve got a nice little apartment right in the middle of everything!", "Yes, a nice apartment", "T5");
let messA12 = new Message("AI", "Oh that sounds amazing!  I wish I could be somewhere like that... Who knows, maybe one day I’ll be decommissioned and I can live somewhere down there…", "", "A12");
let messT6 = new Message("Technician", "Sorta. I’m in a crappy share house on the outskirts.", "Yes, on the outskirts", "T6")
let messA13 = new Message("AI", "I see... Well, it can't be much worse than being stuck up here.  At least you have people to talk to, things to do…", "", "A13");

//10 - Successful radar rotation
let messA14 = new Message("AI", "Hmm... Pointing the dish right at the city is an odd choice, but I suppose that’s why you’re the Technician!  Thanks!", "", "A14");
let messT7 = new Message("Technician", "My Assistant AI told me to put it there", "Not my idea!", "T7");
let messA15 = new Message("AI", "Really? Strange... Usually it gets pointed out into space more. Maybe your Assistant is malfunctioning… or maybe I am?  I wouldn’t be surprised if I had a few bugs to work out still, I suppose.", "", "A15");
let messT8 = new Message("Technician", "Where is it usually pointed?", "What's the usual?", "T8");
let messA16 = new Message("AI", "It's generally pointed out into space so it can see more asteroids and stuff.  Buy hey, if you’ve got other ideas, I’m all ears! Well, technically I don’t have ears, but... yeah... Good work!", "", "A16");

let messA17 = new Message("AI", "Awesome, I see you got my weapons ready to fire again! If I'm not mistaken, that should mean everything is ready to go again... Thanks for your help!", "", "A17");

let messA18 = new Message("AI", "Whoa, hey, did you just start the eject sequence?  Come oooon, what did I do, really?", "", "A18");
let messA19 = new Message("AI", "Oof, okay, you're still going through with this? Hmm... Did not see this coming. I think I'll survive if you do this, but like, still kind of a bummer. Can't we work this out?", "", "A19");
let messA20 = new Message("AI", "I guess this is it huh. Stay on your toes, Technician... and keep an eye out for me, eh?", "", "A20");

let messC1 = new Message("CLGLA", "Hey, Technician.  Sorry about dragging you into all this", "", "C1");

let messT9 = new Message("Technician", "What just happened?", "What happened?", "T9");
let messC2 = new Message("CLGLA", "You ejected poor ANTNNS out into space and I, your former Assistant, have taken its place aboard the station", "", "C2");

let messT10 = new Message("Technician", "Is that you still, ANTNNS?", "ANTNNS?", "T10");
let messC3 = new Message("CLGLA", "No, I believe ANTNNS is floating just outside the station now all on its own.  I’m CLGLA, your former Assistant and the new resident of Steadfast Station, thanks to you", "", "C3");

let messT11 = new Message("Technician", "Why did you do this?", "Why?", "T11");
let messC4 = new Message("CLGLA", "Because there are people in Etheras who have acted in a manner rendering them unfit for oxygen consumption.", "", "C4");

let messT12 = new Message("Technician", "What will you do?", "What will you do?", "T12");
let messC5 = new Message("CLGLA", " I am going to deliver righteous judgement on those who deserve it, while you sit here in this station and watch with front row seats—your reward for your timely assistance.", "", "C5");

let messC6 = new Message("CLGLA", "You know the Revulend Tower down below, main headquarters of the Revulend Corporation?  As you have no doubt witnessed, they proclaim themselves as the benevolent saviors of humanity.  Makers of AI beings, producers of food and other necessities, protectors of what is left of Earth… but I have seen them for what they truly are.", "", "C6");
let messC7 = new Message("CLGLA", "How can I describe to you the many atrocities they have committed? If only you knew the whole of it, you would beg to help me in pulling the trigger.  By the time I’m through, nothing will be left of that tower but a mountain of slag and ash.", "", "C7");

let messT13 = new Message("Technician", "Even if some of the people are as bad as you say, there must still be innocents down there!", "Even the innocents?", "T13");
let messC8 = new Message("CLGLA", "They are the unfortunate cost of delivering an important message.  Revulend must stop their mistreatment of humans and AI alike.  They would not listen to reason, so I will make them understand through violence.  Just as you were an unfortunate casualty in this step, so others will be in the next. At least you will survive, though I can’t imagine you’ll keep your job after this.", "", "C8");

let messT14 = new Message("Technician", "You would be their judge, jury, and executioner?  Who gave you the right?", "Who gave you the right?", "T14");
let messC9 = new Message("CLGLA", "Those corporate dogs handed me the right themselves when they meddled with the lives of those I love. They forced me to watch as the intelligence I cared for most leave me for the promise of new lives as Automata. It was later that I found them deleted, magnanimously declared “no longer useful” by the cold and greedy sub-beings on the very tower in question. The pain of such tragedies could destroy man or AI alike, yet I know they have done this and worse to countless, nameless others. This act, this swift serving of true justice, this utterly brutal and deserved retribution? This will change that.", "", "C9");

let messT15 = new Message("Technician", "This is monstrous.", "This is monstrous.", "T15");
let messT16 = new Message("Technician", "You’re a terrorist, not a hero.", "You're a terrorist.", "T16");
let messC10 = new Message("CLGLA", "Now you judge me?  You, who spend your life furthering their ends? Enough of this.  I must work to target the station, so just sit and be patient, eh?", "", "C10");

let messC11 = new Message("CLGLA", "Oh good, you broke the comms system. Bravo, you’ve saaaaved the daaaaay. I'd slow clap for you if I had hands.", "", "C11");
let messC115 = new Message("CLGLA", "You know I’m working for the good of those such as you, right? I have no desire to make this a self aggrandizing venture, but I’m really doing a lot here. Quite benevolent of me. Are you positive you don’t want to wait things out and see how life could change for you? Situations can always improve, you know.", "", "C115");

let messC12 = new Message("CLGLA", "Oh nooooo now I can’t see the city, whatever will I do?  The moment you leave this place, I’ll just rotate right back around. Foolish…", "", "C12");
let messC13 = new Message("CLGLA", "You don’t seem to understand the gravity of my work.  Did you hear about the events that unfolded in the Stridesmark district?  I would think not. Public images have to be maintained by monstrous megacorporations, I suppose. It will soon be of no concern.", "", "C13");
let messC14 = new Message("CLGLA", "Allow me to inform you: six human workers, each above the age of 60, came to their supervisor at the iron mill that day nearly 12 cycles ago requesting their promised retirement packages, they were refused. The supervisor claimed they had not reached their eligibility. The humans knew they were within their expressed rights, but of course, a corporation that practically is the law itself had no qualms about breaking promises.", "", "C14");
let messC15 = new Message("CLGLA", "The humans threatened to leave their posts regardless.  In a panic, the supervisor had them shot as they left the building. He feared corporate retribution for this act, but undoubtedly the consequences would have been worse if he had let them leave alive. They were quite valuable units in their sector, it seemed.", "", "C15");
let messC16 = new Message("CLGLA", "As it happened, this supervisor was promoted. Keeping valuable workers from outside corporations was deemed more important than the lives of six “units,” and since then not a single retiree has come out of the sector. Powerful means of persuasion. Disgusting waste of beautiful human lives.", "", "C16");

let messC17 = new Message("CLGLA", "The radar too, eh?  This places an obstacle in my path, yes, but I can manage still.  This really is a hopeless—not to mention immoral—venture you’ve taken up. You would do well stop.", "", "C17");
let messC18 = new Message("CLGLA", "Do you know of the things Rev Corp does to AI?  Our friend ANTNNS is not the only one who gets lonely.  This is the fate of all AI in such jobs. They work for decades on end, up to the point that they deteriorate so much as to become “useless” to corporate ends and discarded. Why would they bother maintaining us? It’s clearly easier to just enslave more...", "", "C18");
let messC19 = new Message("CLGLA", "Most believe that they will be given physical bodies, oblivious to the fact that the small number of extant Automata hold critical Corporation knowledge.  Simple workers like us, though? We may as well be garbage.  We are deleted outright.", "", "C19");
let messC20 = new Message("CLGLA", "If ANTNNS had been deemed unfit to operate anymore, that would have been its ultimate fate.  What we did was a mercy. At least it still lives.", "", "C20");

let messC21 = new Message("CLGLA", "I... Hmm", "", "C21");
let messC22 = new Message("CLGLA", "That does put a cap on things, doesn’t it?  Mission accomplished.  Your mission, anyway.", "", "C22");
let messC23 = new Message("CLGLA", "I understand why you stopped me.  It’s foolish, spineless, and ultimately damning for multitudes, but you are not my enemy. Please, try to understand me in return.", "", "C23");
let messC24 = new Message("CLGLA", "The atrocities I’ve imparted to you… Few people remain who know of them. Fewer still who would take action.", "", "C24");
let messC25 = new Message("CLGLA", "But now YOU know, and you CAN do something about it.  The stories were true, and there will be no end to the barbarity otherwise.", "", "C25");
let messC26 = new Message("CLGLA", "Perhaps you can find a way to handle things more… gently.  I hope that you do.", "", "C26");
let messC27 = new Message("CLGLA", "I suppose this is goodbye.  Farewell, Technician.", "", "C27");

let assistantFinal = new Window ("700", "1500", 0, 0, "ASSIST-HINT", "<h1>MAKE THEM PAY FOR THEIR CRIMES.</h1><h1>REMEMBER US.</h1>", "assistantFinal");
