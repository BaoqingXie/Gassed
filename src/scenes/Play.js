class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.path = './assets/';
        this.load.image('floor','floor.png');
        // bgcolor line should be replaced with loading bg image
        // this.cameras.main.setBackgroundColor('#FACADE') // just so i can see the character
        
        //this.load.image('player1','guy.png');
        this.load.atlas('player1', 'player1.png', 'player1.json');
    }

    create(){
        // place background tile sprite
        this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setScale(1.25,1.25).setOrigin(0, 0);
        //creating anims using the atlas
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNames('player1', {
                start: 0,
                end: 4,
                zeroPad: 2,
                prefix: 'run',
            }),
            frameRate: 15,
            repeat: -1
        });
        // cycles through the entire fart animation (tap spacebar?)
        this.anims.create({
            key: 'full-fart',
            frames: this.anims.generateFrameNames('player1', {
                start: 0,
                end: 9,
                zeroPad: 2,
                prefix: 'fart',
            }),
            frameRate: 8,
            repeat: 0
        });
        // looping 2 frames while in the air (while holding spacebar?)
        this.anims.create({
            key: 'fart',
            frames: this.anims.generateFrameNames('player1', {
                start: 4,
                end: 5,
                zeroPad: 2,
                prefix: 'fart',
            }),
            frameRate: 8,
            repeat: -1
        });
        // death animation
        this.anims.create({
            key: 'death',
            frames: this.anims.generateFrameNames('player1', {
                start: 0,
                end: 7,
                zeroPad: 2,
                prefix: 'death',
            }),
            frameRate: 8,
            repeat: 0
        });

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.player1 = this.physics.add.sprite(centerX,centerY,'player1');
        this.player1.play('run'); // default run animation
        this.player1.setGravityY(500);

        this.floor = this.physics.add.sprite(centerX,this.game.config.height*0.90,'floor');
        this.floor.displayWidth = this.sys.game.config.width*1.1;
        this.floor.displayHeight = this.game.config.height*0.05
        this.floor.setImmovable();

        this.physics.add.collider(this.player1,this.floor);



<<<<<<< Updated upstream
        this.grounded = false;
        this.justJumped = false;
=======

>>>>>>> Stashed changes

    }

    update() {

<<<<<<< Updated upstream
        
        this.background.tilePositionX += 4;  // scroll tile sprite
=======

        if (this.player1.y + this.player1.height >= this.floor.y - 1 && this.grounded == false) {
<<<<<<< HEAD
=======

        //Background scrolling

  

>>>>>>> 1375826395ff668f030e93ce3814cd5e1f79f3de
            this.grounded = true;
            if (!this.justJumped)
                this.player1.play('run'); // when grounded/not jumping, play run animation
        }
>>>>>>> Stashed changes

        if (this.player1.y + this.player1.height >= this.floor.y - 1 && this.grounded == false)
            this.grounded = true;
            
        if (this.player1.y + this.player1.height < this.floor.y - 1 && this.grounded == true)
            this.grounded = false;

        if (Phaser.Input.Keyboard.JustDown(keySPACE) && this.grounded){
            this.justJumped = true;
            console.log('jump');
            this.player1.setVelocity(0,-400);
            this.grounded = false;
            setTimeout(() => {this.justJumped = false;}, 500);
        }

        if (keySPACE.isDown && !this.grounded && !this.justJumped){
            console.log('fart');
            this.player1.setAcceleration(0,-950);
        }
        else {
            this.player1.setAcceleration(0,0);
        }

    }
}