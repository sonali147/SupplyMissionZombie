//Declaring the variables.
var helicopterIMG, helicopterSprite, packageSprite,packageIMG;
var packageBody,ground, zombieLeft, zombieRight;
var leftBoxBody,rightBoxBody,bottomBoxBody;
var leftBoxSprite,rightBoxSprite,bottomBoxSprite;
var zombieLeftImg,zombieRightImg, headText, headText2;
var zombie_sound, success_sound, Heading, Heading2;

//Declaring the constants.
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

//preload function.
function preload() {
	//Loading images to four variables.
	helicopterIMG=loadImage("helicopter.png");
	packageIMG=loadImage("package.png");
	zombieLeftImg = loadImage("zombie left.jpg");
	zombieRightImg = loadImage("zombie right.jpg");
	Heading = loadImage("Text.png");
	Heading2 = loadImage("Text2.png");
	//Loading sounds to two variables.
	zombie_sound = loadSound("zombie_sound.mp3");
	success_sound = loadSound("win.mp3");
}

//setup function.
function setup() {
	//Creating the canvas area.
	createCanvas(800, 700);
	//Setting rectMode as CENTER.
	//rectMode(CENTER);

	//Creating a sprites for heading.
	//Adding image to them.
	//Adjusting their size.
	headText = createSprite(400,60,10,10);
	headText.addImage(Heading);
	headText.scale = 0.55;
	headText2 = createSprite(410,100,10,10);
	headText2.addImage(Heading2);
	headText2.scale = 0.2;


	//Creating a sprite named zombieLeft.
	zombieLeft = createSprite(-50,610,10,10);
	//Adding image to it.
	zombieLeft.addImage(zombieLeftImg);
	//Adjusting its size.
	zombieLeft.scale = 0.2;

	//Creating a sprite named zombieRight.
	zombieRight = createSprite(850,610,10,10);
	//Adding image to it.
	zombieRight.addImage(zombieRightImg);
	//Adjusting its size.
	zombieRight.scale = 0.2;

	//Creating a sprite named packageSprite.
	packageSprite=createSprite(50, 80, 10,10);
	//Adding image to it.
	packageSprite.addImage(packageIMG);
	//Adjusting its size.
	packageSprite.scale = 0.2;

	//Creating a sprite named helicopterSprite.
	helicopterSprite=createSprite(50, 70, 10,10);
	//Adding image to it.
	helicopterSprite.addImage(helicopterIMG);
	//Adjusting its size.
	helicopterSprite.scale = 0.6;

	//Creating a sprite named groundSprite.
	groundSprite=createSprite(width/2, 670, width,50);
	//Giving white color to it.
	//groundSprite.shapeColor=color(255);

	//Creating an Engine and storing it in the variable engine.
	engine = Engine.create();
	//Storing 'engine.world' in the variable world.
	world = engine.world;

	//Creating a circle body named packageBody.
	packageBody = Bodies.rectangle(50 , 80 , 10, 10 , {restitution:0, isStatic:true});
	//Adding it to Matter.World.
	World.add(world, packageBody);

	//Creating a rectangle body named ground.
	ground = Bodies.rectangle(width/2, 670, width, 50 , {isStatic:true} );
	//Adding it to Matter.World.
	World.add(world, ground);

	//Creating three sprites for the red box.
	//Giving red color to them.
	leftBoxSprite=createSprite(360, 620, 10,50);
	leftBoxSprite.shapeColor=color(255,0,0);
	bottomBoxSprite=createSprite(400, 630, 70,30);
	bottomBoxSprite.shapeColor=color(255,0,0);
	rightBoxSprite=createSprite(440, 620, 10,50);
 	rightBoxSprite.shapeColor=color(255,0,0);

	//Creating three rectangle bodies for the red box.
	//Adding them to Matter.world.
 	leftBoxBody = Bodies.rectangle(360, 620, 10,70 , {isStatic:true} );
 	World.add(world, leftBoxBody);
 	bottomBoxBody = Bodies.rectangle(400, 630, 70,30 , {isStatic:true} );
 	World.add(world, bottomBoxBody);
 	rightBoxBody = Bodies.rectangle(440, 620, 10,70 , {isStatic:true} );
	World.add(world, rightBoxBody);

	//Running the previously created engine.
	
}

