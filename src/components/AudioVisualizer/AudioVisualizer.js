import React, { useEffect, useRef, useState } from "react"
import Sketch from "react-p5"
import "p5/lib/addons/p5.sound"
import p5 from 'p5'
import { Button, Slider } from "antd"
import { PlayIcon, PauseIcon, PrevIcon, NextIcon, DownloadIcon, VolumeIcon, MutedIcon } from '../../assets/images/player-icons'
import formatTime from "../../outils/formatTime"
import './AudioVisualizer.css'

const AudioVisualizer = ({ audioURL ,isAutoPlay,handleDownload}) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [volume, setVolume] = useState(1)
    const [tmpVolume, setTmpVolume] = useState(volume)
    const [visibleVolume, setVisibleVolume] = useState(volume)
    const [previousVolume, setPreviousVolume] = useState(1)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [clicked, setClicked] = useState(false)
    const [isP5Ready, setIsP5Ready] = useState(false)
   
    const pRef = useRef()
    const songRef = useRef(null)
    const fftRef = useRef(null)
    const waveRef = useRef([])
    const particlesRef = useRef([])

    useEffect(() => {
        if (!isP5Ready) {
            return; // Don't run this effect until p5 is ready
        }

        if (songRef.current) {
            songRef.current.stop(); // Stop the current song if it's playing
        }

        // Load the new audio file
        songRef.current = pRef.current.loadSound(audioURL, () => {
            setDuration(songRef.current.duration());
            setCurrentTime(0);
            if (isAutoPlay) {
                songRef.current.play();
                setIsPlaying(true); // Start playing after loading
            }
            // setIsPlaying(true); // Auto-play when new audio is loaded
            // songRef.current.play();
            // if (!firstTime) { // Check if it's not the first time
            //     // Load the new audio file
            //     songRef.current = pRef.current.loadSound(audioURL, () => {
            //         setDuration(songRef.current.duration());
            //         setCurrentTime(0);
            //         setIsPlaying(true); // Start playing after loading
            //     });
            // } else {
            //     // For the first time, just load the audio, no auto-play
            //     songRef.current = pRef.current.loadSound(audioURL, () => {
            //         setDuration(songRef.current.duration());
            //         setCurrentTime(0);
            //         setFirstTime(false); // Set flag to false after first load
            //     });
            // }
        });

        return () => {
            if (songRef.current) {
                songRef.current.stop(); // Cleanup on unmount or audioURL change
            }
        };
    }, [audioURL, isP5Ready, isAutoPlay]);
    
    useEffect(() => {
        const song = songRef.current
        const handleSongEnd = () => {
            if (song) {
                let isSameTime = Math.round(song.currentTime()) === Math.round(song.duration())
                if (isSameTime || song.currentTime() >= song.duration()) {
                    setCurrentTime(0)
                    setIsPlaying(false)
                }
            }
        }
        song?.onended(handleSongEnd)
        // return () => song?.off('ended', handleSongEnd)
    }, [songRef.current])

    useEffect(() => {
        togglePlay()
    }, [isPlaying])

    const togglePlay = () => {
        if (songRef.current) {
            if (isPlaying) {
                let isSameTime = Math.round(currentTime) === Math.round(duration)
                if (isSameTime) {
                    setCurrentTime(0);
                    songRef.current.play()
                    pRef.current.loop()
                } else {
                    songRef.current.play()
                    songRef.current.jump(currentTime)
                    pRef.current.loop()
                }
            }
            if (!isPlaying) {
                songRef.current.pause()
                if (typeof pRef.current.noLoop !== 'undefined') {
                    pRef.current.noLoop()
                }
            }
        }
    }

    const toggleVolume = () => {
        const newVolume = !volume ? previousVolume : 0
        songRef.current.setVolume(newVolume)
        setVolume(newVolume)
        if (newVolume) {
            setPreviousVolume(newVolume)
        }
    }

    const handleVolumeChange = async (value, isVisible = true) => {
        if (isVisible) {
            setVisibleVolume(value)
        } else {

        }
        songRef.current.setVolume(value)
        setVolume(value)
        if (value) {
            setPreviousVolume(value)
        }
    }

    const getAllMethodsAndProperties = (obj) => {
        let methodsAndProperties = [];
        let currentObj = obj;

        do {
            const currentObjNames = Object.getOwnPropertyNames(currentObj);
            methodsAndProperties = methodsAndProperties.concat(currentObjNames);
            currentObj = Object.getPrototypeOf(currentObj);
        } while (currentObj !== null);

        methodsAndProperties = methodsAndProperties.filter((name, index, self) =>
            index === self.indexOf(name) && name !== "constructor" && typeof obj[name] !== "function"
        );

        return methodsAndProperties;
    }

    const handleSliderChange = async (value) => {
        if (songRef.current) {
            if (!isPlaying) {
                setCurrentTime(value);
            } else {
                if (volume) {
                    setTmpVolume(volume);
                    await handleVolumeChange(0, false)
                } else {
                    await handleVolumeChange(0, false)
                }
                let isSameTime = Math.round(value) === Math.round(duration);
                if (!isSameTime && value < duration) {
                    songRef.current.jump(value)
                }
            }
        }
    }

    const afterHandleSliderChange = async (value) => {
        if (tmpVolume) {
            await handleVolumeChange(tmpVolume, true)
        }
    }

    const preload = (p) => {
        songRef.current = p.loadSound(audioURL, () => {
            setDuration(songRef.current.duration())
        })
    }

    const setup = (p, canvasParentRef) => {
        pRef.current = p
        p.createCanvas(p.windowWidth, p.windowHeight).parent(canvasParentRef)
        p.angleMode(p.DEGREES)
        fftRef.current = new window.p5.FFT()
        p.noLoop()
        window.addEventListener('resize', handleResize);
        setIsP5Ready(true)
    }

    function handleResize() {
        if (pRef.current) {
            pRef.current.resizeCanvas(pRef.current.windowWidth, pRef.current.windowHeight);
        }
    }

    const draw = (p) => {
        p.background("rgba(0,0,0, 1)")
        p.stroke(255)
        p.strokeWeight(0.5)
        let heightForTranslate = p.height < 440 ? 80 : 80
        p.translate(p.width / 2, p.height / 2 - heightForTranslate)

        fftRef.current.analyze()
        let amp = fftRef.current.getEnergy(20, 200)
        waveRef.current = fftRef.current.waveform()

        let minRadius = p.width < 768 ? 75 : p.width < 1024 ? 100 : 150
        let maxRadius = p.width < 768 ? 150 : p.width < 1024 ? 200 : 300
        if (p.height < 440) {
            minRadius = 30
            maxRadius = 60
        }


        p.push()
        if (amp > 220) {
            p.rotate(p.random(-1, 1))
        }
        let part = new Particle()
        particlesRef.current.push(part)

        for (let i = 0; i < particlesRef.current.length; i++) {
            if (!particlesRef.current[i].edges()) {
                particlesRef.current[i].update(amp > 220)
                particlesRef.current[i].show()
            } else {
                particlesRef.current.splice(i, 1)
            }
        }
        p.pop()

        for (let t = -1; t <= 1; t += 2) {
            p.fill(0)
            p.beginShape()
            for (let i = 0; i <= 180; i += 0.5) {
                let index = p.floor(p.map(i, 0, 180, 0, waveRef.current.length - 1))
                let r = p.map(waveRef.current[index], -1, 1, minRadius, maxRadius)
                let x = r * p.sin(i) * t
                let y = r * p.cos(i)
                p.vertex(x, y)
            }
            p.endShape()
        }
        if (songRef.current) {
            if (isPlaying) {
                setCurrentTime(songRef.current.currentTime())
            }
        }
    }
    class Particle {
        constructor() {
            this.minMaxDiapason = pRef.current.width < 768 ? [-75, 75] : pRef.current.width < 1024 ? [-125, 125] : [-175, 175]
            this.pos = pRef.current.createVector(pRef.current.random(...this.minMaxDiapason), pRef.current.random(...this.minMaxDiapason))
            this.vel = pRef.current.createVector(0, 0)
            this.acc = this.pos.copy().mult(pRef.current.random(0.0001, 0.00001))

            this.w = pRef.current.random(3, 8)
            this.color = [pRef.current.random(100, 255), pRef.current.random(100, 255), pRef.current.random(100, 255)]
        }

        update(cond) {
            this.vel.add(this.acc)
            this.pos.add((this.vel))
            if (cond) {
                this.pos.add((this.vel))
                this.pos.add((this.vel))
                this.pos.add((this.vel))
            }
        }

        edges() {
            if (this.pos.x < -pRef.current.width / 2
                || this.pos.x > pRef.current.width / 2
                || this.pos.y < -pRef.current.height / 2
                || this.pos.y > pRef.current.y / 2) {
                return true
            } else {
                return false
            }
        }

        show() {
            pRef.current.noStroke()
            pRef.current.fill(this.color)
            pRef.current.ellipse(this.pos.x, this.pos.y, this.w)
        }
    }

    const ButtonStyles = {
        width: 40,
        height: 40,
        background: 'rgba(80, 80, 80, 0.4)',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: 'none'
    }

    // const handleDownload = () => {
    //     setClicked(true);
    //     const link = document.createElement('a');
    //     link.href = audioURL;
    //     link.download = 'abc.mp3';
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    //     setClicked(false);
    // }


    return (
        <div className='audio-visualizer w-100 d-flex flex-column justify-content-center align-items-center'>
            <Sketch setup={setup} draw={draw} preload={preload} ref={pRef} />
            <div className='mb-5 w-sm-75 w-50-lg'>
                <div className='gap-3 d-flex justify-content-center align-items-center fixed-bottom py-4'>
                    <div className='audio-visualizer__controlers'>
                        <div className='audio-visualizer__leftside'>
                            <Button className="audio-visualizer__button" size='large' style={ButtonStyles}>
                                <img src={PrevIcon} alt="" />
                            </Button>
                            <Button className="audio-visualizer__button" size='large' style={ButtonStyles} onClick={() => setIsPlaying(!isPlaying)}>
                                <img src={isPlaying ? PauseIcon : PlayIcon} alt="" />
                            </Button>
                            <Button className="audio-visualizer__button" size='large' style={ButtonStyles}>
                                <img src={NextIcon} alt="" />
                            </Button>
                        </div>
                        <div className='audio-visualizer__time-wrap'>
                            <span className='audio-visualizer__time text-white text-center'>{formatTime(currentTime)}</span>
                            <Slider
                                className="audio-visualizer__slider-timeline"
                                tooltip={{ open: false }}
                                step={0.0001}
                                railStyle={{ background: "#bbb", borderRadius: 2 }}
                                onChange={handleSliderChange}
                                onChangeComplete={afterHandleSliderChange}
                                value={currentTime}
                                max={duration} />
                            <div className='audio-visualizer__time text-white text-center'>{formatTime(duration)}</div>
                        </div>
                        <div className='audio-visualizer__leftside'>
                            <Button className="audio-visualizer__button" size='large' onClick={handleDownload}>
                                <img src={DownloadIcon} alt="" />
                            </Button>
                            <Button className="audio-visualizer__button" size='large' style={ButtonStyles} onClick={toggleVolume}>
                                <img src={volume ? VolumeIcon : MutedIcon} alt="" />
                            </Button>
                            <Slider
                                className="audio-visualizer__slider-volume"
                                tooltip={{ open: false }}
                                min={0} max={1} step={0.01}
                                railStyle={{ background: "#bbb", borderRadius: 2 }}
                                onChange={handleVolumeChange} value={visibleVolume} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AudioVisualizer
