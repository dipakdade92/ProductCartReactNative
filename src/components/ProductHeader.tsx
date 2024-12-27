import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
  StyleSheet,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {wp} from '../utils/responsive';
import {Assets} from '../utils/assets';
import colors from '../utils/colors';

interface ProductHeaderProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
}

const ProductHeader = (props: ProductHeaderProps) => {
  const {title, onPress} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.titleWrapper}>{title}</Text>
      <TouchableOpacity onPress={onPress}>
        <FastImage
          source={Assets.shoppingCart}
          style={styles.cartImageWrapper}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ProductHeader;

const styles = StyleSheet.create({
  container: {
    width: wp(90),
    alignSelf: 'center',
    height: wp(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleWrapper: {
    fontSize: 18,
    color: colors.Black,
    fontWeight: '600',
  },
  cartImageWrapper: {
    width: wp(10),
    height: wp(10),
    resizeMode: 'contain',
  },
});
