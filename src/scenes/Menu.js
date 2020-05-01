class Menu extends Phaser.Scene {

    constructor() {
  
        super("menuScene");
  
    }
  
  
  
    preload() {
        this.load.path = './assets/';
        // load audio
        // this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.image('background','Background.png');
        
    }
  
    create() {
      //menu background
      this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setScale(1.25, 1.25).setOrigin(0, 0);
  
        // menu display
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
  
        // show menu text
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;
  
        this.add.text(centerX, centerY- textSpacer, 'Gassed', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY, ' (space key) to Jump', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(centerX, centerY + textSpacer, 'Press Space to start', menuConfig).setOrigin(0.5);
                 
        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
    }
  
  
    update() {

        this.background.tilePositionX += 4;  // scroll tile sprite
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {

            this.scene.start("playScene");    
        }
  
    }
  
  }