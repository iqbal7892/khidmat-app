import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';

export default async function useCachedResources() {
  return await Font.loadAsync({
    ...FontAwesome.font,
    'EuclidCircularA-Regular': require('../assets/fonts/EuclidCircularA-Regular.ttf'),
    'EuclidCircularA-Light': require('../assets/fonts/EuclidCircularA-Light.ttf'),
    'EuclidCircularA-Medium': require('../assets/fonts/EuclidCircularA-Medium.ttf'),
    'EuclidCircularA-Bold': require('../assets/fonts/EuclidCircularA-Bold.ttf'),
    'EuclidCircularA-SemiBold': require('../assets/fonts/EuclidCircularA-SemiBold.ttf'),
    'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
    'Inter-Light': require('../assets/fonts/Inter-Light.ttf'),
    'Inter-Medium': require('../assets/fonts/Inter-Medium.ttf'),
    'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
    'Inter-SemiBold': require('../assets/fonts/Inter-SemiBold.ttf'),
    'SF-Pro-Text-Bold': require('../assets/fonts/SF-Pro-Text-Bold.otf'),
    'SF-Pro-Text-Heavy': require('../assets/fonts/SF-Pro-Text-Heavy.otf'),
    'SF-Pro-Text-Medium': require('../assets/fonts/SF-Pro-Text-Medium.otf'),
    'SF-Pro-Text-Regular': require('../assets/fonts/SF-Pro-Text-Regular.otf'),
    'SF-Pro-Text-Semibold': require('../assets/fonts/SF-Pro-Text-Semibold.otf'),
    'Geomanist-Regular': require('../assets/fonts/Geomanist-Regular.otf'),
    'Geomanist-Light': require('../assets/fonts/Geomanist-Light.otf'),
    'Geomanist-Medium': require('../assets/fonts/Geomanist-Medium.otf'),
    'Geomanist-Bold': require('../assets/fonts/Geomanist-Bold.otf'),
    'Geomanist-Ultra': require('../assets/fonts/Geomanist-Ultra.otf')
  });
}

