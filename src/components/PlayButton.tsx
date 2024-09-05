import { isPlaying } from './state'

type Props = {
  track: string
  id: string
  albumName: string
  artist: string
  imageUrl: string
}

export default function PlayButton({
  track,
  id,
}: Props) {
  return (
    <button
      type="button"
      translate="no"
      class="text-pink-700 bg-gray-100 hover:bg-gray-200 focus-visible:ring-2 focus:outline-none focus:ring-black font-medium rounded-lg text-lg px-10 py-3 text-center inline-flex items-center dark:focus:ring-black mr-4"
      onClick={(e) => {
        let audioPlayer = document.getElementById('audio'),
            playPauseButton = document.querySelector('#play-pause');
        audioPlayer.src = track;
        document.querySelector('audio-player').classList.add('playing');
        //audioPlayer.play();
          if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseButton.textContent = '❚❚';
            e.currentTarget.textContent = '❚❚';
            let spinningRecord = document.querySelector(`#record-${id}`),
            spinningRecords = document.querySelectorAll('.vynil-image.vynil-animation-in')

            spinningRecords.forEach((record) => {
                record.classList.remove('spinning')
            })

            spinningRecord.classList.toggle('spinning');
            isPlaying.value = true
          } else {
            playPauseButton.textContent = '►';
          }

          audioPlayer.onpause = () => {
            playPauseButton.textContent = '►';
          }
        }
      }
    >
      ►
    </button>
  )
}
