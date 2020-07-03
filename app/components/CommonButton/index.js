import React from 'react';
import {StyleSheet} from 'react-native';
import Touchable from '../Touchable';
import {TextL} from '../CommonText';
import {Colors} from '../../assets/theme';
import {pTd} from '../../utils';
import Spinner from 'react-native-spinkit';
const CommonButton = props => {
  const {title, onPress, style, textStyle, disabled, loading} = props;
  if (loading) {
    return (
      <Spinner
        style={[styles.spinnerStyle, style]}
        type={'ChasingDots'}
        color={Colors.primaryColor}
        size={pTd(80)}
      />
    );
  }
  return (
    <Touchable
      highlight
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.container,
        disabled && {backgroundColor: Colors.disabledColor},
        style,
      ]}
      underlayColor={Colors.bottonPressColor}>
      <TextL numberOfLines={1} style={[styles.textStyles, textStyle]}>
        {title || 'button'}
      </TextL>
    </Touchable>
  );
};

export default CommonButton;
const styles = StyleSheet.create({
  container: {
    height: pTd(90),
    borderRadius: pTd(45),
    alignItems: 'center',
    justifyContent: 'center',
    width: '85%',
    alignSelf: 'center',
    backgroundColor: Colors.primaryColor,
  },
  textStyles: {
    fontWeight: 'bold',
    color: 'white',
  },
  spinnerStyle: {
    alignSelf: 'center',
  },
});
