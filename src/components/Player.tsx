import { currentTrack, isPlaying } from './state'

import { useEffect, useState, useRef } from 'preact/hooks'

export default function Player() {
  const audioPlayer = useRef<HTMLAudioElement>(null)
  const progressRef = useRef(null)
  const [songIndex, setSongIndex] = useState(4)
  const [progress, setProgress] = useState(0)

  if (currentTrack.value === null) {
    return
  }

  const { title, artist, albumName, imageUrl } = currentTrack.value

  function whilePlaying() {
    if (audioPlayer.current.duration) {
      const percentage =
        (audioPlayer.current.currentTime * 100) / audioPlayer.current.duration
      setProgress(percentage)
    }
    progressRef.current = requestAnimationFrame(whilePlaying)
  }

  useEffect(() => {
    const newIndex = (songIndex) + 1
    //audioPlayer.current.src = currentTrack.value.track
    //audioPlayer.current.currentTime = 0
    audioPlayer.current?.play()
    setSongIndex(newIndex)
  }, [title])

  useEffect(() => {
    if (isPlaying.value) {
      //audioPlayer.current?.play()
      progressRef.current = requestAnimationFrame(whilePlaying)
      isPlaying.value = true
    } else {
      audioPlayer.current?.pause()
      cancelAnimationFrame(progressRef.current)
    }
  }, [isPlaying.value])

  useEffect(() => {
    audioPlayer.current.onpause = () => {
      isPlaying.value = false
    }
    audioPlayer.current.onplay = () => {
      isPlaying.value = true
    }
  });

  useEffect(() => {
    if (progress >= 99.99) {
      isPlaying.value = false
      setProgress(0)
    }
  }, [progress])

  return (
    <div
      class="fixed bottom-0 left-0 right-0 bg-gray-100 z-10"
      role="region"
      aria-labelledby="audio-player-heading"
      transition-name="player"
    >
      <h2 id="audio-player-heading" class="sr-only">
        Audio player
      </h2>
      <div class="flex-1 bg-gray-200 h-1.5 dark:bg-gray-700">
        <div
          aria-orientation="horizontal"
          role="slider"
          aria-label="audio timeline"
          aria-valuemin={0}
          aria-valuemax={
            audioPlayer.current && audioPlayer.current.duration
              ? Math.floor(audioPlayer.current.duration)
              : 0
          }
          aria-valuenow={
            audioPlayer.current && audioPlayer.current.currentTime
              ? Math.floor(audioPlayer.current.currentTime)
              : 0
          }
          aria-valuetext={`${
            audioPlayer.current && audioPlayer.current.currentTime
              ? Math.floor(audioPlayer.current.currentTime)
              : 0
          } seconds`}
          class="bg-pink-700 h-1.5"
          style={`width: ${progress}%`}
        ></div>
      </div>
      <div class="container mx-auto max-w-screen-lg px-3 py-2 sm:px-6 sm:py-4 flex items-center gap-1">
        <img
          src={imageUrl}
          alt={`${artist} - ${albumName} album cover`}
          aria-hidden="true"
          width="60"
          height="60"
          class="block rounded-md"
        />
        <div class="flex-1 min-w-0">
          <div class="text-xl text-black font-medium overflow-hidden text-ellipsis whitespace-nowrap">
            {title}
          </div>
          <div class="text-xl text-gray-700 overflow-hidden text-ellipsis whitespace-nowrap">
            {artist}
          </div>
        </div>
        <audio class="min-w-96" ref={audioPlayer} controls src={currentTrack.value.track} />
      </div>
    </div>
  )
}
