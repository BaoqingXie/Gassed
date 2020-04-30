class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.path = './assets/';
        this.load.image('player1', 'guy.png');
        this.load.image('floor', 'floor.png');
        this.load.image('Banana', 'Banana.png');
        this.load.image('Burrito', 'Burrito.png');
    }

    create() {

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.player1 = this.physics.add.sprite(centerX, centerY, 'player1');
        this.player1.setGravityY(500);
        //this.player1.body.setSize(20,20);
        this.player1.setCollideWorldBounds(true);

        this.floor = this.physics.add.sprite(centerX, this.game.config.height * 0.90, 'floor');
        this.floor.displayWidth = this.sys.game.config.width * 1.1;
        this.floor.displayHeight = this.game.config.height * 0.05
        this.floor.setImmovable();

        this.physics.add.collider(this.player1, this.floor);

        this.grounded = false;
        this.justJumped = false;

        this.hp = new HealthBar(this, 20, 20);

        //add items
        this.banana = this.physics.add.sprite(centerX, centerY -200, 'Banana');
        this.banana.body.setSize(10,10)
        this.banana.body.setImmovable(true);


        this.burrito = this.physics.add.sprite(centerX, centerY - 100, 'Burrito');
        this.burrito.body.setSize(10,10)
        this.burrito.body.setImmovable(true);


    }

    update() {
        if (this.player1.y + this.player1.height >= this.floor.y - 1 && this.grounded == false)
            this.grounded = true;

        if (this.player1.y + this.player1.height < this.floor.y - 1 && this.grounded == true)
            this.grounded = false;

        if (Phaser.Input.Keyboard.JustDown(keySPACE) && this.grounded) {
            this.justJumped = true;
            console.log('jump');
            this.player1.setVelocity(0, -400);
            this.grounded = false;
            setTimeout(() => { this.justJumped = false; }, 500);
            this.hp.decrease(10);
        }

        if (keySPACE.isDown && !this.grounded && !this.justJumped) {
            console.log('fart');
            this.player1.setAcceleration(0, -950);
            this.hp.decrease(0.1);
        }
        else {
            this.player1.setAcceleration(0, 0);
        }

        this.physics.overlap(this.player1, this.burrito, this.increase, null, this);
        this.physics.overlap(this.player1, this.banana, this.decrease, null, this);


    }

    increase(){
        this.hp.increase(1);
        console.log('increase');
    }

    decrease(){
        this.hp.decrease(1);
        console.log('decrease');
    }
}