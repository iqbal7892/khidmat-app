import { Image, Pressable } from 'react-native'
import { HeightToDp, WidthToDp, StyleSheetManager  } from '../helpers/theme'

const Logo = () => {
  return <Pressable>
          <Image style={{ width: WidthToDp(137), height: HeightToDp(36), resizeMode: 'contain' }} source={require("../assets/images/logo.png")} />
        </Pressable>
}

export default Logo



