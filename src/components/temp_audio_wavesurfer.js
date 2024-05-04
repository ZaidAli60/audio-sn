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


const AudioVisualizer = ({audioURL}) => {
    const [volume, setVolume] = useState(0.5)
    const [previousVolume, setPreviousVolume] = useState(0.5)
    const [showVolumeSlider, setShowVolumeSlider] = useState(false)

    const containerRef = useRef(null)
    const pRef = useRef()
    const songRef = useRef(null)
    const fftRef = useRef(null)
    const waveRef = useRef([])
    const particlesRef = useRef([])

    const { wavesurfer, isPlaying,currentTime } = useWavesurfer({
        container: containerRef,
        height: 3,
        waveColor: "rgb(169,168,178)",
        progressColor: "rgb(58, 91, 201)",
        barWidth: 1000,
        barGap: 1,
        barRadius: 0,
        url: audioURL,
        autoPlay: true,
    })

    useEffect(() => {
        if (wavesurfer) {
            wavesurfer.on('finish', () => {
                wavesurfer.pause()
                wavesurfer.setTime(0)
                pRef.p.noLoop()
            })
        }
        return () => {
            wavesurfer && wavesurfer.un('finish')
        }
    }, [wavesurfer])

    const toggleVolume = () => {
        const newVolume = !volume ? previousVolume : 0
        songRef.current.setVolume(newVolume)
        setVolume(newVolume)
        if (newVolume) {
            setPreviousVolume(newVolume)
        }
    }

    const changeVolumeLevel = (value) => songRef.current.setVolume(value) & setVolume(value)

    const handleWavesurferTime = () => {
        songRef.current.jump(currentTime)
    }

    const togglePlay = () => {
        if (wavesurfer && songRef.current) {
            songRef.duration = songRef.current.buffer.duration
            wavesurfer.setMuted(true)
            if (isPlaying) {
                wavesurfer.pause()
                songRef.current.pause()
                pRef.p.noLoop()
            } else {
                wavesurfer.play()
                songRef.current.play()
                pRef.p.loop()
            }
            songRef.current.jump(currentTime)
        }
    }


    const preload = (p) => {
        songRef.current = p.loadSound(audioURL)
    }

    const setup = (p, canvasParentRef) => {
        pRef.p = p
        p.createCanvas(p.windowWidth, p.windowHeight).parent(canvasParentRef)
        p.angleMode(p.DEGREES)
        fftRef.current = new window.p5.FFT()
        p.noLoop()
    }

    const draw = (p) => {
        p.background("rgba(0,0,0, 1)")
        p.stroke(255)
        p.strokeWeight(0.5)
        // p.noFill()
        p.translate(p.width / 2, p.height / 2 - 100)

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

    class Particle {
        constructor() {
            this.pos = pRef.p.createVector(pRef.p.random(-225, 250), pRef.p.random(-250, 250))
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
            pRef.p.noStroke()
            pRef.p.fill(this.color)
            pRef.p.ellipse(this.pos.x, this.pos.y, this.w)
        }
    }

    const ButtonStyles = {
        background: '#FBD38D',
        color: '#000000',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: 'none'
    }
    const NewButtonStyles = {
        width: 40,
        height: 40,
        background: 'rgba(80, 80, 80, 0.4)',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: 'none'
    }

    return (
        <div className='w-100 d-flex flex-column justify-content-center align-items-center'>
            <Sketch setup={setup} draw={draw} preload={preload} ref={pRef}/>
            <div className='mb-5 w-sm-75 w-50-lg'>
                <div ref={containerRef} onClick={handleWavesurferTime} className='mb-3'></div>
                <div className='gap-3 d-flex justify-content-center align-items-center fixed-bottom py-4'>
                    <div className='d-flex justify-content-between align-items-center' style={{width: 1000}}>
                        <Button size='large' style={NewButtonStyles}>
                            <img src={PrevIcon} alt=""/>
                        </Button>
                        <Button size='large' style={NewButtonStyles} onClick={() => togglePlay()}>
                            <img src={isPlaying ? PauseIcon : PlayIcon} alt=""/>
                        </Button>
                        <Button size='large' style={NewButtonStyles}>
                            <img src={NextIcon} alt=""/>
                        </Button>
                        <div className='gap-3 d-flex justify-content-center align-items-center'>
                            <span className='text-white'>0:15</span>
                            <Slider style={{width: 500}} railStyle={{background: "#bbb", borderRadius: 2}}/>
                            <span className='text-white'>3:45</span>
                        </div>
                        <Button size='large' style={NewButtonStyles}>
                            <img src={DownloadIcon} alt=""/>
                        </Button>
                        <Button size='large' style={{...NewButtonStyles, background: 'transparent'}}>
                            <img src={VolumeIcon} alt=""/>
                        </Button>
                        <Slider style={{width: 115}} min={0} max={1} step={0.01}
                                railStyle={{background: "#bbb", borderRadius: 2}}/>
                        {/*<Button shape="circle" size='large' style={ButtonStyles}>*/}
                        {/*    <TbPlayerTrackPrevFilled/>*/}
                        {/*</Button>*/}
                        {/*<Button shape="circle" size='large' style={ButtonStyles}*/}
                        {/*        onClick={() => togglePlay()}>*/}
                        {/*    {isPlaying ?*/}
                        {/*    <BsFillPauseFill style={{fontSize: "14px"}}/> :*/}
                        {/*    <IoPlay style={{fontSize: "14px"}}/>}*/}
                        {/*</Button>*/}
                        {/*<Button shape="circle" size='large'*/}
                        {/*        style={ButtonStyles}><TbPlayerTrackNextFilled/></Button>*/}
                        {/*/!*<div*!/*/}
                        {/*/!*    style={{display: "flex", justifyContent: 'center', alignItems: 'center', gap: 20}}*!/*/}
                        {/*/!*    onMouseLeave={() => setShowVolumeSlider(false)}*!/*/}
                        {/*/!*>*!/*/}
                        {/*    <Button*/}
                        {/*        shape="circle"*/}
                        {/*        size="large"*/}
                        {/*        style={ButtonStyles}*/}
                        {/*        onClick={toggleVolume}*/}
                        {/*        onMouseEnter={() => setShowVolumeSlider(true)}*/}
                        {/*    >*/}
                        {/*        {volume ? <TbVolume/> : <TbVolumeOff/>}*/}
                        {/*    </Button>*/}
                        {/*    <Slider min={0} max={1} step={0.01}*/}
                        {/*            value={volume} tooltip={{open: false}}*/}
                        {/*            onChange={changeVolumeLevel}*/}
                        {/*            railStyle={{background: "#bbb", height: 12, borderRadius: 2}}*/}
                        {/*            trackStyle={{background: "#FBD38D", height: 12, borderRadius: 2}}*/}
                        {/*            handleStyle={{*/}
                        {/*                width: 3,*/}
                        {/*                height: 12,*/}
                        {/*                position: "absolute",*/}
                        {/*                top: 0,*/}
                        {/*                opacity: 0*/}
                        {/*            }}*/}
                        {/*            style={{*/}
                        {/*                opacity: showVolumeSlider ? 1 : 0,*/}
                        {/*                paddingBlock: 0,*/}
                        {/*                width: 70,*/}
                        {/*                marginRight: 20,*/}
                        {/*                userSelect: showVolumeSlider ? null : 'none',*/}
                        {/*                transition: 'opacity 0.8s ease',*/}
                        {/*                zIndex: showVolumeSlider ? 1 : -1,*/}
                        {/*            }}*/}
                        {/*    />*/}
                        {/*/!*</div>*!/*/}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AudioVisualizer
