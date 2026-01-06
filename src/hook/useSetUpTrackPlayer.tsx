import { useEffect } from 'react'
import TrackPlayer, { RepeatMode } from 'react-native-track-player'

let isPlayerInitialized = false // 🔴 GLOBAL FLAG

export const useSetUpTrackPlayer = ({ onLoad }: { onLoad?: () => void }) => {
	useEffect(() => {
		if (isPlayerInitialized) return

		const setup = async () => {
			await TrackPlayer.setupPlayer({
				maxCacheSize: 1024 * 10,
			})
			await TrackPlayer.setVolume(0.03)
			await TrackPlayer.setRepeatMode(RepeatMode.Queue)

			isPlayerInitialized = true
			onLoad?.()
		}

		setup().catch(console.error)
	}, [onLoad])
}
