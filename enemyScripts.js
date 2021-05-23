function addWave(wave) {
    distortionRate = (4-wave)*0.2
    if (wave > 4) {
        gameState = "win";
        return;
    }
    if (wave == 0) {
        addEnemy("knight", 0, 25, [
            { duration: 3, isMoving: true, isOnce: true, moveFrom: [-3, 25], moveTo: [-3, 5] },
            { duration: 2, isMoving: true, moveFrom: [-3, 5], moveTo: [3, 5] },
            { isRotating: true, duration: 2, isShooting: true, shootingInterval: 0.1, shootingSpeed: 5 },
            { duration: 5, isMoving: true, moveFrom: [3, 5], moveTo: [-3, 5], isShooting: true, shootingInterval: 0.2, shootingSpeed: 5 },
        ]);
        addEnemy("bishop", 0, 25, [
            { duration: 3, isMoving: true, isOnce: true, moveFrom: [3, 25], moveTo: [0, 6] },
            { duration: 2, isShooting: true, shootingInterval: 0.1, shootingSpeed: 5 },
            { duration: 2, isMoving: true, moveFrom: [0, 6], moveTo: [-3, 6] },
            { duration: 5, isMoving: true, moveFrom: [-3, 6], moveTo: [0, 6], isShooting: true, shootingInterval: 0.2, shootingSpeed: 5 },
        ]);
    }
    if (wave == 1) {
        addEnemy("bishop", 0, 25, [
            { duration: 3, isMoving: true, isOnce: true, moveFrom: [-3, 25], moveTo: [-3, 5] },
            { duration: 2, isMoving: true, moveFrom: [-3, 5], moveTo: [3, 5] },
            { isRotating: true, duration: 2, isShooting: true, shootingInterval: 0.1, shootingSpeed: 5 },
            { duration: 5, isMoving: true, moveFrom: [3, 5], moveTo: [-3, 5], isShooting: true, shootingInterval: 0.2, shootingSpeed: 5 },
        ]);
        addEnemy("rook", 0, 25, [
            { duration: 3, isMoving: true, isOnce: true, moveFrom: [3, 25], moveTo: [0, 6] },
            { duration: 2, isShooting: true, shootingInterval: 0.1, shootingSpeed: 5 },
            { duration: 2, isMoving: true, moveFrom: [0, 6], moveTo: [-3, 6] },
            { duration: 5, isMoving: true, moveFrom: [-3, 6], moveTo: [0, 6], isShooting: true, shootingInterval: 0.2, shootingSpeed: 5 },
        ]);

    }
    if (wave == 2) {
        addEnemy("queen", 0, 25, [
            { duration: 3, isMoving: true, isOnce: true, moveFrom: [-3, 25], moveTo: [-3, 5] },
            { duration: 2, isMoving: true, moveFrom: [-3, 5], moveTo: [3, 5] },
            { isRotating: true, duration: 2, isShooting: true, shootingInterval: 0.3, shootingSpeed: 5 },
            { duration: 5, isMoving: true, moveFrom: [3, 5], moveTo: [-3, 5], isShooting: true, shootingInterval: 0.2, shootingSpeed: 5 },
        ]);
        addEnemy("rook", 0, 25, [
            { duration: 3, isMoving: true, isOnce: true, moveFrom: [3, 25], moveTo: [0, 6] },
            { duration: 2, isShooting: true, shootingInterval: 0.1, shootingSpeed: 5 },
            { duration: 2, isMoving: true, moveFrom: [0, 6], moveTo: [-3, 6] },
            { duration: 5, isMoving: true, moveFrom: [-3, 6], moveTo: [0, 6], isShooting: true, shootingInterval: 0.2, shootingSpeed: 5 },
        ]);

    }
    if (wave == 3) {
        addEnemy("bishop", 0, 25, [
            { duration: 3, isMoving: true, isOnce: true, moveFrom: [-3, 25], moveTo: [-3, 5] },
            { duration: 2, isMoving: true, moveFrom: [-3, 5], moveTo: [3, 5] },
            { isRotating: true, duration: 2, isShooting: true, shootingInterval: 0.1, shootingSpeed: 5 },
            { duration: 5, isMoving: true, moveFrom: [3, 5], moveTo: [-3, 5], isShooting: true, shootingInterval: 0.1, shootingSpeed: 5 },
        ]);
        addEnemy("rook", 0, 25, [
            { duration: 3, isMoving: true, isOnce: true, moveFrom: [3, 25], moveTo: [0, 6] },
            { duration: 2, isShooting: true, shootingInterval: 0.1, shootingSpeed: 5 },
            { duration: 2, isMoving: true, moveFrom: [0, 6], moveTo: [-3, 6] },
            { duration: 5, isMoving: true, moveFrom: [-3, 6], moveTo: [0, 6], isShooting: true, shootingInterval: 0.1, shootingSpeed: 5 },
        ]);
        addEnemy("queen", 0, 25, [
            { duration: 3, isMoving: true, isOnce: true, moveFrom: [-3, 25], moveTo: [-3, 7] },
            { duration: 2, isMoving: true, moveFrom: [-3, 7], moveTo: [3, 7] },
            { isRotating: true, duration: 1, isShooting: true, shootingInterval: 0.1, shootingSpeed: 5 },
            { duration: 5, isMoving: true, moveFrom: [3, 7], moveTo: [-3, 7], isShooting: true, shootingInterval: 0.3, shootingSpeed: 5 },
        ]);
    }

    if (wave == 4) {
        addEnemy("boss", 0, 25, [
            { duration: 3, isMoving: true, isOnce: true, moveFrom: [3, 25], moveTo: [0, 6] },
            { duration: 2, isShooting: true, shootingInterval: 0.2, shootingSpeed: 5 },
            { duration: 3, isMoving: true, moveFrom: [0, 6], moveTo: [-3, 6], isShooting: false, shootingInterval: 0.1, shootingSpeed: 5 },
            { duration: 3, isMoving: true, moveFrom: [-3, 6], moveTo: [3, 6], isShooting: true, shootingInterval: 0.2, shootingSpeed: 5 },
            { duration: 3, isMoving: true, moveFrom: [3, 6], moveTo: [0, 6], isShooting: false, shootingInterval: 0.2, shootingSpeed: 5 },
        ]);
    }
 
}