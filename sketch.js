var Mario,MarioStandingImg,MarioJumpingImg;
var goomba,goombaWalkingRightImg,goombaWalkingLeftImg,goombaCollider1,goombaCollider2;
var coin;
var Ground,GroundImg;


function preload(){
  coin_bobbing = loadAnimation("coin/coin1.png","coin/coin2.png","coin/coin3.png","coin/coin4.png")

  MarioStandingImg = loadImage("MarioStanding.png")
  MarioJumpingImg = loadImage("MarioJumping.png")
  GroundImg = loadImage("Background.jpg")
  goombaWalkingRightImg = loadImage("goomba/goomba-walk1.png")
  goombaWalkingLeftImg = loadImage("goomba/goomba-walk2.png")

}

function setup() {
  createCanvas(800,400);

  Mario = createSprite(100,350, 10, 10);
  Mario.addImage(MarioStandingImg)
  Mario.scale=3.5
  Mario.debug=false;
  Mario.setCollider("rectangle",0,0,15,20 );

  goomba = createSprite(300,325,20,20)
  goomba.addImage(goombaWalkingRightImg);
  goomba.scale=.3
  goomba.debug=false;
  goomba.setCollider("rectangle",0,-46,90,30)
  goomba.velocityX=2

  goombaCollider1=createSprite(200,325,20,20)
  goombaCollider1.debug=true;
  goombaCollider1.setCollider("rectangle",0,0,1,50);
  goombaCollider1.visible=false;

  goombaCollider2=createSprite(550,325,20,20)
  goombaCollider2.debug=false;
  goombaCollider2.setCollider("rectangle",0,0,1,50);
  goombaCollider2.visible=false;

  Ground = createSprite(400,375,1000,50);
  Ground.visible=false;
}

function draw() {
  background(GroundImg);
  

  if (keyDown("RIGHT_ARROW"||touches.length>0)){
    Mario.x+=5
  }
  
  if (keyDown("LEFT_ARROW"||touches.length>0)){
    Mario.x-=5
  }
  
  if (keyDown("UP_ARROW")&& Mario.y>=0||touches.length>0){
    Mario.y-=5
    Mario.addImage(MarioJumpingImg);
  }

  Mario.velocityY = Mario.velocityY+.2
  
  if(goomba.isTouching(goombaCollider1)){
    goomba.velocityX=2
  }
  if(goomba.isTouching(goombaCollider2)){
    goomba.velocityX=-2
  }


 if(Mario.collide(Ground)){
  Mario.addImage(MarioStandingImg);
 }

 if(Mario.collide(goomba)){
  Mario.addImage(MarioJumpingImg);
  Mario.velocityY=Mario.velocityY-4
  Mario.velocityX=0
  goomba.destroy();
  goomba.velocityX=0
  createCoin();
 }



 function createCoin(){
    coin = createSprite(goomba.x,325,20,20)
    coin.scale=2
    coin.addAnimation("coin_bobbing",coin_bobbing)
    coin.debug = false;
    coin.setCollider("circle",0,0,5)
  
    if (Mario.collide(coin)){
      coin.destroy()
    }

}

 drawSprites();
}
