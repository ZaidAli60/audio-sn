import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import SimplexNoise from 'simplex-noise';
import { Button, Input, Select, Space } from 'antd';
import { useWavesurfer } from '@wavesurfer/react';
import { BsFillPauseFill } from "react-icons/bs";
import { IoPlay } from "react-icons/io5";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { TbPlayerTrackPrevFilled } from "react-icons/tb";
import axios from 'axios';
import audioFile from "assets/music/7.mp3"

const { Option } = Select;
// const audioFile = ""

const Generate1 = () => {

    // const visualiserRef = useRef(null); // Reference to the content div
    const [isPlaying, setIsPlaying] = useState(false)
    const [duration, setDuration] = useState()
    const [prompt, setPrompt] = useState("")
    const [isProcessing, setIsProcessing] = useState(false)
    const [noise] = useState(new SimplexNoise()); // Noise object
    const [audioURL, setAudioURL] = useState("")
    const [audio, setAudio] = useState(null); // Initially, no audio element


    useEffect(() => {
        // Create the audio element only once
        const newAudio = new Audio(audioFile); // Initialize the audio with the file
        setAudio(newAudio); // Set the state
        setAudioURL(audioFile)
        return () => {
            if (newAudio) {
                newAudio.pause(); // Pause when component unmounts
            }
        };
    }, []); // Empty dependency array ensures it only runs once on mount

    useEffect(() => {
        if (audio) {
            // audio.play(); // Play the audio
            startVis(); // Start visualization when audio is ready
        }
    }, [audio]); // Effect depends on 'audio' initialization



    // useEffect(() => {
    //     if (audio) {
    //         startVis(); // Start visualization when audio is set
    //     }
    //     return () => {
    //         if (audio) {
    //             audio.pause(); // Pause audio when component unmounts
    //         }
    //     };
    // }, [audio]); // Run effect when audio state changes

    // Event handlers
    // const setAudioFile = (event) => {
    //     const audioFile = event.target.files[0];
    //     const validFormats = ['.mp3', '.wav', '.ogg']; // Extend as needed

    //     if (audioFile) {
    //         const extension = audioFile.name.split('.').pop().toLowerCase(); // Get file extension
    //         if (validFormats.includes(`.${extension}`)) {
    //             const audioURL = URL.createObjectURL(audioFile);
    //             setAudioURL(audioURL)
    //             setAudio(new Audio(audioURL)); // Play or set up the audio file
    //             // Play or set up the audio file
    //         } else {
    //             alert('Invalid File Type!'); // Alert if the format is not in the list
    //         }
    //     }
    // };

    const toggleAudio = () => {
        // Toggle audio play/pause
        if (audio) {
            if (audio.paused) {
                audio.play();
                setIsPlaying(true)
            } else {
                audio.pause();
                setIsPlaying(false)
            }
        }
    };

    // Audio visualization
    const startVis = () => {
        const context = new AudioContext();
        const src = context.createMediaElementSource(audio);
        const analyser = context.createAnalyser();
        src.connect(analyser);
        analyser.connect(context.destination);
        analyser.fftSize = 512;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 100;
        scene.add(camera);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor("#080808");

        const visualiser = document.getElementById('visualiser');
        visualiser.appendChild(renderer.domElement);
        const geometry = new THREE.IcosahedronGeometry(20, 3);
        const material = new THREE.MeshLambertMaterial({
            color: "#ffffff",
            wireframe: true,
        });
        const sphere = new THREE.Mesh(geometry, material);
        console.log(sphere);
        const light = new THREE.DirectionalLight('#ffffff', 0.8);
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

            const lowerHalf = dataArray.slice(0, dataArray.length / 2 - 1);
            const upperHalf = dataArray.slice(
                dataArray.length / 2 - 1,
                dataArray.length - 1
            );

            const lowerMax = max(lowerHalf);
            const upperAvg = avg(upperHalf);

            const lowerMaxFr = lowerMax / lowerHalf.length;
            const upperAvgFr = upperAvg / upperHalf.length;

            sphere.rotation.x += 0.001;
            sphere.rotation.y += 0.003;
            sphere.rotation.z += 0.005;
            warpSphere(
                sphere,
                modulate(Math.pow(lowerMaxFr, 0.8), 0, 1, 0, 8),
                modulate(upperAvgFr, 0, 1, 0, 4)
            );
            requestAnimationFrame(render);
            renderer.render(scene, camera);
        }
        render();
    };

    // Helper functions
    const warpSphere = (mesh, bassFr, treFr) => {
        const vertices = mesh.geometry.vertices;
        if (vertices) {
            vertices.forEach(function (vertex) {
                var offset = mesh.geometry.parameters.radius;
                var amp = 5;
                var time = window.performance.now();
                vertex.normalize();
                var rf = 0.00001;
                var distance =
                    offset +
                    bassFr +
                    noise.noise3D(
                        vertex.x + time * rf * 4,
                        vertex.y + time * rf * 6,
                        vertex.z + time * rf * 7
                    ) *
                    amp *
                    treFr *
                    2;
                vertex.multiplyScalar(distance);
            });
            mesh.geometry.verticesNeedUpdate = true;
            mesh.geometry.normalsNeedUpdate = true;
            mesh.geometry.computeVertexNormals();
            mesh.geometry.computeFaceNormals();
        }
    };

    const fractionate = (val, minVal, maxVal) => {
        return (val - minVal) / (maxVal - minVal);
    };

    const modulate = (val, minVal, maxVal, outMin, outMax) => {
        var fr = fractionate(val, minVal, maxVal);
        var delta = outMax - outMin;
        return outMin + fr * delta;
    };

    const avg = (arr) => {
        var total = arr.reduce(function (sum, b) {
            return sum + b;
        });
        return total / arr.length;
    };

    const max = (arr) => {
        return arr.reduce(function (a, b) {
            return Math.max(a, b);
        });
    };


    // const handleGenerate = async () => {
    //     if (!duration) {
    //         return window.toastify("Please select duration time", "error");
    //     }
    //     if (!prompt) {
    //         return window.toastify("Please enter a text prompt", "error");
    //     }

    //     const data = {
    //         duration: 15, // Convert duration to number
    //         prompt
    //     };

    //     console.log('data', data);
    //     setIsProcessing(true);
    //     const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJCcm9rZW5TdWJuZXRAZ21haWwuY29tIiwiZXhwIjoyMzEzMjUxNTU1fQ.culT9hdkRopQ7cuxShNzmUUC7dGOf-_lvvSv7KOR6dg"
    //     const config = { headers: { Authorization: `Bearer ${token}` } }

    //     try {
    //         console.log('Sending request...');
    //         const response = await axios.post(
    //             `http://api.bittaudio.ai/api/ttm_endpoint`,
    //             data,
    //             config,
    //             { responseType: 'blob' },

    //         );
    //         console.log('Received response:', response.data);

    //         // const audioBlob = new Blob([response.data], { type: 'audio/wav' });
    //         const url = URL.createObjectURL(new Blob([data], { type: 'audio/wav' }));

    //         // const url = URL.createObjectURL(audioBlob);
    //         console.log('url', url);
    //         setAudio(new Audio(url));
    //         setAudioURL(url);
    //         // setAudioData(audioBlob);
    //         if (audio) {
    //             await audio.play(); // Try to play the audio
    //         }
    //         setIsProcessing(false);
    //     } catch (error) {
    //         console.log('Error occurred:', error);
    //         if (error.message === "Network Error") {
    //             console.error("Network issue detected. Check server endpoint and connectivity.");
    //         }
    //         window.toastify("Something went wrong", "error");
    //         setIsProcessing(false);
    //     } finally {
    //         // Cleanup the old URL to prevent memory leaks
    //         if (audioURL) {
    //             URL.revokeObjectURL(audioURL);
    //         }
    //     }

    // }


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
        setIsProcessing(true) // start loading

        const myHeaders = {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJCcm9rZW5TdWJuZXRAZ21haWwuY29tIiwiZXhwIjoyMzEzMjUxNTU1fQ.culT9hdkRopQ7cuxShNzmUUC7dGOf-_lvvSv7KOR6dg",
            "Content-Type": "application/json",
        };

        const requestOptions = {
            headers: myHeaders,
            responseType: "blob", // Expecting a Blob response for audio data
        };

        try {
            const response = await axios.post(
                "http://api.bittaudio.ai/api/ttm_endpoint",
                data,
                requestOptions
            );

            const audioBlob = new Blob([response.data], { type: 'audio/wav' });
            const url = URL.createObjectURL(audioBlob);
            setAudioURL(url)
            setAudio(new Audio(url)); // Create and set a new Audio object
            setPrompt("")
            setDuration()
            setIsProcessing(false) // Reset loading state
        } catch (error) {
            console.log('Error occurred:', error);
            if (error.message === "Network Error") {
                console.error("Network issue detected. Check server endpoint and connectivity.");
            }
            window.toastify("Something went wrong", "error");
            setIsProcessing(false);
        }
    };

    const handleDownload = () => {
        if (audioURL) { // Ensure the URL is valid
            try {
                const a = document.createElement('a'); // Create an anchor element
                a.href = audioURL; // Set the Blob URL
                a.download = 'generated_audio.wav'; // Specify the filename
                document.body.appendChild(a); // Append to the document
                a.click(); // Trigger a click event to download
                document.body.removeChild(a); // Clean up by removing the anchor
                URL.revokeObjectURL(audioURL); // Revoke the Blob URL to avoid memory leaks
            } catch (error) {
                console.error('Error creating download link:', error);
            }
        } else {
            console.error('Audio URL is invalid:', audioURL);
        }
    };



    // const containerRef = useRef(null);

    // const { wavesurfer } = useWavesurfer({
    //     container: containerRef,
    //     height: 40,
    //     waveColor: "rgb(169,168,178)",
    //     progressColor: "rgb(58, 91, 201)",
    //     barWidth: "1",
    //     barGap: "1",
    //     barRadius: "1",
    //     url: audioURL,
    //     autoPlay: false, // Disable autoplay
    // });

    // useEffect(() => {
    //     if (wavesurfer) {
    //         wavesurfer.on('finish', () => {
    //             setIsPlaying(false);
    //         });
    //     }
    //     return () => {
    //         wavesurfer && wavesurfer.un('finish');
    //     };
    // }, [wavesurfer]);

    // const togglePlayPause = () => {
    //     if (wavesurfer) {
    //         if (wavesurfer.isPlaying()) {
    //             wavesurfer.pause();
    //             setIsPlaying(false);
    //         } else {
    //             wavesurfer.play();
    //             setIsPlaying(true);
    //         }
    //     }
    // };

    const onChange = (value) => {
        setDuration(value)
    };
    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    const selectBefore = (
        <Select
            className="select-before"
            placeholder="Select Duration"
            value={duration}
            onChange={onChange}
            filterOption={filterOption}
        >
            <Option value="15">15 s</Option>
            <Option value="30">30 s</Option>
            {/* <Option value="45">45 s</Option>
            <Option value="60">60 s</Option> */}
        </Select>
    )

    return (

        <div className='bg-dark min-vh-100'>
            {/* <audio src="https://res.cloudinary.com/dufkxmegs/video/upload/v1711744591/TTM_5_ziuor0.wav"></audio> */}
            <div className='bg-dark'>
                {/* <input type="file" accept=".mp3, .wav, .ogg" onChange={setAudioFile} /> */}
                <div id="visualiser" ></div>
                {/* <div id="label">Label</div> */}
            </div>
            <div className="container-fluid py-2 h-100 d-flex flex-column justify-content-center align-items-center">
                {/* <input type="file" id="audio" accept="*" ref={audioInputRef} onChange={setAudio} /> */}
                <div className='h-50'>
                    {/* <div id="visualiser" className='py-5' ref={visualiserRef} ></div> */}
                </div>
                <div className='text-input w-100 d-flex flex-column justify-content-center align-items-center mt-3'>
                    <div className='mb-4 w-sm-75 w-50-lg'>
                        {/* <div ref={containerRef} className='mb-3'></div> */}
                        <div className='gap-3 d-flex justify-content-center align-items-center' style={{ background: "transparent" }}>
                            {/* <Button shape="circle" size='large' style={{ background: "transparent", color: "white" }}><TbPlayerTrackPrevFilled /></Button> */}
                            <Button shape="circle" size='large' style={{ background: "transparent", color: "white" }} onClick={() => toggleAudio()}>{isPlaying ? <BsFillPauseFill style={{ fontSize: "14px" }} /> : <IoPlay style={{ fontSize: "14px" }} />}</Button>
                            {/* <Button shape="circle" size='large' style={{ background: "transparent", color: "white" }}><TbPlayerTrackNextFilled /></Button> */}
                        </div>
                    </div>
                    <Button type='primary' onClick={() => handleDownload()} className='mb-3 custom-btn' disabled={isProcessing}>Download</Button>
                    <Space.Compact className='w-sm-75 w-50-lg' size='large'>
                        <Input addonBefore={selectBefore} name='prompt' value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder='Prompt here ...' />
                        <Button className='custom-btn' type='primary' loading={isProcessing} onClick={handleGenerate}>Generate</Button>
                    </Space.Compact>
                </div>

            </div>
        </div>
    );
};

export default Generate1;
