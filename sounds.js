const soundEffects = new Array();

function playSound(soundName) {
    var sound = soundEffects[soundName];
    if (!sound) {
        console.log("sound not found ", soundName);
        return;
    }
    if (sound.isPlaying) {
        sound.stop();
    }
    sound.play();

}
