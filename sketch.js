var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ground,groundImage;
var girl,girlImg;
var invisibleGround,targets;
var target1,target1Img;
var target2,target2Img;
var target3,target3Img;
var target4,target4Img;
var target5,target5Img;
var target6,target6Img;
var bullet;
var score=0;
var gameOVer,gameOVerImg;
var restart,restartImg;

var targetsGroup;
var bulletGroup;



function preload(){
  girlImg=loadImage("images/download.png");
  groundImage = loadImage("images/ground2-5000x20.png");
  target1Img = loadImage("images/target 1-200x200.png");
  target2Img = loadImage("images/target 2-200x200.png");
  target3Img = loadImage("images/target 3-200x200.png");
  target4Img = loadImage("images/target 4-200x200.png");
  target5Img = loadImage("images/target 5-200x200.png");
  target6Img = loadImage("images/target 6-200x200.png");
  gameOverImg = loadImage("images/gameOver2.png");
  restartImg = loadImage("images/restart-100x100.png");

  }

function setup() {
  createCanvas(windowWidth,windowHeight);
 girl =  createSprite(120,height-200,20,70);
 girl.addAnimation("girl1",girlImg);
 girl.setCollider('circle',0,0,40)
 girl.scale = 0.3;

targetsGroup =  new Group();
bulletGroup =  new Group();
targetsGroup.setColliderEach("circle",0,0,40)
bulletGroup.setColliderEach("circle",0,0,40)

 invisibleGround = createSprite(width/2,height-10,width,125);  
// invisibleGround.shapeColor =  "blue";
 invisibleGround.visible = false;

 ground = createSprite(width/2,height,width,2);
 // ground.shapeColor = "red";
  ground.addImage("ground",groundImage);
  ground.scale = 4
  ground.x = width/2;
  ground.velocityX = -6; 

  gameOver = createSprite(width/2,height/2- 100);
  gameOver.addImage(gameOverImg);

  restart = createSprite(width/2,height/2);
  restart.addImage(restartImg);
  
  restart.visible = false;
  gameOver.visible = false;

  score = 0;
 

 //  targets = createSprite(windowWidth,height-290,20,30);
 //targets.velocityX = -5;
  //targets.velocityY = 5;
}

function draw() {

 
  background(0); 
  textSize(20);
  fill("white")
  text("Score: "+ score,30,50);

  
  
  if(gameState===PLAY){
    spawnObject();
  
    if(ground.x<0){
      ground.x = ground.width/2 
      }
   
      if(bulletGroup.isTouching(targetsGroup)){
         targetsGroup.destroyEach();
      bulletGroup.destroyEach(); 
      score = score + 1
    }
      if(targetsGroup.isTouching(girl)){
        console.log("testing");
         gameState = END;
     }
  
   // if(targetsGroup.isTouching(invisibleGround)){
   //  targetsGroup.bounceOff(invisibleGround);  
   //}
   
  }
  else if (gameState===END){
    gameOver.visible = true;
    restart.visible = true;
    ground.velocityX = 0;
    
  }
    if(mousePressedOver(restart)){
      console.log("test");
      gameState = PLAY;
      ground.x = width/2;
      ground.velocityX = -6; 
      gameOver.visible = false;
      restart.visible = false;
      score = 0;
    }


 
  drawSprites();
  
  
}
function spawnObject(){
  if(frameCount % 150===0){
    targets = createSprite(windowWidth,height-290,20,30);
   targets.velocityX = -10;
  // targets.velocityY = 10;
 //  targets.bounceOff(invisibleGround);
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: targets.addImage(target1Img);
              break;
      case 2: targets.addImage(target2Img);
              break;
      case 3: targets.addImage(target3Img);
              break;
              case 4: targets.addImage(target4Img);
              break;
              case 5: targets.addImage(target5Img);
              break;
              case 6: targets.addImage(target6Img);
              break;
      default: break;

    }
    targetsGroup.add(targets);
    //targets.setCollider("circle",0,0,350);
    
      }
     
}
function keyPressed(){
  if (keyCode === 32){
  createBullet();
  }
}
function createBullet(){
 // if(frameCount%100===0){
  bullet = createSprite(220,height-336,20,5);
    bullet.velocityX = 20 ;
   // bullet.x = 360;
    bullet.shapeColor = "red";
   // bullet.x = girl.x;
   //  return bullet;
     bulletGroup.add(bullet);
  //}
  
}

