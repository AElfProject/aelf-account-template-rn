import React, {memo, useCallback, useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {GStyle} from '../../../assets/theme';
import {CommonHeader, ListItem} from '../../../components';
import {pTd} from '../../../utils';
import i18n from 'i18n-js';
import {localLanguage} from '../../../i18n/config';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import settingsActions, {settingsSelectors} from '../../../redux/settingsRedux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const Language = () => {
  const dispatch = useDispatch();
  const changeLanguage = useCallback(
    language => dispatch(settingsActions.changeLanguage(language)),
    [dispatch],
  );
  const language = useSelector(settingsSelectors.getLanguage, shallowEqual);
  const rightElement = useMemo(
    () => <FontAwesome name="check" size={20} />,
    [],
  );
  const Element = useMemo(() => {
    const itemList = localLanguage.map(item => {
      return {
        ...item,
        onPress: value => {
          console.log(value, '======value');

          changeLanguage(value.language);
        },
      };
    });
    return (
      <View style={styles.itemBox}>
        {itemList.map((item, index) => {
          return (
            <ListItem
              {...item}
              onPress={() => item.onPress(item)}
              key={index}
              rightElement={item.language === language ? rightElement : null}
            />
          );
        })}
      </View>
    );
  }, [changeLanguage, language, rightElement]);
  return (
    <View style={GStyle.secondContainer}>
      <CommonHeader title={i18n.t('language')} canBack />
      {Element}
    </View>
  );
};

export default memo(Language);
const styles = StyleSheet.create({
  itemBox: {
    marginTop: pTd(15),
  },
});
