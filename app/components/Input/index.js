import React, {memo} from 'react';
import {TextInput, StyleSheet, View, Text} from 'react-native';

const Input = props => {
  const {
    leftElement,
    rightElement,
    leftTitle,
    leftTitleBox,
    leftTextStyle,
    placeholderTextColor,
    disabled,
    style,
    pointerEvents,
    opacity,
  } = props;
  if (leftTitle || leftElement || rightElement) {
    return (
      <View style={[styles.leftTitleBox, leftTitleBox]}>
        {leftElement ? (
          leftElement
        ) : (
          <Text style={[styles.leftTextStyle, leftTextStyle]}>{leftTitle}</Text>
        )}
        <TextInput
          placeholderTextColor={
            placeholderTextColor ? placeholderTextColor : '#999'
          }
          pointerEvents={disabled ? 'none' : pointerEvents}
          opacity={disabled ? 0.6 : opacity}
          {...props}
          style={[styles.leftTitleInput, style]}
        />
        {rightElement && rightElement}
      </View>
    );
  }
  return (
    <TextInput
      placeholderTextColor={
        placeholderTextColor ? placeholderTextColor : '#999'
      }
      pointerEvents={disabled ? 'none' : pointerEvents}
      opacity={disabled ? 0.6 : opacity}
      {...props}
      style={[styles.input, style]}
    />
  );
};
export default memo(Input);
const styles = StyleSheet.create({
  input: {
    flex: 1,
    fontSize: 16,
    height: 50,
    borderBottomWidth: 1,
    borderColor: '#999',
    paddingHorizontal: 5,
  },
  leftTitleBox: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#999',
  },
  leftTextStyle: {
    fontSize: 16,
  },
  leftTitleInput: {
    flex: 1,
    fontSize: 16,
    height: 50,
    paddingHorizontal: 5,
  },
});
