import { defaultStyles } from '@/styles'
import { StackScreenWithSearchBar } from 'constants/layout'
import { Stack } from 'expo-router'
import { View } from 'react-native'

const FavoriteScreenLayout = () => {
	return (
		<View style={defaultStyles.container}>
			<Stack>
				<Stack.Screen
					name="index"
					options={{ ...StackScreenWithSearchBar, headerTitle: 'Play List' }}
				/>
			</Stack>
		</View>
	)
}

export default FavoriteScreenLayout
