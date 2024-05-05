import React, { useEffect, useRef, useState } from "react"
import Sketch from "react-p5"
import "p5/lib/addons/p5.sound"
import { Button, Slider } from "antd"
import { PlayIcon, PauseIcon, PrevIcon, NextIcon, DownloadIcon, VolumeIcon } from '../../assets/images/player-icons'
import formatTime from "../../outils/formatTime"
import './AudioVisualizer.css'

const AudioVisualizer = ({ audioURL, handleDownload, isAutoPlay, setIsAutoPlay }) => {

    const [isPlaying, setIsPlaying] = useState(false)
    const [volume, setVolume] = useState(1)
    const [previousVolume, setPreviousVolume] = useState(1)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [isP5Ready, setIsP5Ready] = useState(false);

    const pRef = useRef()
    const songRef = useRef(null)
    const fftRef = useRef(null)
    const waveRef = useRef([])
    const particlesRef = useRef([])


    const togglePlay = () => {
        const song = songRef.current;
        const p5Instance = pRef.current;

        if (song && p5Instance) {
            if (isPlaying) {
                song.play();
                if (p5Instance.loop) {
                    p5Instance.loop(); // Ensure p5Instance is valid
                }
            } else {
                song.pause();
                if (p5Instance.noLoop) {
                    p5Instance.noLoop(); // Ensure noLoop is valid
                }
            }
        }
    };

    const handleSongEnd = () => {
        if (songRef.current) {
            setIsPlaying(false);
        }
    };

    useEffect(() => {
        const song = songRef.current;

        if (song && song.on) {
            song.on("ended", handleSongEnd); // Attach event listener
        }

        return () => {
            if (song && song.off) {
                song.off("ended", handleSongEnd); // Detach event listener
            }
        };
    }, [songRef.current, audioURL]);

    useEffect(() => {
        togglePlay(); // Toggle play when isPlaying changes
    }, [isPlaying]);

    const preload = (p) => {
        songRef.current = p.loadSound(audioURL, () => {
            setDuration(songRef.current.duration());
        });
    };

    const toggleVolume = () => {
        const newVolume = !volume ? previousVolume : 0
        songRef.current.setVolume(newVolume)
        setVolume(newVolume)
        if (newVolume) {
            setPreviousVolume(newVolume)
        }
    }

    const handleVolumeChange = (value) => {
        songRef.current.setVolume(value)
        setVolume(value)
        if (value) {
            setPreviousVolume(value)
        }
    }

    const handleSliderChange = (value) => {
        if (songRef.current) {
            songRef.current.jump(value)
        }
    }

    const setup = (p, canvasParentRef) => {
        pRef.current = p; // Ensure pRef points to the p5 instance
        p.createCanvas(p.windowWidth, p.windowHeight).parent(canvasParentRef);
        p.angleMode(p.DEGREES);

        // Initialize FFT for audio analysis
        fftRef.current = new window.p5.FFT() // Initialize Fast Fourier Transform
        p.noLoop()
        setIsP5Ready(true); // Indicate that p5 is ready
    };

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


    const draw = (p) => {
        p.background("rgba(0,0,0, 1)")
        p.stroke(255)
        p.strokeWeight(0.5)
        let heightForTranslate = p.height < 440 ? 30 : 70
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
            setCurrentTime(songRef.current.currentTime())
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

    return (
        <div className='audio-visualizer w-100 d-flex flex-column justify-content-center align-items-center'>
            <Sketch setup={setup} draw={draw} preload={preload} ref={pRef} />
            <div className='mb-5 w-sm-75 w-50-lg'>
                <div className='bg-black gap-3 d-flex justify-content-center align-items-center fixed-bottom py-4'>
                    <div className='audio-visualizer__controlers'>
                        <div className='audio-visualizer__leftside'>
                            <Button size='large' style={ButtonStyles}>
                                <img src={PrevIcon} alt="" />
                            </Button>
                            <Button size='large' style={ButtonStyles} onClick={() => setIsPlaying(!isPlaying)}>
                                <img src={isPlaying ? PauseIcon : PlayIcon} alt="" />
                            </Button>
                            <Button size='large' style={ButtonStyles}>
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
                                value={currentTime}
                                max={duration} />
                            <div className='audio-visualizer__time text-white text-center'>{formatTime(duration)}</div>
                        </div>
                        <div className='audio-visualizer__leftside'>
                            <Button size='large' style={ButtonStyles} onClick={() => handleDownload()} >
                                <img src={DownloadIcon} alt="" />
                            </Button>
                            <Button size='large' style={ButtonStyles} onClick={toggleVolume}>
                                <img src={volume ? VolumeIcon : VolumeIcon} alt="" />
                            </Button>
                            <Slider
                                className="audio-visualizer__slider-volume"
                                tooltip={{ open: false }}
                                min={0} max={1} step={0.01}
                                railStyle={{ background: "#bbb", borderRadius: 2 }}
                                onChange={handleVolumeChange} value={volume} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AudioVisualizer





