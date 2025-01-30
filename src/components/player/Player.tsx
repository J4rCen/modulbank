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
    const [state, send] = useMachine(machine);

    const toggleModal = (open: any) => {
        setIsModalOpen(open);
        if (!open) send({ type: 'key.escape' });
    };

    const FooterButton = () => (
        <div className="footerModal">
            {[{ type: 'resize', img: state.context.isLarge ? imageExitMaxSize : imageMaxSize, title: state.context.isLarge ? 'Уменьшить видео' : "Увеличить видео" },
              { type: 'toggle', img: state.value === 'mini' ? imagePlay : imagePause, title: state.value === 'mini' ? 'Продолжить просмотр' : 'Поставить видео на паузу'}]
            .map(({ type, img, title }) => (
                <Tooltip key={type} title={title}>
                    <Button onClick={() => send({ type })}>
                        <img height={15} width={15} src={img} alt={title} />
                    </Button>
                </Tooltip>
            ))}
        </div>
    );

    return (
        <div id="VideoPlayer">
            <div className="playerWrap center">
                {!state.matches("full") && (
                    <img className="playButton" src={imagePlayVideo} height={40} width={40} alt="start video" 
                        onClick={() => { send({ type: 'toggle' }); toggleModal(true); }}
                    />
                )}
                <img src={imagePreview} height={150} className="videoPlayer" width={300} alt="play video" />
            </div>
            <Modal className="videoWrap" open={isModalOpen} onCancel={() => toggleModal(false)} footer={<FooterButton />}>
                <ReactPlayer id="reactPlayer" ref={videoRef} loop height={350} width={500} 
                    playing={state.matches("full")} url={'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm'}
                />
            </Modal>
        </div>
    );
};


export default VideoPlayer