import { defaultStyles } from '@/styles'
import { StackScreenWithSearchBar } from 'constants/layout'
import { Stack } from 'expo-router'
import { View } from 'react-native'

const PlayListScreenLayout = () => {
	return (
		<View style={defaultStyles.container}>
			<Stack>
				<Stack.Screen
					name="index"
					options={{ ...StackScreenWithSearchBar, headerTitle: 'Songs' }}
				/>
			</Stack>
		</View>
	)
}

export default PlayListScreenLayout
