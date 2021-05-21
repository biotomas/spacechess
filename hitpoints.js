var pelletSprite;
var hitpoints = 5;

function setHPSprites(empty, pellet, scene) {

    scene.add(pellet);
    pellet.position.y = -3.5;
    pellet.position.x = -2;
    pellet.position.z = -0.01;
    pellet.scale.y = 0.45;
    pellet.scale.x = 0;
    pelletSprite = pellet;

    scene.add(empty);
    empty.position.y = -3.5;
    empty.position.x = 0.5;
    empty.scale.x = 7;
}

function setHPValue(value) {
    hitpoints = value;
    if (hitpoints < 0)
        hitpoints = 0;
    if (hitpoints > 5)
        hitpoints = 5;
    pelletSprite.scale.x = hitpoints;
    pelletSprite.position.x = -2 + hitpoints / 2;
}
