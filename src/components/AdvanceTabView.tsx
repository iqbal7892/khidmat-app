import * as React from 'react';
import { Component } from 'react';
import { View, Text, ViewStyle, Animated, TextStyle } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { fontsSize, fontSizes, HeightToDp, theme, WidthToDp, StyleSheetManager  } from '../helpers/theme';
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
}

interface State {
  index: number,
  routes: any
}

class AdvanceTabView extends Component<Props, State> {
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
    this.isTabPressEnabled=false

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
              renderLabel={({ route, focused }: any) => (
              route.disabled ?
                  <Text style={[styles.disabledTab]}>
                  {__(route.title)} {route.value && `(` + route.value + `)`}
                  </Text>
                  :
                  <Text style={[styles.tabTitle, this.props.tabTitleStyle, focused && styles.tabFocused]}>
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

export default AdvanceTabView


const styles = StyleSheetManager.Create({
  tabBarWrap: {
    marginTop: HeightToDp(16),
    marginHorizontal: WidthToDp(48),
    backgroundColor: theme.colors._bg.default,
    borderRadius: 4,
    padding: WidthToDp(4)
  },
  tabBar: {
    backgroundColor: 'tranparent',
    elevation: 0,
    shadowOpacity: 0
  },
  tabStyle: {
    padding: 0,
    elevation: 0,
    flex: 1,
    minHeight: HeightToDp(36),
    height: HeightToDp(36),
  },
  tabTitle: {
    color: theme.colors._text.default,
    fontFamily: theme.fonts.geomanistRegular,
    fontSize: fontSizes(14),
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
    fontFamily: theme.fonts.geomanistMedium,
    color: theme.colors._neutral.lightest,
  },
  indicator: {
    backgroundColor: theme.colors._primary.darkest,
    height: '100%',
    borderRadius: 4
  }
});