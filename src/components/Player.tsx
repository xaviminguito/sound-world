import { useEffect, useState } from 'preact/hooks';

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem('audioState');
    if (savedState === 'playing') {
      setIsPlaying(true);
    }
  }, []);

  return (
          <div className={`audio-player ${isPlaying ? 'playing' : ''}`}>
              <audio id="audio" controls></audio>
          </div>
  );
};

export default Player;
