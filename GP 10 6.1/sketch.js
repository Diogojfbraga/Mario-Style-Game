/**
--------------------------------------------------------------------------------------
                 Game Project - Introduction to Programming I
                                2020/2021
                        Student number - 200409407        
--------------------------------------------------------------------------------------
*/


/**

Extensions chosen

*** Graphics ***
Character has a special belly rotation effect;
The background is constantly changing from day to night, sun comes up followed by the moon, technic learnt in one of the lessons.  I decided to use the constructor function to produce all random background: clouds, trees and flowers. Each of these functions make the objects appear in a random location, with different shades and sizes. For the canyons and the mountains, I use fixed location.
I felt difficult finding a way to stop the character not to jump when was already in the air. 
After using the constructor once it was straight forward to use for the other objects. 
Overall was really great to learn everything as a beginner using guided instructions and see this end result. 

*** Sound ***
The game has the following individual sounds:
- Background sounds that starts when the game is started; For this sounds I had to add code to control the volume as the original sound was too loud. Also, this sound is playing as a continuous loop until the player wins or loses. 
- Jumping sounds when pressed space key and the character jumps;
- When falling down the canyon;
- Touching the enemy and dies;
- Collecting the diamond. For this sounds I had to add code to control the volume as the original sound was too loud; 
- And when reaches the flagpole and concludes the game.
I felt difficult to find a way to loop the background sound to stop when reaches the flagpole. After a few attempts I found the best place to position the code and worked. 
It was great and fun to add sounds to the game and enjoyed learning

*/

// ------------------------------
// Game variables
// ------------------------------

var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;
var worldSize;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;
var isJumping;

var mountains;
var collectable;
var canyon;
var lives;
var livesBar;
var flagpole;
var clouds = [];
var trees = [];
var flowers = [];

var enemies;

var game_score;

var a;
var b;
var d;

var sun = 500;
var moon = 1000;
var speed = 0.5;

// ------------------------------
// Game sounds
// ------------------------------

function preload() {
    soundFormats('mp3', 'wav'); //allowed sounds
    jumpSound = loadSound('assets/jump.wav'); //jumping soound
    jumpSound.setVolume(0.1); //jumping sound volume
    backgroundSound = loadSound('assets/backsound.mp3'); //background sound
    backgroundSound.setVolume(0.1);
    collectableSound = loadSound('assets/collectable.wav'); //collecting sound
    collectableSound.setVolume(0.3); //volume of sound
    falling = loadSound('assets/falling.wav'); //falling the canyon
    enemySound = loadSound('assets/enemySound.wav'); //touching the enemy
    finish = loadSound('assets/finish.wav'); //game completed
}

function setup() {
    
    console.log();
	createCanvas(1024, 576);
    lives = 3;
    livesBar = 3;
    floorPos_y = height * 3 / 4;
    worldSize = 5000;//world limit
    
    startGame();
    renderGraphics();
}

// ------------------------------
// Game Begins
// ------------------------------

