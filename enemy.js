const initialHitpoints = {
    "knight": 30,
    "queen": 60,
    "rook": 40,
    "bishop": 30,
    "boss" : 30,
}

var liveEnemies = new Array();
var enemyPools = new Array();
var modelsLoaded = false;

function setEnemyModels(scene, boss, knight, queen, rook, bishop) {
    const maxCountOfEachEnemy = 5;
    for (let i = 0; i < maxCountOfEachEnemy; i++) {
        addEnemyModel(scene, "boss", boss);
        addEnemyModel(scene, "knight", knight);
        addEnemyModel(scene, "queen", queen);
        addEnemyModel(scene, "rook", rook);
        addEnemyModel(scene, "bishop", bishop);
    }
    modelsLoaded = true;
}

function addEnemyModel(scene, type, model) {
    if (!enemyPools[type]) {
        enemyPools[type] = new Array();
    }
    var modelClone = model.clone();
    modelClone.position.y = -100;
    modelClone.rotation.x = Math.PI;
    if (type == "boss") {
        modelClone.rotation.x = Math.PI/2;
        modelClone.scale.x = 0.7;
        modelClone.scale.y = 0.7;
        modelClone.scale.z = 0.7;
    }
    enemyPools[type].push(modelClone);
    scene.add(modelClone);
}

class EnemyAction {
    // boolean flags
    isMoving;
    isRotating;
    isShooting;
    isRepeating;

    // in seconds
    duration;
    // relevant when moving is true
    moveFrom;
    moveTo;
    // relevant when shooting
    shootingInterval;
    shootingSpeed;
    lastShotTime;
}

class Enemy {
    model;
    hitpoints;
    type;
    currentAction;
    currentActionStartTime;
    loopingPlan;
}



function addEnemy(type, x, y, plan) {
    if (enemyPools[type].length > 0) {
        var enemy = new Enemy()
        enemy.model = enemyPools[type].pop();
        enemy.model.position.x = x;
        enemy.model.position.y = y;
        enemy.hitpoints = initialHitpoints[type];
        enemy.type = type;
        enemy.loopingPlan = plan;
        liveEnemies.push(enemy);
    }
}

var nextWave = 0;

function updateEnemies(time) {
    liveEnemies = liveEnemies.filter(enemy => !updateEnemy(enemy, time));
    if (liveEnemies.length == 0 && modelsLoaded) {
        addWave(nextWave);
        nextWave++;
    }
}

function clearEnemies() {
    liveEnemies.forEach(enemy => removeEnemy(enemy));
    liveEnemies = new Array();
}

function removeEnemy(enemy) {
    enemyPools[enemy.type].push(enemy.model);
    enemy.model.position.y = -100;
}

