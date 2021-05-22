const boxSize = 11;
const boxCountWidth = 7;
const boxCountHeigth = 10;
const boxDistance = 10;
var bgCube;
var rows = new Array();

function initializeBackground(THREE, scene) {
    const geometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
    const whiteMaterial = new THREE.MeshPhongMaterial();
    whiteMaterial.color.set(0xdddddd);
    const blackMaterial = new THREE.MeshPhongMaterial();
    blackMaterial.color.set(0x003300);
    bgCube = new THREE.Mesh(geometry, whiteMaterial);
    bgCube.position.z = -40;
    scene.add(bgCube);

    function makeBox(parent, material, x, y, z) {

        const cube = new THREE.Mesh(geometry, material);
        parent.add(cube);

        cube.position.x = x;
        cube.position.y = y;
        cube.position.z = z;

        cube.rotation.x = Math.random()/15;
        cube.rotation.y = Math.random()/15;
        cube.rotation.z = Math.random()/15;

        return cube;
    }

    for (let y = 0; y < boxCountHeigth; y++) {
        material = blackMaterial;
        if ((y % 2) == 0) {
            material = whiteMaterial;
        }
        var rowCube = makeBox(bgCube, material, - (boxCountWidth/2) * boxDistance, -20 + boxDistance*y, 20 + (2 * Math.random() - 1));
        for (let x = 1; x < boxCountWidth; x++) {
            material = blackMaterial;
            if (((x + y) % 2) == 0) {
                material = whiteMaterial;
            }
            makeBox(rowCube, material, x*boxDistance, 0, (4 * Math.random() - 2));
        }
        rows.push(rowCube);

    }


}

function updateBackground(time) {
    bgCube.position.y = -5 * time;
    if(rows[0].position.y  +  bgCube.position.y < -30) {
        var row = rows.shift();
        row.position.y += boxDistance*boxCountHeigth;
        rows.push(row);
        for (let index = 0; index < row.children.length; index++) {
            var box = row.children[index];
            box.position.z = (4 * Math.random() - 2);
            box.rotation.x = Math.random()/15;
            box.rotation.y = Math.random()/15;
            box.rotation.z = Math.random()/15;
        }
    }
}