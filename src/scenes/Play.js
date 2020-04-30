class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {

    }

    create() {
        this.hp = new HealthBar(this, 100, 100);
        this.hp.decrease(10);
        this.hp.increase(10);

    }

    update() {

    }
}