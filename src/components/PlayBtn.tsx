import { useEffect, useState } from 'preact/hooks';

type Props = {
  track: string
  id: string
  albumName: string
  artistName: string
  coverUrl: string
}

const PlayBtn = ({ track, id }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audioPlayer = document.getElementById('audio') as HTMLAudioElement | null;
    const btn = document.getElementById('play-pause-' + id) as HTMLButtonElement | null;
    const spinningRecord = document.querySelector(`#record-${id}`) as HTMLImageElement | null;
    if (!audioPlayer.paused && audioPlayer.src === track) {
      btn.textContent = '❚❚';
      spinningRecord.classList.toggle('spinning');
    }
  }, []);

  const togglePlay = () => {
    const newPlayingState = !isPlaying;
    setIsPlaying(newPlayingState);
  };

  const handleClick = (e) => {
    e.preventDefault();

    const audioPlayer = document.getElementById('audio') as HTMLAudioElement | null;
    const spinningRecord = document.querySelector(`#record-${id}`) as HTMLImageElement | null;
    const spinningRecords = document.querySelectorAll('.vynil-image.vynil-animation-in') as NodeListOf<HTMLImageElement>;
    const trackBtn = document.querySelectorAll('.track-btn') as NodeListOf<HTMLButtonElement>;
    const trackCurrentBtn = document.querySelector(`#play-pause-${id}`) as HTMLButtonElement | null;


    if (!audioPlayer.paused && audioPlayer.src === track) {
      audioPlayer.pause();
      spinningRecord.classList.remove('spinning');
    } else {
      audioPlayer.src = track; // Cambiar la pista de audio si es necesario
      audioPlayer.play(); // Reproducir la canción
      spinningRecords.forEach((record) => {
        record.classList.remove('spinning')
      })
      trackBtn.forEach((btn) => {
        btn.textContent = '►';
      })
      spinningRecord.classList.add('spinning');
    }

    audioPlayer.onpause = (event) => {
      trackBtn.forEach((btn) => {
        btn.textContent = '►';
        spinningRecord.classList.remove('spinning');
        trackCurrentBtn.textContent = '►';
      })
    }

    audioPlayer.onplay = (event) => {
      trackBtn.forEach((btn) => {
        trackCurrentBtn.textContent = '❚❚';
        spinningRecord.classList.add('spinning');
      })
    }

    togglePlay();
  };

  return (
            <button
                    className="track-btn transition hover:scale-110 text-pink-700 bg-gray-100 hover:bg-gray-200 focus-visible:ring-2 focus:outline-none focus:ring-black font-medium rounded-lg text-lg px-8 py-1.5 text-center inline-flex items-center dark:focus:ring-black mr-4"
                    id={"play-pause-" + id}
                    onClick={(e) => handleClick(e)}
            >
              {isPlaying ? '❚❚' : '►'}
            </button>
  );
};

export default PlayBtn;
