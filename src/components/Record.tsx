export default function Record({
  id,
  artistName,
  albumName,
  coverUrl,
}: {
  id: string
  artistName: string
  albumName: string
  coverUrl: string
}) {
  const className = 'absolute top-0 opacity-0 vynil-image vynil-animation-in'

  return (
    <div class="relative shadow-xl mr-32 w-72 md:w-auto">
      <img
        src={coverUrl}
        alt={`${artistName} - ${albumName} album cover`}
        aria-hidden="true"
        width="400"
        height="400"
        class="block rounded-md tag-album-cover relative z-10 bg-white"
        transition-name={`record-${id}`}
      />
      <img
        src="/vynil-lp.webp"
        alt=""
        width="400"
        height="400"
        class={className}
        transition-name={`vinyl-${id}`}
        aria-hidden="true"
        id={`record-${id}`}
      />
    </div>
  )
}
