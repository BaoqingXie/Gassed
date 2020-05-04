
/*
Contributors: Alec Zhang, BaoQing Xie, Brad Kim, and JunYao Li
Game Title: Gassed
Date completed: TBD

Creative Tilt Justification:



*/



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

    scene: [Menu,Instruction,Credits,Play],
};

let game = new Phaser.Game(config);




//CONSTANTS
let keySPACE; //space key


let Width = game.config.width;
let Height = game.config.height;
let centerX = game.config.width/2;
let centerY = game.config.height/2;

let playerStartPos = 150;



let gameSpeed = 1;
let gravity = 800;
let jumpHeight = 500;
let fartStrength = 1500;
let fartConsumption = 0.2;

this.BGMisPlaying = false;