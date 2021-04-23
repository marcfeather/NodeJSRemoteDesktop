//Thanks to https://developer.mozilla.org/en-US/docs/Web/API/Screen_Capture_API/Using_Screen_Capture


const videoSrc = document.getElementById("video");
const startButton = document.getElementById("button");
const stopButton = document.getElementById("buttonStop");
const peopleStreaming = document.getElementById("streamCount");

console.log(fs.stat('/'));

var streamActive = false;

getStreamCount().then((streamCount) => {
    peopleStreaming.innerText = streamCount;
});


startButton.addEventListener("click", async (evt) => {
    await captureBegin();


    getStreamCount().then((streamCount) => {
        peopleStreaming.innerText = streamCount;
    });

    /*var mediaOptions = {
        video = {
            cursor: "always"
        },
        audio: false
    };
    if (streamActive) {
        stopCapture();
    } else {
        captureBegin(mediaOptions);
    }*/
}, false);

stopButton.addEventListener("click", async (evt) => {
    await stopCapture();
    getStreamCount().then((streamCount) => {
        peopleStreaming.innerText = streamCount;
    });
}, false);

async function captureBegin(mediaOptions) {
    try {
        videoSrc.srcObject = await navigator.mediaDevices.getDisplayMedia(mediaOptions);
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify( {status: 'Successful'} )
        };
    
        fetch('/', options);
    } catch (e) {
        console.error("Error: " + e);
    }
}

function stopCapture(evt) {
    let tracks = videoSrc.srcObject.getTracks();

    tracks.forEach(track => track.stop());
    videoSrc.srcObject = null;

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify( {status: 'end'} )
    };

    fetch('/', options);

}

async function getStreamCount() {
    const request1 = await fetch('/api', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify( {request: 'getStreamCount'} )
    });
    const response1 = await request1.json();
    console.log(response1.streamcount);
    return response1.streamcount;
}