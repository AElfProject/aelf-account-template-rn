'use strict';
import React, {memo, useMemo} from 'react';
import {StyleSheet, Switch, View} from 'react-native';
import {pTd} from '../../../utils/common';
import {TextL, TextS, TextM} from '../CommonText';
import Icon from 'react-native-vector-icons/AntDesign';
import Touchable from '../Touchable';
import {Colors} from '../../../assets/theme';
const ListItem = props => {
  const {
    title,
    onPress,
    subtitle,
    style,
    titleStyle,
    subtitleStyle,
    disabled,
    details,
    detailsStyle,
    //switch
    switching,
    value,
    onValueChange,
    rightElement,
  } = props;
  const RightElement = useMemo(() => {
    if (switching) {
      return (
        <Switch
          value={value}
          thumbColor="white"
          trackColor={{false: '', true: Colors.primaryColor}}
          //当切换开关室回调此方法
          onValueChange={onValueChange}
        />
      );
    }
    return (
      <Icon
        name={'right'}
        size={pTd(40)}
        style={styles.iconStyle}
        color={Colors.fontGray}
      />
    );
  }, [onValueChange, switching, value]);
  return (
    <Touchable
      disabled={disabled}
      onPress={onPress}
      style={[styles.container, style]}>
      {details ? (
        <View style={styles.titleStyle}>
          <TextL style={[titleStyle]}>{title}</TextL>
          <TextS style={[styles.detailsStyle, detailsStyle]}>{details}</TextS>
        </View>
      ) : (
        <TextL style={[styles.titleStyle, titleStyle]}>{title}</TextL>
      )}
      {subtitle ? (
        <TextM style={[styles.subtitleStyle, subtitleStyle]}>{subtitle}</TextM>
      ) : null}
      {rightElement !== undefined ? rightElement : RightElement}
    </Touchable>
  );
};
export default memo(ListItem);
const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: pTd(110),
    paddingVertical: pTd(30),
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: pTd(30),
  },
  titleStyle: {
    flex: 1,
  },
  subtitleStyle: {
    fontSize: pTd(30),
    color: Colors.fontGray,
  },
  detailsStyle: {
    marginTop: pTd(5),
    color: Colors.fontGray,
  },
  iconStyle: {
    marginTop: pTd(4),
  },
});
