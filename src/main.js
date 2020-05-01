let config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 600,

    physics: {
        default: "arcade",
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },

    scene: [Menu,Play],
};

let game = new Phaser.Game(config);


let keySPACE;


let centerX = game.config.width/2;
let centerY = game.config.height/2;