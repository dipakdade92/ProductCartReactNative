import React, {useMemo} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import Colors from '../utils/colors';
import FastImage from 'react-native-fast-image';
import {Product} from '../types/Product';
import {Assets} from '../utils/assets';
import {wp} from '../utils/responsive';
import {capitalizeWords} from '../utils/utilites';
import colors from '../utils/colors';
import constants from '../utils/constants';

interface PurchaseModalProps {
  visible: boolean;
  productDetail: Product | undefined;
  handlePurchase: (event: GestureResponderEvent) => void;
  handleClose: (event: GestureResponderEvent) => void;
}

const PurchaseModal = (props: PurchaseModalProps) => {
  const {visible, productDetail, handlePurchase, handleClose} = props;

  const title = useMemo(() => {
    return `${capitalizeWords(productDetail?.category)} - $${
      productDetail?.price
    }`;
  }, [productDetail?.category, productDetail?.price]);

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.purchaseHeading}>
            <View style={styles.purchaseText}>
              <Text style={styles.modalTitle}>{constants.PURCHASE}</Text>
            </View>
            <View style={styles.crossIconWrapper}>
              <TouchableOpacity onPress={handleClose}>
                <FastImage
                  source={Assets.cancel}
                  style={styles.productImageSize}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Text numberOfLines={1} style={styles.categoryWrapper}>
            {title}
          </Text>
          <Text numberOfLines={2} style={styles.titleWrapper}>
            {productDetail?.title}
          </Text>
          <TouchableOpacity
            onPress={handlePurchase}
            activeOpacity={0.7}
            style={styles.purchaseButtonWrapper}>
            <Text style={styles.purchaseButtonTextWrapper}>
              {constants.PURCHASE}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.White,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.OpacityBlack,
  },
  modalContainer: {
    width: wp(80),
    height: wp(40),
    justifyContent: 'space-evenly',
    paddingVertical: wp(0),
    borderRadius: wp(3),
    backgroundColor: colors.White,
  },
  categoryWrapper: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.Black,
    alignSelf: 'center',
  },
  purchaseText: {
    width: wp(70),
  },
  purchaseHeading: {
    width: wp(80),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  crossIconWrapper: {
    width: wp(10),
  },
  titleWrapper: {
    paddingHorizontal: wp(2),
    fontSize: 14,
    fontWeight: '600',
    alignSelf: 'center',
  },
  modalTitle: {
    marginLeft: wp(8),
    fontSize: 18,
    fontWeight: '600',
    color: colors.Black,
    alignSelf: 'center',
  },
  purchaseButtonWrapper: {
    width: wp(22),
    height: 35,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.Black,
    borderRadius: wp(25),
  },
  purchaseButtonTextWrapper: {
    fontSize: 15,
    color: colors.White,
    fontWeight: '300',
  },
  cancelButtonWrapper: {
    width: wp(20),
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    borderRadius: wp(25),
  },
  cancelButtonTextWrapper: {
    fontSize: 15,
    color: colors.White,
    fontWeight: '300',
  },
  productImageSize: {
    width: wp(4.5),
    height: wp(4.5),
    borderRadius: wp(2),
    alignSelf: 'center',
  },
});

export default PurchaseModal;
