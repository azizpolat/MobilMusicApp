import { useRef } from 'react'
import { FlatList, FlatListProps, Image, Text, View } from 'react-native'
import TrackPlayer, { Track } from 'react-native-track-player'
import { QueueControls } from './QueueControls'

import { useQueue } from '@/store/queue'
import { utilsStyles } from '@/styles/index'
import { unknownTrackImageUri } from 'constants/images'
import { TracksListItem } from './TracksListItem'

export type TracksListProps = Partial<FlatListProps<Track>> & {
	id: string
	tracks: Track[]
	hideQueueControls?: boolean
}

const ItemDivider = () => (
	<View style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }} />
)

const TrackList = ({
	id,
	tracks,
	hideQueueControls = false,
	...flatlistProps
}: TracksListProps) => {
	const queueOffSet = useRef(0)
	const { activeQueueId, setActiveQueueId } = useQueue()

	const handleTrackSelect = async (selectedTrack: Track) => {
		const trackIndex = tracks.findIndex((track) => track.url === selectedTrack.url)
		if (trackIndex === -1) return

		const isChangingQueue = id !== activeQueueId

		if (isChangingQueue) {
			const beforeTracks = tracks.slice(0, trackIndex)
			const afterTracks = tracks.slice(trackIndex + 1)

			await TrackPlayer.reset()
			await TrackPlayer.add(selectedTrack)
			await TrackPlayer.add(afterTracks)
			await TrackPlayer.add(beforeTracks)
			await TrackPlayer.play()

			queueOffSet.current = trackIndex
			setActiveQueueId(id)
		} else {
			const queue = await TrackPlayer.getQueue()
			const trackIndexInQueue = queue.findIndex((t) => t.url === selectedTrack.url)
			if (trackIndexInQueue !== -1) {
				await TrackPlayer.skip(trackIndexInQueue)
				await TrackPlayer.play()
			}
		}
	}

	return (
		<FlatList
			data={tracks}
			contentContainerStyle={{ paddingTop: 10, paddingBottom: 120 }}
			ListHeaderComponent={
				!hideQueueControls ? (
					<QueueControls tracks={tracks} style={{ paddingBottom: 20 }} />
				) : undefined
			}
			ListEmptyComponent={
				<View>
					<Text style={utilsStyles.emptyContentText}>No songs found</Text>
					<Image source={{ uri: unknownTrackImageUri }} style={utilsStyles.emptyContentImage} />
				</View>
			}
			ItemSeparatorComponent={ItemDivider}
			renderItem={({ item: track }) => (
				<TracksListItem track={track} onTrackSelect={handleTrackSelect} />
			)}
			{...flatlistProps}
		/>
	)
}

export default TrackList
