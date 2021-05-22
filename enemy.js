const initialHitpoints = {
    "king": 100,
    "queen": 60,
    "rook": 40,
    "bishop": 30
}

var liveEnemies = new Array();
var enemyPools = new Array();
var modelsLoaded = false;

function setEnemyModels(scene, king, queen, rook, bishop) {
    const maxCountOfEachEnemy = 5;
    for (let i = 0; i < maxCountOfEachEnemy; i++) {
        addEnemyModel(scene, "king", king);
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


function updateEnemy(enemy, time) {
    if (enemy.hitpoints <= 0) {
        enemyPools[enemy.type].push(enemy.model);
        enemy.model.position.y = -100;
        enemy.model.rotation.x = Math.PI;
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
            var angle = enemy.model.rotation.z;
            if (enemy.type == "king") {
                addBullet("horse", enemy.model.position.x, enemy.model.position.y, -Math.sin(angle), -Math.cos(angle), enemy.currentAction.shootingSpeed, time);
                addBullet("horse", enemy.model.position.x+1, enemy.model.position.y, -Math.sin(angle), -Math.cos(angle), enemy.currentAction.shootingSpeed, time);
                addBullet("horse", enemy.model.position.x-1, enemy.model.position.y, -Math.sin(angle), -Math.cos(angle), enemy.currentAction.shootingSpeed, time);
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