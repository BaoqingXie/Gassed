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
        this.load.audio('Selection', 'Selection.wav');
        
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
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        
        this.add.sprite(centerX, centerY/2, 'GassedLogo');  //logo

        this.startButton = this.add.sprite(centerX, centerY, 'Start', 1).setScale(0.75,0.75);
        this.startButton.setInteractive({
            useHandCursor: true
        });

        this.instructionButton = this.add.sprite(centerX, centerY+60, 'Instruction', 1).setScale(0.55,0.55);
        this.instructionButton.setInteractive({
            useHandCursor: true
        });

        this.creditsButton = this.add.sprite(centerX, centerY+120, 'Credits', 1).setScale(0.5,0.5);
        this.creditsButton.setInteractive({
            useHandCursor: true
        });

        this.input.on('gameobjectover', (pointer, gameObject, event) => {
            gameObject.setFrame(2);
        });


        this.input.on('gameobjectout', (pointer, gameObject, event) => {
            gameObject.setFrame(1);
        });

        this.input.on('gameobjectdown', (pointer, gameObject, event) => {
            this.sound.play('Selection', {volume:0.25});
            if(gameObject===this.startButton){
                this.scene.start("playScene");  
            }else if(gameObject===this.instructionButton){
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