function startGame() {
    //game character initial position
    gameChar_x = width / 2;
    gameChar_y = floorPos_y;
    game_score =0; //begining score
    
    backgroundSound.loop(); //initiallizes background sound when game starts
    
	scrollPos = 0; // Variable to control the background scrolling.

	// Variable to store the real position of the gameChar in the game
	// world. Needed for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;
    
	// Boolean variables to control the movement of the game character.
	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;

// ------------------------------
// Objects
// ------------------------------
   
    //mountain object 
    mountains = [
        {x_pos: 450, width: 100},
        {x_pos: 900, width: 100},
        {x_pos: 1350, width: 100},
        {x_pos: 2100, width: 100}, 
    ];

    /**
   * Colectable y_position
   */
    const y_position = floorPos_y - 40;

  /**
   * size of the colectable
   */
    const colectable_size = 4;
    const canvasWidth = 2800;

    collectable = [
        {
          x_pos: Math.floor(Math.random() * canvasWidth) + 100,
          y_pos: y_position,
          size: colectable_size,
          isFound: false,
        },
        {
          x_pos: Math.floor(Math.random() * canvasWidth) + 100,
          y_pos: y_position,
          size: colectable_size,
          isFound: false,
        },
        {
          x_pos: Math.floor(Math.random() * canvasWidth) + 100,
          y_pos: y_position,
          size: colectable_size,
          isFound: false,
        },
        {
          x_pos: Math.floor(Math.random() * canvasWidth) + 100,
          y_pos: y_position,
          size: colectable_size,
          isFound: false,
        },
        {
          x_pos: Math.floor(Math.random() * canvasWidth) + 100,
          y_pos: y_position,
          size: colectable_size,
          isFound: false,
        },
        {
          x_pos: Math.floor(Math.random() * canvasWidth) + 100,
          y_pos: y_position,
          size: colectable_size,
          isFound: false,
        },
        {
          x_pos: Math.floor(Math.random() * canvasWidth) + 100,
          y_pos: y_position,
          size: colectable_size,
          isFound: false,
        },
        ];
    
    //mountain object 
    canyon = [
        { x_pos: -1030, width: 500 },
        { x_pos: 230, width: 100 },
        { x_pos: 600, width: 50 },
        { x_pos: 1200, width: 50 },
        { x_pos: 2600, width: 50 },
    ];
    
    //flagpole position
    flagpole = { x_pos: 3000, isReached: false };
    
    //enemies positon
    enemies = [];
    enemies.push(new Enemy(100, floorPos_y - 20, 100));
    enemies.push(new Enemy(1600, floorPos_y - 20, 100));
    enemies.push(new Enemy(800, floorPos_y - 20, 100));
    enemies.push(new Enemy(1500, floorPos_y - 20, 100));
    enemies.push(new Enemy(2000, floorPos_y - 20, 100));
}

