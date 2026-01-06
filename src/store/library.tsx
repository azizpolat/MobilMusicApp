import { TrackWithPlaylist } from '@/helpers/types'
import { Track } from 'react-native-track-player'
import { create } from 'zustand'

import library from '@/assets/data/library.json'

interface LibraryState {
	tracks: TrackWithPlaylist[]
	toggleTrackFavorite: (track: Track) => void
	addToPlaylist: (track: Track, playlistName: string) => void
}
console.log(library)

export const useLibraryStore = create<LibraryState>((set) => ({
	tracks: library,
	toggleTrackFavorite: (track: Track) =>
		set((state) => ({
			tracks: state.tracks.map((t) =>
				t.rings === track.rings ? { ...t, rating: t.rating === 1 ? 0 : 1 } : t,
			),
		})),
	addToPlaylist: (track: Track, playlistName: string) => {},
}))

export const useTracks = () => useLibraryStore((state) => state.tracks)

export const useFavorites = () => {
	const tracks = useLibraryStore((state) => state.tracks)
	const toggleFavorites = useLibraryStore((state) => state.toggleTrackFavorite)

	const favorites = tracks.filter((track) => track.rating === 1)

	return {
		favorites,
		toggleFavorites,
	}
}
