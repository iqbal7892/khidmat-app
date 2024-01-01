import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { __ } from '../../helpers/common';

// import { LinearGradient } from 'react-native-svg';

const GradientText = (props:any) => {
    const { text } = props;
    return (
        <MaskedView maskElement={<Text {...props} />}> 
        <LinearGradient
          colors={["#00CFB4", "#0047BB"]}
          start={{ x: 0, y: 0.53 }}
          end={{ x: 1, y: 0.53 }}
        >
          <Text {...props} style={[props.style, { opacity: 0 }]} />
        </LinearGradient>
      </MaskedView>
      
    );
};

const styles = StyleSheet.create({

});

export default GradientText;