function draw() {
    
    background(45,45, a);
    
    //movement of the sun and change of background collour
    if ((sun > 0) && (sun < 500)) {
        a = d;
    }
  
    if ((sun > -555) && (sun < 0)) {
        a = b;
    }
        
    d = (-1.8 * (sun - 300));
    
    //sun shape
    noStroke();
    fill(255, 255, 50);
    ellipse(80, sun, 70, 70);
    
    //movement of the sun
    sun = sun - speed;
    
    if (sun <= -555){
        sun = 500;
    } 
    
    //moon shape
    fill(240);
    ellipse(920, moon, 100, 100);
    
    //movment of the moon
    moon = moon - speed;
  
    //movement of the moon and change of background collour
    if (moon <= -555){
        moon = 500;
    } 
  
    b = -300 + moon * 1.8;
    
    //background hills
    push();
    translate(scrollPos * 0.1, 0)
    strokeWeight(7);
    stroke(255, 235, 205);
    fill(222, 184, 135);
    ellipse(440, floorPos_y + 20, 1200, 400);
    noStroke();
    pop();

    push();
    translate(scrollPos, 0);
    
    //    array to initialise cloud function
    push();
    translate(scrollPos * 0.3 , 0);
    for(var i=0; i < clouds.length; i++){
        clouds[i].drawClouds();
    }
    pop();
    
    //    initialise mountain function
    drawMountains();
    
    //    array to initialise tree function
    for(var i=0; i < trees.length; i++){
        trees[i].drawTrees();
    }
    
    //    array to initialise flower function
    for(var i=0; i < flowers.length; i++){
        flowers[i].drawFlowers();
    }

	//    array to initialise collectable function and check if has been collected function
    
    for (var i = 0; i < collectable.length; i++) {
        if (!collectable[i].isFound){
            drawCollectable(collectable[i]);
            checkCollectable(collectable[i]);
        }
    }
    
    //    initialise function to check if player died
    checkPlayerDie();
    
    //    initialise function to make a flagpole
    renderFlagpole();
    
    //    array to draw enemies
    for (var i = 0; i < enemies.length; i ++) {
        enemies[i].draw();

        var isContact = 
            enemies[i].checkContact(gameChar_world_x, gameChar_y)//checks enemy contact

        //if in contact -> loses a life and restarts the game. 
        if (isContact) {
            if (lives > 0) {
                backgroundSound.stop();
                enemySound.playMode('untilDone');
                enemySound.play();
                lives -=1;
                startGame();
                break;
            }
        }
    }
    
    //sign 'Danger'
    strokeWeight(7);//pole size
    stroke(100);//pole coler
    fill(255);
    line(-460, floorPos_y, -460, floorPos_y -50);
    rect(-485, floorPos_y-47, 50, 30);//pole position
    textSize(10);
    noStroke();
    fill(255,0,0);
    text("Danger!!", -480, floorPos_y - 30);
    
    noStroke();
	fill(34, 139, 34);
	rect(gameChar_world_x-1000, floorPos_y, 2800, height / 4); // draw some green ground
    
    //  array to initialise canyon function and check if character is on top of the canyon
    for (var i = 0; i < canyon.length; i++) {
        drawCanyon(canyon[i]);
        checkCanyon(canyon[i]);
    }
    
    pop(); 
    
    //    initialise character function
	drawGameChar();
    
    //Draw Score Board.
    fill(255);
    noStroke();
    textSize(16);
    textFont("Comic Sans MS");
    text("Score: " + game_score,20, 30);
    
    //Draw Lives Board
    drawLives();
    
    //if character loses all the lives == gameover
    if (lives < 1) {
        fill(255);
        noStroke();
        textSize(25);
        textFont("Comic Sans MS");
        text(
            "Game over - Press space to continue", 
             width/2-200, 
             height/2-100
        );
        backgroundSound.stop();
        return;
        
    // if character reaches the flagpole == levelcompleted
    } else if (flagpole.isReached) {
        fill(255);
        noStroke();
        textSize(25);
        textFont("Comic Sans MS");
        text(
            "Level Completed - Press space to continue", 
            width/2-200, 
            height/2-100
        );
        return;
    }

// ---------------------
// Logic to make the game character move or the background scroll.
// ---------------------
    
	if(isLeft) {
		if (gameChar_x > width * 0.3) {
            gameChar_x -= 5;
        } else {
            scrollPos += 5;
        }
	}

	if(isRight) {
		if (gameChar_x < width * 0.6) {
            gameChar_x  += 5;
        } else {
            scrollPos -= 5; // negative for moving against the background
        }
	}
    
    if (isPlummeting) {
        gameChar_y += 5;
    } else {
        // Logic to make the game character rise and fall.
        if (gameChar_y < floorPos_y) {
            gameChar_y = min(floorPos_y, gameChar_y+2);
            isFalling = true;
        } else {
            isFalling = false;
        }        
    }
    
    if(flagpole.isReached == false) {
        checkFlagpole(); //Flagpole call
        }   
    
	// Update real position of gameChar for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;
}

// ---------------------
// Key control functions
// ---------------------

function keyPressed() {

	if (keyCode == 37) {
        isLeft = true;
    }
    if (keyCode == 39) {
        isRight = true;
    }
    if (keyCode == 32) {
        jumpSound.play();
        if(!isFalling && !isPlummeting){
            gameChar_y -= 100;
            isJumping = true;
        }
        if( lives < 1) {
            lives = 3;
            startGame();
        } else if (flagpole.isReached) {
            startGame();
            flagpole.isReached = false;
            lives = 3;
        }
    }
}

function keyReleased() {

	if (keyCode == 37) {
        isLeft = false;
    } else if(keyCode == 39) {
        isRight = false;
    } else if (keyCode == 32) {
        isJumping=false;
    }  
}

// ------------------------------
// Game character render function
// ------------------------------

// Function to draw the game character.

/**
 * triangles
 */
function drawTriangles() {
        strokeWeight(1);
        stroke(0);
        fill(255, 99, 71);
    triangle(
          gameChar_x - 5,
          gameChar_y - 5,
          gameChar_x - 3,
          gameChar_y,
          gameChar_x - 10,
          gameChar_y
        );
        fill(255, 99, 71);
    triangle(
          gameChar_x + 5,
          gameChar_y - 5,
          gameChar_x + 8,
          gameChar_y,
          gameChar_x,
          gameChar_y
        );
}

