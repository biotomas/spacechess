
var bullets = new Array();
var bulletPools = new Array();
var lastRenderTime = null;
var lastShootTime = 0;

class Bullet {
    type
    x;
    y;
    dx;
    dy;
    speed;
    sprite;
}

//setBulletSprite(loadSprite('./sprites/bullet/plyaer.png'), loadSprite('./sprites/bullet/bishop.png'), 
//loadSprite('./sprites/bullet/horse.png'), loadSprite('./sprites/bullet/rook.png'),loadSprite('./sprites/queen.png'), scene);


function setBulletSprite(playerSprite, bishopSprite, horseSprite, rookSprite, queenSprite, scene) {
    for (let count = 0; count < 200; count++) {
        addBulletSpriteToPool(scene, playerSprite, "player");
        addBulletSpriteToPool(scene, bishopSprite, "bishop");
        addBulletSpriteToPool(scene, horseSprite, "horse");
        addBulletSpriteToPool(scene, rookSprite, "rook");
        addBulletSpriteToPool(scene, queenSprite, "queen");
    }    
}

function addBulletSpriteToPool(scene, sprite, type) {
    if (!bulletPools[type]) {
        bulletPools[type] = new Array();
    }
    var clone = sprite.clone();
    clone.position.y = -100;
    scene.add(clone);
    bulletPools[type].push(clone);
}

bulletTimeDelay = 0.2;

function finishBulletSpree(time) {
    var timeSinceLastShot = time - lastShootTime;
    if (timeSinceLastShot > bulletTimeDelay) {
        lastShootTime = time;
    }
}

function addBullet(type, startx, starty, deltax, deltay, speed, time) {
    var timeSinceLastShot = time - lastShootTime;
    if (type != "player" || timeSinceLastShot > bulletTimeDelay) {
        var bullet = new Bullet();
        bullet.type = type;
        bullet.x = startx;
        bullet.y = starty;
        bullet.dx = deltax;
        bullet.dy = deltay;
        bullet.speed = speed;
        bullet.sprite = bulletPools[type].pop();
        if (!bullet.sprite) {
            console.log("out of bullets");
            return;
        }
        bullets.push(bullet);
    }
}

function updateBullets(time, player) {
    if (lastRenderTime == null) {
        lastRenderTime = time;
        return;
    }
    deltaTime = time - lastRenderTime;
    lastRenderTime = time;
    bullets = bullets.filter(bullet => !updateBullet(bullet, player, deltaTime));
}

function updateBullet(bullet, player, deltaTime) {
    bullet.x = bullet.x + deltaTime * bullet.dx * bullet.speed;
    bullet.y = bullet.y + deltaTime * bullet.dy * bullet.speed;
    if (bullet.sprite) {
        bullet.sprite.position.x = bullet.x;
        bullet.sprite.position.y = bullet.y;
    }
    if (bulletOutOfBounds(bullet) || bulletHitEnemy(bullet) || bulletHitPlayer(bullet, player)) {
        bullet.sprite.position.y = -100;
        bulletPools[bullet.type].push(bullet.sprite);
        return true;
    } else {
        return false;
    }
}

function bulletHitPlayer(bullet, player) {
    if (bullet.type == "player") {
        return false;
    }
    var px = player.position.x;
    var py = player.position.y;
    var distanceSquare = (px - bullet.x)*(px - bullet.x) + (py - bullet.y)*(py - bullet.y);
    if (distanceSquare < 0.5) {
        console.log("player was hit");
        return true;
    }
    return false;
}

function bulletHitEnemy(bullet) {
    if (bullet.type != "player") {
        return false;
    }
    for (let index = 0; index < liveEnemies.length; index++) {
        var enemy = liveEnemies[index];
        var px = enemy.model.position.x;
        var py = enemy.model.position.y;
        var distanceSquare = (px - bullet.x)*(px - bullet.x) + (py - bullet.y)*(py - bullet.y);
        if (distanceSquare < 0.5) {
            enemy.hitpoints-=10;
            return true;
        }
    }
    return false;
}

function bulletOutOfBounds(bullet) {
    return (bullet.x < -100 || bullet.x > 100 || bullet.y < -10 || bullet.y > 20);
}