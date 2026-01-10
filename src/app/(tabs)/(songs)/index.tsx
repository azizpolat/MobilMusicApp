import library from '@/assets/data/library.json'
import { screenPadding } from '@/constants/token'
import { trackTitleFilter } from '@/helpers/filter'
import { generateTracksListId } from '@/helpers/miscellaneous'
import { useNavigationSearch } from '@/hook/useNavigationSearch'
import { useTracks } from '@/store/library'
import { defaultStyles } from '@/styles'
import TrackList from 'components/TrackList'
import { useMemo } from 'react'
import { ScrollView, View } from 'react-native'

const SongsScreen = () => {
	const search = useNavigationSearch({
		searchBarOptions: {
			placeholder: 'Find in songs',
		},
	})

	const tracks = useTracks()

	const filteredTrack = useMemo(() => {
		if (!search) return library

		return library.filter(trackTitleFilter(search))
	}, [search, tracks])
	return (
		<View style={defaultStyles.container}>
			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				style={{ paddingHorizontal: screenPadding.horizontal }}
			>
				<TrackList
					id={generateTracksListId('songs', search)}
					tracks={filteredTrack}
					scrollEnabled={false}
				/>
			</ScrollView>
		</View>
	)
}

export default SongsScreen
