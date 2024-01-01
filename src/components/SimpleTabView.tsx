import * as React from 'react';
import { Component } from 'react';
import { Image, Text, ViewStyle, Animated, TextStyle, Platform, TouchableOpacity, View, Pressable } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { fontsSize, fontSizes, HeightToDp, theme, WidthToDp, StyleSheetManager  } from '../helpers/theme';
import { __ } from '../helpers/common';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const initialLayout = { width: 0 }

interface IAnimation {
  translateY: any
}

interface Props {
  tabRoutes: any,
  tabRenderScene: any,
  indicatorStyle?: any,
  tabStyle?: ViewStyle | ViewStyle[],
  tabTitleStyle?: TextStyle | TextStyle[],
  tabBarWrap?: ViewStyle | ViewStyle[],
  scrollEnabled?: any,
  containerStyle?: ViewStyle | ViewStyle[],
  swipeEnabled?: any,
  tabBarStyle?: ViewStyle | ViewStyle[],
  onTabPress?: any,
  getTabIndex?: any,
  tabIndex?: any,
  stickHeader?: boolean,
  animation?: IAnimation,
  tabTitleFocusedStyle?: ViewStyle | ViewStyle[],
  activeTextColor?: TextStyle | TextStyle[],
  tabBottomLine?: any,
  tabSimple?: boolean,
  initialLayout?: any
  inActiveTextColor?: any
  currentLang?: string,
  tabIcon?: ViewStyle | ViewStyle[],
  tabFocusedStyle?: TextStyle | TextStyle[],
  isIndicator?: boolean
}

interface State {
  index: number,
  routes: any
}

class SimpleTabView extends Component<Props, State> {
  private isTabPressEnabled = true;
  private prevInterval:any
  constructor(props: Props) {
    super(props);
    this.state = {
      index: this.props.tabIndex ?? 0,
      routes: this.props.tabRoutes.filter((item: any) => !item.disabled)
    }
  }

  onIndexChange = (index: any) => {
    this.props.getTabIndex && this.props.getTabIndex(index)
    
    if(Platform.OS !== 'ios'){
      this.isTabPressEnabled=false
    }
    

    this.setState({
      index: index
    })
  }

  changeTabIndex = (index: number) => {
    this.setState({
      index: index
    })
  }

  renderTabBar = (props: any) => (
        <Animated.View style={[styles.tabBarWrap, this.props.tabBarWrap, this.props.animation && { zIndex: 1, transform: [{ translateY: this.props.animation?.translateY ?? 0 }], marginBottom: -HeightToDp(52) }]}>
          <TabBar
              position={props.position}
              jumpTo={props.jumpTo}
              layout={props.layout}
              navigationState={{ index: this.state.index, routes: this.props.tabRoutes.sort((a: any, b: any) => b.disabled === undefined || false) }}
              scrollEnabled={this.props.scrollEnabled}
              renderTabBarItem={({ route, onPress, navigationState }: any) => {
                const activeRoute = navigationState.routes[navigationState.index];
                const label = route.title || route.key;
              return  <TouchableWithoutFeedback onPress={onPress} style={[styles.tabItem]}>
                {this.props.isIndicator && (activeRoute['key'] === route.key) && <View style={styles.indicator}></View>}
                <Text style={[styles.tabTitle, (activeRoute['key'] === route.key) && styles.tabFocusedTitle]}>{__(label)}</Text>
              </TouchableWithoutFeedback>
              }}
              onTabPress={this.props.onTabPress}
              indicatorStyle={{display: 'none'}}
              tabStyle={[styles.tabStyle, this.props.tabStyle]}
              style={[styles.tabBar, this.props.tabBarStyle]}
          />
      </Animated.View> 
  )
  handleScrollBeginDrag = () => {
    if(this.prevInterval)
    clearInterval(this.prevInterval)
    this.isTabPressEnabled = false;
  };

  handleScrollEndDrag = () => {
    this.prevInterval =setTimeout(() => {
      this.isTabPressEnabled = true;
    }, 800);
  };

  isClickActive = () => {
    return this.isTabPressEnabled
  }

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={this.props.tabRenderScene}
        onIndexChange={this.onIndexChange}
        swipeEnabled={this.props.swipeEnabled}
        initialLayout={this.props.initialLayout ?? initialLayout}
        renderTabBar={this.renderTabBar}
        style={[this.props.containerStyle]}
        onSwipeEnd={this.handleScrollEndDrag}
      />
    )
  }

}

export default SimpleTabView


const styles = StyleSheetManager.Create({
  tabBarWrap: {
    paddingHorizontal: theme.globalvalues.screenHorizontalSpace,
  },
  tabBar: {
    backgroundColor: 'transparent',
    elevation: 0,
    shadowOpacity: 0,
    width:"90%",
  },
  tabStyle: {
    padding: 0,
    elevation: 0,
    // flex: 1,                     
    minHeight: HeightToDp(36),
    height: HeightToDp(36),
    alignItems:'center',
    flexDirection: 'row',
    // backgroundColor:'red',
    justifyContent:'flex-start',

  },
  tabIcon: {
    width: WidthToDp(20),
    height: WidthToDp(20),
    resizeMode: 'contain',
  },
  tabItem: {
    position: 'relative',
    minHeight: HeightToDp(40),
    height: HeightToDp(40),
    paddingRight: WidthToDp(24),
    justifyContent: 'center'
  },
  tabTitle: {
    color: theme.colors._text.default,
    fontFamily: theme.fonts.geomanistRegular,
    fontSize: fontSizes(16),
    position: 'relative',
    margin: 0
  },
  tabFocusedTitle: {
    color: theme.colors._primary.darkest,
    fontFamily: theme.fonts.geomanistMedium
  },
  disabledTab: {
    color: theme.colors.textmutedDark,
    fontFamily: theme.fonts.sfProTextRegular,
    fontSize: fontSizes(12),
    position: 'relative',
    margin: 0,
    lineHeight: 20,
    textAlign: 'center',
  },
  tabFocused: {
    color: theme.colors._primary.darkest,
    fontFamily: theme.fonts.geomanistMedium,
  },
  indicator: {
    width: WidthToDp(16), 
    height: HeightToDp(2), 
    position: 'absolute', 
    left: 0, 
    bottom: 0, 
    backgroundColor: theme.colors._primary.darkest
  }
});