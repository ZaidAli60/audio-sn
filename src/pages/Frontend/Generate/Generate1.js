import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { createNoise3D } from 'simplex-noise';
// import './Generate1.css';
import songFile from "assets/music/audio.mp3"

const Generate1 = () => {
    const visualiserRef = useRef(null);
    const labelRef = useRef(null);
    let audio = useRef(new Audio(songFile)).current;
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

    const handleVisualiserClick = () => {
        if (audio.paused) {
            audio.play();
            // labelRef.current.classList.add('hidden');
        } else {
            audio.pause();
            // labelRef.current.classList.remove('hidden');
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
            renderer.setClearColor("#ffffff");

            visualiserRef.current.appendChild(renderer.domElement);
            const geometry = new THREE.IcosahedronGeometry(20, 3);
            const material = new THREE.MeshLambertMaterial({
                color: "#696969",
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
            console.error("Error starting visualization:", error);
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

    return (
        <div className='bg-primary min-vh-100'>
            <div className="container-fluid px-xxl-3 px-lg-4 py-2">
                <div className="px-xxl-5 custom-lg-padding custom-xxl-padding py-5">
                    <h1>Generate page</h1>
                    <div>
                        <div>
                            <div id="visualiser" ref={visualiserRef} ></div>
                            {/* <div id="label" ref={labelRef} className="label">Select file</div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Generate1;
