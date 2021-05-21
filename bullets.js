
var bullets = new Array();
var spritesPool = new Array();
var lastTime = null;

class Bullet {
    isFromPlayer;
    x;
    y;
    dx;
    dy;
    speed;
    sprite;
}

function setBulletSprite(sprite, scene) {
    for (let count = 0; count < 100; count++) {
        var clonedSprite = sprite.clone();
        clonedSprite.position.y = 20;
        clonedSprite.material = sprite.material.clone();
        scene.add(clonedSprite);
        spritesPool.push(clonedSprite);
    }

}

function addBullet(isFromPlayer, startx, starty, deltax, deltay, speed) {
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
    console.log(bullets.length, spritesPool.length);

}

function updateBullets(time) {
    if (lastTime == null) {
        lastTime = time;
        return;
    }
    deltaTime = time - lastTime;
    lastTime = time;
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
    if (bullet.x < -10 || bullet.x > 10 || bullet.y < -10 || bullet.y > 20) {
        spritesPool.push(bullet.sprite);
        return true;
    } else {
        return false;
    }
}