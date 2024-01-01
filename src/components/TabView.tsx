import * as React from 'react';
import { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ViewStyle, Animated, TextStyle, Platform } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { fontsSize, fontSizes, HeightToDp, theme, WidthToDp, StyleSheetManager  } from '../helpers/theme';
import { __ } from '../helpers/common';
import { connect } from 'react-redux';
import { LanguageConsumer } from '../../LanguageContext';


// const initialLayout = { width: Dimensions.get('window').width }
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

class CustomTabView extends Component<Props, State> {
  // private static isTabPressEnabled = false;
  private isTabPressEnabled = true;
  private prevInterval:any
  constructor(props: Props) {
    super(props);
    this.state = {
      index: this.props.tabIndex ?? 0,
      routes: this.props.tabRoutes.filter((item: any) => !item.disabled)
    }
  }
  // componentDidMount() {
  //   this.filterDisable()
  // }

  // filterDisable = () => {
  //   this.props.tabRoutes.filter((item: any) => item.disabled).forEach((ele: any) => this.filterscene(ele.key))
  // }
  // filterscene = (item: any) => {
  //   const tabKeys = Object.keys(this.props.tabRenderScene).filter(
  //     (item: any) => item !== this.state.disabledTab)
  //     .reduce((res, key) => Object.assign(res, { [key]: this.props.tabRenderScene[key] }), {});
  //   this.setState({ renderscenes: tabKeys })
  // }

  onIndexChange = (index: any) => {
    this.props.getTabIndex && this.props.getTabIndex(index);

    if(Platform.OS !== 'ios'){
      this.isTabPressEnabled = false;
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
  // shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<State>, nextContext: any): boolean {
  //   return this.state.index!==nextState.index || this.props.tabIndex!==nextProps.tabIndex   
  // }


  renderTabBar = (props: any) => (
    <>
      {this.props.tabSimple &&
        <LanguageConsumer>
          {(lang) => {
            const isReduce = lang.lang === 'ja' ? true : false;
            return (
              <Animated.View style={[styles.stabBarWrap, this.props.tabBarWrap, this.props.animation && { zIndex: 1, transform: [{ translateY: this.props.animation?.translateY ?? 0 }], marginBottom: -HeightToDp(52) }]}>
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
                      <Text style={[styles.tabTitle, this.props.tabTitleStyle, isReduce && styles.jatabTitle, focused && styles.tabFocused, { color: focused ? theme.colors._text.dark : theme.colors._text.lightest }]}>
                        {__(route.title)} {route.value !== undefined && `(` + route.value + `)`}
                      </Text>
                  )}
                  onTabPress={this.props.onTabPress}
                  indicatorStyle={[styles.sindicator, this.props.indicatorStyle]}
                  tabStyle={[styles.stabStyle, this.props.tabStyle]}
                  style={[styles.stabBar, this.props.tabBarStyle]}
                />
                {this.props.tabBottomLine && <View style={styles.tabBottomLine}></View>}
              </Animated.View>)
          }}
        </LanguageConsumer>
      }

      {!this.props.tabSimple &&
        <LanguageConsumer>
          {(lang) => {
            const isReduce = lang.lang === 'ja' ? true : false;
            return (
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
                      <Text style={[styles.tabTitle, this.props.tabTitleStyle, isReduce && styles.jatabTitle, focused && styles.tabFocused, { color: focused ? theme.colors._neutral.lightest : theme.colors._text.lightest }]}>
                        {__(route.title)} {route.value && `(` + route.value + `)`}
                      </Text>
                  )}
                  onTabPress={this.props.onTabPress}
                  indicatorStyle={[styles.indicator, this.props.indicatorStyle]}
                  tabStyle={[styles.tabStyle, this.props.tabStyle]}
                  style={[styles.tabBar, this.props.tabBarStyle]}
                />
                {this.props.tabBottomLine && <View style={styles.tabBottomLine}></View>}
              </Animated.View>
            )
          }}
        </LanguageConsumer>
      }
    </>
  )
  handleScrollBeginDrag = () => {
    // console.log('start');
    if(this.prevInterval)
    clearInterval(this.prevInterval)
    this.isTabPressEnabled = false;
  };

  handleScrollEndDrag = () => {
    // console.log('end');
    this.prevInterval =setTimeout(() => {
      this.isTabPressEnabled = true;
      // console.log('end true');
    }, 800); // Adjust the timeout duration as needed
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
        // onSwipeStart={this.handleScrollBeginDrag}
        onSwipeEnd={this.handleScrollEndDrag}
      />

    )
  }

}

// const mapStateToProps = (state: any) => {
//   return {
//       currentLang: state.languageReducer.currentLang
//   }
// }

// export default connect(mapStateToProps, null)(CustomTabView)
export default CustomTabView


const styles = StyleSheetManager.Create({
  stabBarWrap: {
    marginVertical: HeightToDp(8),
    marginLeft: WidthToDp(5)
  },
  tabBarWrap: {
    paddingHorizontal: theme.globalvalues.screenHorizontalSpace
  },
  stabBar: {
    backgroundColor: theme.colors.backgroundColor,
    elevation: 0,
    shadowOpacity: 0
  },
  tabBar: {
    backgroundColor: theme.colors.backgroundColor,
  },
  stabStyle: {
    padding: 0,
    elevation: 0,
    flex: 1,
    minHeight: HeightToDp(52),
  },
  tabStyle: {
    padding: 0,
    elevation: 0,
    flex: 1,
    minHeight: HeightToDp(32),

  },
  stabTitle: {
    color: theme.colors.text,
    fontFamily: theme.fonts.sfProTextMedium,
    position: 'relative',
    margin: 0,
    textAlign: 'center',
    fontSize: fontSizes(16),
  },
  tabTitle: {
    color: theme.colors.text,
    fontFamily: theme.fonts.sfProTextMedium,
    fontSize: fontsSize.f14,
    position: 'relative',
    margin: 0,
    textAlign: 'center',
    
  },
  tabTitleSample: {
    color: theme.colors.text,
    fontFamily: theme.fonts.sfProTextMedium,
    fontSize: fontsSize.f14,
    position: 'relative',
    margin: 0,
    textAlign: 'center',
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
    fontFamily: theme.fonts.sfProTextMedium,
  },
  indicator: {
    backgroundColor: theme.colors.primary,
    height: '100%',
    borderRadius: WidthToDp(8),
    color: theme.colors.white,
  },
  sindicator: {
    backgroundColor: theme.colors.primary,
    height: HeightToDp(4),
    bottom: -1,
    borderTopLeftRadius: WidthToDp(8),
    borderTopRightRadius: WidthToDp(8)
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
  },
  jatabTitle: {
    fontSize: fontSizes(11)
  }
});