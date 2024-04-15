import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GUI } from 'dat.gui';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass';
import { Button } from "antd"
import { useNavigate } from 'react-router-dom';
import Navbar from 'components/frontend/Navbar';
import { useWavesurfer } from '@wavesurfer/react';
import { BsFillPauseFill } from "react-icons/bs";
import { IoPlay } from "react-icons/io5";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { TbPlayerTrackPrevFilled } from "react-icons/tb";
// import './index.css'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function LandingPage() {
    const renderer = useRef();
    const scene = useRef();
    const camera = useRef();
    const bloomComposer = useRef();
    const bloomPass = useRef();
    const uniforms = useRef();
    const mouseX = useRef(0);
    const mouseY = useRef(0);
    const analyser = useRef();
    const audioRef = useRef();
    const audioElementRef = useRef();
    const contentRef = useRef(); // Reference to the content div
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentMusic, setCurrentMusic] = useState("")


    let navigate = useNavigate()


    useEffect(() => {
        // Setup renderer
        renderer.current = new THREE.WebGLRenderer({ antialias: true });
        renderer.current.setSize(window.innerWidth, window.innerHeight);


        // Mount renderer to content div
        contentRef.current.appendChild(renderer.current.domElement);
        // Setup scene
        scene.current = new THREE.Scene();

        // Setup camera
        camera.current = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.current.position.set(0, -2, 14);
        camera.current.lookAt(0, 0, 0);

        // Setup post-processing
        const renderScene = new RenderPass(scene.current, camera.current);

        bloomPass.current = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1, 1, 0);
        bloomPass.current.threshold = 0.5;
        bloomPass.current.strength = 0.5;
        bloomPass.current.radius = 0.8;

        bloomComposer.current = new EffectComposer(renderer.current);
        bloomComposer.current.addPass(renderScene);
        bloomComposer.current.addPass(bloomPass.current);

        const outputPass = new OutputPass();
        bloomComposer.current.addPass(outputPass);

        // Setup shaders and mesh
        uniforms.current = {
            u_time: { type: 'f', value: 0.0 },
            u_frequency: { type: 'f', value: 0.0 },
            u_red: { type: 'f', value: 1.0 },
            u_green: { type: 'f', value: 1.0 },
            u_blue: { type: 'f', value: 1.0 }
        };

        const mat = new THREE.ShaderMaterial({
            uniforms: uniforms.current,
            vertexShader: document.getElementById('vertexshader').textContent,
            fragmentShader: document.getElementById('fragmentshader').textContent
        });

        const geo = new THREE.IcosahedronGeometry(4, 30);
        const mesh = new THREE.Mesh(geo, mat);
        scene.current.add(mesh);
        mesh.material.wireframe = true;

        // Setup GUI
        // const gui = new GUI();
        // const colorsFolder = gui.addFolder('Colors');
        // colorsFolder.add(uniforms.current.u_red, 'value', 0, 1).name('Red');
        // colorsFolder.add(uniforms.current.u_green, 'value', 0, 1).name('Green');
        // colorsFolder.add(uniforms.current.u_blue, 'value', 0, 1).name('Blue');

        // const bloomFolder = gui.addFolder('Bloom');
        // bloomFolder.add(bloomPass.current, 'threshold', 0, 1).name('Threshold');
        // bloomFolder.add(bloomPass.current, 'strength', 0, 3).name('Strength');
        // bloomFolder.add(bloomPass.current, 'radius', 0, 1).name('Radius');

        // Load and play music
        const listener = new THREE.AudioListener();
        camera.current.add(listener);
        const sound = new THREE.Audio(listener);
        const audioLoader = new THREE.AudioLoader();

        audioRef.current.onchange = function () {
            const file = this.files[0];
            const url = URL.createObjectURL(file);
            audioElementRef.current.src = url;
            audioLoader.load(url, (buffer) => {
                sound.setBuffer(buffer);
                analyser.current = new THREE.AudioAnalyser(sound, 32);
                audioElementRef.current.play();
            });
        };

        audioElementRef.current.onplay = function () {
            sound.play();
        };

        audioElementRef.current.onpause = function () {
            sound.pause();
        };

        // Event listeners
        const handleMouseMove = (e) => {
            let windowHalfX = window.innerWidth / 2;
            let windowHalfY = window.innerHeight / 2;
            mouseX.current = (e.clientX - windowHalfX) / 100;
            mouseY.current = (e.clientY - windowHalfY) / 100;
        };

        document.addEventListener('mousemove', handleMouseMove);

        // Animation loop
        const clock = new THREE.Clock();
        const animate = () => {
            camera.current.position.x += (mouseX.current - camera.current.position.x) * 0.05;
            camera.current.position.y += (-mouseY.current - camera.current.position.y) * 0.5;
            camera.current.lookAt(scene.current.position);
            uniforms.current.u_time.value = clock.getElapsedTime();
            // uniforms.current.u_frequency.value = audioElementRef.current.paused ? 0 : analyser.current.getAverageFrequency();
            bloomComposer.current.render();
            requestAnimationFrame(animate);
        };
        animate();



        const handleResize = () => {
            camera.current.aspect = window.innerWidth / window.innerHeight;
            camera.current.updateProjectionMatrix();
            renderer.current.setSize(window.innerWidth, window.innerHeight);
            bloomComposer.current.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);
        // Cleanup
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            contentRef.current.removeChild(renderer.current.domElement);
            window.removeEventListener('resize', handleResize); // Don't forget to remove the event listener
        };


        // Cleanup
        // return () => {
        //   document.removeEventListener('mousemove', handleMouseMove);
        //   document.body.removeChild(renderer.current.domElement);
        // };



    }, []);

    // Resize handler
    const handleResize = () => {
        camera.current.aspect = window.innerWidth / window.innerHeight;
        camera.current.updateProjectionMatrix();
        renderer.current.setSize(window.innerWidth, window.innerHeight);
        bloomComposer.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);



    const containerRef = useRef(null);

    const { wavesurfer } = useWavesurfer({
        container: containerRef,
        height: 40,
        waveColor: "rgb(169,168,178)",
        progressColor: "rgb(58, 91, 201)",
        barWidth: "1",
        barGap: "1",
        barRadius: "1",
        url: "",
        autoPlay: false, // Disable autoplay
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

    const togglePlayPause = () => {
        setCurrentMusic("https://res.cloudinary.com/dufkxmegs/video/upload/v1711744591/TTM_5_ziuor0.wav")
        if (wavesurfer) {
            if (wavesurfer.isPlaying()) {
                wavesurfer.pause();
                setIsPlaying(false);
            } else {
                wavesurfer.play();
                setIsPlaying(true);
            }
        }
    };

    return (
        <div id="content">
            <div ref={contentRef}>
            </div>
            <label for="thefile" class="file"> Choose an audio file
                <input ref={audioRef} type="file" accept="audio/*" />
            </label>
            <audio id="audio" controls></audio>
            <audio id="audio" ref={audioElementRef} controls></audio>
            <div id="out"></div>
            <Navbar />
            <div className="px-xxl-5 custom-lg-padding custom-xxl-padding">
                <div className='container-fluid px-xxl-3 px-lg-4'>
                    <div className='text-input d-flex justify-content-center align-items-center'>
                        <div className="card p-3 border-0" style={{ width: "50%", background: "transparent" }}>
                            <div ref={containerRef} className='mb-3'>
                            </div>
                            <div className='gap-3 d-flex justify-content-center align-items-center' style={{ background: "transparent" }}>
                                <Button shape="circle" size='large' style={{ background: "transparent", color: "white" }}><TbPlayerTrackPrevFilled /></Button>
                                <Button shape="circle" size='large' style={{ background: "transparent", color: "white" }} onClick={() => togglePlayPause()}>{isPlaying ? <BsFillPauseFill style={{ fontSize: "14px" }} /> : <IoPlay style={{ fontSize: "14px" }} />}</Button>
                                <Button shape="circle" size='large' style={{ background: "transparent", color: "white" }}><TbPlayerTrackNextFilled /></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;