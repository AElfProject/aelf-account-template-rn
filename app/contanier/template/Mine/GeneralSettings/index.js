import React, {memo, useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {GStyle} from '../../../../assets/theme';
import {CommonHeader, ListItem} from '../../../../components/template';
import {pTd} from '../../../../utils/common';
import i18n from 'i18n-js';
import navigationService from '../../../../utils/common/navigationService';
import settingsActions, {
  settingsSelectors,
} from '../../../../redux/settingsRedux';
import {useSelector, shallowEqual, useDispatch} from 'react-redux';
import {DEFAULT_CURRENCY} from '../../../../config';
const GeneralSettings = () => {
  const dispatch = useDispatch();
  const changeInform = useCallback(
    inform => dispatch(settingsActions.changeInform(inform)),
    [dispatch],
  );
  const inform = useSelector(settingsSelectors.getInform, shallowEqual);
  const currencyUnit = useSelector(
    settingsSelectors.getCurrencyUnit,
    shallowEqual,
  );
  useSelector(settingsSelectors.getLanguage, shallowEqual);
  return (
    <View style={GStyle.secondContainer}>
      <CommonHeader title={i18n.t('mineModule.generalSettingT')} canBack />
      <ListItem
        disabled
        switching
        value={inform}
        style={styles.itemBox}
        title={i18n.t('mineModule.generalSettings.inform')}
        details={i18n.t('mineModule.generalSettings.informTip')}
        onValueChange={changeInform}
      />
      <ListItem
        onPress={() => navigationService.navigate('Language')}
        title={i18n.t('language')}
        subtitle={i18n.t('currentLanguage')}
      />
      <ListItem
        onPress={() => navigationService.navigate('CurrencyUnit')}
        title={i18n.t('mineModule.generalSettings.currencyUnit')}
        subtitle={currencyUnit || DEFAULT_CURRENCY}
      />
      <ListItem
        onPress={() => navigationService.navigate('NetworkManagement')}
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
