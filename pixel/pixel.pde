void setup(){
  size(256,128);
  background(0);
  frameRate(2400);
}
int i=0;
void draw() {
  stroke(i<<3&255,i>>2&255,i>>7&255);
  point(i&255,i/256);
  i++;
}
