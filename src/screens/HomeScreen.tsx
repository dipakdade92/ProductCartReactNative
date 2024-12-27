import React, {useEffect, useRef, useState} from 'react';
import {Animated, View, StyleSheet, Alert} from 'react-native';
import FastImage from 'react-native-fast-image';
import ProductHeader from '../components/ProductHeader';
import ProductCard from '../components/ProductCard';
import PurchaseModal from '../components/PurchaseModal';
import LoadingIndicator from '../components/LoadingIndicator';
import CardAnimation from '../components/CardAnimation';
import {Product} from '../types/Product';
import {fetchProducts} from '../api/productApi';
import {hp, wp} from '../utils/responsive';
import {Assets} from '../utils/assets';
import colors from '../utils/colors';
import constants, {TOTAL_CARD_HEIGHT, CARD_MARGIN} from '../utils/constants';

const HomeScreen = ({navigation}: any) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [visible, setVisible] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product>();
  const [cartProduct, setCartProduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
      setLoading(false);
    };

    loadProducts().catch(() => {
      setLoading(false);
      Alert.alert('Error', 'Failed to load products.');
    });
  }, []);

  const handleCartNavigation = () => {
    navigation.navigate(constants.CART, {cartItems: cartProduct});
  };

  const renderItem = ({item, index}: any) => {
    const inputRange = [
      -1,
      index * TOTAL_CARD_HEIGHT,
      (index + 1) * TOTAL_CARD_HEIGHT,
    ];

    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
      extrapolate: 'clamp',
    });

    const opacity = scrollY.interpolate({
      inputRange,
      outputRange: [0.5, 1, 0.5],
      extrapolate: 'clamp',
    });

    return (
      <CardAnimation opacity={opacity} scale={scale}>
        <ProductCard
          product={item}
          handlePurchase={() => {
            handlePurchaseVisible(item);
          }}
        />
      </CardAnimation>
    );
  };

  const handlePurchaseVisible = (productDetails: Product) => {
    setVisible(true);
    setProduct(productDetails);
  };

  const handlePurchase = () => {
    if (product) {
      setCartProduct(prevProduct => [...prevProduct, product]);
      setProducts(prevProduct =>
        prevProduct.filter((object: Product) => {
          return object.id != product.id;
        }),
      );
      setVisible(false);
    }
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <ProductHeader
        title={constants.PRODUCT_LIST}
        onPress={handleCartNavigation}
      />
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          <View style={styles.flatListMainWrapper}>
            {products.length != 0 ? (
              <Animated.FlatList
                showsVerticalScrollIndicator={false}
                data={products}
                renderItem={renderItem}
                keyExtractor={(item): any => {
                  return item.id;
                }}
                contentContainerStyle={{paddingVertical: CARD_MARGIN / 2}}
                initialNumToRender={7}
                onScroll={Animated.event(
                  [{nativeEvent: {contentOffset: {y: scrollY}}}],
                  {useNativeDriver: true},
                )}
                getItemLayout={(data, index) => ({
                  length: 50,
                  offset: 50 * index,
                  index,
                })}
              />
            ) : (
              <FastImage
                source={Assets.noDataFound}
                style={styles.noDataWrapper}
                resizeMode="contain"
              />
            )}
          </View>
        </>
      )}
      <PurchaseModal
        visible={visible}
        productDetail={product}
        handlePurchase={handlePurchase}
        handleClose={handleCloseModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BackgroundColor,
  },
  flatListMainWrapper: {
    width: wp(100),
    height: hp(90),
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataWrapper: {width: wp(30), height: wp(30)},
  card: {
    width: wp(90),
    height: 165,
    marginVertical: 8,
    alignSelf: 'center',
    backgroundColor: colors.White,
    borderRadius: wp(5),
  },
});

export default HomeScreen;