function drawGameChar() {
    if (isLeft) {
        strokeWeight(1);
        stroke(0);
        fill(255, 99, 71);
        ellipse(gameChar_x - 10, gameChar_y - 35, 10);
        point(gameChar_x+2, gameChar_y-36);
        push();
        translate(gameChar_x, gameChar_y - 18);
        rotate(frameCount*0.5);
        fill(random(0, 255), random(0, 100),random(0, 100));
        rect(-1, -7, 10, 15, 15)
        pop();
        drawTriangles();
      
    } else if (isRight) {
        strokeWeight(1);
        stroke(0);
        fill(255, 99, 71);
        ellipse(gameChar_x + 10, gameChar_y - 35, 10);
        point(gameChar_x+2, gameChar_y-36);
        push();
        translate(gameChar_x, gameChar_y - 18);
        rotate(frameCount * 0.5);
        fill(random(0, 255), random(0, 100),random(0, 100));
        rect(-1, -7, 10, 15, 15)
        pop();
        drawTriangles();
          
    } else if (isJumping) {
        strokeWeight(1);
        stroke(0);
        fill(
          random(0, 255), 
          random(0, 100),
          random(0, 100)
        );
        ellipse(gameChar_x, gameChar_y - 39, 18, 18);
        fill(255, 99, 71);
        ellipse(gameChar_x, gameChar_y - 55, 10);
        triangle(
              gameChar_x - 5,
              gameChar_y - 5,
              gameChar_x - 9,
              gameChar_y,
              gameChar_x,
              gameChar_y
            );
        triangle(
              gameChar_x + 5,
              gameChar_y - 5,
              gameChar_x + 2,
              gameChar_y,
              gameChar_x + 10,
              gameChar_y
            );
    } else {  //front
        strokeWeight(1);
        stroke(0);
        fill(255, 99, 71);
        ellipse(gameChar_x, gameChar_y - 35, 10);
        point(gameChar_x+2, gameChar_y-36);
        point(gameChar_x-2, gameChar_y-36);
        line(gameChar_x -2, gameChar_y- 33, gameChar_x +2, gameChar_y -33);
        push();
        translate(gameChar_x, gameChar_y-18);
        rotate(frameCount*0.5);
        fill(
            random(0,255), 
            random(0,100),
            random(0,100)
            );
        rect(-1,-7,10,15,15)
        pop();
        drawTriangles();
      }
}   

// ---------------------------
// Background render functions
// ---------------------------

// Function to draw mountains objects.
function drawMountains() {
  for (var i = 0; i < mountains.length; i++) {
    stroke(184, 134, 11);
    strokeWeight(5);
    fill(218, 165, 32);
    rect(
        mountains[i].x_pos, 
         floorPos_y - 100,
         mountains[i].width, 
        128, 
        30
    ); // back mountian
    rect(
      mountains[i].x_pos - 50,
      floorPos_y - 172,
      mountains[i].width,
      200,
      30
    ); // middle mountain
    rect(
      mountains[i].x_pos - 75,
      floorPos_y - 102,
      mountains[i].width,
      130,
      15
    ); //front mountain
    noStroke();
    fill(255); //mountain snow colour
    rect(
      mountains[i].x_pos - 40,
      floorPos_y - 168,
      mountains[i].width - 20,
      20,
      70
    ); //middle mountain snow
    rect(
      mountains[i].x_pos - 65,
      floorPos_y - 102,
      mountains[i].width - 20,
      20,
      70
    ); // front mountain snow
    rect(
      mountains[i].x_pos + 51,
      floorPos_y - 100,
      mountains[i].width - 65,
      20,
      50
    ); // back mountain snow
  }
}

// ---------------------------------
// Canyon render and check functions
// ---------------------------------

// Function to draw canyon objects.

function drawCanyon(t_canyon) {
    noStroke();
    fill(0, 240 - gameChar_world_x / 20, 240 - gameChar_world_x / 20); //canyon sky colour
    fill(32, 178, 170); //canyon water colour
    rect(t_canyon.x_pos, floorPos_y, t_canyon.width, height, 10); //canyon water

}

// Function to check character is over a canyon.

