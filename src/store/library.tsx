import { Artist, Playlist, TrackWithPlaylist } from '@/helpers/types'
import { Track } from 'react-native-track-player'
import { create } from 'zustand'

import library from '@/assets/data/library.json'

import { unknownTrackImageUri } from 'constants/images'
import { useMemo } from 'react'

interface LibraryState {
	tracks: TrackWithPlaylist[]
	toggleTrackFavorite: (track: Track) => void
	addToPlaylist: (track: Track, playlistName: string) => void
}

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

export const useArtists = () => {
	const tracks = useLibraryStore((state) => state.tracks)

	return useMemo(() => {
		return tracks.reduce((acc, track) => {
			const artistName = track.artist ?? 'Unknown'
			const existingArtist = acc.find((artist) => artist.name === artistName)

			if (existingArtist) {
				existingArtist.tracks.push(track)
			} else {
				acc.push({
					name: artistName,
					tracks: [track],
				})
			}
			return acc
		}, [] as Artist[])
	}, [tracks])
}

export const usePlaylists = () => {
	const tracks = useLibraryStore((state) => state.tracks)
	const addToPlaylist = useLibraryStore((state) => state.addToPlaylist)

	const playlists = useMemo(() => {
		return tracks.reduce((acc, track) => {
			track.playlist?.forEach((playlistName) => {
				const existingPlaylist = acc.find((playlist) => playlist.name === playlistName)

				if (existingPlaylist) {
					existingPlaylist.tracks.push(track)
				} else {
					acc.push({
						name: playlistName,
						tracks: [track],
						artworkPreview: track.artwork ?? unknownTrackImageUri,
					})
				}
			})

			return acc
		}, [] as Playlist[])
	}, [tracks])

	return { playlists, addToPlaylist }
}
