import { connect } from "react-redux";
import { View } from 'react-native';
import DrawerGuestMenu from "./guest";
import DrawerAuthMenus from "./auth";
import React from "react";

const DrawerMenu = (props: any) => {
  return (
    <React.Fragment>
      {!props.isLoggedIn && <DrawerGuestMenu props={props} key={props.currentLang}/>}
      {props.isLoggedIn &&  <DrawerAuthMenus props={props} key={props.currentLang}/>}   
    </React.Fragment>
  );
};


const mapStateToProps = (state:any) => {
  return {
    isLoggedIn: state.authReducer.isLoggedIn,
    currentLang: state.languageReducer.currentLang
  }
}
const mapDispatchToProps = (dispatch:any) => {
  return {}
}


export default connect(mapStateToProps, mapDispatchToProps)(DrawerMenu);