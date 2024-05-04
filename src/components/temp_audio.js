import React, {useEffect, useRef, useState} from "react"
import Sketch from "react-p5"
import {useWavesurfer} from "@wavesurfer/react"
import "p5/lib/addons/p5.sound"
import p5 from 'p5'
import {Button, Slider} from "antd"
import {TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled, TbVolume, TbVolumeOff} from "react-icons/tb"
import {BsFillPauseFill} from "react-icons/bs"
import {IoPlay} from "react-icons/io5"
import {PlayIcon, PauseIcon, PrevIcon, NextIcon, DownloadIcon, VolumeIcon} from '../assets/images/player-icons'


const AudioVisualizer = ({ audioURL }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [previousVolume, setPreviousVolume] = useState(0.5);
    const [showVolumeSlider, setShowVolumeSlider] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const pRef = useRef();
    const songRef = useRef(null);
    const fftRef = useRef(null);
    const waveRef = useRef([]);
    const particlesRef = useRef([]);

    useEffect(() => {
        togglePlay()
    }, [isPlaying]);

    const preload = (p) => {
        songRef.current = p.loadSound(audioURL)
    }

    const setup = (p, canvasParentRef) => {
        pRef.p = p
        p.createCanvas(p.windowWidth, p.windowHeight).parent(canvasParentRef)
        p.angleMode(p.DEGREES)
        fftRef.current = new window.p5.FFT()
        p.noLoop()
    };

    const draw = (p) => {
        p.background("rgba(0,0,0,0.5)")
        p.stroke(255)
        p.strokeWeight(0.5)
        // p.noFill()
        p.translate(p.width / 2, p.height / 2 - 50)

        fftRef.current.analyze()
        let amp = fftRef.current.getEnergy(20, 200)
        waveRef.current = fftRef.current.waveform()

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
                let r = p.map(waveRef.current[index], -1, 1, 150, 350)
                let x = r * p.sin(i) * t
                let y = r * p.cos(i)
                p.vertex(x, y)
            }
            p.endShape()
        }
    }
    const togglePlay = () => {
        if (songRef.current) {
            if (isPlaying) {
                songRef.current.play()
                pRef.p.loop()
            }
            if (!isPlaying) {
                songRef.current.pause()
                pRef.p.noLoop()
            }
        }
    }

    class Particle {
        constructor() {
            this.pos = pRef.p.createVector(pRef.p.random(-225, 250), pRef.p.random(-250, 250));
            this.vel = pRef.p.createVector(0, 0)
            this.acc = this.pos.copy().mult(pRef.p.random(0.0001, 0.00001)) // dots speed

            this.w = pRef.p.random(3, 8) //dot radius
            this.color = [pRef.p.random(100, 255), pRef.p.random(100, 255), pRef.p.random(100, 255)]
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
            if (this.pos.x < -pRef.p.width / 2
                || this.pos.x > pRef.p.width / 2
                || this.pos.y < -pRef.p.height / 2
                || this.pos.y > pRef.p.y / 2) {
                return true
            } else {
                return false
            }
        }

        show() {
            pRef.p.noStroke();
            pRef.p.fill(this.color);
            pRef.p.ellipse(this.pos.x, this.pos.y, this.w);
        }
    }

    const NewButtonStyles = {
        width: 40,
        height: 40,
        background: 'rgba(80, 80, 80, 0.4)',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: 'none'
    };

    return (
        <div className='w-100 d-flex flex-column justify-content-center align-items-center'>
            <Sketch setup={setup} draw={draw} preload={preload} ref={pRef} />
            <div className='mb-5 w-sm-75 w-50-lg'>
                <div className='mb-3'></div>
                <div className='gap-3 d-flex justify-content-center align-items-center fixed-bottom py-4'>
                    <div className='d-flex justify-content-between align-items-center' style={{ width: 1000 }}>
                        <Button size='large' style={NewButtonStyles}>
                            <img src={PrevIcon} alt="" />
                        </Button>
                        <Button size='large' style={NewButtonStyles} onClick={() => setIsPlaying(!isPlaying)}>
                            <img src={isPlaying ? PauseIcon : PlayIcon} alt="" />
                        </Button>
                        <Button size='large' style={NewButtonStyles}>
                            <img src={NextIcon} alt="" />
                        </Button>
                        <div className='gap-3 d-flex justify-content-center align-items-center'>
                            <span className='text-white'>{`${Math.floor(currentTime / 60)}:${currentTime % 60}`}</span>
                            <Slider style={{ width: 500 }} railStyle={{ background: "#bbb", borderRadius: 2 }} />
                            <span className='text-white'>{`${Math.floor(duration / 60)}:${duration % 60}`}</span>
                        </div>
                        <Button size='large' style={NewButtonStyles}>
                            <img src={DownloadIcon} alt="" />
                        </Button>
                        <Button size='large' style={{ ...NewButtonStyles, background: 'transparent' }}>
                            <img src={VolumeIcon} alt="" />
                        </Button>
                        <Slider style={{ width: 115 }} min={0} max={1} step={0.01} railStyle={{ background: "#bbb", borderRadius: 2 }} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AudioVisualizer
