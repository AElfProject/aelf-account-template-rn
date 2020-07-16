import React, {memo, useCallback, useEffect, useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {GStyle, Colors} from '../../../../assets/theme';
import {
  CommonHeader,
  ListComponent,
  Touchable,
  VerifyPassword,
} from '../../../../components/template';
import i18n from 'i18n-js';
import {useSelector, shallowEqual, useDispatch} from 'react-redux';
import {userSelectors} from '../../../../redux/userRedux';
import {TextL, TextM} from '../../../../components/template/CommonText';
import {pTd} from '../../../../utils/common';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {onCopyText} from '../../../../utils/pages';
import userActions from '../../../../redux/userRedux';
import TransactionVerification from '../../../../utils/pages/TransactionVerification';
import config from '../../../../config';
const {tokenSymbol} = config;
const AuthorizeManagement = () => {
  const dispatch = useDispatch();
  const getAllowanceList = useCallback(
    () => dispatch(userActions.getAllowanceList()),
    [dispatch],
  );
  const onApprove = useCallback(
    (amount, appContractAddress) =>
      dispatch(userActions.onApprove(amount, appContractAddress)),
    [dispatch],
  );
  useEffect(() => {
    getAllowanceList();
  }, [getAllowanceList]);
  const rightElement = useMemo(() => <TextL>{tokenSymbol}</TextL>, []);
  const allowanceList = useSelector(userSelectors.allowanceList, shallowEqual);
  const balance = useSelector(userSelectors.getBalance, shallowEqual);
  const onAuthorize = useCallback(
    item => {
      VerifyPassword.inputShow({
        tip: `Balance: ${balance} ${tokenSymbol}`,
        title: '授权',
        inputTip: '金额',
        errMessage: '输入金额不符合要求，请重新输入',
        rightElement,
        callBack: (value, input) => {
          value &&
            TransactionVerification.show(suc => {
              if (suc) {
                onApprove(input, item.contractAdress);
              }
            });
        },
      });
    },
    [balance, onApprove, rightElement],
  );
  const renderItem = ({item}) => {
    return (
      <View style={styles.itemBox}>
        <View style={styles.rowItem}>
          <TextL style={styles.name} numberOfLines={1}>
            应用名称
          </TextL>
          <View style={styles.rightBox}>
            <TextL>{item.name}</TextL>
          </View>
        </View>
        <View style={styles.rowItem}>
          <TextL style={styles.name} numberOfLines={1}>
            合约地址
          </TextL>
          <View style={styles.rightBox}>
            <TextL
              onPress={() => onCopyText(item.contractAdress)}
              style={styles.addressStyle}>
              {item.contractAdress} <AntDesign name="copy1" size={pTd(32)} />
            </TextL>
          </View>
        </View>
        <View style={styles.rowItem}>
          <TextL style={styles.name} numberOfLines={1}>
            授权余额
          </TextL>
          <View style={styles.rightBox}>
            <TextL>
              {item.allowance} {item.symbol}
            </TextL>
          </View>
        </View>
        <Touchable
          onPress={() => onAuthorize(item)}
          style={styles.authorizeBox}>
          <TextM style={styles.authorizeText}>去授权</TextM>
        </Touchable>
      </View>
    );
  };
  return (
    <View style={GStyle.secondContainer}>
      <CommonHeader title={i18n.t('mineModule.authorizeManagementT')} canBack />
      <ListComponent renderItem={renderItem} data={allowanceList} />
    </View>
  );
};

export default memo(AuthorizeManagement);
const styles = StyleSheet.create({
  name: {
    color: Colors.fontGray,
    marginRight: pTd(50),
  },
  itemBox: {
    width: '100%',
    marginTop: pTd(10),
    paddingHorizontal: pTd(50),
    backgroundColor: 'white',
  },
  rowItem: {
    width: '100%',
    paddingVertical: pTd(30),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    borderBottomColor: Colors.borderColor,
  },
  rightStyle: {},
  rightBox: {
    flex: 1,
    flexDirection: 'row-reverse',
  },
  addressStyle: {
    color: Colors.fontColor,
  },
  authorizeBox: {
    marginVertical: pTd(20),
    alignSelf: 'flex-end',
    height: pTd(60),
    borderRadius: pTd(30),
    paddingHorizontal: pTd(20),
    backgroundColor: Colors.primaryColor,
    justifyContent: 'center',
  },
  authorizeText: {
    color: 'white',
  },
});
