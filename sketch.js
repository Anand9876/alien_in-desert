var alien,alienImage;
var Background,BackgroundImage;
var invisibleground;
var obstacle,obstacleImage;
var score;
var badge,badgeImage;
var PLAY=1;
var END=0;
var bg1Image,bg2Image,bg3Image,bg4Image;
var gameState=PLAY;
var background;
function preload(){
  alienImage=loadAnimation("alien_0.png","alien_1.png")
  
  BackgroundImage=loadAnimation("desert Animation_0.png","desert Animation_1.png","desert Animation_2.png","desert Animation_3.png");
  
 
  
  obstacleImage=loadImage("obstacle_0.png")
  
  badgeImage=loadAnimation("badge_0.png","badge_1.png");
}
function setup(){
  createCanvas(400,400);
  if(gameState===PLAY){
    Background=createSprite(200,200,400,10);
  Background.addAnimation("moving",BackgroundImage)
  Background.scale=6;
  }
  alien=createSprite(50,300,50,10);
  alien.addAnimation("rest",alienImage);
  alien.scale=1;
alien.setCollider("rectangle",0,0,alien.width,alien.height);
  alien.debug=false;
  
  invisibleground=createSprite(200,350,400,10);
  invisibleground.visible=false;
  
  obstacleGroup=new Group();
  badgesGroup=new Group();
  score=0;
}
function draw(){
  
  background("black");
  drawSprites();
   textSize(20);
  text("Score:"+score,180,50);
  if(gameState===PLAY){
    obstacle();
    badges();
  alien.velocityY=alien.velocityY+0.8
  alien.collide(invisibleground);
  if(keyDown("space")&&alien.y>=150){
    alien.velocityY=-12;
  }
  if(alien.isTouching(badgesGroup)){
    score=score+1;
    badgesGroup.destroyEach();
  }
   
    if(alien.isTouching(obstacleGroup)){
      gameState=END;
      
      alien.pause();
    }
  }
  if(gameState===END){
    alien.collide(invisibleground);
    obstacleGroup.destroyEach();
      badgesGroup.destroyEach();
    Background.pause();
    if(keyDown("ENTER")){
      reset();
    }
  }
  
}
function obstacle(){
  if(frameCount%100===0){
    Obstacle=createSprite(400,310,50,10);
    Obstacle.addImage(obstacleImage);
    Obstacle.velocityX=-5;
    Obstacle.scale=0.8;
    obstacleGroup.add(Obstacle);
    Obstacle.setCollider("rectangle",0,0,alien.width,alien.height);
    //Obstacle.debug=true;
  }
}
function badges(){
  if(frameCount%150===0){
    badge=createSprite(400,200,50,10);
    badge.addAnimation("running",badgeImage);
    badge.velocityX=-5;
    badge.scale=1;
    badgesGroup.add(badge);
    badge.y=Math.round(random(100,220))
  }
}
function reset(){
  gameState = PLAY;
 
  obstacleGroup.destroyEach();
  badgesGroup.destroyEach();
  
  alien.play();
  Background.play();
  score = 0;
  
}