import { colors } from '@/constants/token'
import { defaultStyles } from '@/styles/index'
import { StackScreenWithSearchBar } from 'constants/layout'
import { Stack } from 'expo-router'
import { View } from 'react-native'

const ArtistsScreenLayout = () => {
	return (
		<View style={defaultStyles.container}>
			<Stack>
				<Stack.Screen
					name="index"
					options={{
						...StackScreenWithSearchBar,
						headerTitle: 'Artists',
					}}
				/>

				<Stack.Screen
					name="[name]"
					options={{
						headerTitle: '',
						headerBackVisible: true,
						headerStyle: {
							backgroundColor: colors.background,
						},
						headerTintColor: '#fff',
					}}
				/>
			</Stack>
		</View>
	)
}

export default ArtistsScreenLayout
