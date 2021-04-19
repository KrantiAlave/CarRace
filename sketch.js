var PLAY = 1;
var END = 0;
var gameState = PLAY;
var reset;

var road,roadImg;
var player,playerImg;
var gameOver,gameOverImg;
var player1,player1Img,greenGroup;
var player2,player2Img,blueGroup;
var player3,player3Img,purpleGroup;
var carHorn,opp;
var distance = 0;

function preload(){
  roadImg = loadImage("images/Road.png");
  playerImg = loadImage("images/player.png");
  gameOverImg = loadImage("images/gameOver.png");
  carHorn = loadSound("sound/carHorn.wav");

  player1Img = loadImage("images/greenCar.png");
  player2Img = loadImage("images/blueCar.png");
  player3Img = loadImage("images/purpleCar.png");
}

function setup(){
  createCanvas(1200,300);

road = createSprite(600,150);
road.addImage(roadImg);
road.velocityX = -5;

player = createSprite(60,150);
player.addImage(playerImg);
player.scale = 0.3;

gameOver = createSprite(600,120);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.9;
gameOver.visible = false;

greenGroup = new Group();
blueGroup = new Group();
purpleGroup = new Group()
}

function draw(){
  background(0);

  if(gameState === PLAY){
    player.y = mouseY;

  distance = distance + Math.round(getFrameRate()/50);
  road.velocityX = -(5 + 2*distance/150);

  if(road.x < 0){
    road.x = width/2;
  }
  if(keyDown("space")){
    carHorn.play();
  }

  edges = createEdgeSprites();
  player.collide(edges);
  
  opp = Math.round(random(1,3));
  if(World.frameCount % 150 === 0){
    if(opp === 1){
      greenCar();
    }
    else if(opp === 2){
      blueCar();
    }
    else{
      purpleCar();
    }
  }
  
 if(greenGroup.isTouching(player)){
   gameState = END;
   player1.velocityX = 0;
  }

  if(blueGroup.isTouching(player)){
   gameState = END;
   player2.velocityX = 0;
  }

  if(purpleGroup.isTouching(player)){
   gameState = END;
   player3.velocityX = 0;
  }
 }
 
   else if(gameState === END){
    gameOver.visible = true;

   textSize(20);
   fill(255);
   

    road.velocityX = 0;
    player.velocityY = 0;

    greenGroup.setVelocityXEach(0);
    greenGroup.setLifetimeEach(-1);

    blueGroup.setVelocityXEach(0);
    blueGroup.setLifetimeEach(-1);

    purpleGroup.setVelocityXEach(0);
    purpleGroup.setLifetimeEach(-1);

    if(keyDown("up")){
      reset();
    }
   }
  
  drawSprites();

  textSize(20);
  fill(255);
  text("Press UP ARROW Key To Restart The Game !",400,40);
  text("DISTANCE - "+ distance,1000,40)
}
function greenCar(){
player1 = createSprite(1100,Math.round(random(50,250)));
player1.addImage(player1Img);
player1.velocityX = -(5 + 2*distance/150);
player1.scale = 0.3;
player1.lifetime = 170;
greenGroup.add(player1);
}
function blueCar(){
player2 = createSprite(1100,Math.round(random(50,250)));
player2.addImage(player2Img);
player2.velocityX = -(5 + 2*distance/150);
player2.scale = 0.3;
player2.lifetime = 170;
blueGroup.add(player2);
}
function purpleCar(){
player3 = createSprite(1100,Math.round(random(50,250)));
player3.addImage(player3Img);
player3.velocityX = -(5 + 2*distance/150);
player3.scale = 0.3;
player3.lifetime = 170;
purpleGroup.add(player3); 
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  player.addImage(playerImg);
  
  greenGroup.destroyEach();
  blueGroup.destroyEach();
  purpleGroup.destroyEach();

  distance = 0;
}