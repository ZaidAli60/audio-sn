import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AudioVisualizer from "../../../components/AudioVisualizer/AudioVisualizer";
import '../../../index.css'
import Dropdown from "../../../components/Dropdown/Dropdown";
import audioFile from "assets/music/7.mp3"
import { Button } from 'antd';

const SERVER_URL = process.env.REACT_APP_API_END_POINT
const AUTHORIZATION_TOKEN = process.env.REACT_APP_AUTHORIZATION_TOKEN

const Generate = () => {

    const [prompt, setPrompt] = useState("")
    const [selectedOption, setSelectedOption] = useState({ value: 15, label: '15 s' })
    const [isProcessing, setIsProcessing] = useState(false)
    const [audioURL, setAudioURL] = useState(audioFile)
    const [isAutoPlay, setIsAutoPlay] = useState(false)
    // const [cooldown, setCooldown] = useState(0);
    const [cooldown, setCooldown] = useState(() => {
        const savedCooldown = localStorage.getItem('cooldown');
        return savedCooldown ? parseInt(savedCooldown, 10) : 0;
    });

    // const handleGenerate = async () => {

    //     if (!duration) {
    //         return window.toastify("Please select duration time", "error");
    //     }
    //     if (!prompt) {
    //         return window.toastify("Please enter a text prompt", "error");
    //     }

    //     const data = {
    //         duration: Number(duration), // Convert duration to number
    //         prompt
    //     };

    //     // console.log('data', data);
    //     setIsProcessing(true);

    //     try {
    //         const response = await axios.post(
    //             'http://85.239.241.96:8000/api/ttm_endpoint',
    //             data, // Pass data object
    //             { responseType: 'arraybuffer' } // Receive response as ArrayBuffer
    //         );

    //         const audioBlob = new Blob([response.data], { type: 'audio/wav' }); // Convert ArrayBuffer to Blob
    //         const url = URL.createObjectURL(audioBlob);
    //         // console.log('url', url);
    //         setAudioURL(url);
    //         setAudioData(audioBlob);
    //         setIsProcessing(false); // Set loading to false on success
    //     } catch (error) {
    //         // console.log('Error:', error);
    //         window.toastify("Something went wrong", "error");
    //         setIsProcessing(false); // Set loading to false on error
    //     }
    // }

    const handleGenerate = async () => {

        if (!selectedOption) {
            window.toastify("Please select an option", "error");
            return;
        }
        const duration = selectedOption?.value

        if (!prompt) {
            return window.toastify("Please enter a text prompt", "error");
        }

        const data = {
            duration: Number(duration), // Convert duration to number
            prompt
        };
        setIsProcessing(true) // start loading

        const myHeaders = {
            "Authorization": `Bearer ${AUTHORIZATION_TOKEN}`,
            "Content-Type": "application/json",
        };

        const requestOptions = {
            headers: myHeaders,
            responseType: "blob", // Expecting a Blob response for audio data
        };

        try {
            const response = await axios.post(
                `${SERVER_URL}/api/ttm_endpoint`,
                data,
                requestOptions
            );

            const audioBlob = new Blob([response.data], { type: 'audio/wav' });
            const url = URL.createObjectURL(audioBlob);
            setAudioURL(url)
            setIsAutoPlay(true)
            // setAudio(new Audio(url)); // Create and set a new Audio object
            setPrompt("")
            // setCooldown(300);
            setIsProcessing(false) // Reset loading state
            const nextCooldown = 600; // Set cooldown to 5 minutes (300 seconds)
            const cooldownExpiration = Date.now() + nextCooldown * 1000;
            localStorage.setItem('cooldownExpiration', cooldownExpiration);
            setCooldown(nextCooldown);
        } catch (error) {
            // setCooldown(300);
            // const nextCooldown = 300; // Set cooldown to 5 minutes (300 seconds)
            // const cooldownExpiration = Date.now() + nextCooldown * 1000;
            // localStorage.setItem('cooldownExpiration', cooldownExpiration);
            // setCooldown(nextCooldown);
            // console.log('Error occurred:', error);
            setIsAutoPlay(false)
            if (error.message === "Network Error") {
                console.error("Network issue detected. Check server endpoint and connectivity.");
            }
            window.toastify("Something went wrong", "error");
            setIsProcessing(false);
        }
    };
    // useEffect(() => {
    //     if (cooldown > 0) {
    //         const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    //         return () => clearTimeout(timer);
    //     }
    // }, [cooldown]);

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




    useEffect(() => {
        if (cooldown > 0) {
            const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
            localStorage.setItem('cooldown', cooldown - 1);
            return () => clearTimeout(timer);
        } else {
            localStorage.removeItem('cooldown');
        }
    }, [cooldown]);

    useEffect(() => {
        const cooldownExpiration = localStorage.getItem('cooldownExpiration');
        if (cooldownExpiration) {
            const remainingTime = Math.floor((cooldownExpiration - Date.now()) / 1000);
            if (remainingTime > 0) {
                setCooldown(remainingTime);
            } else {
                localStorage.removeItem('cooldownExpiration');
            }
        }
    }, []);


    // const inputHandler = (e) => {
    //     e.target.parentNode.dataset.value = e.target.value
    //     setPrompt(e.target.value)
    // }

    // const options = [
    //     { value: 15, label: '15 s' },
    //     { value: 30, label: '30 s' },
    // ]
    const options = [
        // { value: 15, label: '15 s', disabled: true },
        { value: 30, label: '30 s', disabled: true }, // Disabled the 30 s option
    ];
    const handleSelect = (value) => {
        setSelectedOption(value)
    }

    return (
        <div className='bg-black min-vh-100'>
            <AudioVisualizer audioURL={audioURL} handleDownload={handleDownload} isAutoPlay={isAutoPlay} setIsAutoPlay={setIsAutoPlay} />
            <div className='w-100 d-flex flex-column justify-content-center align-items-center'>
                <div className="prompt d-flex justify-content-between flex-wrap gap-3">
                    <div className="input-sizer stacked" style={{ overflow: "hidden" }}>
                        <textarea className="prompt__textarea" name='prompt' value={prompt} onChange={(e) => setPrompt(e.target.value)} rows="1" placeholder='Prompt here...'></textarea>
                    </div>
                    <div className='prompt__buttons-wrap d-flex justify-content-end gap-2 align-items-center'>
                        <div className="d-flex gap-3 justify-content-between align-items-center generate-btn">
                            <Dropdown options={options} defaultSelectedValue={selectedOption} selectedValue={selectedOption} onSelect={handleSelect} openDirection={'up'} />
                            <Button size='large' type='primary' style={{ fontWeight: '500', }} loading={isProcessing} disabled={cooldown > 0} onClick={handleGenerate}>{cooldown > 0 ? `Wait ${Math.floor(cooldown / 60)}:${('0' + (cooldown % 60)).slice(-2)}` : 'Generate'}</Button>
                            {/* <Button size='large' type='primary' style={{ fontWeight: '500', }} loading={isProcessing}  onClick={handleGenerate}>Generate</Button> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Generate;

