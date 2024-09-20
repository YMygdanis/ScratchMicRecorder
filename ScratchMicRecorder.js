(function(ext) {
    var microphoneStream = null;
    var recordings = {};
    var currentRecorder = null;
    var currentChunks = [];
    var playbackVolume = 1.0; // Default volume at 100%
    var currentAudio = null;  // To keep track of the current playing audio

    ext._shutdown = function() {
        if (microphoneStream) {
            microphoneStream.getTracks().forEach(function(track) {
                track.stop();
            });
            microphoneStream = null;
        }
    };

    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    // Open Microphone
    ext.openMicrophone = function(callback) {
        if (!microphoneStream) {
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(function(stream) {
                    microphoneStream = stream;
                    callback();
                })
                .catch(function(err) {
                    console.error('Error opening microphone:', err);
                });
        } else {
            callback();
        }
    };

    // Close Microphone
    ext.closeMicrophone = function() {
        if (microphoneStream) {
            microphoneStream.getTracks().forEach(function(track) {
                track.stop();
            });
            microphoneStream = null;
        }
    };

    // Is Microphone Open?
    ext.isMicrophoneOpen = function() {
        return microphoneStream !== null;
    };

    // Record Sound with Name
    ext.recordSound = function(name, duration, callback) {
        if (microphoneStream) {
            currentRecorder = new MediaRecorder(microphoneStream);
            currentChunks = [];

            currentRecorder.ondataavailable = function(event) {
                currentChunks.push(event.data);
            };

            currentRecorder.onstop = function() {
                var audioBlob = new Blob(currentChunks);
                var audioUrl = URL.createObjectURL(audioBlob);
                recordings[name] = audioUrl;
                callback();
            };

            currentRecorder.start();

            setTimeout(function() {
                currentRecorder.stop();
            }, duration * 1000);
        } else {
            console.warn('Microphone is not open.');
        }
    };

    // Play Sound with Name
    ext.playSound = function(name) {
        if (recordings[name]) {
            if (currentAudio) {
                currentAudio.pause();
                currentAudio = null;
            }
            currentAudio = new Audio(recordings[name]);
            currentAudio.volume = playbackVolume;
            currentAudio.play();
        } else {
            console.warn('No recording found with name:', name);
        }
    };

    // Stop Sound
    ext.stopSound = function() {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            currentAudio = null;
        }
    };

    // Set Volume
    ext.setVolume = function(percent) {
        playbackVolume = Math.max(0, Math.min(100, percent)) / 100;
    };

    // Get List of Recording Names
    ext.getRecordingNames = function() {
        return Object.keys(recordings);
    };

    var descriptor = {
        blocks: [
            ['w', 'open microphone', 'openMicrophone'],
            [' ', 'close microphone', 'closeMicrophone'],
            ['b', 'is microphone open?', 'isMicrophoneOpen'],
            ['w', 'record sound named %s for %n seconds', 'recordSound', 'recording1', 5],
            [' ', 'play sound named %s', 'playSound', 'recording1'],
            [' ', 'stop sound', 'stopSound'],
            [' ', 'set volume to %n %', 'setVolume', 100],
            ['r', 'recording names', 'getRecordingNames']
        ]
    };

    ScratchExtensions.register('Mic Recorder', descriptor, ext);
})({});
