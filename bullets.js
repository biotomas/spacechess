
var bullets = new Array();
var playerBulletSpritePool = new Array();
var enemyBulletSpritePool = new Array();
var lastRenderTime = null;
var lastShootTime = 0;
var bulletFrames = new Array();
var bulletMaterial;

class Bullet {
    isFromPlayer;
    x;
    y;
    dx;
    dy;
    speed;
    sprite;
}

function setBulletSprite(sprite0, sprite1, sprite2, sprite3, enemySprite, scene) {
    bulletFrames.push(sprite0.material, sprite1.material, sprite2.material, sprite3.material);
    sprite0.scale.x = 0.6;
    sprite0.scale.y = 0.6;
    enemySprite.scale.x = 0.3;
    enemySprite.scale.y = 0.3;
    enemySprite.material.rotation.x = Math.PI;
    
    bulletMaterial = sprite0.material;
    for (let count = 0; count < 1000; count++) {
        var clonedSprite = sprite0.clone();
        clonedSprite.position.y = -100;
        scene.add(clonedSprite);
        playerBulletSpritePool.push(clonedSprite);

        clonedSprite = enemySprite.clone();
        clonedSprite.position.y = -100;
        scene.add(clonedSprite);
        enemyBulletSpritePool.push(clonedSprite);
    }    
}

bulletTimeDelay = 0.2;

function finishBulletSpree(time) {
    var timeSinceLastShot = time - lastShootTime;
    if (timeSinceLastShot > bulletTimeDelay) {
        lastShootTime = time;
    }
}

function addBullet(isFromPlayer, startx, starty, deltax, deltay, speed, time) {
    var timeSinceLastShot = time - lastShootTime;
    if (!isFromPlayer || timeSinceLastShot > bulletTimeDelay) {
        var bullet = new Bullet();
        bullet.isFromPlayer = isFromPlayer;
        bullet.x = startx;
        bullet.y = starty;
        bullet.dx = deltax;
        bullet.dy = deltay;
        bullet.speed = speed;
        bullet.sprite = isFromPlayer ? playerBulletSpritePool.pop() : enemyBulletSpritePool.pop();
        if (!bullet.sprite) {
            console.log("out of bullets");
            return;
        }
        //bullet.sprite.material.rotation.y = -deltax + Math.PI;
        bullets.push(bullet);
    }
}

function updateBullets(time, player) {
    if (lastRenderTime == null) {
        lastRenderTime = time;
        return;
    }
    //bulletMaterial.map = bulletFrames[Math.round(time * 10) % 4].map;

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
        if (bullet.isFromPlayer) {
            playerBulletSpritePool.push(bullet.sprite);
        } else {
            enemyBulletSpritePool.push(bullet.sprite);
        }
        return true;
    } else {
        return false;
    }
}

function bulletHitPlayer(bullet, player) {
    if (bullet.isFromPlayer) {
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
    if (!bullet.isFromPlayer) {
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