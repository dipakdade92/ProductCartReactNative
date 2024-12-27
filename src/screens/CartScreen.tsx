import React, {useMemo} from 'react';
import {FlatList, View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import ProductCard from '../components/ProductCard';
import {hp, wp} from '../utils/responsive';
import {Assets} from '../utils/assets';
import colors from '../utils/colors';
import constants from '../utils/constants';

const CartScreen = ({route, navigation}: any) => {
  const {cartItems} = route.params;
  const totalPrice = useMemo(() => {
    return cartItems.reduce((sum: number, item: any) => sum + item.price, 0);
  }, [cartItems]);

  const handleNavigationGoBack = () => {
    navigation.goBack();
  };

  const renderItem = ({item}: any) => {
    return <ProductCard product={item} showFooter={false} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.cartWrapper}>
        <TouchableOpacity
          style={styles.backIconWrapper}
          onPress={handleNavigationGoBack}>
          <FastImage
            source={Assets.backArrow}
            style={styles.backIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={styles.headingWrapper}>
          <Text
            style={
              styles.cartHeadingWrapper
            }>{`${constants.PURCHASE_PRODUCT} (${cartItems.length})`}</Text>
        </View>
        <></>
      </View>
      <View style={styles.mainContainer}>
        {cartItems.length != 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            style={styles.flatListMainWrapper}
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item): any => {
              return item.id;
            }}
            initialNumToRender={5}
          />
        ) : (
          <FastImage
            source={Assets.noDataFound}
            style={styles.noDataWrapper}
            resizeMode="contain"
          />
        )}
      </View>
      {cartItems.length != 0 && (
        <View style={styles.footerWrapper}>
          <Text style={styles.totalPriceWrapper}>{constants.TOTAL_SPEND}</Text>
          <Text style={styles.totalPriceWrapper}>${totalPrice}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BackgroundColor,
  },
  cartWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: wp(3),
  },
  backIconWrapper: {
    width: wp(15),
    paddingLeft: wp(4),
  },
  backIcon: {
    width: wp(5),
    height: wp(5),
  },
  headingWrapper: {
    width: wp(70),
  },
  mainContainer: {
    width: wp(100),
    height: hp(85),
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartHeadingWrapper: {
    fontSize: 16,
    color: colors.Black,
    fontWeight: '600',
  },
  flatListMainWrapper: {
    alignSelf: 'center',
    width: wp(90),
    height: hp(75),
  },
  noDataWrapper: {
    width: wp(30),
    height: wp(30),
  },
  footerWrapper: {
    width: wp(90),
    alignSelf: 'center',
    height: wp(13),
    borderRadius: wp(2),
    backgroundColor: colors.SoftBlue,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(5),
    justifyContent: 'space-between',
  },
  totalPriceWrapper: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.White,
  },
});

export default CartScreen;
