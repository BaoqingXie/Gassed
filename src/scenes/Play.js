class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.path = './assets/';
        this.load.image('player1','guy.png');
        this.load.image('floor','floor.png');
    }

    create(){

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.player1 = this.physics.add.sprite(centerX,centerY,'player1');
        this.player1.setGravityY(500);

        this.floor = this.physics.add.sprite(centerX,this.game.config.height*0.90,'floor');
        this.floor.displayWidth = this.sys.game.config.width*1.1;
        this.floor.displayHeight = this.game.config.height*0.05
        this.floor.setImmovable();

        this.physics.add.collider(this.player1,this.floor);




        this.grounded = false;
        this.justJumped = false;

    }

    update() {
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