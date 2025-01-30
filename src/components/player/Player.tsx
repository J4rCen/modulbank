import {useRef, useState } from "react";
import machine from "./machine";
import { useMachine } from "@xstate/react";
import ReactPlayer from "react-player"
import {Button, Modal, Tooltip} from 'antd'
import './player.css'
import imagePlayVideo from '../../public/play-button.png'
import imageMaxSize from '../../public/fullscreen.png'
import imagePause from '../../public/pause.png'
import imagePlay from '../../public/play.png'
import imagePreview from '../../public/flower.png'
import imageExitMaxSize from '../../public/cross.png'

const VideoPlayer = () => {
    const videoRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [state, send] = useMachine(machine)

    const ClosedButton = () => {
        return (
            <div className="footerModal">
                <Tooltip title={state.context.isLarge ? 'Уменьшить видео' : 'Увеличить видео'}>
                    <Button onClick={() => {send({type: 'resize'})}}>
                        <img height={15} width={15} src={state.context.isLarge ? imageExitMaxSize : imageMaxSize} alt="increase video"/>
                    </Button>
                </Tooltip>
                <Tooltip title={'Поставить видео на паузу'}>
                    <Button onClick={() => send({type: 'toggle'})}>
                        <img height={15} width={15} src={state.value === 'mini' ? imagePlay : imagePause} alt="pause video"/>
                    </Button>
                </Tooltip>
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
                <div className="playerWrap center">
                    <img className="playButton" hidden={state.matches("full")} src={imagePlayVideo} height={40} width={40} alt="start video" 
                        onClick={() => {send({type: 'toggle'}), showModal()}}
                    />
                    <img src={imagePreview} height={150} className="videoPlayer" width={300} alt="play video" />
                </div>
                <Modal
                    className="videoWrap" 
                    open={isModalOpen} onCancel={handleCancel}
                    footer={<ClosedButton/>}
                >
                    <ReactPlayer
                        id={'reactPlayer'}
                        ref={videoRef} 
                        loop={true}
                        height={350}
                        width={500}
                        playing={state.matches("full")} 
                        url={'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm'}
                    />
                </Modal>
            </div>
        </div>
    )
}

export default VideoPlayer