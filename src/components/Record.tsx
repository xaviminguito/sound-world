export default function Record({
  id,
  user_id,
  artistName,
  albumName,
  coverUrl,
}: {
  id: string
  user_id: string
  artistName: string
  albumName: string
  coverUrl: string
}) {
  const className = 'absolute top-0 opacity-0 vynil-image vynil-animation-in'

  return (
    <div class="relative w-48">
      <img
        src={coverUrl}
        alt={`${artistName} - ${albumName} album cover`}
        aria-hidden="true"
        width="400"
        height="400"
        class="block rounded-md tag-album-cover relative z-10 bg-white"
        transition-name={`img-${id}`}
      />
      <img
        src="/vynil-lp.webp"
        alt="Vinyl record"
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
