//Global Variables
var bananaImage,bananaGroup
var obstacleImage,obstaclesGroup
var ground,bck
var count
var score
var monkey,monkeyImage
var PLAY=1;
var END=0;
var gameState=PLAY;


function preload(){
  backImage=loadImage("jungle.jpg");
  
  monkeyImage=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  obstacleImage=loadImage("stone.png");
  bananaImage=loadImage("Banana.png");
}


function setup() {
  createCanvas(600,300);
  bck=createSprite(0,0,600,300);
  bck.addImage("background",backImage);
  bck.scale=1.5;
  bck.x=bck.width/2;
  bck.velocityX=-5;
  
  ground=createSprite(300,270,600,10);
  
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  monkey=createSprite(300,250,20,50);
monkey.addAnimation("monkey",monkeyImage);
//monkey.velocityX=2;
monkey.scale=0.1;
//monkey.setCollider("circle",10,10,225);
  monkey.x=50;
  bananaGroup=createGroup();
  obstaclesGroup=createGroup();
  
  count=0;
}


function draw(){
 background(255); 
   
  if(bck.x<0){
    bck.x=bck.width/2;
  }
  
  if(ground.x<0){
   ground.x=ground.width/2;
 }
 
 
  if(gameState===PLAY){
    //if(keyDown("space") && monkey.y >= 235){
    if(keyDown("space")){
      monkey.velocityY = -15;
     // playSound("jump.mp3");
    }
  
  
  //console.log(monkey.y);
  
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8;
    
     stone();
  banana();
    
 
 
    
   if(bananaGroup.isTouching(monkey)){
     bananaGroup.destroyEach();
     count = count + 2;
     
     
   }
     switch(count){
        case 10: monkey.scale=0.12;
                break;
        case 20: monkey.scale=0.14;
                break;
        case 30: monkey.scale=0.16;
                break;
        case 40: monkey.scale=0.18;
                break;
        default: break;
    }
  

   
      if(obstaclesGroup.isTouching(monkey)){
      //gameState=END;
      //ground.velocityX=0;
    monkey.scale=0.08;     
    }
    

    
  }  
  
   /*else if(gameState===END){
   monkey.visible=true;
  
   ground.velocityX=0;
    
    monkey.collide(obstaclesGroup);
     monkey.velocityY=0;
     monkey.velocityX=0;
     bck.velocityX=0;
    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
   // monkey.setAnimation("download.png_1");
    bananaGroup.setLifetimeEach(0);
    
  }*/
    console.log(monkey.y);

 
    monkey.collide(ground);
  drawSprites();
  text("score :" + count,300,100);

}

function stone(){
 
    if(World.frameCount % 300 === 0) {
     var obstacle = createSprite(600,250,10,40);
    
    obstacle.velocityX = -6; 
    //generate random obstacles
    
    obstacle.addImage("obstacleImage",obstacleImage);
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 100;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function banana(){
  if(World.frameCount%60===0){
     var bana=createSprite(600,225,40,10);
    bana.y=random(140,220);
    bana.addImage("bananaImage",bananaImage);
    bana.scale=0.05;
    bana.velocityX=-5;
    bananaGroup.add(bana);
    
    bana.depth = monkey.depth;
    monkey.depth = bana.depth + 1;
    
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
    }
}


