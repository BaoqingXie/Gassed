class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.path = './assets/';

        this.load.atlas('player1', 'player1.png', 'player1.json');
        this.load.image('background', 'Background.png');
        this.load.image('floor', 'Floor.png');
        this.load.image('fuelbar', 'fuelbar.png');
        this.load.image('Burrito', 'Burrito.png');
        this.load.image('Banana', 'Banana.png');
        this.load.image('Icecream', 'icecream.png');
        this.load.image('fart', 'fart.png');
        this.load.image('wall', 'obstacle1.png');
        this.load.audio('fart_J', 'Fart_J.wav');
        this.load.audio('fart_F', 'Fart_F.wav');
        this.load.audio('fart_D', 'Fart_D.wav');
        this.load.audio('Eat', 'Eat.wav');
    }


    create() {
        // place background tile sprite
        this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setScale(1.25, 1.25).setOrigin(0, 0);
        
      
        //creating anims using the atlas
        this.anims.create({
            key: 'run', // default running animation
            frames: this.anims.generateFrameNames('player1', {
                start: 0,
                end: 4,
                zeroPad: 2,
                prefix: 'run',
            }),
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: 'jump-fart', // plays entire fart animation
            frames: this.anims.generateFrameNames('player1', {
                start: 0,
                end: 9,
                zeroPad: 2,
                prefix: 'fart',
            }),
            frameRate: 12,
            repeat: 0
        });

        this.anims.create({
            key: 'loop-fart', // looping 2 frames while in the air (while holding spacebar?)
            frames: this.anims.generateFrameNames('player1', {
                start: 3,
                end: 7,
                zeroPad: 2,
                prefix: 'fart',
            }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'falling', // fart dissipating (tap spacebar?)
            frames: this.anims.generateFrameNames('player1', {
                start: 6,
                end: 9,
                zeroPad: 2,
                prefix: 'fart',
            }),
            frameRate: 8,
            repeat: 0
        });

        this.anims.create({
            key: 'death', // death animation
            frames: this.anims.generateFrameNames('player1', {
                start: 0,
                end: 7,
                zeroPad: 2,
                prefix: 'death',
            }),
            frameRate: 8,
            repeat: 0
        });


    
        //input
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //floor
        this.floor = this.physics.add.sprite(centerX, Height * 0.99, 'floor');
        this.floor.displayWidth = Width * 1.2;
        this.floor.displayHeight = Height * 0.1
        this.floor.setImmovable();
        this.floortile = this.add.tileSprite(0, Height-35, Width, 35, 'floor').setScale(1.1,1.1).setOrigin(0,0);
        
        //ceiling
        this.ceiling = this.physics.add.sprite(centerX, -30, 'floor');
        this.ceiling.displayWidth = Width * 1.2;
        this.ceiling.displayHeight = Height * 0.1
        this.ceiling.setImmovable();
       
        //add walls
        this.wall1 = this.physics.add.sprite(Width*2,this.getRandomArbitrary(0,Height),'wall');
        this.wall2 = this.physics.add.sprite(this.getRandomArbitrary(Width*3,Width*5),this.getRandomArbitrary(0,Height),'wall');
        this.wall3 = this.physics.add.sprite(this.getRandomArbitrary(Width*100,Width*103),this.getRandomArbitrary(0,Height),'wall');
        this.wall1.setImmovable(true);
        this.wall2.setImmovable(true);
        this.wall3.setImmovable(true);

        //player
        this.player1 = this.physics.add.sprite(playerStartPos, Height*0.85 - this.floor.height, 'player1').setScale(0.7);
        this.player1.setFrame('death00'); // this is the idle frame
        this.player1.setGravityY(gravity);

        //collision
        this.physics.add.collider(this.player1, this.ceiling);
        this.physics.add.collider(this.player1, this.floor);
        this.physics.add.collider(this.player1, this.wall1);
        this.physics.add.collider(this.player1, this.wall2);
        this.physics.add.collider(this.player1, this.wall3);

        //player states
        this.grounded = false;
        this.justJumped = false;
        this.isFarting = false; // added to clean up animation

        //health bar
        this.gas = new GasBar(this, 50, 20);
        this.add.image(30,25,'fart').setScale(0.6,0.6);

        //add items
        this.banana = this.physics.add.sprite(this.getRandomArbitrary(800, 1000), this.getRandomArbitrary(200, 100), 'Banana');
        this.banana.body.setSize(10, 10)
        this.banana.body.setImmovable(true);
        
        this.burrito = this.physics.add.sprite(this.getRandomArbitrary(800, 1000), this.getRandomArbitrary(200, 400), 'Burrito');
        this.burrito.body.setSize(10, 10)
        this.burrito.body.setImmovable(true);

        this.icecream= this.physics.add.sprite(this.getRandomArbitrary(800, 1000), this.getRandomArbitrary(200, 400), 'Icecream');
        this.icecream.body.setSize(10, 10)
        this.icecream.body.setImmovable(true);
        
        //timer for the game score
        timerEvent = this.time.addEvent({
            delay: 600,                // ms
            callback: this.printTime,
            //args: [],
            callbackScope: this,
            loop: true
        });
        this.elapsed = timerEvent.getRepeatCount();
        this.time = 0;

        //score display
        let smallConfig = {
            fontFamily: 'Comic Sans MS',
            fontSize: '20px',
            color: '#808000',
            align: 'left',
            fixedWidth: 0,
        }
        this.text = this.add.text(670, 20, [] , smallConfig);

        //ice cream condition
        this.playerdeath = 0 ;
    }
    


    update() {
        //faster game speed over time
        if (gameSpeed<=2)
            gameSpeed *= 1.0001

        //scrolling
        this.background.tilePositionX += gameSpeed/1.5;
        this.floortile.tilePositionX += gameSpeed*1.2;

        //handle grounded state
        if (this.player1.y + this.player1.height >= this.floor.y - 1 && this.grounded == false &&this.playerdeath==0) {
            this.grounded = true;
            if (!this.justJumped)
                this.player1.play('run'); // when grounded/not jumping, play run animation
        }
        if (this.player1.y + this.player1.height < this.floor.y - 1 && this.grounded == true)
            this.grounded = false;

        //jump
        if (Phaser.Input.Keyboard.JustDown(keySPACE) && this.grounded&&this.playerdeath==0) {
            this.justJumped = true;
            this.sound.play('fart_J', {volume:0.25});
            this.player1.anims.stop();
            this.player1.setFrame('fart09');
            this.player1.setVelocity(0, -jumpHeight);
            this.grounded = false;
            this.gas.decrease(5);
            setTimeout(() => { this.justJumped = false; }, 300);  //fart delay
        }

        //fart
        if (keySPACE.isDown && !this.grounded && !this.justJumped && this.gas.value > 0&&this.playerdeath==0) {
            if (!this.isFarting) {
                this.player1.play('loop-fart');
                this.isFarting = true;
                this.sound.play('fart_F', {volume:0.25});
            }
            this.gas.decrease(fartConsumption);
            this.player1.setAccelerationY(-fartStrength);
        }
        else if(this.playerdeath==0){
            this.player1.setAcceleration(0, 0);
            if (this.isFarting && !this.grounded) {
                this.player1.play('falling');
                this.isFarting = false;
            }
        }

        //player rubber band
        if (this.player1.x < playerStartPos && this.playerdeath ==0)
            this.player1.setVelocityX(12);
        else{
            this.player1.setAccelerationX(0);
            this.player1.setVelocityX(0);
        }

        //fix phasing
        this.fixwallphasing(this.wall1);
        this.fixwallphasing(this.wall2);
        this.fixwallphasing(this.wall3);

        //walls
        this.update_wall(this.wall1);
        this.update_wall(this.wall2);
        this.update_wall(this.wall3);

        //items
        this.physics.overlap(this.player1, this.banana, this.decrease, null, this)
        this.update_item(this.banana);
        this.physics.overlap(this.player1, this.burrito, this.increase, null, this)
        this.update_item(this.burrito);
        this.physics.overlap(this.player1, this.icecream, this.death, null, this)
        this.update_item(this.icecream);

        //fail state check
        if (this.player1.x < -this.player1.width/2 || this.playerdeath == 1){
            //game over
            this.playerdeath = 1;
            //this.player1.setX(Width*2); //temporary. get the player off screen
            gameSpeed = 0; //freeze game
        }
    }


    fixwallphasing(wall){
        //i get why its called PHASER now...
        let offset = -20
        if (this.player1.x < wall.x + wall.width + offset &&
            this.player1.x + this.player1.width + offset > wall.x &&
            this.player1.y < wall.y + wall.height + offset &&
            this.player1.height + this.player1.y + offset > wall.y){
                this.player1.setX(wall.x-this.player1.width);
            }
    }


    update_wall(wall){
        wall.setVelocityX(-gameSpeed*300);

        if (wall.x < 0){
            wall.setX(this.getRandomArbitrary(centerX*2, centerX*5));
        }
    }

    update_item(item){
        item.setVelocityX(-gameSpeed*300);
        if (item.x < 0){
            item.setX(this.getRandomArbitrary(centerX*3, centerX*6));
            item.setY(this.getRandomArbitrary(centerY*0.5, centerY*1.7));
        }
        
    }

    increase() {
        this.burrito.destroy();
        this.sound.play('Eat', {volume:0.25});
        this.gas.increase(50);
        this.burrito = this.physics.add.sprite(this.getRandomArbitrary(centerX*3, centerX*6), this.getRandomArbitrary(centerY*0.5, centerY*1.7), 'Burrito');
    }

    decrease() {
        this.banana.destroy();
        this.sound.play('Eat', {volume:0.25});
        this.gas.decrease(30);
        this.banana = this.physics.add.sprite(this.getRandomArbitrary(centerX*3, centerX*6), this.getRandomArbitrary(centerY*0.5, centerY*1.7), 'Banana');
    }

    death(){
        this.playerdeath = 1;
        this.icecream.destroy();
        this.sound.play('fart_D', {volume:0.25});
        this.player1.play('death');
        this.icecream = this.physics.add.sprite(this.getRandomArbitrary(centerX*3, centerX*6), this.getRandomArbitrary(centerY*0.5, centerY*1.7), 'Banana');
    }



    
    printTime() {
        if (gameSpeed > 0){
            this.text.setText('Score: ' + this.time + 'm');
            this.time += 1;
        }
    }

    getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

}
