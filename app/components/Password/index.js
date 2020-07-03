/**
 * Created by wayne on 2017/6/21.
 */
import React, { useRef, useState, memo, useCallback } from 'react';
import { StyleSheet, View, TextInput, TouchableHighlight } from 'react-native';
import { sreenWidth } from '../../utils/device';

const PasswordInput = (props) => {
  const input = useRef();
  const [text, setText] = useState('');
  const onPress = useCallback(() => {
    input && input.focus();
  }, [input]);
  const getInputItem = () => {
    const { maxLength, inputItemStyle, iconStyle, } = props
    let inputItem = [];
    for (let i = 0; i < parseInt(maxLength); i++) {
      if (i == 0) {
        inputItem.push(
          <View key={i} style={[styles.inputItem, inputItemStyle]}>
            {i < text.length ? <View style={[styles.iconStyle, iconStyle]}></View> : null}
          </View>)
      }
      else {
        inputItem.push(
          <View key={i} style={[styles.inputItem, styles.inputItemBorderLeftWidth, inputItemStyle]}>
            {i < text.length ?
              <View style={[styles.iconStyle, iconStyle]}>
              </View> : null}
          </View>)
      }
      ;
    }
    return inputItem;
  }
  const { onChange, maxLength, style } = props
  return (
    <TouchableHighlight onPress={onPress} activeOpacity={1} underlayColor='transparent'>
      <View style={[styles.container, style]} >
        <TextInput
          style={{ height: 45, zIndex: 99, position: 'absolute', width: sreenWidth / 8 * 6, opacity: 0 }}
          ref={input}
          maxLength={maxLength}
          autoFocus={true}
          keyboardType="numeric"
          onChangeText={(text) => { setText(text); onChange && onChange(text) }}
        />
        {getInputItem()}
      </View>
    </TouchableHighlight>
  )
}
export default memo(PasswordInput)

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff'
  },
  inputItem: {

    height: sreenWidth / 8,
    width: sreenWidth / 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputItemBorderLeftWidth: {
    borderLeftWidth: 1,
    borderColor: '#ccc',
  },
  iconStyle: {
    width: 16,
    height: 16,
    backgroundColor: '#222',
    borderRadius: 8,
  },
});