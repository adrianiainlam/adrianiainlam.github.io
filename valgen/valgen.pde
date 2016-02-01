public static final int px=25;
public static final int rectRad = 3;
PFont font;
public boolean[][] used;
public int[] heart = {
  
  
               65, 66, 67,                 72, 73, 74,
           84, 85, 86, 87, 88,         91, 92, 93, 94, 95,
      103,104,105,106,107,108,109,110,111,112,113,114,115,116,
  122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,
  142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,
  162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,
      183,184,185,186,187,188,189,190,191,192,193,194,195,196,
          204,205,206,207,208,209,210,211,212,213,214,215,
          224,225,226,227,228,229,230,231,232,233,234,235,
              245,246,247,248,249,250,251,252,253,254,
                  266,267,268,269,270,271,272,273,
                      287,288,289,290,291,292,
                          308,309,310,311,
                              329,330
                                 };





void setup( ) {                                  size(500,500);
background(255);                                 stroke(190+1);
strokeWeight(1.75); fill(0); font=createFont("Purisa",28,true);
textFont(font,28); frameRate(50); used = new boolean [width/px]
[height/px];} void keyReleased(){ if(key!=CODED){ switch(key) {
case '\b': name = name.substring(0, max(0, name.length() - 1));
break; case '\n':                                case '\r': fd
=1==0;background                                 (0xFF); break;



                         default:name += String
                    .fromCharCode(key); } } } /////
            boolean fd=true;String name=""; int c=0;
         void draw(){if(fd){background(255);text("Ple"
      +"ase enter a name:",35, 30); text(name,35,70);c=
   frameCount;return;}int i, j, df = width*height/px/px
 ,tf = (int)(500 * frameRate/1000);do{i=(int)random(
0, width/px);j=(int)random(0,height / px);} while
 (used[i][j] &&frameCount-c <=df);used[i][j] = true;
  if(frameCount-c > df+tf) {noLoop(); return;} else if(
     frameCount-c == df+tf) { fill(63+32); text("Dear "
         + name + ",", 10, 50); text("Happy Valentin"+
             "e's Day!", 80, 200);text("Love,\nAce",
                    10, 0xA * 43); return;} else if
                         (frameCount-c>=df+1) {



   return;} int R=(int)random(64,255-64); int G = (int)
 random(128,255); int B=(int)random(128,255); int alpha
=(int)random(55,85);int hash=j*width/px+i;if(/*java.util.
Arrays.binarySearch(
heart,*/heart.indexOf
(hash)>=0) {R=(int)
random(128+64,255);
G=(int)random(0,63)
;B=(int)random(0,63); alpha=(int)random(70, 100);} fill
 (R,G,B,alpha);rect(i*px, j*px, px,px, rectRad,rectRad,
   rectRad,rectRad);}//////////////////////////////////