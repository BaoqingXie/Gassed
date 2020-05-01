class Menu extends Phaser.Scene {

    constructor() {
  
        super("menuScene");
  
    }
  
  
  
    preload() {
  
        // load audio
        // this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.image('Background','Background.png');
    }
  
    create() {
      //menu background
      this.background = this.add.tileSprite(0, 0, 640, 480, 'Background').setScale(1.25, 1.25).setOrigin(0, 0);
  
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
  
        this.add.text(centerX, centerY- textSpacer, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY, 'Use ←→ arrows to move & (F) to Fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(centerX, centerY + textSpacer, 'Press ← for Easy or → for Hard', menuConfig).setOrigin(0.5);
          
        
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }
  
  
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000    
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene");    
        }
  
    }
  
  }