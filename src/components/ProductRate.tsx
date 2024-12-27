import React from 'react';
import {View, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Assets} from '../utils/assets';
import {wp} from '../utils/responsive';

interface ProductRateProps {
  rate: number;
}

const ProductRate = (props: ProductRateProps) => {
  const {rate} = props;

  return (
    <View style={styles.container}>
      {Array.from({length: 5}).map((_, index) => (
        <FastImage
          key={index}
          source={index < rate ? Assets.star : Assets.starUnfill}
          style={styles.imageWrapper}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginLeft: 5,
    alignSelf: 'center',
  },
  imageWrapper: {
    width: wp(3.5),
    height: wp(3.5),
    marginHorizontal: 3,
  },
});

export default ProductRate;
