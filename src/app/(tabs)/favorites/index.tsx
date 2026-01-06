import { defaultStyles } from '@/styles'
import { ScrollView, View } from 'react-native'

import { screenPadding } from '@/constants/token'
import { useNavigationSearch } from '@/hook/useNavigationSearch'
import { useFavorites } from '@/store/library'
import TrackList from 'components/TrackList'
import { useMemo } from 'react'

const FavoritesScreen = () => {
	const search = useNavigationSearch({
		searchBarOptions: {
			placeholder: 'Find in songs',
		},
	})

	const { favorites: favoritesTracks } = useFavorites()

	const filteredFavoritesTracks = useMemo(() => {
		if (!search) return favoritesTracks

		return favoritesTracks.filter(trackTitleFilter(search))
	}, [search, favoritesTracks])

	return (
		<View style={defaultStyles.container}>
			<ScrollView
				style={{ paddingHorizontal: screenPadding.horizontal }}
				contentInsetAdjustmentBehavior="automatic"
			>
				<TrackList tracks={filteredFavoritesTracks} scrollEnabled={false} />
			</ScrollView>
		</View>
	)
}

export default FavoritesScreen
