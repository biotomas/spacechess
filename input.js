var keyState = new Map();
var keyDown = new Map();


function initializeInput() {
	window.addEventListener('keydown', function (e) {
		keyState[e.keyCode] = true;
		keyDown[e.keyCode] = true;
		//console.log(e.keyCode);
	}, true);

	window.addEventListener('keyup', function (e) {
		this.keyState[e.keyCode] = false;
	}, true);
}

function keyIsDown(k) {
	if (document.hasFocus()) {
		return keyState[k];
	} else {
		keyState = {};
		return false;
	}
}

function keypressed(k) {
	var ret = this.keyDown[k];
	keyDown[k] = false;
	return ret;
}

