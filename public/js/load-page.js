const audioCtx = new (window.AudioContext || window.webkitAudioContext)(); //context
document.body.style.backgroundColor = "#6fa4c1";
let filesArray = []
let numOfTracks = 4;
let file1;
let file2;
let file3;
let file4;
const handleTrack1 = (f) => {
    file1 = URL.createObjectURL(f[0]);
}

const handleTrack2 = (f) => {
    file2 = URL.createObjectURL(f[0]);
}

const handleTrack3 = (f) => {
    file3 = URL.createObjectURL(f[0]);
}

const handleTrack4 = (f) => {
    file4 = URL.createObjectURL(f[0]);
}

const loadFiles = () => {
    if (!file1 && !file2 && !file3 && !file4) {
        return alert('Please choose at least 1 file')
    }
    filesArray.push(file1 || "audio/silence/silence.mp3")
    filesArray.push(file2 || "audio/silence/silence.mp3")
    filesArray.push(file3 || "audio/silence/silence.mp3")
    filesArray.push(file4 || "audio/silence/silence.mp3")

    playable()
}
let song;

const chooseSong = () => {
    let e = document.getElementById("choose-song");
    song = e.value;
}

const loadSong = () => {

    switch (song) {
        case "0":
            filesArray = [
                'audio/jazz/drums.mp3',
                'audio/jazz/bass.mp3',
                'audio/jazz/piano.mp3',
                'audio/silence/silence.mp3',
            ]
           
           
            playable('Jazz')
            break;
        case "1":
            filesArray = [
                'audio/rock/drums.mp3',
                'audio/rock/bass.mp3',
                'audio/rock/rhythm-guitar.mp3',
                'audio/rock/lead-guitar.mp3',
            ]

            playable('Rock')
            break;
            case "2":
                filesArray = [
                    'audio/electronic/drums.mp3',
                    'audio/electronic/synth1.mp3',
                    'audio/electronic/synth2.mp3',
                    'audio/electronic/lead-synth.mp3',
                ]
    
                playable('Electronic')
                break;

        default:
            filesArray = [
                'audio/jazz/drums.mp3',
                'audio/jazz/bass.mp3',
                'audio/jazz/piano.mp3',
                'audio/silence/silence.mp3',
            ]

            playable('Jazz')
            break;
    }
}


const showConsole = () => {
    document.body.style.backgroundColor = "#c9c9c9";
    document.querySelector('.transport-bar').style.display = 'flex';
    document.getElementById('console').style.display = 'flex';
    document.querySelector('.main-wrapper').style.overflowY = "hidden";
    document.getElementById('choose-files').style.display = 'none';
    document.getElementById('press-play').style.display = 'flex';
}

const hideConsole = () => {
    document.body.style.backgroundColor = "#6fa4c1";
    document.querySelector('.transport-bar').style.display = 'none';
    document.getElementById('console').style.display = 'none';
    document.querySelector('.main-wrapper').style.overflowY = "hidden";
    document.getElementById('choose-files').style.display = 'flex';
    document.querySelector('.stop').click();
}


/* a viewport tem pelo menos 500 pixels de largura */
let screenSize = window.matchMedia("(min-width: 500px)")

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}





