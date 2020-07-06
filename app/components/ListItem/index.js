import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import {pTd} from '../../utils';
import {TextL} from '../CommonText';
import Icon from 'react-native-vector-icons/AntDesign';
import Touchable from '../Touchable';
const ListItem = props => {
  const {
    title,
    onPress,
    subtitle,
    container,
    titleStyle,
    subtitleStyle,
  } = props;
  return (
    <Touchable onPress={onPress} style={[styles.container, container]}>
      <TextL style={[styles.titleStyle, titleStyle]}>{title}</TextL>
      {subtitle ? (
        <TextL style={[styles.subtitleStyle, subtitleStyle]}>{subtitle}</TextL>
      ) : null}
      <Icon name={'right'} size={20} />
    </Touchable>
  );
};
export default memo(ListItem);
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    height: pTd(110),
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: pTd(30),
  },
  titleStyle: {
    flex: 1,
  },
  subtitleStyle: {},
});