function checkCanyon(t_canyon) {
    if (
        gameChar_world_x < t_canyon.x_pos + t_canyon.width &&
        gameChar_world_x > t_canyon.x_pos &&
        gameChar_y >= floorPos_y
  ) {
    // canyon fall
    if (isPlummeting = true) {
        gameChar_y += 5;
        isLeft = false;
        isRight = false;
        backgroundSound.stop();
        falling.playMode("untilDone");
        falling.play();
    }
  }
}

// ----------------------------------
// Collectable items render and check functions
// ----------------------------------

// Function to draw collectable objects.

function drawCollectable(t_collectable){
    fill(255, 255, 0)//collectable item colour
    stroke(120);
    strokeWeight(2);
    quad(
        t_collectable.x_pos + 2 * t_collectable.size, 
        t_collectable.y_pos + 0 * t_collectable.size,
        t_collectable.x_pos + 3 * t_collectable.size,
        t_collectable.y_pos + 2 * t_collectable.size,
        t_collectable.x_pos + 2 * t_collectable.size,
        t_collectable.y_pos + 5 * t_collectable.size,
        t_collectable.x_pos + 1 * t_collectable.size,
        t_collectable.y_pos + 2 * t_collectable.size
    );      
}

// Function to check character has collected an item.

function checkCollectable(t_collectable){
    if (
        dist(
            t_collectable.x_pos, 
            t_collectable.y_pos, 
            gameChar_world_x, 
            gameChar_y
        ) < 45
    ) {
        t_collectable.isFound = true;
        game_score += 1;
        collectableSound.play();   
    }
}

// ----------------------------------
// Flag Pole render and check functions
// ----------------------------------

// Function to draw Flag Pole.

function renderFlagpole() {
    push();
    
    strokeWeight(7);//pole size
    stroke(100);//pole coler
    line(
        flagpole.x_pos, 
        floorPos_y, 
        flagpole.x_pos, 
        floorPos_y - 200
    );//pole position
    fill(128, 0, 0);//flag colour
    noStroke();

    if (flagpole.isReached) {
        rect(flagpole.x_pos+2, floorPos_y -200, 50, 50);//flag position
    } else {
        rect(flagpole.x_pos+2, floorPos_y-50, 50, 50);//flag position
    }
    
    pop();
}

// Function to check character has reached the pole.
function checkFlagpole() {
    var d = abs(gameChar_world_x - flagpole.x_pos);
    
    if (d<15) {
        flagpole.isReached = true;
        backgroundSound.stop();
        finish.playMode('untilDone');
        finish.play();
    }
}

// ----------------------------------
// Enemy render and check functions
// ----------------------------------

// Constructor function to draw Enemy.

function Enemy(x, y, range) {
    this.x = x;
    this.y = y;
    this.range = range;
    
    this.currentX = x;
    this.inc = 1;
    
    this.update = function() {
        this.currentX += this.inc;
        
        if (this.currentX >= this.x + this.range) {
            this.inc = -1;
        } else if(this.currentX < this.x) {
            this.inc = 1;
        }
    };
    this.draw = function() {
        this.update();
        fill(255,0,0)
        ellipse(this.currentX, this.y, random(20,30));
        ellipse(this.currentX + 4, this.y, 2);
        ellipse(this.currentX - 4, this.y, 2);
    };
    
    this.checkContact = function(gc_x, gc_y) {
        var d = dist(gc_x, gc_y, this.currentX, this.y)
        
        if(d < 25) {
            return true;            
        }
        else if(d<200){
            this.x = gameChar_world_x;
        }
        return false;
    };
}
    
function checkPlayerDie() {
    if(gameChar_y > height*1.5) {
        if(lives >= 1) {
            lives -= 1;
            startGame();
        }
    }
}
    
function drawLives() {
    var h = 160;
    var x = 200;
    fill(255);
    noStroke();
    textSize(16);
    textFont("Comic Sans MS");
    text("Lives left: ", 100, 30);
    
    for (var i = 0; i<lives; i++) {
        if(lives>0) {
            fill(255,0,0);
            strokeWeight(3);
            stroke(50);
            heart(x, 18, 15);
            x += 30;
        }
    }
}

function heart(x, y, size) {
    beginShape();
    vertex(x,y);
    bezierVertex(
        x - size / 2,
        y - size / 2, 
        x - size, 
        y + size, 
        x, y + size
        );
    bezierVertex(x + size, 
                 y + size / 3, 
                 x + size / 2, 
                 y - size / 2, 
                 x, 
                 y
                );
    endShape(CLOSE);
}