function updateEnemy(enemy, time) {
    if (enemy.type == "boss") {
        enemy.model.rotation.y = time;
    }
    if (enemy.hitpoints <= 0) {
        removeEnemy(enemy);
        playSound("explosion");
        return true;
    }
    if (!enemy.currentAction) {
        enemy.currentAction = enemy.loopingPlan.shift();
        enemy.currentActionStartTime = time;
        enemy.currentAction.lastShotTime = time;
    }
    var actionTime = time - enemy.currentActionStartTime;
    if (actionTime > enemy.currentAction.duration) {
        if (!enemy.currentAction.isOnce) {
            enemy.loopingPlan.push(enemy.currentAction);
        }
        enemy.currentAction = enemy.loopingPlan.shift();
        enemy.currentAction.lastShotTime = time;
        enemy.currentActionStartTime = time;
        actionTime = 0;
    }
    var proportionalTime = actionTime / enemy.currentAction.duration;
    if (enemy.currentAction.isShooting) {
        if (time - enemy.currentAction.lastShotTime > enemy.currentAction.shootingInterval) {
            if (enemy.type == "knight") {
                var angle = enemy.model.rotation.z;
                addBullet("horse", enemy.model.position.x, enemy.model.position.y, -Math.sin(angle), -Math.cos(angle), enemy.currentAction.shootingSpeed, time);
                addBullet("horse", enemy.model.position.x+1, enemy.model.position.y, -Math.sin(angle), -Math.cos(angle), enemy.currentAction.shootingSpeed, time);
                addBullet("horse", enemy.model.position.x-1, enemy.model.position.y, -Math.sin(angle), -Math.cos(angle), enemy.currentAction.shootingSpeed, time);
            }
            if (enemy.type == "boss") {
                angle = -enemy.model.rotation.y + Math.PI/4;
                addBullet("queen", enemy.model.position.x, enemy.model.position.y, -Math.sin(angle), -Math.cos(angle), enemy.currentAction.shootingSpeed, time);
                angle += Math.PI/2;
                addBullet("rook", enemy.model.position.x, enemy.model.position.y, -Math.sin(angle), -Math.cos(angle), enemy.currentAction.shootingSpeed, time);
                angle += Math.PI/2;
                addBullet("bishop", enemy.model.position.x, enemy.model.position.y, -Math.sin(angle), -Math.cos(angle), enemy.currentAction.shootingSpeed, time);
                angle += Math.PI/2;
                addBullet("horse", enemy.model.position.x, enemy.model.position.y, -Math.sin(angle), -Math.cos(angle), enemy.currentAction.shootingSpeed, time);
            }
            if (enemy.type == "rook") {
                addBullet(enemy.type, enemy.model.position.x, enemy.model.position.y, -1, 0, enemy.currentAction.shootingSpeed, time);
                addBullet(enemy.type, enemy.model.position.x, enemy.model.position.y, 1, 0, enemy.currentAction.shootingSpeed, time);
                addBullet(enemy.type, enemy.model.position.x, enemy.model.position.y, 0, 1, enemy.currentAction.shootingSpeed, time);
                addBullet(enemy.type, enemy.model.position.x, enemy.model.position.y, 0, -1, enemy.currentAction.shootingSpeed, time);
            }
            if (enemy.type == "bishop") {
                addBullet(enemy.type, enemy.model.position.x, enemy.model.position.y, -1, -1, enemy.currentAction.shootingSpeed, time);
                addBullet(enemy.type, enemy.model.position.x, enemy.model.position.y, 1, 1, enemy.currentAction.shootingSpeed, time);
                addBullet(enemy.type, enemy.model.position.x, enemy.model.position.y, -1, 1, enemy.currentAction.shootingSpeed, time);
                addBullet(enemy.type, enemy.model.position.x, enemy.model.position.y, 1, -1, enemy.currentAction.shootingSpeed, time);
            }
            if (enemy.type == "queen") {
                addBullet(enemy.type, enemy.model.position.x, enemy.model.position.y, -1, -1, enemy.currentAction.shootingSpeed, time);
                addBullet(enemy.type, enemy.model.position.x, enemy.model.position.y, 1, 1, enemy.currentAction.shootingSpeed, time);
                addBullet(enemy.type, enemy.model.position.x, enemy.model.position.y, -1, 1, enemy.currentAction.shootingSpeed, time);
                addBullet(enemy.type, enemy.model.position.x, enemy.model.position.y, 1, -1, enemy.currentAction.shootingSpeed, time);
                addBullet(enemy.type, enemy.model.position.x, enemy.model.position.y, -1, 0, enemy.currentAction.shootingSpeed, time);
                addBullet(enemy.type, enemy.model.position.x, enemy.model.position.y, 1, 0, enemy.currentAction.shootingSpeed, time);
                addBullet(enemy.type, enemy.model.position.x, enemy.model.position.y, 0, 1, enemy.currentAction.shootingSpeed, time);
                addBullet(enemy.type, enemy.model.position.x, enemy.model.position.y, 0, -1, enemy.currentAction.shootingSpeed, time);
            }
            playSound(enemy.type);
            enemy.currentAction.lastShotTime = time;
        }
    }
    if (enemy.currentAction.isRotating) {
        enemy.model.rotation.z = proportionalTime * Math.PI * 2;
    }
    if (enemy.currentAction.isMoving) {
        enemy.model.position.x = enemy.currentAction.moveFrom[0] + proportionalTime * (enemy.currentAction.moveTo[0] - enemy.currentAction.moveFrom[0]);
        enemy.model.position.y = enemy.currentAction.moveFrom[1] + proportionalTime * (enemy.currentAction.moveTo[1] - enemy.currentAction.moveFrom[1]);
    }

    return false;
}