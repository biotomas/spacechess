
var bullets = new Array();
var spritesPool = new Array();
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

function setBulletSprite(sprite0, sprite1, sprite2, sprite3, scene) {
    bulletFrames.push(sprite0.material, sprite1.material, sprite2.material, sprite3.material);
    sprite0.scale.x = 0.6;
    sprite0.scale.y = 0.6;
    bulletMaterial = sprite0.material;
    for (let count = 0; count < 1000; count++) {
        var clonedSprite = sprite0.clone();
        clonedSprite.position.y = 20;
        //clonedSprite.material = sprite.material.clone();
        scene.add(clonedSprite);
        spritesPool.push(clonedSprite);
    }

}

bulletTimeDelay = 0.3;

function finishBulletSpree(time) {
    var timeSinceLastShot = time - lastShootTime;
    if (timeSinceLastShot > bulletTimeDelay) {
        lastShootTime = time;
    }
}

function addBullet(isFromPlayer, startx, starty, deltax, deltay, speed, time) {
    var timeSinceLastShot = time - lastShootTime;
    if (timeSinceLastShot > bulletTimeDelay) {

        var bullet = new Bullet();
        bullet.isFromPlayer = isFromPlayer;
        bullet.x = startx;
        bullet.y = starty;
        bullet.dx = deltax;
        bullet.dy = deltay;
        bullet.speed = speed;
        bullet.sprite = spritesPool.pop();
        if (!bullet.sprite) {
            console.log("out of bullets");
            return;
        }
        bullet.sprite.material.rotation = -deltax; //Math.sin(deltax);
        bullets.push(bullet);
    }
}

function updateBullets(time) {
    if (lastRenderTime == null) {
        lastRenderTime = time;
        return;
    }
    bulletMaterial.map = bulletFrames[Math.round(time * 5) % 4].map;

    deltaTime = time - lastRenderTime;
    lastRenderTime = time;
    for (let index = 0; index < bullets.length; index++) {
        const bullet = bullets[index];
        bullet.x = bullet.x + deltaTime * bullet.dx * bullet.speed;
        bullet.y = bullet.y + deltaTime * bullet.dy * bullet.speed;
        if (bullet.sprite) {
            bullet.sprite.position.x = bullet.x;
            bullet.sprite.position.y = bullet.y;
        }
    }
    bullets = bullets.filter(bullet => !removeBullet(bullet));
}

function removeBullet(bullet) {
    if (bullet.x < -100 || bullet.x > 100 || bullet.y < -10 || bullet.y > 20) {
        spritesPool.push(bullet.sprite);
        return true;
    } else {
        return false;
    }
}