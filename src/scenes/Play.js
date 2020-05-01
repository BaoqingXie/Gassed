class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.path = './assets/';
        this.load.atlas('player1', 'player1.png', 'player1.json');
        this.load.image('floor','floor.png');
        this.load.image('fuelbar', 'fuelbar.png');

        // can replace with bg asset
        this.cameras.main.setBackgroundColor('#FACADE') // just so i can see the character


    }

    create(){
        //creating anims using the atlas - can tinker with
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

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.player1 = this.physics.add.sprite(centerX,centerY,'player1').setScale(0.5);
        this.player1.setFrame('death00'); // this is the idle frame
        this.player1.setGravityY(500);

        this.floor = this.physics.add.sprite(centerX,this.game.config.height*0.90,'floor');
        this.floor.displayWidth = this.sys.game.config.width*1.1;
        this.floor.displayHeight = this.game.config.height*0.05
        this.floor.setImmovable();

        this.physics.add.collider(this.player1,this.floor);




        this.grounded = false;
        this.justJumped = false;
        this.isFarting = false; // added to clean up animation
    }

    update() {
        if (this.player1.y + this.player1.height >= this.floor.y - 1 && this.grounded == false){
            this.grounded = true;
            if(!this.justJumped)
                this.player1.play('run'); // when grounded/not jumping, play run animation
        }
            
        if (this.player1.y + this.player1.height < this.floor.y - 1 && this.grounded == true)
            this.grounded = false;

        if (Phaser.Input.Keyboard.JustDown(keySPACE) && this.grounded){
            this.justJumped = true;
            this.player1.play('jump-fart');
            console.log('jump');
            this.player1.setVelocity(0,-400);
            this.grounded = false;
            setTimeout(() => {this.justJumped = false;}, 500);
        }

        if (keySPACE.isDown && !this.grounded && !this.justJumped){
            console.log('fart');
            if(!this.isFarting){
                this.player1.play('loop-fart');
                this.isFarting = true;
            }
            this.player1.setAcceleration(0,-950);
        }
        else {
            this.player1.setAcceleration(0,0);
            if(this.isFarting && !this.grounded){
                this.player1.play('falling');
                this.isFarting = false;
            }
        }

    }
}