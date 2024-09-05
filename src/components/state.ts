import { signal } from "@preact/signals";

export type Track = {
  id: string;
  title: string;
  position: string;
  length: string;
  track: string;
}

export type PlayerTrack = CurrentAlbum & {
  albumId: string;
  title: string;
  artist: string;
  imageUrl: string;
}

export type CurrentAlbum = {
  id: string;
  title: string;
  artist_name: string;
  cover_url: string;
  track: string;
  year_released: string;
}

export const isPlaying = signal(false);
export const currentTrack = signal<PlayerTrack | null>(null);

export const currentAlbum = signal<CurrentAlbum | null>(null);
