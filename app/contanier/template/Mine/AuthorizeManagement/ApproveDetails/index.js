import React, {memo, useMemo, useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {GStyle, Colors} from '../../../../../assets/theme';
import {
  CommonHeader,
  BounceSpinner,
  CommonToast,
  Communication,
} from '../../../../../components/template';
import {pTd} from '../../../../../utils/common';
import {useFocusEffect} from '@react-navigation/native';
import {aelfInstance} from '../../../../../utils/common/aelfProvider';
import {useSetState} from '../../../../../utils/pages/hooks';
import {TextL} from '../../../../../components/template/CommonText';
import unitConverter from '../../../../../utils/pages/unitConverter';
import Icon from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {onCopyText} from '../../../../../utils/pages';
import aelfUtils from '../../../../../utils/pages/aelfUtils';
import config from '../../../../../config';
const {contractAddresses} = config;
const NetworkManagement = props => {
  const [state, setState] = useSetState({
    result: null,
    details: null,
  });
  const {result, details} = state;
  const {params} = props.route || {};
  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      const fetch = async () => {
        const {TransactionId} = params || {};
        if (TransactionId) {
          try {
            const txResult = await aelfInstance.chain.getTxResult(
              TransactionId,
            );
            if (isActive) {
              setState({
                result: txResult,
                details: JSON.parse(txResult.Transaction.Params),
              });
            }
          } catch (error) {
            CommonToast.text('');
          }
        }
      };
      fetch();
      return () => {
        isActive = false;
      };
    }, [params, setState]),
  );
  const Element = useMemo(() => {
    if (!(details && result)) {
      return null;
    }
    const {amount, symbol, spender} = details || {};
    const {Status, TransactionId, Logs} = result || {};
    const contract = contractAddresses.find(
      item => item.contractAdress === spender,
    );
    const free = aelfUtils.getTransactionFee(Logs || {});
    const List = [
      {title: '应用名称', details: contract.name},
      {title: '合约地址', details: spender, copy: true},
      {title: 'Status', details: Status, color: 'green'},
      {
        title: 'Transaction Id',
        details: TransactionId,
        copy: true,
        onPress: () => {
          Communication.web(aelfUtils.webURLTx(TransactionId));
        },
      },
      {title: 'Fee', details: `${free.cost} ${free.symbol}`},
    ];
    return (
      <View style={styles.container}>
        <View style={styles.amountBox}>
          <TextL style={styles.amount}>
            授权金额{unitConverter.toLower(amount)} {symbol}
          </TextL>
        </View>
        {List.map((item, index) => {
          const {copy, title, onPress, color} = item;
          return (
            <View key={index} style={styles.itemBox}>
              <TextL style={{color: Colors.fontGray}}>{title}</TextL>
              {copy ? (
                <TextL
                  onPress={() =>
                    onPress ? onPress(item) : onCopyText(item.details)
                  }
                  style={styles.detailsStyle}>
                  {item.details}
                  {onPress ? (
                    <FontAwesome name="share-square-o" size={pTd(30)} />
                  ) : (
                    <Icon name="copy1" size={pTd(32)} />
                  )}
                </TextL>
              ) : (
                <TextL style={[styles.details, {color: color}]}>
                  {item.details}
                </TextL>
              )}
            </View>
          );
        })}
      </View>
    );
  }, [details, result]);
  const Loading = useMemo(() => {
    return (
      <View style={styles.loadingBox}>
        <BounceSpinner />
      </View>
    );
  }, []);
  return (
    <View style={GStyle.container}>
      <CommonHeader title={'授权详情'} canBack>
        {result && details ? Element : Loading}
      </CommonHeader>
    </View>
  );
};

export default memo(NetworkManagement);
const styles = StyleSheet.create({
  container: {
    marginTop: pTd(50),
    marginHorizontal: pTd(50),
  },
  itemBox: {
    marginTop: pTd(30),
  },
  loadingBox: {
    flex: 1,
    alignItems: 'center',
    paddingTop: pTd(300),
  },
  amountBox: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  amount: {
    color: Colors.fontColor,
  },
  details: {
    marginTop: pTd(10),
  },
  detailsStyle: {
    marginTop: pTd(10),
    color: Colors.fontColor,
  },
});
