import { useEffect, useRef, useState } from 'react';

const AudioPlayer = ({ audioUrl, mimeType }) => {
    const audioPlayer = useRef(null);
    const audioSource = useRef(null);
    const [canPlay, setCanPlay] = useState(false); // 用户点击后允许播放

    useEffect(() => {
        if (canPlay && audioPlayer.current && audioSource.current) {
            audioSource.current.src = audioUrl;
            audioPlayer.current.play().catch(err => console.error(err));
        }
    }, [audioUrl, canPlay]);

    return (
        <div className="flex relative z-10 my-4 w-full">
            <audio
                ref={audioPlayer}
                controls
                className="w-full h-14 rounded-lg bg-white shadow-xl shadow-black/5 ring-1 ring-slate-700/10"
            >
                <source ref={audioSource} type={mimeType} />
            </audio>

            {!canPlay && (
                <button
                    onClick={() => setCanPlay(true)}
                    className="absolute inset-0 flex items-center justify-center bg-black/50 text-white rounded-lg"
                >
                    点击播放
                </button>
            )}
        </div>
    );
};

export default AudioPlayer;