function renderGraphics()
{
        //Constructor function array for Flowers
    for(var i = 0; i < 70; i++){
        var c = color(106,90,205);
        
        flowers.push(new Flowers(
                                random(100, worldSize), 
                                floorPos_y-10,  
                                random(20,30),
                                c));
    } 
    //Constructor function array for Clouds    
    for(var i = 0; i < 100; i++){
        var c = color(random(230, 255));
        var move =- 10;
        
        clouds.push(new Clouds(
                                move, 
                                random(floorPos_y - 300, 
                                floorPos_y - 340), 
                                random(20, 30),
                                c));
        clouds.push(new Clouds(
                                random(0, worldSize), 
                                random(floorPos_y - 350, 
                                floorPos_y - 380), 
                                random(20, 40),
                                c));
    } 
    //Constructor function array for Trees    
    for(var i = 0; i < 35; i++){
        var c = color(  
                    0, 
                    random(130, 255), 
                    0);
        
        trees.push(new Trees(
                            random(0, worldSize), 
                            random(floorPos_y, floorPos_y - 30), random(100, 120),
                            c));
        trees.push(new Trees(
                            random(0, worldSize), 
                            random(floorPos_y, floorPos_y - 80), random(100, 120),
                            c));
    } 
}

// Constructor function to draw Trees
function Trees(xPos, yPos, size, colour)
{
    this.x = xPos;
    this.y = yPos;
    this.colour = colour;
    this.drawTrees = function(){
        noStroke();
        fill(139, 69, 19); //trunk colour
        rect(this.x, this.y-10, 15, 200); //tree trunk
        fill(colour);
        stroke(colour);
        strokeWeight(12);
        strokeJoin(ROUND);
        triangle(this.x-20, this.y-10, this.x+8, this.y-80, this.x+35, this.y-10)
        triangle(this.x-20, this.y-10, this.x+8, this.y-70, this.x+35, this.y-10)     
    }
}

// Constructor function to draw Clouds
function Clouds(xPos, yPos, size, colour)
{
    this.x = xPos;
    this.y = yPos;
    this.size = size;
    this.colour = colour;
    this.drawClouds = function(){
    fill(colour); //clouds colour
    ellipse(
      this.x - this.size,
      this.y,
      this.size
    ); //left part of cloud
    ellipse(
      this.x - this.size + 40,
      this.y,
      this.size
    ); //right part of cloud
    ellipse(
      this.x - this.size + 20,
      this.y,
      this.size + 10
    ); //middle part of cloud
        
    }
}

// Constructor function to draw Flowers
function Flowers(xPos, yPos, size, colour)
{
    this.x = xPos;
    this.y = yPos;
    this.size = size;
    this.colour = colour;
    this.drawFlowers = function(){
    fill(colour);
        noStroke();//clouds colour
    ellipse(this.x + 4, this.y ,9,6);
    ellipse(this.x - 4, this.y,9,6);
    ellipse(this.x, this.y + 4,6,9);
    ellipse(this.x, this.y - 4,6,9); 
    stroke(0,200,50);
    strokeWeight(2);
    line(this.x+5, this.y+9, this.x, this.y-5); 
    fill(255,100,0);
    ellipse(this.x,this.y,7,7);
    fill(255,255,255);     
    }
}

/**
--------------------------------------------------------------------------------------
                 Sounds references
-------------------------------------------------------------------------------------- 
Background sounds - taratata.wav - https://freesound.org/people/milton./sounds/162453/

Jumping - jump01.mp3 - https://freesound.org/people/Taira%20Komori/sounds/211741/

Collectable - coins 1.wav https://freesound.org/people/ProjectsU012/sounds/341695/

Falling - Cartoon Fall.wav - https://freesound.org/people/plasterbrain/sounds/395443/

Touching Enemy - enemySound.wav - https://freesound.org/people/Daleonfire/sounds/406113/

End game - SFX-Success!.wav - https://freesound.org/people/HenryRichard/sounds/448274/


*/