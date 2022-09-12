const playable = (trackStyle) => {
    showConsole()

    if (trackStyle) {
        switch (trackStyle) {
            case 'Jazz':
                document.getElementById('track-name1').value = 'Drums';
                document.getElementById('track-name2').value = 'Bass';
                document.getElementById('track-name3').value = 'Piano';
                document.getElementById('track-name4').value = 'Empty';
                break;

            case 'Rock':
                document.getElementById('track-name1').value = 'Drums';
                document.getElementById('track-name2').value = 'Bass';
                document.getElementById('track-name3').value = 'Rhythm Guitar';
                document.getElementById('track-name4').value = 'Lead Guitar';
                break;

            case 'Electronic':
                document.getElementById('track-name1').value = 'Drums';
                document.getElementById('track-name2').value = 'Synth1';
                document.getElementById('track-name3').value = 'Synth2';
                document.getElementById('track-name4').value = 'Lead Synth';
                break;

            default:
                break;
        }

    }

    let play = document.querySelector('.play');
    let stop = document.querySelector('.stop');
    stop.setAttribute('disabled', 'disabled');

    const domElementsArray = []

    for (let i = 0; i < numOfTracks; i++) {
        domElementsArray.push({})
    }

    for (let i = 0; i < numOfTracks; i++) {
        domElementsArray[i]['convolverGainControl' + (i + 1)] = document.getElementById('convolver-gain-control' + (i + 1));
        domElementsArray[i]['convolverGainValue' + (i + 1)] = document.getElementById('convolver-gain-value' + (i + 1));
        domElementsArray[i]['volumeControl' + (i + 1)] = document.getElementById('volume' + (i + 1));
        domElementsArray[i]['volumeGainValue' + (i + 1)] = document.getElementById('volume-gain-value' + (i + 1));
        domElementsArray[i]['panControl' + (i + 1)] = document.getElementById('panner' + (i + 1));
        domElementsArray[i]['panValue' + (i + 1)] = document.getElementById('pan-percent' + (i + 1));
        domElementsArray[i]['compression' + (i + 1)] = document.getElementById('compression' + (i + 1));
        domElementsArray[i]['compressorValue' + (i + 1)] = document.getElementById('compressor-value' + (i + 1));
        domElementsArray[i]['threshold' + (i + 1)] = document.getElementById('threshold' + (i + 1));
        domElementsArray[i]['ratio' + (i + 1)] = document.getElementById('ratio' + (i + 1));
        domElementsArray[i]['lowPass' + (i + 1)] = document.getElementById('lowPass' + (i + 1));
        domElementsArray[i]['lowPassValue' + (i + 1)] = document.getElementById('lowPass-value' + (i + 1));
        domElementsArray[i]['highPass' + (i + 1)] = document.getElementById('highPass' + (i + 1));
        domElementsArray[i]['highPassValue' + (i + 1)] = document.getElementById('highPass-value' + (i + 1));
        //eq
        domElementsArray[i]['eq60-' + (i + 1)] = document.getElementById('eq60-' + (i + 1));
        domElementsArray[i]['eq170-' + (i + 1)] = document.getElementById('eq170-' + (i + 1));
        domElementsArray[i]['eq310-' + (i + 1)] = document.getElementById('eq310-' + (i + 1));
        domElementsArray[i]['eq600-' + (i + 1)] = document.getElementById('eq600-' + (i + 1));
        domElementsArray[i]['eq1K-' + (i + 1)] = document.getElementById('eq1K-' + (i + 1));
        domElementsArray[i]['eq3K-' + (i + 1)] = document.getElementById('eq3K-' + (i + 1));
        domElementsArray[i]['eq6K-' + (i + 1)] = document.getElementById('eq6K-' + (i + 1));
        domElementsArray[i]['eq12K-' + (i + 1)] = document.getElementById('eq12K-' + (i + 1));
        domElementsArray[i]['eq14K-' + (i + 1)] = document.getElementById('eq14K-' + (i + 1));
        domElementsArray[i]['eq16K-' + (i + 1)] = document.getElementById('eq16K-' + (i + 1));

        domElementsArray[i]['open-eq-' + (i + 1)] = document.getElementById('open-eq-' + (i + 1));
        domElementsArray[i]['lp-suffix' + (i + 1)] = document.getElementById('lp-suffix' + (i + 1));
        domElementsArray[i]['hp-suffix' + (i + 1)] = document.getElementById('hp-suffix' + (i + 1));

        document.getElementById('eq-console-' + (i + 1)).style.position = 'absolute';
        document.getElementById('eq-console-' + (i + 1)).style.display = 'none'
        let mtop = i * 30
        document.getElementById('eq-console-' + (i + 1)).style.marginTop = `${mtop}px`;
     
    }

  
    let trackOfArray = [];

    const trackArray = () => {

        for (let i = 0; i < numOfTracks; i++) {
            const gainNode = audioCtx.createGain();
            let convolverGain = audioCtx.createGain();
            let convolver = audioCtx.createConvolver();
            let masterGain = audioCtx.createGain();
            const analyser = audioCtx.createAnalyser();
            const distortion = audioCtx.createWaveShaper();
            const pannerOptions = { pan: 0 };
            const panner = new StereoPannerNode(audioCtx, pannerOptions);
            const compressor = new DynamicsCompressorNode(audioCtx, {
                ratio: 1,
                threshold: -100,
                knee: 40,
                attack: 0.01,
                release: 0,
                reduction: 0.3
            });
            let lowPassFilter = audioCtx.createBiquadFilter();
            lowPassFilter.type = "lowpass";
            lowPassFilter.frequency.setValueAtTime(20000, audioCtx.currentTime);

            let highPassFilter = audioCtx.createBiquadFilter();
            highPassFilter.type = "highpass";
            highPassFilter.frequency.setValueAtTime(0, audioCtx.currentTime);

            //Main Eq
            let eq60 = audioCtx.createBiquadFilter();
            eq60.type = "peaking";
            eq60.frequency.setValueAtTime(80, audioCtx.currentTime);

            let eq170 = audioCtx.createBiquadFilter();
            eq170.type = "peaking";
            eq170.frequency.setValueAtTime(170, audioCtx.currentTime);

            let eq310 = audioCtx.createBiquadFilter();
            eq310.type = "peaking";
            eq310.frequency.setValueAtTime(310, audioCtx.currentTime);

            let eq600 = audioCtx.createBiquadFilter();
            eq600.type = "peaking";
            eq600.frequency.setValueAtTime(600, audioCtx.currentTime);

            let eq1K = audioCtx.createBiquadFilter();
            eq1K.type = "peaking";
            eq1K.frequency.setValueAtTime(1000, audioCtx.currentTime);

            let eq3K = audioCtx.createBiquadFilter();
            eq3K.type = "peaking";
            eq3K.frequency.setValueAtTime(3000, audioCtx.currentTime);

            let eq6K = audioCtx.createBiquadFilter();
            eq6K.type = "peaking";
            eq6K.frequency.setValueAtTime(6000, audioCtx.currentTime);

            let eq12K = audioCtx.createBiquadFilter();
            eq12K.type = "peaking";
            eq12K.frequency.setValueAtTime(12000, audioCtx.currentTime);

            let eq14K = audioCtx.createBiquadFilter();
            eq14K.type = "peaking";
            eq14K.frequency.setValueAtTime(14000, audioCtx.currentTime);

            let eq16K = audioCtx.createBiquadFilter();
            eq16K.type = "peaking";
            eq16K.frequency.setValueAtTime(16000, audioCtx.currentTime);
            eq16K.Q.setValueAtTime(0.1, audioCtx.currentTime);

            trackOfArray.push({
                ['sourceUrl' + (i + 1)]: filesArray[i],
                ['impulseUrl' + (i + 1)]: 'audio/impulses/bighall.wav',
                id: 'track' + (i + 1),
                ['gainNode' + (i + 1)]: gainNode,
                ['convolverGain' + (i + 1)]: convolverGain,
                ['convolver' + (i + 1)]: convolver,
                ['masterGain' + (i + 1)]: masterGain,
                ['panner' + (i + 1)]: panner,
                ['source' + (i + 1)]: undefined,
                ['compressor' + (i + 1)]: compressor,
                ['analyser' + (i + 1)]: analyser,
                ['distortion' + (i + 1)]: distortion,
                ['lowPassFilter' + (i + 1)]: lowPassFilter,
                ['highPassFilter' + (i + 1)]: highPassFilter,
                //MAIN EQ
                ['eq60-' + (i + 1)]: eq60,
                ['eq170-' + (i + 1)]: eq170,
                ['eq310-' + (i + 1)]: eq310,
                ['eq600-' + (i + 1)]: eq600,
                ['eq1K-' + (i + 1)]: eq1K,
                ['eq3K-' + (i + 1)]: eq3K,
                ['eq6K-' + (i + 1)]: eq6K,
                ['eq12K-' + (i + 1)]: eq12K,
                ['eq14K-' + (i + 1)]: eq14K,
                ['eq16K-' + (i + 1)]: eq16K,
            })
        }
    }

    trackArray()

    async function audio(i) {        
        trackOfArray[i]['source' + (i + 1)] = audioCtx.createBufferSource();

        const response = await fetch(trackOfArray[i]['sourceUrl' + (i + 1)])
        const data = await response.arrayBuffer()

        await audioCtx.decodeAudioData(data, function (buffer) {
            let myBuffer = buffer;
            trackOfArray[i]['source' + (i + 1)].buffer = myBuffer;
            trackOfArray[i]['source' + (i + 1)].loop = true;
            trackOfArray[i]['source' + (i + 1)].connect(trackOfArray[i]['convolverGain' + (i + 1)]);
            trackOfArray[i]['source' + (i + 1)].connect(trackOfArray[i]['masterGain' + (i + 1)]);
            trackOfArray[i]['masterGain' + (i + 1)].connect(trackOfArray[i]['panner' + (i + 1)]);
            trackOfArray[i]['panner' + (i + 1)].connect(trackOfArray[i]['compressor' + (i + 1)]);
            trackOfArray[i]['compressor' + (i + 1)].connect(trackOfArray[i]['analyser' + (i + 1)]);
            trackOfArray[i]['analyser' + (i + 1)].connect(trackOfArray[i]['distortion' + (i + 1)]);
            trackOfArray[i]['distortion' + (i + 1)].connect(trackOfArray[i]['eq60-' + (i + 1)]);
            trackOfArray[i]['eq60-' + (i + 1)].connect(trackOfArray[i]['eq170-' + (i + 1)]);
            trackOfArray[i]['eq170-' + (i + 1)].connect(trackOfArray[i]['eq310-' + (i + 1)]);
            trackOfArray[i]['eq310-' + (i + 1)].connect(trackOfArray[i]['eq600-' + (i + 1)]);
            trackOfArray[i]['eq600-' + (i + 1)].connect(trackOfArray[i]['eq1K-' + (i + 1)]);
            trackOfArray[i]['eq1K-' + (i + 1)].connect(trackOfArray[i]['eq3K-' + (i + 1)]);
            trackOfArray[i]['eq3K-' + (i + 1)].connect(trackOfArray[i]['eq6K-' + (i + 1)]);
            trackOfArray[i]['eq6K-' + (i + 1)].connect(trackOfArray[i]['eq12K-' + (i + 1)]);
            trackOfArray[i]['eq12K-' + (i + 1)].connect(trackOfArray[i]['eq14K-' + (i + 1)]);
            trackOfArray[i]['eq14K-' + (i + 1)].connect(trackOfArray[i]['eq16K-' + (i + 1)]);
            trackOfArray[i]['eq16K-' + (i + 1)].connect(trackOfArray[i]['lowPassFilter' + (i + 1)]);
            trackOfArray[i]['lowPassFilter' + (i + 1)].connect(trackOfArray[i]['highPassFilter' + (i + 1)]);
            trackOfArray[i]['highPassFilter' + (i + 1)].connect(audioCtx.destination)
        },

            function (e) { "Error with decoding audio data" + e.err });
        return
    }

    async function impulse(i) {
        await audio(i)
        let impulseUrl = 'audio/impulses/NiceDrumRoom.wav'
        const response = await fetch(impulseUrl)
        const data = await response.arrayBuffer()

        await audioCtx.decodeAudioData(data, function (buffer) {
            let myImpulseBuffer = buffer;
            trackOfArray[i]['convolver' + (i + 1)].buffer = myImpulseBuffer;
            trackOfArray[i]['convolver' + (i + 1)].loop = false;
            trackOfArray[i]['convolver' + (i + 1)].normalize = true;
            trackOfArray[i]['convolverGain' + (i + 1)].gain.value = domElementsArray[i]['convolverGainControl' + (i + 1)].value;
            trackOfArray[i]['convolverGain' + (i + 1)].connect(trackOfArray[i]['convolver' + (i + 1)]);
            trackOfArray[i]['convolver' + (i + 1)].connect(trackOfArray[i]['masterGain' + (i + 1)]);
        },

            function (e) { "Error with decoding audio data" + e.err });

        document.getElementById('open-eq-' + (i + 1)).addEventListener('click', function () {
            document.getElementById('eq-console-' + (i + 1)).style.display = "flex";

        });

        document.getElementById('close-eq-' + (i + 1)).addEventListener('click', function () {
            document.getElementById('eq-console-' + (i + 1)).style.display = "none";
        });

        document.getElementById('eq60-' + (i + 1)).addEventListener('change', function () {
            trackOfArray[i]['eq60-' + (i + 1)].gain.value = this.value            
        });

        document.getElementById('eq170-' + (i + 1)).addEventListener('change', function () {
            trackOfArray[i]['eq170-' + (i + 1)].gain.value = this.value        });

        document.getElementById('eq310-' + (i + 1)).addEventListener('change', function () {
            trackOfArray[i]['eq310-' + (i + 1)].gain.value = this.value           
        });

        document.getElementById('eq600-' + (i + 1)).addEventListener('change', function () {
            trackOfArray[i]['eq600-' + (i + 1)].gain.value = this.value
        });

        document.getElementById('eq1K-' + (i + 1)).addEventListener('change', function () {
            trackOfArray[i]['eq1K-' + (i + 1)].gain.value = this.value
        });

        document.getElementById('eq3K-' + (i + 1)).addEventListener('change', function () {
            trackOfArray[i]['eq3K-' + (i + 1)].gain.value = this.value
        });

        document.getElementById('eq6K-' + (i + 1)).addEventListener('change', function () {
            trackOfArray[i]['eq6K-' + (i + 1)].gain.value = this.value
        });

        document.getElementById('eq12K-' + (i + 1)).addEventListener('change', function () {
            trackOfArray[i]['eq12K-' + (i + 1)].gain.value = this.value
        });

        document.getElementById('eq14K-' + (i + 1)).addEventListener('change', function () {
            trackOfArray[i]['eq14K-' + (i + 1)].gain.value = this.value
        });

        document.getElementById('eq16K-' + (i + 1)).addEventListener('change', function () {
            trackOfArray[i]['eq16K-' + (i + 1)].gain.value = this.value
        });

        document.getElementById('highPass' + (i + 1)).addEventListener('change', function () {
            trackOfArray[i]['highPassFilter' + (i + 1)].frequency.value = this.value
        });

        document.getElementById('lowPass' + (i + 1)).addEventListener('change', function () {
            trackOfArray[i]['lowPassFilter' + (i + 1)].frequency.value = this.value
        });

        document.getElementById('convolver-gain-control' + (i + 1)).addEventListener('change', function () {
            domElementsArray[i]['convolverGainControl' + (i + 1)].value = this.value;
        });

        document.getElementById('volume' + (i + 1)).addEventListener('change', function () {
            domElementsArray[i]['volumeControl' + (i + 1)].value = this.value;
        });

        document.getElementById('panner' + (i + 1)).addEventListener('change', function () {
            domElementsArray[i]['panControl' + (i + 1)].value = this.value;
        });

        document.getElementById('compression' + (i + 1)).addEventListener('change', function () {
            let compressLevel = domElementsArray[i]['compression' + (i + 1)].value            
            if (compressLevel === '0') {
                trackOfArray[i]['compressor' + (i + 1)].threshold.value = '-100'
                trackOfArray[i]['compressor' + (i + 1)].ratio.value = '1'
                domElementsArray[i]['compressorValue' + (i + 1)].innerHTML = 0;

            } else if (compressLevel === '1') {
                trackOfArray[i]['compressor' + (i + 1)].threshold.value = '-30'
                trackOfArray[i]['compressor' + (i + 1)].ratio.value = '2'
                domElementsArray[i]['compressorValue' + (i + 1)].innerHTML = 1;
            } else if (compressLevel === '2') {
                trackOfArray[i]['compressor' + (i + 1)].threshold.value = '-40'
                trackOfArray[i]['compressor' + (i + 1)].ratio.value = '4'
                domElementsArray[i]['compressorValue' + (i + 1)].innerHTML = 2;
            } else if (compressLevel === '3') {
                trackOfArray[i]['compressor' + (i + 1)].threshold.value = '-50'
                trackOfArray[i]['compressor' + (i + 1)].ratio.value = '5'
                domElementsArray[i]['compressorValue' + (i + 1)].innerHTML = 3;
            }
        });
    }   

    const selectedTracks = async () => {
        document.getElementById('play-status').innerHTML = 'Loading...'
        for (let i = 0; i < numOfTracks; i++) {
            await impulse(i)
        }
    }

    play.onclick = async function () {
        await selectedTracks()

        trackOfArray[0]['source1'].start(0);
        trackOfArray[1]['source2'].start(0);
        trackOfArray[2]['source3'].start(0);
        trackOfArray[3]['source4'].start(0);
        document.getElementById('press-play').style.display = 'none'
        play.setAttribute('disabled', 'disabled');
        stop.removeAttribute('disabled');
    }

    const stopLoop = () => {
        for (let i = 0; i < trackOfArray.length; i++) {
            trackOfArray[i]['source' + (i + 1)].stop(0);
        }
        play.removeAttribute('disabled');
        stop.setAttribute('disabled', 'disabled');
    }

    stop.onclick = function () {
        stopLoop()
        document.getElementById('play-status').innerHTML = 'Press Play'
    }

    function log10(x) {
        return Math.log(x) / Math.LN10;
    }

    for (let i = 0; i < trackOfArray.length; i++) {

        domElementsArray[i]['convolverGainControl' + (i + 1)].oninput = function () {
            trackOfArray[i]['convolverGain' + (i + 1)].gain.value = domElementsArray[i]['convolverGainControl' + (i + 1)].value;
            let value = parseFloat(domElementsArray[i]['convolverGainControl' + (i + 1)].value);
            domElementsArray[i]['convolverGainValue' + (i + 1)].innerHTML = value.toFixed(2)
        }

        domElementsArray[i]['volumeControl' + (i + 1)].oninput = function () {
            trackOfArray[i]['masterGain' + (i + 1)].gain.value = domElementsArray[i]['volumeControl' + (i + 1)].value;
            let decibel_level = 20 * log10(trackOfArray[i]['masterGain' + (i + 1)].gain.value);
            domElementsArray[i]['volumeGainValue' + (i + 1)].innerHTML = decibel_level.toFixed(1)
        }

        domElementsArray[i]['panControl' + (i + 1)].oninput = function () {
            trackOfArray[i]['panner' + (i + 1)].pan.value = domElementsArray[i]['panControl' + (i + 1)].value;
            let value = domElementsArray[i]['panControl' + (i + 1)].value * 100;
            domElementsArray[i]['panValue' + (i + 1)].innerHTML = `${Math.abs(Math.floor(value))}%`;
        }

        domElementsArray[i]['lowPass' + (i + 1)].oninput = function () {

            let value = parseFloat(domElementsArray[i]['lowPass' + (i + 1)].value);
            let suffix;
            if (value >= 1000) {
                value = value / 1000
                suffix = 'Khz'
                domElementsArray[i]['lowPassValue' + (i + 1)].innerHTML = value.toFixed(1)

            } else {
                suffix = 'Hz'
                domElementsArray[i]['lowPassValue' + (i + 1)].innerHTML = value
            }

            domElementsArray[i]['lp-suffix' + (i + 1)].innerHTML = suffix
        }

        domElementsArray[i]['highPass' + (i + 1)].oninput = function () {
            let value = parseFloat(domElementsArray[i]['highPass' + (i + 1)].value);
            let suffix;
            if (value >= 1000) {
                value = value / 1000
                suffix = 'Khz'
                domElementsArray[i]['highPassValue' + (i + 1)].innerHTML = value.toFixed(1)

            } else {
                suffix = 'Hz'
                domElementsArray[i]['highPassValue' + (i + 1)].innerHTML = value
            }
            domElementsArray[i]['hp-suffix' + (i + 1)].innerHTML = suffix
        }
    }
}

