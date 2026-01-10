import { useEffect, useRef } from 'react'
import TrackPlayer, { RepeatMode } from 'react-native-track-player'

const setUpPlayer = async () => {
	await TrackPlayer.setupPlayer({
		maxCacheSize: 1024 * 10,
	})
	await TrackPlayer.setVolume(0.03)
	await TrackPlayer.setRepeatMode(RepeatMode.Queue)
}

export const useSetUpTrackPlayer = ({ onLoad }: { onLoad?: () => void }) => {
	const isİnitialized = useRef(false)
	useEffect(() => {
		setUpPlayer()
			.then(() => {
				isİnitialized.current = true
				onLoad?.()
			})
			.catch((error) => {
				isİnitialized.current = false
				console.log(error)
			})
	}, [onLoad])
}
