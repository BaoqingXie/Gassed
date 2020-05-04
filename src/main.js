
/*
------------------------------------------------------------------------
Team: The Cooler Team
Contributors: Alec Zhang, BaoQing Xie, Brad Kim, and JunYao Li
Game Title: Gassed
Date completed: TBD
------------------------------------------------------------------------

Creative Tilt Justification:

(technical):
Especially after the lecture where I learned that when 2 objects push hard enough, they will
fairly easily phase through each other, I was mainly concerned with walls consistently
pushing the player back without phasing. The running animation of the player causes the
collision box to shift around, and when it shifts forward it phases through walls.
I ended up implementing AABB collision mixed in with the built in arcade physics collision.
So if the player is inside the wall, then they are simply pushed out to the front. Thankfully
the player will only ever phase from one side of the wall, so it was as simple as setting the
player x value to the front of the wall.

------------------------------------------------------------------------
(audio/visual):
1.For the floor drawing, I first draw 32X32 pieces and copy paste the rest of them, then do the polish……..
2.Instead of only using Aseprite, I combine it with Photoshop to do the work.
3.This is also my first time drawing a pixel, I leant how to use dark colour to show the shadow.
4.Also, I get many ideas from other pixel drawing online.
5.Our assets/animations as well as the background music are all original works.

------------------------------------------------------------------------
credits:
logo: Textcraft.com
gasbar.js: https://phaser.io/examples

------------------------------------------------------------------------
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