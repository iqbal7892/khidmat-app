import React, { Ref, forwardRef, useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import {
    BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,

} from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { theme } from '../../helpers/theme';
import { BackdropPressBehavior } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { Portal } from '@gorhom/portal';

type Props = {
    handleOnDismiss?: () => void;
    snapPoints?: (string | number)[];
    enableDynamicSizing?: boolean;
    enablePanDownToClose?: boolean;
    pressBehavior?: BackdropPressBehavior;
    portal?: boolean;
    children: React.ReactNode
}

const CustomBottomSheet = forwardRef(({handleOnDismiss,snapPoints, enablePanDownToClose, pressBehavior, enableDynamicSizing, portal, children}:Props, ref: Ref<BottomSheetModalMethods>) => {
    const snapPointsLocal = useMemo(() => snapPoints ?? [], [snapPoints]);

    const renderBackdrop = useCallback(
        props => (
          <BottomSheetBackdrop
            {...props}
            pressBehavior={pressBehavior ?? 'close'}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
          />
        ),
        []
      );

    return (
      <React.Fragment>
        {portal && <Portal>
          <BottomSheetModalProvider>
                <BottomSheetModal
                    ref={ref}
                    snapPoints={snapPointsLocal}
                    onDismiss={handleOnDismiss}
                    backdropComponent={renderBackdrop}
                    enableDynamicSizing={enableDynamicSizing ?? false}
                    backgroundStyle={styles.bgStyle}
                    enablePanDownToClose={enablePanDownToClose ?? true}
                    handleIndicatorStyle={styles.handleIndicator}
                >
                    <BottomSheetScrollView showsVerticalScrollIndicator={false} style={styles.contentContainer}>
                        {children}
                    </BottomSheetScrollView>
                </BottomSheetModal>
          </BottomSheetModalProvider>
        </Portal>}
        
        {!portal && <BottomSheetModalProvider>
                <BottomSheetModal
                    ref={ref}
                    snapPoints={snapPointsLocal}
                    onDismiss={handleOnDismiss}
                    backdropComponent={renderBackdrop}
                    enableDynamicSizing={enableDynamicSizing ?? false}
                    backgroundStyle={styles.bgStyle}
                    enablePanDownToClose={enablePanDownToClose ?? true}
                    handleIndicatorStyle={styles.handleIndicator}
                    style={{zIndex: 9999}}
                    containerStyle={{zIndex: 99999}}
                >
                    <BottomSheetScrollView showsVerticalScrollIndicator={false} style={styles.contentContainer}>
                        {children}
                    </BottomSheetScrollView>
                </BottomSheetModal>
          </BottomSheetModalProvider>
        }
    </React.Fragment>
    );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1
  },
  bgStyle: {
    borderTopLeftRadius: 24, 
    borderTopRightRadius: 24
  },
  handleIndicator: {
    backgroundColor: theme.colors._border.light
  }
});

export default CustomBottomSheet;