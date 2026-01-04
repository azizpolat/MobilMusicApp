import library from '@/assets/data/library.json'
import { screenPadding } from '@/constants/token'
import { trackTitleFilter } from '@/helpers/filter'
import { useNavigationSearch } from '@/hook/useNavigationSearch'
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

	const filteredTrack = useMemo(() => {
		if (!search) return library

		return library.filter(trackTitleFilter(search))
	}, [search])
	return (
		<View style={defaultStyles.container}>
			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				style={{ paddingHorizontal: screenPadding.horizontal }}
			>
				<TrackList tracks={filteredTrack} scrollEnabled={false} />
			</ScrollView>
		</View>
	)
}

export default SongsScreen
