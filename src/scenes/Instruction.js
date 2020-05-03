class Instruction extends Phaser.Scene {

    constructor() {

        super("InstructionScene");

    }

    preload() {
        this.load.path = './assets/';

        this.load.image('Burrito', 'Burrito.png');
        this.load.image('Banana', 'Banana.png');
        this.load.image('fart', 'fart.png');
        this.load.atlas('Back', 'Back.png', 'Back.json');
        this.load.atlas('player1', 'player1.png', 'player1.json');

    }

    create() {
        //menu background
        this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setScale(1.25, 1.25).setOrigin(0, 0);

        let titleConfig = {
            fontFamily: 'Comic Sans MS',
            fontSize: '28px',
            color: '#808000',
            align: 'left',
            fixedWidth: 0,
        }

        let smallConfig = {
            fontFamily: 'Comic Sans MS',
            fontSize: '20px',
            color: '#808000',
            align: 'left',
            fixedWidth: 0,
        }
        let textSpacer = 60;

        this.add.text(centerX - 5 * textSpacer, centerY - 3 * textSpacer, 'Control:', titleConfig).setOrigin(0, 0);
        this.add.text(centerX - 5 * textSpacer, centerY - 2 * textSpacer, 'Press [space] to jump', smallConfig).setOrigin(0, 0);
        this.add.text(centerX - 5 * textSpacer, centerY - 1 * textSpacer, 'Hold [space] to fart', smallConfig).setOrigin(0, 0);
        this.add.image(centerX - 5.5 * textSpacer, centerY - 1.3 * textSpacer,'player1', 10).setScale(0.5, 0.5);

        this.add.text(centerX + textSpacer, centerY - 3 * textSpacer, 'Items:', titleConfig).setOrigin(0, 0);
        this.add.text(centerX + textSpacer, centerY - 2 * textSpacer, 'Collect burritos to keep gas', smallConfig).setOrigin(0, 0);
        this.add.text(centerX + textSpacer, centerY - 1 * textSpacer, 'Avoid bananas which release gas', smallConfig).setOrigin(0, 0);
        this.add.image(centerX + 0.4*textSpacer, centerY - 1 * textSpacer,'Banana').setOrigin(0, 0);
        this.add.image(centerX + 0.4*textSpacer, centerY - 2 * textSpacer,'Burrito').setOrigin(0, 0);

        this.add.text(centerX - textSpacer, centerY + 0.5 * textSpacer, 'How to play:', titleConfig).setOrigin(0, 0);
        this.add.text(centerX - 4 * textSpacer, centerY + 1.5 * textSpacer, '1. Use your gas to jump and fart in order to avoid obstacle', smallConfig).setOrigin(0, 0);
        this.add.text(centerX - 4 * textSpacer, centerY + 2.5 * textSpacer, '2. Collect right items to keep going forward', smallConfig).setOrigin(0, 0);
        this.add.image(centerX - 5*textSpacer, centerY + 2.2 * textSpacer,'fart');

        this.Back = this.add.sprite(100, 50, 'Back', 1).setScale(0.5, 0.5);
        this.Back.setInteractive({
            useHandCursor: true
        });

        this.input.on('gameobjectdown', (pointer, gameObject, event) => {
            gameObject.setFrame(2);
        });

        this.input.on('gameobjectup', (pointer, gameObject, event) => {
            gameObject.setFrame(1);
            this.scene.start("menuScene");
        });


    }

    update() {
        this.background.tilePositionX += 4;  // scroll tile sprite
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {

        }
    }
}