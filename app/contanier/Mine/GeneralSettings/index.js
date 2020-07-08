import React, {memo, useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {GStyle} from '../../../assets/theme';
import {CommonHeader, ListItem} from '../../../components';
import {pTd} from '../../../utils';
import i18n from 'i18n-js';
import navigationService from '../../../utils/navigationService';
import settingsActions, {settingsSelectors} from '../../../redux/settingsRedux';
import {useSelector, shallowEqual, useDispatch} from 'react-redux';
const GeneralSettings = () => {
  const dispatch = useDispatch();
  const changeInform = useCallback(
    infrom => dispatch(settingsActions.changeInform(infrom)),
    [dispatch],
  );
  const infrom = useSelector(settingsSelectors.getInform, shallowEqual);
  useSelector(settingsSelectors.getLanguage, shallowEqual);
  return (
    <View style={GStyle.secondContainer}>
      <CommonHeader title={i18n.t('mineModule.generalSettingT')} canBack />
      <ListItem
        disabled
        switching
        value={infrom}
        style={styles.itemBox}
        title={i18n.t('mineModule.generalSettings.infrom')}
        details={i18n.t('mineModule.generalSettings.infromTip')}
        onValueChange={changeInform}
      />
      <ListItem
        onPress={() => navigationService.navigate('Language')}
        title={i18n.t('language')}
        subtitle={i18n.t('currentLanguage')}
      />
      <ListItem title={i18n.t('mineModule.generalSettings.currencyUnit')} />
      <ListItem
        title={i18n.t('mineModule.generalSettings.networkManagement')}
      />
    </View>
  );
};

export default memo(GeneralSettings);
const styles = StyleSheet.create({
  itemBox: {
    borderBottomWidth: 0,
    marginVertical: pTd(15),
  },
});
