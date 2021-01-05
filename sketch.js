var PLAY = 0;
var END = 1;
var gameState = 0;
var score = 0;

var sword, swordImage;
var fruit, fruitImage1, fruitImage2, fruitImage3, fruitImage4, fruitGroup;
var enemy, enemyAnimation, enemyGroup;
var gameOverImage, gameOverSound;

var soundPlayed = false;

function createFruit() {
  if (World.frameCount%80===0){
    fruit = createSprite(400,200,20,20);
    fruit.scale=0.2;
    var i = Math.round(random(1,4));
    if (i == 1){
      fruit.addImage(fruitImage1)
    } else if (i==2){
      fruit.addImage(fruitImage2)
    } else if (i==3){
      fruit.addImage(fruitImage3)
    } else if (i==4){
      fruit.addImage(fruitImage4)
    }
    fruit.y = Math.round(random(50,340))
    fruit.velocityX=-7;
    fruit.setLifetime=100;
    fruitGroup.add(fruit);
    
  }
}

function createEnemy(){
  if (World.frameCount%200===0){
    monster = createSprite(400,200,20,20);
    monster.addAnimation("moving", enemyAnimation);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-8;
    monster.setLifetime=50;
    enemyGroup.add(monster);
  }
}

function preload(){
  swordImage = loadImage("sword.png");
  
  fruitImage1 = loadImage("fruit1.png");
  fruitImage2 = loadImage("fruit2.png");
  fruitImage3 = loadImage("fruit3.png");
  fruitImage4 = loadImage("fruit4.png");
  
  enemyAnimation = loadAnimation("alien1.png", "alien2.png")
  
  gameOverImage = loadImage("gameover.png")
  
  gameOverSound = loadSound("gameover.mp3")
}

function setup(){
  createCanvas(400,400);
  
  sword = createSprite(200,200,20,20);
  sword.addImage(swordImage);
  sword.scale = 0.5;
  
  fruitGroup = new Group();
  enemyGroup = new Group();
  
}

function draw(){
  background("lightgrey");
  text("Score: " + score, 190, 10)
  
  if (gameState == 0){
    sword.x = mouseX;
    sword.y = mouseY;
    
    createFruit();
    createEnemy();
    
    if (fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      score = score + 2;
    }
    
    if (sword.isTouching(enemyGroup)){
      enemyGroup.destroyEach();
      gameState = 1;
    }
  }
  if (gameState == 1){
    fruitGroup.destroyEach()
    fruitGroup.setVelocityXEach(0)
    enemyGroup.destroyEach()
    enemyGroup.setVelocityXEach(0)
    
    sword.x=200
    sword.y=200
    sword.addImage(gameOverImage)
    sword.scale = 1.5
  
    
    
    if (soundPlayed == false){
       gameOverSound.play()
      soundPlayed = true;
    }
   
    
    
    
  
  
}
  drawSprites();
}
