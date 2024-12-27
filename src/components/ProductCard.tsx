import React, {useMemo} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import ProductRate from './ProductRate';
import colors from '../utils/colors';
import constants from '../utils/constants';
import {wp} from '../utils/responsive';
import {capitalizeWords} from '../utils/utilites';

interface ProductProps {
  product: any;
  showFooter?: boolean;
  handlePurchase?: (event: GestureResponderEvent) => void;
}

const ProductCard = (props: ProductProps) => {
  const {product, handlePurchase, showFooter = true} = props;

  return (
    <View style={[styles.card, {height: showFooter ? 165 : 122}]}>
      <View style={styles.mainCardWrapper}>
        <View style={styles.productImageWrapper}>
          <FastImage
            source={{uri: product.image}}
            style={styles.productImageSize}
            resizeMode="contain"
          />
        </View>
        <View style={styles.cardBodyWapper}>
          <Text numberOfLines={1} style={styles.productNameTextWrapper}>
            {capitalizeWords(product.category)}
          </Text>
          {!showFooter && (
            <Text numberOfLines={1} style={styles.priceWrapper}>
              {`$${product.price}`}
            </Text>
          )}
          <Text numberOfLines={3} style={styles.productDescriptionTextWrapper}>
            {product.description}
          </Text>
          <View style={styles.productRatingWrapper}>
            <Text numberOfLines={1} style={styles.productRatingTextWrapper}>
              {product.rating.rate}
            </Text>
            <ProductRate rate={Math.floor(product.rating.rate)} />
          </View>
        </View>
      </View>
      {showFooter && (
        <>
          <View style={styles.horizontalBarWrapper} />
          <View style={styles.footerWrapper}>
            <Text numberOfLines={1} style={styles.priceWrapper}>
              {`$${product.price}`}
            </Text>
            <TouchableOpacity
              onPress={handlePurchase}
              activeOpacity={0.7}
              style={styles.buyButtonWrapper}>
              <Text style={styles.buyButtonTextWrapper}>{constants.BUY}</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    width: wp(90),
    height: 165,
    marginVertical: 8,
    alignSelf: 'center',
    backgroundColor: colors.White,
    borderRadius: wp(5),
  },
  mainCardWrapper: {
    width: wp(90),
    height: 115,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  productImageWrapper: {
    width: wp(20),
    marginTop: wp(2.5),
  },
  productImageSize: {
    width: wp(18),
    height: wp(18),
    borderRadius: wp(2),
    alignSelf: 'center',
  },
  cardBodyWapper: {
    width: wp(65),
    height: 115,
    justifyContent: 'space-evenly',
  },
  productNameTextWrapper: {
    paddingTop: 5,
    fontSize: 17,
    color: colors.Black,
    fontWeight: '500',
  },
  productDescriptionTextWrapper: {
    fontSize: 14,
    color: 'grey',
    fontWeight: '300',
  },
  productRatingWrapper: {flexDirection: 'row'},
  horizontalBarWrapper: {
    width: wp(90),
    backgroundColor: colors.Grey,
    height: 1,
  },
  productRatingTextWrapper: {
    fontSize: 16,
    color: colors.Black,
    fontWeight: '500',
  },
  footerWrapper: {
    width: wp(80),
    alignSelf: 'center',
    height: 47,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceWrapper: {
    fontSize: 16,
    color: colors.Black,
    fontWeight: '800',
  },
  buyButtonWrapper: {
    width: wp(20),
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.Black,
    borderRadius: wp(25),
  },
  buyButtonTextWrapper: {
    fontSize: 15,
    color: colors.White,
    fontWeight: '300',
  },
});
