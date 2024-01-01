import { IActiveTabs, IUserSettings } from "../helpers/interfaces";
import { CHANGE_PAIR, CHANGE_PAIR_FUTURE, FAV_PAIRS, ISLOGGED_IN, ORDER_SIDE, PAIRS, TRADE_HISTORY, USER_DATA, CURRENT_LANGUAGE, CHANGE_PAIR_MARGIN, CURRENCIES, DEPOSITALERT, ISDEPOSITACTIVE, FIATCURRENCIES, DERQUIZALERT, LOGOUT_ACTION, MARGIN_ORDER_SIDE, CHART_HEIGHT } from "./actions/types";
import { store } from "./Store";

export function dispatchLoginState(isLoggedIn: boolean) {
    return store.dispatch({
        type: ISLOGGED_IN,
        payload: isLoggedIn
    });
}

export function dispatchLogoutUser() { // IWalletInfo
    return store.dispatch({
        type: LOGOUT_ACTION
    });
    // export const logout = () => ({
    //     type: LOGOUT,
    //   });
}
export function dispatchUserImage(value: any) { 
    return store.dispatch({
        type: USER_DATA.SET_USER_IMAGE,
        payload: {profile: (value ? value : '')}
    });
}

export function dispatchAccountInfo(value: any) {
    return store.dispatch({
        type: USER_DATA.SET_ACCOUNT_INFO,
        payload: value ?? {}
    });
}