//draw function.
function draw() {
	Engine.update(engine);
	//Setting rectMode as CENTER.
	//rectMode(CENTER);
	//Setting background color as black.
	background(rgb(46,48,47));

	//rect(ground.position.x, ground.position.y, width, 50);
	
	//Setting packageSprite's x and y position same as packageBody's x and y position.
	packageSprite.x = packageBody.position.x;
	packageSprite.y = packageBody.position.y-10;

	//Setting leftBoxSprite's x and y position same as leftBoxBody's x and y position.
	leftBoxSprite.x = leftBoxBody.position.x;
	leftBoxSprite.y = leftBoxBody.position.y;

	//Setting rightBoxSprite's x and y position same as rightBoxBody's x and y position.
	rightBoxSprite.x = rightBoxBody.position.x;
	rightBoxSprite.y = rightBoxBody.position.y;

	//Setting bottomBoxSprite's x and y position same as bottomBoxBody's x and y position.
	bottomBoxSprite.x = bottomBoxBody.position.x;
	bottomBoxSprite.y = bottomBoxBody.position.y;

	groundSprite.x = ground.position.x;
	groundSprite.y = ground.position.y;

	//Displaying 'Well Done!' text under certain conditions.
	/*
	if(packageSprite.isTouching(bottomBoxSprite) && packageSprite.x > 375 && packageSprite.x < 425) {
		if(zombieLeft.velocityX === 0 || zombieRight.velocityX === 0) {
			fill("red");
			textFont("segoe script");
			textStyle(BOLD);
			textSize(30);
			text("Well Done!", 290,500);
		}
	}

	//Colliding packageSprite with bottomBoxSprite.
	//packageSprite.collide(bottomBoxSprite);
	//packageSprite.collide(leftBoxSprite);
	//packageSprite.collide(rightBoxSprite);

	//Changing zombieLeft and zombieRight's velocity when packageSprite touches groundSprite.
	*/
	//if(packageSprite.isTouching(groundSprite)) {
	if(packageBody.position.y > 600) {	
		//Matter.Body.setStatic(packageBody,true);
		if(packageBody.position.x > 10 && packageBody.position.x < 350) {
			zombieLeft.velocityX = 3;
		}
		else if(packageBody.position.x > 450 && packageBody.position.x < 800) {
			zombieRight.velocityX = -3;
		}
	} 

    
	//Assigning functions when packageSprite touches zombieLeft, zombieRight or packageSprite's y position is greater than 800.
	//if(packageSprite.isTouching(zombieLeft) || packageSprite.isTouching(zombieRight) || packageSprite.y > 800) {
	//console.log(packageBody.position.x - zombieLeft.x);
	if((packageBody.position.x - zombieLeft.x < 30) || (zombieRight.x - packageBody.position.x < 30)) {
		//Setting zombieLeft and zombieRight's velocityX to 0.
		zombieLeft.velocityX = 0;
		zombieRight.velocityX = 0;
		//Making packageSprite invisible.
		packageSprite.visible = false;

		//Displaying text.
		fill("red");
		textFont("segoe script");
		textStyle(BOLD);
		textSize(30);
		text("Refresh the page to retry.", 210,500);
	}

	/*
	//Setting a condition when Right Arrow key is pressed.
	//If the condition is true, zombie_sound is played; else success_sound is played.
	if(keyDown(RIGHT_ARROW)) {
		if(packageSprite.x < 375 || packageSprite.x > 425) {
			if(packageSprite.y < 200) {
				zombie_sound.play();
			}
		}
		else {
			if(packageSprite.y < 200) {
				success_sound.play();
			}
		}
	}
	*/
	//Displaying info text.
	fill("white");
	textFont("segoe script");
	textSize(20);
	text("Drop the package in the red box.",200,160);
	text("It contains supplies for the people stuck in the zombie city",20,190);
	text("Press left arrow key for left and Ctrl key for right. Press Right arrow",20,220);
	text("key to drop the package.",20,250)

	//Displaying all sprites on the screen.
  	drawSprites();
}

//keyPressed function.
function keyPressed() {
	//Moving helicopterSprite towards left when down arrow key is pressed and packageSprite's y position is less than 200.
	if (keyCode === DOWN_ARROW) {
		helicopterSprite.x=helicopterSprite.x-30;    
		if(packageSprite.y < 200) {
			//translation={x:-30,y:0}
			//Matter.Body.translate(packageBody, translation)	
			Matter.Body.setPosition(packageBody, {x:packageBody.position.x - 30, y :packageBody.position.y})	
		}
	} 
	
	//Moving helicopterSprite towards right when control key is pressed and packageSprite's y position is less than 200.
	else if (keyCode === CONTROL) {
		helicopterSprite.x=helicopterSprite.x+30;
		if(packageSprite.y < 200) {
			//translation={x:30,y:0}
			//Matter.Body.translate(packageBody, translation)	
			Matter.Body.setPosition(packageBody, {x:packageBody.position.x + 30, y :packageBody.position.y})	
		}
	}

	//Making the packageBody fall on ground when Right arrow key is pressed and packageSprite's y is less than 200.
 	else if (keyCode === RIGHT_ARROW ) {
    	Matter.Body.setStatic(packageBody, false);
  	}
}


