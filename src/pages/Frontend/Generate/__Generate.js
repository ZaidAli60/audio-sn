import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { createNoise3D } from 'simplex-noise';
import {Button, Input, Select, Slider, Space} from 'antd';
import { useWavesurfer } from '@wavesurfer/react';
import { BsFillPauseFill } from "react-icons/bs";
import { IoPlay } from "react-icons/io5";
import {TbPlayerTrackNextFilled, TbVolume, TbVolumeOff} from "react-icons/tb";
import { TbPlayerTrackPrevFilled } from "react-icons/tb";
import axios from 'axios';
import AudioVisualizer from "../../../components/AudioVisualizer/AudioVisualizer";


const { Option } = Select;

const Generate = () => {
    const contentRef = useRef(); // Reference to the content div
    const [isPlaying, setIsPlaying] = useState(false)
    // const [currentMusic, setCurrentMusic] = useState("")
    const [duration, setDuration] = useState("15")
    const [prompt, setPrompt] = useState("")
    const [isProcessing, setIsProcessing] = useState(false)
    const [audioData, setAudioData] = useState("")
    const [audioURL, setAudioURL] = useState("https://res.cloudinary.com/dufkxmegs/video/upload/v1711744591/TTM_5_ziuor0.wav")

    const handleGenerate = async () => {
        if (!duration) {
            return window.toastify("Please select duration time", "error");
        }
        if (!prompt) {
            return window.toastify("Please enter a text prompt", "error");
        }

        const data = {
            duration: Number(duration), // Convert duration to number
            prompt
        };

        // console.log('data', data);
        setIsProcessing(true);

        try {
            const response = await axios.post(
                'http://85.239.241.96:8000/api/ttm_endpoint',
                data, // Pass data object
                { responseType: 'arraybuffer' } // Receive response as ArrayBuffer
            );

            const audioBlob = new Blob([response.data], { type: 'audio/wav' }); // Convert ArrayBuffer to Blob
            const url = URL.createObjectURL(audioBlob);
            // console.log('url', url);
            setAudioURL(url);
            setAudioData(audioBlob);
            setIsProcessing(false); // Set loading to false on success
        } catch (error) {
            // console.log('Error:', error);
            window.toastify("Something went wrong", "error");
            setIsProcessing(false); // Set loading to false on error
        }
    }

    const audioInputRef = useRef(null);
    const visualiserRef = useRef(null);
    const labelRef = useRef(null);
    let audio = useRef(new Audio("https://res.cloudinary.com/dufkxmegs/video/upload/v1711744591/TTM_5_ziuor0.wav")).current;
    let noise = useRef(new createNoise3D()).current;
    const isVisStarted = useRef(false);

    useEffect(() => {
        if (!isVisStarted.current) {
            startVis();
            isVisStarted.current = true;
        }

        // Cleanup function to pause and reset audio when component unmounts
        return () => {
            audio.pause();
            audio.currentTime = 0;
        };
    }, []);

    const setAudio = () => {
        audio.pause();
        const audioFile = audioInputRef.current.files[0];
        if (audioFile && audioFile.name.includes(".mp3")) {
            const audioURL = URL.createObjectURL(audioFile);
            audio = new Audio(audioURL);
            clearScene();
            startVis();
        } else {
            alert("Invalid File Type!");
        }
    };

    const handleVisualiserClick = () => {
        if (audio.paused) {
            audio.play();
            labelRef.current.classList.add('hidden');
        } else {
            audio.pause();
            labelRef.current.classList.remove('hidden');
        }
    };

    const clearScene = () => {
        const canvas = visualiserRef.current.firstElementChild;
        if (canvas) {
            visualiserRef.current.removeChild(canvas);
        }
    };

    const startVis = () => {
        try {
            const context = new AudioContext();
            const src = context.createMediaElementSource(audio);
            const analyser = context.createAnalyser();
            src.connect(analyser);
            analyser.connect(context.destination);
            analyser.fftSize = 512;
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 100;
            scene.add(camera);

            const renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setClearColor("#080808"); // Dark background color

            visualiserRef.current.appendChild(renderer.domElement);
            const geometry = new THREE.IcosahedronGeometry(20, 3);
            const material = new THREE.MeshLambertMaterial({
                color: "#ffffff", // White color for the sphere
                wireframe: true
            });
            const sphere = new THREE.Mesh(geometry, material);

            const light = new THREE.DirectionalLight("#ffffff", 0.8);
            light.position.set(0, 50, 100);
            scene.add(light);
            scene.add(sphere);

            window.addEventListener('resize', () => {
                renderer.setSize(window.innerWidth, window.innerHeight);
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
            });

            function render() {
                analyser.getByteFrequencyData(dataArray);

                const lowerHalf = dataArray.slice(0, (dataArray.length / 2) - 1);
                const upperHalf = dataArray.slice((dataArray.length / 2) - 1, dataArray.length - 1);

                const lowerMax = max(lowerHalf);
                const upperAvg = avg(upperHalf);

                const lowerMaxFr = lowerMax / lowerHalf.length;
                const upperAvgFr = upperAvg / upperHalf.length;

                sphere.rotation.x += 0.001;
                sphere.rotation.y += 0.003;
                sphere.rotation.z += 0.005;

                WarpSphere(sphere, modulate(Math.pow(lowerMaxFr, 0.8), 0, 1, 0, 8), modulate(upperAvgFr, 0, 1, 0, 4));
                requestAnimationFrame(render);
                renderer.render(scene, camera);
            }

            function WarpSphere(mesh, bassFr, treFr) {
                if (!mesh.geometry || !mesh.geometry.vertices) return; // Add defensive checks
                mesh.geometry.vertices.forEach(function (vertex, i) {
                    var offset = mesh.geometry.parameters.radius;
                    var amp = 5;
                    var time = window.performance.now();
                    vertex.normalize();
                    var rf = 0.00001;
                    var distance = (offset + bassFr) + noise.noise3D(vertex.x + time * rf * 4, vertex.y + time * rf * 6, vertex.z + time * rf * 7) * amp * treFr * 2;
                    vertex.multiplyScalar(distance);
                });
                mesh.geometry.verticesNeedUpdate = true;
                mesh.geometry.normalsNeedUpdate = true;
                mesh.geometry.computeVertexNormals();
                mesh.geometry.computeFaceNormals();
            }

            render();
        } catch (error) {
            // console.error("Error starting visualization:", error);
        }
    };


    // Helper functions
    function fractionate(val, minVal, maxVal) {
        return (val - minVal) / (maxVal - minVal);
    }

    function modulate(val, minVal, maxVal, outMin, outMax) {
        var fr = fractionate(val, minVal, maxVal);
        var delta = outMax - outMin;
        return outMin + (fr * delta);
    }

    function avg(arr) {
        var total = arr.reduce(function (sum, b) { return sum + b; });
        return (total / arr.length);
    }

    function max(arr) {
        return arr.reduce(function (a, b) { return Math.max(a, b); });
    }

    const onChange = (value) => {
        setDuration(value)
        // console.log(`selected ${value}`);
    };

    const onSearch = (value) => {
        // console.log('search:', value);
    };

    // Filter `option.label` match the user type `input`
    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    const selectBefore = (
        <Select
            className="select-before"
            placeholder="Select Duration"
            defaultValue={"15"}
            onChange={onChange}
            onSearch={onSearch}
            filterOption={filterOption}
        >
            <Option value="15">15 s</Option>
            <Option value="30">30 s</Option>
            <Option value="45">45 s</Option>
            <Option value="60">60 s</Option>
        </Select>
    );

    const containerRef = useRef(null);

    const { wavesurfer } = useWavesurfer({
        container: containerRef,
        height: 40,
        waveColor: "rgb(169,168,178)",
        progressColor: "rgb(58, 91, 201)",
        barWidth: "1",
        barGap: "1",
        barRadius: "1",
        url: audioURL,
        autoPlay: true, // Disable autoplay
    });

    useEffect(() => {
        if (wavesurfer) {
            wavesurfer.on('finish', () => {
                setIsPlaying(false);
            });
        }
        return () => {
            wavesurfer && wavesurfer.un('finish');
        };
    }, [wavesurfer]);

    const ButtonStyles = {
        background: '#FBD38D',
        color: '#000000',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: 'none'
    }

    const [volume, setVolume] = useState(0.5)
    const [showVolumeSlider, setShowVolumeSlider] = useState(false);
    const togglePlayPause = () => {
        if (wavesurfer) {
            wavesurfer.setVolume(0)
            isPlaying ? setIsPlaying(false) : setIsPlaying(true)
            if (wavesurfer.isPlaying()) {
                wavesurfer.pause();
                setIsPlaying(false);
            } else {
                wavesurfer.play();
                setIsPlaying(true);
            }
        }
    };
    const toggleVolume = () => {
        // if (wavesurfer.isPlaying() && !wavesurfer.getMuted()){
        //     wavesurfer.setMuted(true)
        // }else {
        //     wavesurfer.setMuted(false)
        // }
        if (wavesurfer && wavesurfer.getVolume()) {
            wavesurfer.setVolume(0)
        }else {
            wavesurfer.setVolume(volume)
        }
    }
    const changeVolume = (value) => {
        setVolume(value)
        wavesurfer.setVolume(value)
    }


    return (

        <div className='bg-dark min-vh-100'>
            <div className="container-fluid py-2 h-100 d-flex flex-column justify-content-center align-items-center">
                {/*<input type="file" id="audio" accept="*" ref={audioInputRef} onChange={setAudio} />*/}
                <div className='h-50'>
                    <AudioVisualizer isPlaying={isPlaying} audioURL={audioURL}/>
                    {/*<div id="visualiser" className='py-5' ref={visualiserRef} ></div>*/}
                </div>
                <div className='text-input w-100 d-flex flex-column justify-content-center align-items-center mt-3'>
                    <div className='mb-5 w-sm-75 w-50-lg'>
                        <div ref={containerRef} className='mb-3'></div>
                        <div className='gap-3 d-flex justify-content-center align-items-center' style={{ background: "transparent", paddingLeft: 90 }}>
                            <Button shape="circle" size='large' style={ButtonStyles}><TbPlayerTrackPrevFilled /></Button>
                            <Button shape="circle" size='large' style={ButtonStyles} onClick={() => togglePlayPause()}>{isPlaying ? <BsFillPauseFill style={{ fontSize: "14px" }} /> : <IoPlay style={{ fontSize: "14px" }} />}</Button>
                            <Button shape="circle" size='large' style={ButtonStyles}><TbPlayerTrackNextFilled /></Button>
                            <div
                                style={{display: "flex", justifyContent: 'center', alignItems: 'center', gap: 20}}
                                onMouseLeave={() => setShowVolumeSlider(false)}
                            >
                                <Button
                                    shape="circle"
                                    size="large"
                                    style={ButtonStyles}
                                    onClick={toggleVolume}
                                    onMouseEnter={() => setShowVolumeSlider(true)}
                                >
                                    {wavesurfer?.getVolume() ? <TbVolume/> : <TbVolumeOff/>}
                                </Button>
                                <Slider min={0} max={1} step={0.01}
                                        value={volume} tooltip={{open:false}}
                                        onChange={changeVolume}
                                        railStyle={{background: "#bbb", height: 12, borderRadius: 2}}
                                        trackStyle={{background: "#FBD38D", height: 12,borderRadius: 2}}
                                        handleStyle={{
                                            width: 3,
                                            height: 12,
                                            position: "absolute",
                                            top: 0,
                                            opacity: 0
                                        }}
                                        style={{
                                            opacity: showVolumeSlider ? 1: 0,
                                            paddingBlock: 0,
                                            width: 70,
                                            marginRight: 20,
                                            userSelect: showVolumeSlider ? null: 'none',
                                            transition:'opacity 0.8s ease',
                                            zIndex: showVolumeSlider ? 1 : -1,
                                        }}
                                />
                            </div>
                        </div>
                    </div>
                    <Space.Compact className='w-sm-75 w-50-lg' size='large'>
                        <Input addonBefore={selectBefore} onChange={(e) => setPrompt(e.target.value)} placeholder='Prompt here ...' />
                        <Button className='custom-btn' type='primary' loading={isProcessing} onClick={handleGenerate}>Generate</Button>
                    </Space.Compact>
                </div>

            </div>
        </div>
    );
};

export default Generate;
