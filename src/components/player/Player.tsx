import { useEffect, useRef, useState } from "react";
import machine from "./machine";
import { useMachine } from "@xstate/react";
import ReactPlayer from "react-player"
import {ConfigProvider, Modal} from 'antd'
import './player.css'
import image from '../../../public/play-button.png'

const VideoPlayer = () => {
    const videoRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [state, send] = useMachine(machine)
    console.log(state.value)

    const ClosedButton = () => {
        return (
            <div>
                <img src="" alt="" />
                <img src="" alt="" />
            </div>
        )
    }

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        send({type: 'key.escape'})
    };


    return (
        <div id="VideoPlayer">
            <div>
                <div className="playerWrap">
                    <img className="playButton" hidden={state.matches("full")} src={image} height={40} width={40} alt="start video" 
                        onClick={() => {send({type: 'toggle'}), showModal()}}
                    />
                    <img src="../../../public/flower.png" height={150} className="videoPlayer" width={300} alt="" />
                </div>
                <Modal
                    className="videoWrap" 
                    open={isModalOpen} onCancel={handleCancel}
                    footer={<ClosedButton/>}
                >
                    <ReactPlayer ref={videoRef} loop={true} playing={state.matches("full")} height={300} width={500} url={'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm'}/>
                </Modal>
            </div>
        </div>
    )
}

export default VideoPlayer