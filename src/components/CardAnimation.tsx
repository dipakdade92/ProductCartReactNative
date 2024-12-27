import {Animated, StyleSheet} from 'react-native';
import React, {ReactNode} from 'react';
import {wp} from '../utils/responsive';
import colors from '../utils/colors';

interface CardAnimationProps {
  scale: any;
  opacity: any;
  children: ReactNode;
}

const CardAnimation = (props: CardAnimationProps) => {
  const {scale, opacity, children} = props;
  return (
    <Animated.View
      style={[
        styles.card,
        {
          transform: [{scale}],
          opacity,
        },
      ]}>
      {children}
    </Animated.View>
  );
};

export default CardAnimation;

const styles = StyleSheet.create({
  card: {
    width: wp(90),
    height: 165,
    marginVertical: 8,
    alignSelf: 'center',
    backgroundColor: colors.White,
    borderRadius: wp(5),
  },
});
