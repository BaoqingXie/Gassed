class Menu extends Phaser.Scene {

    constructor() {
  
        super("menuScene");
  
    }
  
  
  
    preload() {
        this.load.path = './assets/';
        // load audio
        // this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.image('background','Background.png');
        this.load.image('GassedLogo','GASSEDLOGO.png');
        this.load.atlas('Start', 'START.png', 'START.json')
        this.load.atlas('Instruction', 'Instruction.png', 'Instruction.json')
        this.load.atlas('Credits', 'Credits.png', 'Credits.json')
        
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
  
        //this.add.text(centerX, centerY- textSpacer, 'Gassed', menuConfig).setOrigin(0.5);
        //this.add.text(centerX, centerY, ' (space key) to Jump', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        //this.add.text(centerX, centerY + textSpacer, 'Press Space to start', menuConfig).setOrigin(0.5);
        
        //logo
        this.add.sprite(centerX, centerY-200, 'GassedLogo');
        this.startLogo = this.add.sprite(centerX, centerY-50, 'Start', 1).setScale(0.7,0.7);
        this.startLogo.setInteractive({
            useHandCursor: true
        });

        this.Instruction = this.add.sprite(centerX, centerY+10, 'Instruction', 1).setScale(0.55,0.55);
        this.Instruction.setInteractive({
            useHandCursor: true
        });

        this.Credits = this.add.sprite(centerX, centerY+70, 'Credits', 1).setScale(0.6,0.6);
        this.Credits.setInteractive({
            useHandCursor: true
        });

        this.input.on('gameobjectdown', (pointer, gameObject, event) => {
            gameObject.setFrame(2);
            //this.scene.start("playScene");  
        });

        this.input.on('gameobjectup', (pointer, gameObject, event) => {
            gameObject.setFrame(1);
            if(gameObject===this.startLogo){
                this.scene.start("playScene");  
            }else if(gameObject===this.Instruction){
                this.scene.start("InstructionScene");  
            }else{
                this.scene.start("CreditsScene"); 
            }
        });
                 
        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
    }
  
  
    update() {
        this.background.tilePositionX += gameSpeed*2.5;  // scroll tile sprite
    }
  }