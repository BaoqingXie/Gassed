class Credits extends Phaser.Scene {

    constructor() {

        super("CreditsScene");

    }

    preload() {
        this.load.path = './assets/';
        this.load.atlas('Back', 'Back.png', 'Back.json');

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


        this.add.text(centerX- 3.8 * textSpacer, centerY - 3* textSpacer, 'Presented By The Cooler Team', titleConfig).setOrigin(0, 0);
        this.add.text(centerX - 3.8 * textSpacer, centerY - 2 * textSpacer, 'Alec Zhang', smallConfig).setOrigin(0, 0);
        this.add.text(centerX - 3.8 * textSpacer, centerY - 1 * textSpacer, 'Brad Kim', smallConfig).setOrigin(0, 0);
        this.add.text(centerX - 3.8 * textSpacer, centerY, 'Baoqing Xie', smallConfig).setOrigin(0, 0);
        this.add.text(centerX - 3.8 * textSpacer, centerY + 1 * textSpacer, 'Junyao Li', smallConfig).setOrigin(0, 0);

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