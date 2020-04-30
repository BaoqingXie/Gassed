class Banana extends Item {
    constructor(scene, x, y, texture, frame, pointvalue) {
        super(scene, x, y, texture, frame, pointvalue);

        scene.add.existing(this); //add to existing, diplaylist updatelist
        this.points = pointvalue;
    }
}