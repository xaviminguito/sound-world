import { useEffect, useState } from 'preact/hooks';

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  let visible = false;

  useEffect(() => {
    const audioComponent = document.querySelector('audio') as HTMLAudioElement;
    const audioParent = audioComponent.parentElement as HTMLElement;
    if (!audioComponent.paused) {
      setIsPlaying(true);
      audioParent.classList.add('playing');
    }
  }, []);

  return (
          <div className={`audio-player${visible ? 'playing' : ''}`}>
              <audio id="audio" className={'w-full'} controls></audio>
          </div>
  );
};

export default Player;
