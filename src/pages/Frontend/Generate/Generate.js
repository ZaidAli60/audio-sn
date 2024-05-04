import React, { useRef, useState } from 'react';
import { Select } from 'antd';
import axios from 'axios';
import AudioVisualizer from "../../../components/AudioVisualizer/AudioVisualizer";
import '../../../index.css'
import Dropdown from "../../../components/Dropdown/Dropdown";
import audioFile from "assets/music/7.mp3"


const { Option } = Select;

const Generate = () => {
    const contentRef = useRef(); // Reference to the content div
    // const [currentMusic, setCurrentMusic] = useState("")
    const [duration, setDuration] = useState("15")
    const [prompt, setPrompt] = useState("")
    const [selectedOption, setSelectedOption] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [audioData, setAudioData] = useState("")
    const [audioURL, setAudioURL] = useState(audioFile)

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


    // let audio = useRef(new Audio("https://res.cloudinary.com/dufkxmegs/video/upload/v1711744591/TTM_5_ziuor0.wav")).current;



    const inputHandler = (e) => {
        e.target.parentNode.dataset.value = e.target.value
        setPrompt(e.target.value)
    }

    const options = [
        { value: 15, label: '15 s' },
        { value: 30, label: '30 s' },
        { value: 45, label: '45 s' },
        { value: 60, label: '1 min' }
    ]
    const handleSelect = (value) => setSelectedOption(value)


    return (
        <div className='bg-black min-vh-100'>
            <AudioVisualizer audioURL={audioURL} />
            <div className='w-100 d-flex flex-column justify-content-center align-items-center'>
                <div className="prompt d-flex justify-content-between flex-wrap gap-3">
                    <div className="input-sizer stacked">
                        <textarea className="prompt__textarea" onInput={inputHandler} rows="1" placeholder='Prompt here...'></textarea>
                    </div>
                    <div className='prompt__buttons-wrap d-flex justify-content-end gap-2 align-items-center'>
                        <div className="d-flex gap-3 justify-content-between align-items-center">
                            <Dropdown options={options} defaultSelectedValue={options[0]} selectedValue={selectedOption} onSelect={handleSelect} openDirection={'up'} />
                            <button className="prompt__button" loading={isProcessing} onClick={handleGenerate}>Generate</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Generate;

