import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Image} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {wp} from '../utils/responsive';
import {Assets} from '../utils/assets';
import constants from '../utils/constants';

const SplashScreen = ({navigation}: any) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace(constants.HOME);
    }, 3000);
  });

  return (
    <SafeAreaView style={styles.container}>
      <Image source={Assets.logo} style={styles.logoWraaper} />
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoWraaper: {
    width: wp(40),
    height: wp(40),
  },
  logoWrapper: {
    width: wp(20),
    height: wp(20),
    resizeMode: 'center',
  },
});
