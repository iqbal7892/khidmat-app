import * as React from 'react';
import { Component } from 'react';
import { Image, Text, ViewStyle, Animated, TextStyle, Platform } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { fontsSize, fontSizes, HeightToDp, theme, WidthToDp, StyleSheetManager } from '../helpers/theme';
import { __ } from '../helpers/common';

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
  tabFocusedStyle?: TextStyle | TextStyle[]
}

interface State {
  index: number,
  routes: any
}

class DefaultTabView extends Component<Props, State> {
  private isTabPressEnabled = true;
  private prevInterval: any
  constructor(props: Props) {
    super(props);
    this.state = {
      index: this.props.tabIndex ?? 0,
      routes: this.props.tabRoutes.filter((item: any) => !item.disabled)
    }
  }

  onIndexChange = (index: any) => {
    this.props.getTabIndex && this.props.getTabIndex(index)

    if (Platform.OS !== 'ios') {
      this.isTabPressEnabled = false
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
        renderIcon={({ route, focused, props }: any) => (
          <>
            {route.icon && <Image style={[styles.tabIcon, props?.tabIcon]} source={focused ? route.icon.active : route.icon.inactive} />}
          </>
        )}
        renderLabel={({ route, focused }: any) => (
          route.disabled ?
            <Text style={[styles.disabledTab]}>
              {__(route.title)} {route.value && `(` + route.value + `)`}
            </Text>
            :
            <Text style={[styles.tabTitle, this.props.tabTitleStyle, focused && styles.tabFocused, (focused && this.props.tabFocusedStyle) && this.props.tabFocusedStyle]}>
              {__(route.title)} {route.value && `(` + route.value + `)`}
            </Text>
        )}
        onTabPress={this.props.onTabPress}
        indicatorStyle={[styles.indicator, this.props.indicatorStyle]}
        tabStyle={[styles.tabStyle, this.props.tabStyle]}
        style={[styles.tabBar, this.props.tabBarStyle]}
      />
    </Animated.View>
  )
  handleScrollBeginDrag = () => {
    if (this.prevInterval)
      clearInterval(this.prevInterval)
    this.isTabPressEnabled = false;
  };

  handleScrollEndDrag = () => {
    this.prevInterval = setTimeout(() => {
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

export default DefaultTabView


const styles = StyleSheetManager.Create({
  tabBarWrap: {
    paddingHorizontal: theme.globalvalues.screenHorizontalSpace
  },
  tabBar: {
    backgroundColor: 'transparent',
    elevation: 0,
    shadowOpacity: 0
  },
  tabStyle: {
    padding: 0,
    elevation: 0,
    flex: 1,
    minHeight: HeightToDp(36),
    height: HeightToDp(36),
    alignItems: 'center',
    flexDirection: 'row'
  },
  tabIcon: {
    width: WidthToDp(20),
    height: WidthToDp(20),
    resizeMode: 'contain',
  },
  tabTitle: {
    color: theme.colors._text.default,
    fontFamily: theme.fonts.geomanistRegular,
    fontSize: fontSizes(14),
    position: 'relative',
    margin: 0
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
  },
  indicator: {
    backgroundColor: theme.colors._bg.default,
    height: '100%',
    borderRadius: 50,
    color: theme.colors._primary.darkest,
  },
  loader: {
    flex: 1,
    justifyContent: 'center'
  },
  tabBottomLine: {
    width: WidthToDp(100, true),
    backgroundColor: theme.colors.hEEEEF2,
    height: 1,
    position: 'relative',
    zIndex: 0,
    bottom: 1,
    marginHorizontal: -20
  }
});